import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AdminIndicator from '../components/AdminIndicator';
import SalesDashboard from '../components/SalesDashboard';
import ProfessionalSalesAnalytics from '../components/ProfessionalSalesAnalytics';
import CustomerOrders from '../components/CustomerOrders';
import { useAdmin } from '../hooks/useAdmin';
import api from '../api';
import './ProfessionalAdmin.css';

const NewAdminDashboard = () => {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  // const [editingProduct, setEditingProduct] = useState(null); // Unused

  const [activeTab, setActiveTab] = useState('products');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0,
    outOfStock: 0
  });





  const calculateStats = useCallback((productsData) => {
    const totalProducts = productsData.length;
    const totalValue = productsData.reduce((sum, product) => sum + (product.price * product.stock), 0);
    const lowStock = productsData.filter(product => product.stock > 0 && product.stock <= 10).length;
    const outOfStock = productsData.filter(product => product.stock === 0).length;

    setStats({
      totalProducts,
      totalValue,
      lowStock,
      outOfStock
    });
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      if (response.data?.data) {
        calculateStats(response.data.data);
      } else if (Array.isArray(response.data)) {
        calculateStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  }, [calculateStats]);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchProducts();
  }, [isAdmin, navigate, fetchProducts]);

  // handleUpdateProduct, handleDeleteProduct and filteredProducts removed as unused from this view


  if (!isAdmin) {
    return null;
  }

  return (
    <div className="professional-admin-dashboard">
      {/* Background Elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'var(--dark-gradient)',
        zIndex: 0
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `
            radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(245, 87, 108, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(0, 242, 254, 0.1) 0%, transparent 50%)
          `,
          animation: 'backgroundFloat 20s ease-in-out infinite'
        }}></div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />

        {/* Professional Admin Header */}
        <div className="admin-header">
          <h1 className="admin-title">⚡ Admin Dashboard</h1>
          <p className="admin-subtitle">Jaimaaruthi Electrical & Hardware Store Management</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <h2 className="stat-value primary">{stats.totalProducts}</h2>
            <p className="stat-label">Total Products</p>
          </div>
          <div className="stat-card">
            <h2 className="stat-value success">₹{stats.totalValue.toLocaleString()}</h2>
            <p className="stat-label">Total Inventory Value</p>
          </div>
          <div className="stat-card">
            <h2 className="stat-value warning">{stats.lowStock}</h2>
            <p className="stat-label">Low Stock Alert</p>
          </div>
          <div className="stat-card">
            <h2 className="stat-value danger">{stats.outOfStock}</h2>
            <p className="stat-label">Out of Stock</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="nav-tabs">
          {[
            { id: 'products', label: 'Product Management', icon: '📦' },
            { id: 'analytics', label: 'Sales Analytics', icon: '📊' },
            { id: 'orders', label: 'Customer Orders', icon: '🛍️' },
            { id: 'reports', label: 'Advanced Reports', icon: '📋', action: () => navigate('/sales-report') }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => tab.action ? tab.action() : setActiveTab(tab.id)}
              disabled={tab.loading}
              className={`nav-tab ${tab.isPdfButton ? 'pdf-button' : ''} ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="nav-tab-icon">{tab.icon}</span>
              {tab.loading ? (
                <>
                  <div className="loading-spinner" style={{ display: 'inline-block', marginRight: '0.5rem' }}></div>
                  Generating...
                </>
              ) : (
                tab.label
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="content-container">
          <div className="content-card">
            {loading ? (
              <div className="loading-overlay">
                <div className="loading-spinner"></div>
                <span>Loading dashboard data...</span>
              </div>
            ) : (
              <>
                {activeTab === 'products' && (
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '2rem',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <h2 style={{
                        color: 'var(--text-primary)',
                        margin: 0,
                        fontSize: '2rem',
                        fontWeight: '600'
                      }}>📦 Product Management</h2>
                      <button
                        className="professional-button"
                        onClick={() => {/* Add product logic */ }}
                        style={{
                          background: 'var(--success-gradient)',
                          padding: '0.8rem 1.5rem',
                          borderRadius: '8px',
                          border: 'none',
                          color: 'white',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        + Add New Product
                      </button>
                    </div>

                    <div style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '12px',
                      padding: '2rem',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>📋</div>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Product Management System</h3>
                        <p>Advanced product management features are being implemented.</p>
                        <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                          This will include inventory tracking, product categories, pricing management, and stock alerts.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div>
                    <ProfessionalSalesAnalytics />
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div>
                    <CustomerOrders />
                  </div>
                )}

                {activeTab === 'sales' && (
                  <div>
                    <SalesDashboard />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      </div>

      {/* Admin Mode Indicator */}
      <AdminIndicator showStatus={true} />
    </div>
  );
};

export default NewAdminDashboard;