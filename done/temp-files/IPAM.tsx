/**
 * ABOUTME: IPAM (IP Address Management) Dashboard page
 * ABOUTME: Centralized IP address and subnet management with allocation tracking
 *
 * Copyright (c) 2025 Nick Falshaw. All rights reserved.
 */

import React, { useState, useEffect } from 'react';
import {
  Network,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Server,
  Globe,
  Cpu,
  HardDrive,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';
import { logger } from '../utils/logger'
import { useAuth } from '../contexts/AuthContext';
import ConfirmDialog from '../components/ConfirmDialog';

// Type definitions
interface IPSubnet {
  id: number;
  network_address: string;
  subnet_mask: string;
  gateway: string | null;
  vlan_id: number | null;
  location: string | null;
  department: string | null;
  description: string | null;
  total_ips: number;
  used_ips: number;
  available_ips: number;
  utilization_percent: number;
  created_at: string;
  updated_at: string;
}

interface IPAddress {
  id: number;
  ip_address: string;
  subnet_id: number | null;
  hostname: string | null;
  mac_address: string | null;
  status: 'available' | 'assigned' | 'reserved' | 'quarantine';
  assigned_to: string | null;
  last_seen: string | null;
  notes: string | null;
  subnet_network: string | null;
  dns_records_count: number;
  firewall_changes_count: number;
  created_at: string;
  updated_at: string;
}

// API URL with fallback for local development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const IPAM: React.FC = () => {
  const { state } = useAuth();

  // Tab state
  const [activeTab, setActiveTab] = useState<'subnets' | 'addresses'>('subnets');

  // Subnets state
  const [subnets, setSubnets] = useState<IPSubnet[]>([]);
  const [subnetFilters, setSubnetFilters] = useState({
    location: '',
    department: '',
    vlan_id: '',
  });

  // IP Addresses state
  const [addresses, setAddresses] = useState<IPAddress[]>([]);
  const [addressFilters, setAddressFilters] = useState({
    subnet_id: '',
    status: '',
    search: '',
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IPSubnet | IPAddress | null>(null);

  // Dialog states
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<'subnet' | 'ip'>('subnet');
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;

  // Fetch subnets
  const fetchSubnets = async () => {
    const token = sessionStorage.getItem('auth_token');

    if (!token || !state.isAuthenticated) {
      setError('Authentication required. Please log in.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        size: pageSize.toString(),
        ...Object.fromEntries(
          Object.entries(subnetFilters).filter(([_, v]) => v !== '')
        ),
      });

      const response = await fetch(
        `${API_URL}/ipam/subnets?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch subnets');

      const data = await response.json();
      setSubnets(data.items);
      setTotalPages(data.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch IP addresses
  const fetchAddresses = async () => {
    const token = sessionStorage.getItem('auth_token');

    if (!token || !state.isAuthenticated) {
      setError('Authentication required. Please log in.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        size: pageSize.toString(),
        ...Object.fromEntries(
          Object.entries(addressFilters).filter(([_, v]) => v !== '')
        ),
      });

      const response = await fetch(
        `${API_URL}/ipam/addresses?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch IP addresses');

      const data = await response.json();
      setAddresses(data.items);
      setTotalPages(data.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Load data when tab or filters change
  useEffect(() => {
    if (activeTab === 'subnets') {
      fetchSubnets();
    } else {
      fetchAddresses();
    }
  }, [activeTab, currentPage, subnetFilters, addressFilters, state.isAuthenticated]);

  // Status badge component
  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const statusConfig = {
      available: { icon: CheckCircle, color: 'text-green-600 bg-green-100', label: 'Available' },
      assigned: { icon: Server, color: 'text-blue-600 bg-blue-100', label: 'Assigned' },
      reserved: { icon: Clock, color: 'text-yellow-600 bg-yellow-100', label: 'Reserved' },
      quarantine: { icon: XCircle, color: 'text-red-600 bg-red-100', label: 'Quarantine' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.available;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  // Utilization bar component
  const UtilizationBar: React.FC<{ percent: number }> = ({ percent }) => {
    const color = percent > 90 ? 'bg-red-500' : percent > 75 ? 'bg-yellow-500' : 'bg-green-500';

    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${color} transition-all duration-300`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-600 min-w-[3rem] text-right">
          {percent.toFixed(1)}%
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl">
              <Network className="w-6 h-6 text-white" />
            </div>
            IP Address Management
          </h1>
          <p className="mt-2 text-gray-600">
            Centralized IP address and subnet management with allocation tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => activeTab === 'subnets' ? fetchSubnets() : fetchAddresses()}
            className="btn-ghost"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" />
            Add {activeTab === 'subnets' ? 'Subnet' : 'IP Address'}
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div className="flex-1">
            <p className="font-medium text-red-900">Error</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-800"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          <button
            onClick={() => {
              setActiveTab('subnets');
              setCurrentPage(1);
            }}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'subnets'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              IP Subnets
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab('addresses');
              setCurrentPage(1);
            }}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'addresses'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4" />
              IP Addresses
            </div>
          </button>
        </nav>
      </div>

      {/* Subnets Tab */}
      {activeTab === 'subnets' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="card flex gap-4 p-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={subnetFilters.location}
                onChange={(e) =>
                  setSubnetFilters({ ...subnetFilters, location: e.target.value })
                }
                placeholder="Filter by location"
                className="input"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department
              </label>
              <input
                type="text"
                value={subnetFilters.department}
                onChange={(e) =>
                  setSubnetFilters({ ...subnetFilters, department: e.target.value })
                }
                placeholder="Filter by department"
                className="input"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                VLAN ID
              </label>
              <input
                type="number"
                value={subnetFilters.vlan_id}
                onChange={(e) =>
                  setSubnetFilters({ ...subnetFilters, vlan_id: e.target.value })
                }
                placeholder="Filter by VLAN"
                className="input"
              />
            </div>
          </div>

          {/* Subnets Table */}
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-border/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Network
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Location / Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    VLAN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Utilization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    IPs
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading subnets...
                    </td>
                  </tr>
                ) : subnets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No subnets found
                    </td>
                  </tr>
                ) : (
                  subnets.map((subnet) => (
                    <tr key={subnet.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {subnet.network_address}
                          </div>
                          <div className="text-sm text-gray-500">
                            Mask: {subnet.subnet_mask}
                            {subnet.gateway && ` • Gateway: ${subnet.gateway}`}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          {subnet.location && (
                            <div className="text-gray-900">{subnet.location}</div>
                          )}
                          {subnet.department && (
                            <div className="text-gray-500">{subnet.department}</div>
                          )}
                          {!subnet.location && !subnet.department && (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {subnet.vlan_id ? (
                          <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                            VLAN {subnet.vlan_id}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <UtilizationBar percent={subnet.utilization_percent} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="text-gray-900 font-medium">
                            {subnet.used_ips} / {subnet.total_ips}
                          </div>
                          <div className="text-gray-500">
                            {subnet.available_ips} available
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedItem(subnet)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedItem(subnet);
                              setShowCreateModal(true);
                            }}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteType('subnet');
                              setItemToDelete(subnet.id);
                              setConfirmDeleteOpen(true);
                            }}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* IP Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="card flex gap-4 p-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={addressFilters.search}
                  onChange={(e) =>
                    setAddressFilters({ ...addressFilters, search: e.target.value })
                  }
                  placeholder="Search by IP or hostname"
                  className="input pl-10"
                />
              </div>
            </div>

            <div className="w-48">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                value={addressFilters.status}
                onChange={(e) =>
                  setAddressFilters({ ...addressFilters, status: e.target.value })
                }
                className="input"
              >
                <option value="">All Statuses</option>
                <option value="available">Available</option>
                <option value="assigned">Assigned</option>
                <option value="reserved">Reserved</option>
                <option value="quarantine">Quarantine</option>
              </select>
            </div>
          </div>

          {/* IP Addresses Table */}
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-border/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Hostname / Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    MAC Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Subnet
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading IP addresses...
                    </td>
                  </tr>
                ) : addresses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No IP addresses found
                    </td>
                  </tr>
                ) : (
                  addresses.map((address) => (
                    <tr key={address.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-mono font-medium text-gray-900">
                          {address.ip_address}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          {address.hostname && (
                            <div className="text-gray-900 font-medium">
                              {address.hostname}
                            </div>
                          )}
                          {address.assigned_to && (
                            <div className="text-gray-500">{address.assigned_to}</div>
                          )}
                          {!address.hostname && !address.assigned_to && (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {address.mac_address ? (
                          <span className="font-mono text-sm text-gray-600">
                            {address.mac_address}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={address.status} />
                      </td>
                      <td className="px-6 py-4">
                        {address.subnet_network ? (
                          <span className="font-mono text-sm text-gray-600">
                            {address.subnet_network}
                          </span>
                        ) : (
                          <span className="text-gray-400">No subnet</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedItem(address)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedItem(address);
                              setShowCreateModal(true);
                            }}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteType('ip');
                              setItemToDelete(address.id);
                              setConfirmDeleteOpen(true);
                            }}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="card flex items-center justify-between px-6 py-4">
          <div className="text-sm font-medium text-slate-700">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-slate-700"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-slate-700"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmDeleteOpen}
        title={deleteType === 'subnet' ? 'Delete Subnet' : 'Delete IP Address'}
        message={
          deleteType === 'subnet'
            ? 'Are you sure you want to delete this subnet and all associated IP addresses? This action cannot be undone.'
            : 'Are you sure you want to delete this IP address? This action cannot be undone.'
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (itemToDelete !== null) {
            // Delete logic here (placeholder until API is implemented)
            logger.info(`Deleting ${deleteType} with ID:`, itemToDelete);
            setItemToDelete(null);
          }
        }}
        onCancel={() => {
          setConfirmDeleteOpen(false);
          setItemToDelete(null);
        }}
        variant="danger"
      />
    </div>
  );
};

export default IPAM;
