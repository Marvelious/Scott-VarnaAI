/**
 * ABOUTME: Analytics Dashboard for firewall change management metrics
 * ABOUTME: Displays change workflow stats, Jira integration health, and compliance metrics
 */

import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Shield,
  GitBranch,
  AlertCircle
} from 'lucide-react'
import { logger } from '../utils/logger'

interface AnalyticsData {
  total_changes: number
  by_status: {
    draft: number
    pending: number
    approved: number
    implementing: number
    implemented: number
    failed: number
    rolled_back: number
  }
  by_priority: {
    low: number
    medium: number
    high: number
    critical: number
    emergency: number
  }
  by_risk: {
    low: number
    medium: number
    high: number
    critical: number
  }
  by_category: {
    access_rule: number
    nat_rule: number
    vpn_config: number
    security_policy: number
    routing: number
    other: number
  }
  jira_integration: {
    total_changes: number
    with_jira_ticket: number
    without_jira_ticket: number
    jira_sync_rate: number
    last_sync: string | null
  }
  workflow_health: {
    total_completed: number
    success_rate: number
    average_approval_hours: number | null
    average_implementation_hours: number | null
    rejection_rate: number
    emergency_change_rate: number
  }
  user_activity: {
    top_requesters: Array<Record<string, number>>
    top_approvers: Array<Record<string, number>>
    top_implementers: Array<Record<string, number>>
    total_active_users: number
  }
  compliance: {
    changes_requiring_approval: number
    approval_compliance_rate: number
    changes_with_risk_assessment: number
    risk_assessment_rate: number
    changes_with_rollback_plan: number
    rollback_plan_rate: number
  }
}

const Analytics: React.FC = () => {
  const { state } = useAuth()
  const [timeRange, setTimeRange] = useState('30d')
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1"
    const token = sessionStorage.getItem('auth_token')

    if (!token || !state.isAuthenticated) {
      setLoading(false)
      setError('Authentication required. Please log in.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${API_URL}/analytics/summary?date_range=${timeRange}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.statusText}`)
      }

      const analyticsData = await response.json()
      setData(analyticsData)
    } catch (err) {
      logger.error('Analytics fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange, state.isAuthenticated])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="body-text">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-400" />
          <p className="body-text text-red-400">{error}</p>
          <button onClick={fetchAnalytics} className="btn-primary mt-4">
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="body-text">No analytics data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="feature-icon">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h1 className="heading-xl gradient-text-glow">Analytics Dashboard</h1>
        </div>
        <p className="body-text max-w-3xl mx-auto">
          Change management metrics, Jira integration health, and workflow efficiency insights
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-secondary" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="select text-sm"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
        <button onClick={fetchAnalytics} className="btn-ghost text-sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Overview Stats - Bento Grid */}
      <div className="bento-grid">
        {/* Total Changes */}
        <div className="bento-sm stat-card">
          <div className="magic-bg"></div>
          <div className="relative z-10">
            <BarChart3 className="h-8 w-8 mb-3 opacity-80" />
            <div className="stat-value text-2xl">{data.total_changes}</div>
            <div className="stat-label text-xs">Total Changes</div>
          </div>
        </div>

        {/* Jira Sync Rate */}
        <div className="bento-sm stat-card">
          <div className="magic-bg"></div>
          <div className="relative z-10">
            <GitBranch className="h-8 w-8 mb-3 opacity-80" />
            <div className="stat-value text-2xl">{data.jira_integration.jira_sync_rate}%</div>
            <div className="stat-label text-xs">Jira Sync Rate</div>
            <div className="mt-2">
              <span className="text-xs text-secondary">
                {data.jira_integration.with_jira_ticket} of {data.jira_integration.total_changes} synced
              </span>
            </div>
          </div>
        </div>

        {/* Success Rate */}
        <div className="bento-sm stat-card">
          <div className="magic-bg"></div>
          <div className="relative z-10">
            <CheckCircle className="h-8 w-8 mb-3 opacity-80" />
            <div className="stat-value text-2xl">{data.workflow_health.success_rate}%</div>
            <div className="stat-label text-xs">Success Rate</div>
            <div className="mt-2">
              <span className="text-xs text-green-300">
                {data.workflow_health.total_completed} completed
              </span>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bento-sm stat-card">
          <div className="magic-bg"></div>
          <div className="relative z-10">
            <Users className="h-8 w-8 mb-3 opacity-80" />
            <div className="stat-value text-2xl">{data.user_activity.total_active_users}</div>
            <div className="stat-label text-xs">Active Users</div>
          </div>
        </div>

        {/* Change Status Distribution */}
        <div className="bento-md feature-card">
          <div className="feature-icon">
            <TrendingUp className="h-6 w-6" />
          </div>
          <h3 className="feature-title">Change Status</h3>
          <p className="feature-description mb-4">Distribution by workflow status</p>
          <div className="space-y-2">
            {Object.entries(data.by_status).map(([status, count]) => (
              count > 0 && (
                <div key={status} className="flex justify-between items-center p-2 rounded bg-tertiary">
                  <span className="small-text text-primary capitalize">{status.replace('_', ' ')}</span>
                  <span className="text-secondary font-medium">{count}</span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bento-md feature-card">
          <div className="feature-icon">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="feature-title">Priority Levels</h3>
          <p className="feature-description mb-4">Changes by priority</p>
          <div className="space-y-2">
            {Object.entries(data.by_priority).map(([priority, count]) => (
              count > 0 && (
                <div key={priority} className="flex justify-between items-center p-2 rounded bg-tertiary">
                  <span className="small-text text-primary capitalize">{priority}</span>
                  <span className="text-secondary font-medium">{count}</span>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Workflow Health */}
        <div className="bento-md pro-card">
          <div className="chart-header mb-4">
            <div>
              <h3 className="chart-title">Workflow Efficiency</h3>
              <p className="chart-subtitle">Approval and implementation metrics</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-primary">Success Rate</span>
                <span className="text-secondary">{data.workflow_health.success_rate}%</span>
              </div>
              <div className="w-full bg-tertiary rounded-full h-2">
                <div
                  className="bg-gradient-primary h-2 rounded-full"
                  style={{width: `${data.workflow_health.success_rate}%`}}
                ></div>
              </div>
            </div>
            {data.workflow_health.average_approval_hours !== null && (
              <div className="flex justify-between items-center p-2 rounded bg-tertiary">
                <span className="small-text text-primary">Avg Approval Time</span>
                <span className="text-secondary">{data.workflow_health.average_approval_hours.toFixed(1)}h</span>
              </div>
            )}
            {data.workflow_health.average_implementation_hours !== null && (
              <div className="flex justify-between items-center p-2 rounded bg-tertiary">
                <span className="small-text text-primary">Avg Implementation Time</span>
                <span className="text-secondary">{data.workflow_health.average_implementation_hours.toFixed(1)}h</span>
              </div>
            )}
            <div className="flex justify-between items-center p-2 rounded bg-tertiary">
              <span className="small-text text-primary">Rejection Rate</span>
              <span className="text-red-300">{data.workflow_health.rejection_rate}%</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-tertiary">
              <span className="small-text text-primary">Emergency Changes</span>
              <span className="text-yellow-300">{data.workflow_health.emergency_change_rate}%</span>
            </div>
          </div>
        </div>

        {/* Jira Integration Health */}
        <div className="bento-md feature-card">
          <div className="feature-icon">
            <GitBranch className="h-6 w-6" />
          </div>
          <h3 className="feature-title">Jira Integration</h3>
          <p className="feature-description mb-4">Ticket sync health</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 rounded bg-tertiary">
              <span className="small-text text-primary">With Jira Tickets</span>
              <span className="text-green-300">{data.jira_integration.with_jira_ticket}</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-tertiary">
              <span className="small-text text-primary">Without Jira Tickets</span>
              <span className="text-yellow-300">{data.jira_integration.without_jira_ticket}</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-tertiary">
              <span className="small-text text-primary">Sync Rate</span>
              <span className="text-secondary">{data.jira_integration.jira_sync_rate}%</span>
            </div>
            {data.jira_integration.last_sync && (
              <div className="flex justify-between items-center p-2 rounded bg-tertiary">
                <span className="small-text text-primary">Last Sync</span>
                <span className="text-xs text-secondary">
                  {new Date(data.jira_integration.last_sync).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Compliance Metrics */}
        <div className="bento-md pro-card">
          <div className="chart-header mb-4">
            <Shield className="h-6 w-6" />
            <div>
              <h3 className="chart-title">Compliance</h3>
              <p className="chart-subtitle">Approval and risk assessment coverage</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-primary">Approval Compliance</span>
                <span className="text-secondary">{data.compliance.approval_compliance_rate}%</span>
              </div>
              <div className="w-full bg-tertiary rounded-full h-2">
                <div
                  className="bg-gradient-secondary h-2 rounded-full"
                  style={{width: `${data.compliance.approval_compliance_rate}%`}}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-primary">Risk Assessment Rate</span>
                <span className="text-secondary">{data.compliance.risk_assessment_rate}%</span>
              </div>
              <div className="w-full bg-tertiary rounded-full h-2">
                <div
                  className="bg-gradient-purple h-2 rounded-full"
                  style={{width: `${data.compliance.risk_assessment_rate}%`}}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-primary">Rollback Plan Rate</span>
                <span className="text-secondary">{data.compliance.rollback_plan_rate}%</span>
              </div>
              <div className="w-full bg-tertiary rounded-full h-2">
                <div
                  className="bg-gradient-primary h-2 rounded-full"
                  style={{width: `${data.compliance.rollback_plan_rate}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Users */}
        <div className="bento-md feature-card">
          <div className="feature-icon">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="feature-title">Top Contributors</h3>
          <p className="feature-description mb-4">Most active users</p>
          <div className="space-y-3">
            {data.user_activity.top_requesters.length > 0 && (
              <div>
                <span className="text-xs text-secondary uppercase tracking-wide">Requesters</span>
                <div className="mt-1 space-y-1">
                  {data.user_activity.top_requesters.map((item, idx) => {
                    const [username, count] = Object.entries(item)[0]
                    return (
                      <div key={idx} className="flex justify-between items-center p-1 rounded bg-tertiary/50">
                        <span className="text-xs text-primary">{username}</span>
                        <span className="text-xs text-secondary">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            {data.user_activity.top_approvers.length > 0 && (
              <div>
                <span className="text-xs text-secondary uppercase tracking-wide">Approvers</span>
                <div className="mt-1 space-y-1">
                  {data.user_activity.top_approvers.map((item, idx) => {
                    const [username, count] = Object.entries(item)[0]
                    return (
                      <div key={idx} className="flex justify-between items-center p-1 rounded bg-tertiary/50">
                        <span className="text-xs text-primary">{username}</span>
                        <span className="text-xs text-secondary">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bento-md pro-card">
          <div className="chart-header mb-4">
            <h3 className="chart-title">Quick Actions</h3>
            <p className="chart-subtitle">Analytics and reporting tools</p>
          </div>
          <div className="space-y-3">
            <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-tertiary transition-colors w-full text-left">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Download className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="font-medium text-primary block">Export Report</span>
                <span className="small-text">Generate analytics report</span>
              </div>
            </button>
            <button
              onClick={fetchAnalytics}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-tertiary transition-colors w-full text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-secondary flex items-center justify-center">
                <RefreshCw className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="font-medium text-primary block">Refresh Data</span>
                <span className="small-text">Update all metrics</span>
              </div>
            </button>
            <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-tertiary transition-colors w-full text-left">
              <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="font-medium text-primary block">Schedule Report</span>
                <span className="small-text">Automated reporting</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
