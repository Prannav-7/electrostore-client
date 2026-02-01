import React, { useState, useEffect } from 'react';
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [activeTab, setActiveTab] = useState('analytics');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0,
    outOfStock: 0
  });

  const categories = [
    'Electrical Goods',
    'Hardware & Tools', 
    'Wiring & Cables',
    'Switches & Sockets',
    'Lighting Solutions',
    'Fans & Ventilation',
    'Electrical Motors',
    'Safety Equipment'
  ];

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchProducts();
  }, [isAdmin, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      if (response.data?.data) {
        setProducts(response.data.data);
        calculateStats(response.data.data);
      } else if (response.data?.products) {
        setProducts(response.data.products);
        calculateStats(response.data.products);
      } else if (Array.isArray(response.data)) {
        setProducts(response.data);
        calculateStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (productsData) => {
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
  };

  const handleDeleteProduct = async (productId, productName) => {
    const confirmMessage = `Are you sure you want to delete "${productName}"?\\n\\nType "DELETE" to confirm:`;
    const userInput = window.prompt(confirmMessage);
    
    if (userInput !== 'DELETE') {
      if (userInput !== null) {
        alert('Product deletion cancelled. You must type "DELETE" exactly to confirm.');
      }
      return;
    }

    try {
      const response = await api.delete(`/products/${productId}`);
      if (response.data?.success) {
        const updatedProducts = products.filter(product => product._id !== productId);
        setProducts(updatedProducts);
        calculateStats(updatedProducts);
        alert(`✅ Product "${productName}" deleted successfully!`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(`❌ Failed to delete product: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      const response = await api.put(`/products/${productId}`, updatedData);
      if (response.data?.success || response.data?._id) {
        const updatedProducts = products.map(product => 
          product._id === productId ? { ...product, ...updatedData } : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
        calculateStats(updatedProducts);
        alert(`✅ Product updated successfully!`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert(`❌ Failed to update product: ${error.response?.data?.message || error.message}`);
    }
  };

  // Professional notification system
  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 24px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-out;
      ${type === 'success' ? 'background: linear-gradient(135deg, #10b981, #059669);' : 
        type === 'error' ? 'background: linear-gradient(135deg, #ef4444, #dc2626);' : 
        'background: linear-gradient(135deg, #3b82f6, #2563eb);'}
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

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
        
        <div className="admin-container">
          {/* Professional Navigation */}
          <div className="admin-nav">
            <div className="nav-group">
              {[
                { id: 'analytics', icon: '📊', label: 'Sales Analytics', color: '#3b82f6' },
                { id: 'products', icon: '📦', label: 'Products', color: '#10b981' },
                { id: 'orders', icon: '🛒', label: 'Orders', color: '#f59e0b' },
                { id: 'sales', icon: '💰', label: 'Sales Dashboard', color: '#ef4444' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                  style={{
                    background: activeTab === tab.id 
                      ? `linear-gradient(135deg, ${tab.color}, ${tab.color}dd)` 
                      : 'rgba(255, 255, 255, 0.1)',
                    borderColor: activeTab === tab.id ? tab.color : 'transparent',
                    color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                    boxShadow: activeTab === tab.id ? `0 8px 25px ${tab.color}40` : 'none',
                    transform: activeTab === tab.id ? 'translateY(-2px)' : 'none'
                  }}
                >
                  <span className="nav-icon" style={{ fontSize: '1.2rem' }}>{tab.icon}</span>
                  <span className="nav-label">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="admin-content">
            {loading ? (
              <div className="loading-container">
                <div className="professional-loader"></div>
                <span>Loading dashboard data...</span>
              </div>
            ) : (
              <>
                {activeTab === 'analytics' && (
                  <div>
                    <ProfessionalSalesAnalytics />
                  </div>
                )}
                
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
                        onClick={() => navigate('/add-product')}
                        style={{
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '12px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <span>➕</span>
                        Add Product
                      </button>
                    </div>

                    {/* Product Stats Cards */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      <div style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                        <h3 style={{ color: '#10b981', fontSize: '1.8rem', margin: '0' }}>{stats.totalProducts}</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>Total Products</p>
                      </div>
                      
                      <div style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
                        <h3 style={{ color: '#3b82f6', fontSize: '1.8rem', margin: '0' }}>₹{stats.totalValue.toLocaleString()}</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>Total Value</p>
                      </div>
                      
                      <div style={{
                        background: 'rgba(245, 158, 11, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
                        <h3 style={{ color: '#f59e0b', fontSize: '1.8rem', margin: '0' }}>{stats.lowStock}</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>Low Stock</p>
                      </div>
                      
                      <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚫</div>
                        <h3 style={{ color: '#ef4444', fontSize: '1.8rem', margin: '0' }}>{stats.outOfStock}</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>Out of Stock</p>
                      </div>
                    </div>

                    {/* Search and Filter */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      marginBottom: '2rem',
                      flexWrap: 'wrap'
                    }}>
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          flex: 1,
                          minWidth: '250px',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: 'var(--text-primary)',
                          fontSize: '14px',
                          backdropFilter: 'blur(10px)'
                        }}
                      />
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: 'var(--text-primary)',
                          fontSize: '14px',
                          backdropFilter: 'blur(10px)',
                          minWidth: '180px'
                        }}
                      >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    {/* Products List */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '2rem',
                      borderRadius: '20px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(20px)',
                      minHeight: '400px'
                    }}>
                      {products.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>
                          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                          <h3>No products found</h3>
                          <p>Try connecting to the database or add some products.</p>
                        </div>
                      ) : (
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                          gap: '1.5rem' 
                        }}>
                          {filteredProducts.map(product => (
                            <div key={product._id} style={{
                              background: 'rgba(255, 255, 255, 0.1)',
                              padding: '1.5rem',
                              borderRadius: '16px',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              backdropFilter: 'blur(10px)',
                              transition: 'all 0.3s ease',
                              position: 'relative',
                              overflow: 'hidden'
                            }}>
                              {/* Product Image Section */}
                              <div style={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '1rem'
                              }}>
                                <div style={{
                                  width: '80px',
                                  height: '80px',
                                  borderRadius: '12px',
                                  overflow: 'hidden',
                                  border: '2px solid rgba(255, 255, 255, 0.2)',
                                  background: 'rgba(255, 255, 255, 0.1)',
                                  flexShrink: 0,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  <img
                                    src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : '/images/default-product.svg'}
                                    alt={product.name}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                      borderRadius: '8px',
                                      transition: 'transform 0.3s ease'
                                    }}
                                    onError={(e) => {
                                      e.target.src = '/images/default-product.svg';
                                    }}
                                    onMouseOver={(e) => {
                                      e.target.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseOut={(e) => {
                                      e.target.style.transform = 'scale(1)';
                                    }}
                                  />
                                </div>
                                
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <h4 style={{ 
                                      color: 'var(--text-primary)', 
                                      margin: 0,
                                      fontSize: '1.1rem',
                                      fontWeight: '600',
                                      lineHeight: '1.3',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    }}>{product.name}</h4>
                                    <span style={{
                                      background: product.stock > 10 ? '#10b981' : product.stock > 0 ? '#f59e0b' : '#ef4444',
                                      color: 'white',
                                      padding: '4px 8px',
                                      borderRadius: '8px',
                                      fontSize: '10px',
                                      fontWeight: '600',
                                      whiteSpace: 'nowrap',
                                      marginLeft: '8px'
                                    }}>
                                      {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                    </span>
                                  </div>
                                  
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ 
                                      color: 'var(--text-primary)', 
                                      fontSize: '1.2rem', 
                                      fontWeight: '700', 
                                      margin: '0' 
                                    }}>
                                      ₹{product.price?.toLocaleString()}
                                    </p>
                                    <span style={{
                                      background: 'rgba(102, 126, 234, 0.2)',
                                      color: '#667eea',
                                      padding: '4px 8px',
                                      borderRadius: '8px',
                                      fontSize: '10px',
                                      fontWeight: '600'
                                    }}>
                                      {product.category}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <p style={{ 
                                color: 'var(--text-secondary)', 
                                fontSize: '14px',
                                margin: '0 0 1rem 0',
                                lineHeight: '1.4'
                              }}>{product.description?.slice(0, 100) || 'No description available'}...</p>
                              
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <div>
                                  <p style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: '700', margin: '0' }}>
                                    ₹{product.price.toLocaleString()}
                                  </p>
                                  <p style={{ color: 'var(--text-secondary)', fontSize: '12px', margin: '0' }}>
                                    Stock: {product.stock} units
                                  </p>
                                </div>
                                <span style={{
                                  background: 'rgba(102, 126, 234, 0.2)',
                                  color: '#667eea',
                                  padding: '4px 8px',
                                  borderRadius: '8px',
                                  fontSize: '12px'
                                }}>
                                  {product.category}
                                </span>
                              </div>
                              
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                  onClick={() => setEditingProduct(product)}
                                  style={{
                                    flex: 1,
                                    background: 'rgba(59, 130, 246, 0.2)',
                                    color: '#3b82f6',
                                    border: '1px solid rgba(59, 130, 246, 0.3)',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                  }}
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product._id, product.name)}
                                  style={{
                                    flex: 1,
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    color: '#ef4444',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                  }}
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={handleUpdateProduct}
        />
      )}

      {/* Admin Mode Indicator */}
      <AdminIndicator showStatus={true} />
    </div>
  );
};

// Enhanced Edit Product Modal Component
const EditProductModal = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    stock: product?.stock || '',
    description: product?.description || '',
    category: product?.category || '',
    brand: product?.brand || '',
    mrp: product?.mrp || '',
    unit: product?.unit || 'piece'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Electrical Goods',
    'Hardware & Tools', 
    'Wiring & Cables',
    'Switches & Sockets',
    'Lighting Solutions',
    'Fans & Ventilation',
    'Electrical Motors',
    'Safety Equipment'
  ];

  const units = ['piece', 'meter', 'kg', 'liter', 'set', 'box', 'roll', 'pack'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.stock || formData.stock < 0) newErrors.stock = 'Valid stock quantity is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const updateData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        mrp: formData.mrp ? parseFloat(formData.mrp) : formData.price * 1.2
      };
      
      await onUpdate(product._id, updateData);
      onClose();
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
          paddingBottom: '15px',
          borderBottom: '2px solid #f0f0f0'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            ✏️ Edit Product
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
              padding: '5px'
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '20px' }}>
            {/* Product Name */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333'
              }}>
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.name ? '#ff6b6b' : '#e9ecef'}`,
                  borderRadius: '10px',
                  fontSize: '14px',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="Enter product name"
              />
              {errors.name && <span style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', display: 'block' }}>{errors.name}</span>}
            </div>

            {/* Price and MRP */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `2px solid ${errors.price ? '#ff6b6b' : '#e9ecef'}`,
                    borderRadius: '10px',
                    fontSize: '14px'
                  }}
                  placeholder="0.00"
                />
                {errors.price && <span style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', display: 'block' }}>{errors.price}</span>}
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  MRP (₹)
                </label>
                <input
                  type="number"
                  name="mrp"
                  value={formData.mrp}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '14px'
                  }}
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Stock and Unit */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `2px solid ${errors.stock ? '#ff6b6b' : '#e9ecef'}`,
                    borderRadius: '10px',
                    fontSize: '14px'
                  }}
                  placeholder="0"
                />
                {errors.stock && <span style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', display: 'block' }}>{errors.stock}</span>}
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Unit
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category and Brand */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `2px solid ${errors.category ? '#ff6b6b' : '#e9ecef'}`,
                    borderRadius: '10px',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <span style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', display: 'block' }}>{errors.category}</span>}
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '14px'
                  }}
                  placeholder="Enter brand name"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333'
              }}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.description ? '#ff6b6b' : '#e9ecef'}`,
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
                placeholder="Enter product description"
              />
              {errors.description && <span style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px', display: 'block' }}>{errors.description}</span>}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '15px',
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #f0f0f0'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                border: '2px solid #e9ecef',
                borderRadius: '10px',
                backgroundColor: 'white',
                color: '#666',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 2,
                padding: '12px',
                border: 'none',
                borderRadius: '10px',
                background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #ffffff30',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Updating...
                </>
              ) : (
                <>
                  ✓ Update Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default NewAdminDashboard;
