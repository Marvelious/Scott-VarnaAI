import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  FileText,
  Settings,
  Menu,
  X,
  Bell,
  LogOut,
  GitBranch,
  Shield,
  Zap,
  Wand2,
  BarChart3,
  BookOpen,
  Moon,
  Sun
} from 'lucide-react'
import { useAppStore } from '../../stores/useAppStore'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import LicenseBanner from '../LicenseBanner'

interface LayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Changes', href: '/changes', icon: FileText },
  { name: 'Rule Builder', href: '/rule-builder', icon: Wand2 },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Integrations', href: '/integrations', icon: Zap },
  { name: 'Firewall Management', href: '/firewalls', icon: Shield },
  { name: 'Jira Integration', href: '/jira', icon: GitBranch },
  { name: 'Documentation', href: '/documentation', icon: BookOpen },
  { name: 'Settings', href: '/settings', icon: Settings }
]

function Layout ({ children }: LayoutProps) {
  const location = useLocation()
  const { sidebarOpen, toggleSidebar } = useAppStore()
  const { state, logout } = useAuth()
  const { state: themeState, toggleTheme } = useTheme()
  const user = state.user

  if (!state.isAuthenticated) {
    return <>{children}</>
  }

  const sidebarClasses = `fixed inset-y-0 left-0 z-50 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* License Banner */}
      <LicenseBanner />

      <div className="flex flex-1">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={toggleSidebar}
              role="button"
              aria-label="Close sidebar"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Escape' || e.key === 'Enter') {
                  toggleSidebar()
                }
              }}
            />
          </div>
        )}

        {/* Mobile sidebar */}
        <aside
          className={sidebarClasses}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex h-full flex-col sidebar-glass">
            <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
              <div className="text-xl font-bold gradient-text">FwChange</div>
              <button
                onClick={toggleSidebar}
                className="text-tertiary hover:text-primary transition-colors p-2 -m-2"
                aria-label="Close sidebar"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          <nav className="flex-1 px-2 py-4 space-y-1" aria-label="Main navigation">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={isActive ? 'nav-item-active' : 'nav-item-inactive'}
                  onClick={toggleSidebar}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
                  <span className="truncate">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
        </aside>

        {/* Desktop sidebar */}
        <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col z-30" role="navigation" aria-label="Desktop navigation">
          <div className="flex flex-1 flex-col sidebar-glass">
            <div className="flex h-16 items-center px-4 border-b border-white/10">
              <div className="text-xl font-bold gradient-text">FwChange</div>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1" aria-label="Main navigation">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={isActive ? 'nav-item-active' : 'nav-item-inactive'}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main content - includes footer to respect sidebar margin */}
        <div className="flex-1 lg:ml-64 flex flex-col min-h-full">
          {/* Top bar */}
          <div className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b px-4 sm:gap-6 sm:px-6 lg:px-8"
               style={{
                 backgroundColor: 'var(--bg-secondary)',
                 borderColor: 'var(--border-color)',
                 backdropFilter: 'blur(12px)'
               }}>
            <button
              type="button"
              className="text-tertiary hover:text-primary transition-colors p-2 -m-2 lg:hidden"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-4 self-stretch lg:gap-6">
              <div className="flex-1" />
              <div className="flex items-center gap-4 lg:gap-6">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="text-tertiary hover:text-primary transition-colors p-2 -m-2"
                  aria-label={themeState.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  title={themeState.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {themeState.isDark ? (
                    <Sun className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Moon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>

                <button
                  className="text-tertiary hover:text-primary transition-colors p-2 -m-2"
                  aria-label="View notifications"
                  title="Notifications"
                >
                  <Bell className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="hidden lg:block h-6 w-px" style={{ backgroundColor: 'var(--border-color)' }} role="separator" aria-hidden="true" />

                <div className="flex items-center gap-2">
                  <span className="hidden lg:block text-sm text-secondary" aria-label={'Logged in as ' + (user?.full_name || user?.username)}>
                    {user?.full_name || user?.username}
                  </span>
                  <button
                    onClick={logout}
                    className="text-tertiary hover:text-primary transition-colors p-2 -m-2"
                    title="Log out of your account"
                    aria-label="Log out"
                  >
                    <LogOut className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>

          {/* Footer - now inside the main content area to respect sidebar margin */}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout
