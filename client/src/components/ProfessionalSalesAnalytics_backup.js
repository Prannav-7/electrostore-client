import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import api from '../api';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  Filler
);

const ProfessionalSalesAnalytics = () => {
  const [salesData, setSalesData] = useState({
    revenue: [],
    orders: [],
    topProducts: [],
    categoryBreakdown: [],
    loading: true
  });

  const [timeFrame, setTimeFrame] = useState('7days'); // 7days, 30days, 6months

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeFrame]);

  const fetchAnalyticsData = async () => {
    try {
      console.log('🔄 Starting analytics data fetch...');
      setSalesData(prev => ({ ...prev, loading: true }));
      
      // Fetch real data from multiple API endpoints
      console.log('📡 Making API calls...');
      const [
        salesAnalyticsResponse,
        monthlyComparisonResponse,
        topProductsResponse,
        categoryBreakdownResponse,
        allOrdersResponse
      ] = await Promise.all([
        api.get('/orders/admin/sales-analytics'),
        api.get('/orders/admin/monthly-comparison'),
        api.get('/orders/admin/top-products'),
        api.get('/orders/admin/category-breakdown'),
        api.get('/orders/admin/all-orders')
      ]);
      
      console.log('✅ API responses received:', {
        salesAnalytics: salesAnalyticsResponse.data,
        monthlyComparison: monthlyComparisonResponse.data,
        topProducts: topProductsResponse.data,
        categoryBreakdown: categoryBreakdownResponse.data,
        allOrders: allOrdersResponse.data
      });

      const salesAnalytics = salesAnalyticsResponse.data.data || {};
      const monthlyComparison = monthlyComparisonResponse.data.data || [];
      const topProducts = topProductsResponse.data.data || [];
      const categoryBreakdown = categoryBreakdownResponse.data.data || [];
      const allOrders = allOrdersResponse.data.data || [];

      // Process the data for charts
      const processedData = processRealData(
        salesAnalytics,
        monthlyComparison,
        topProducts,
        categoryBreakdown,
        allOrders,
        timeFrame
      );

      setSalesData(processedData);
      
    } catch (error) {
      console.error('❌ Error fetching analytics:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      // Fallback to sample data if API fails
      const fallbackData = generateSampleData(timeFrame);
      setSalesData({ ...fallbackData, dataSource: 'fallback' });
    } finally {
      setSalesData(prev => ({ ...prev, loading: false }));
    }
  };

  const processRealData = (salesAnalytics, monthlyComparison, topProducts, categoryBreakdown, allOrders, period) => {
    try {
      // Process orders data by time period
      const days = period === '7days' ? 7 : period === '30days' ? 30 : 180;
      const labels = [];
      const revenue = [];
      const orders = [];

      // Create date range for the selected period
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }));

        // Filter orders for this specific date
        const dateStr = date.toISOString().split('T')[0];
        const dayOrders = allOrders.filter(order => {
          const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
          return orderDate === dateStr;
        });

        // Calculate daily totals
        const dailyRevenue = dayOrders.reduce((sum, order) => sum + (order.orderSummary?.total || 0), 0);
        const dailyOrderCount = dayOrders.length;

        revenue.push(dailyRevenue);
        orders.push(dailyOrderCount);
      }

      // Process top products (convert sales data)
      const processedTopProducts = topProducts.slice(0, 5).map(product => ({
        name: product.name || product.productName || 'Unknown Product',
        sales: product.totalSales || product.revenue || 0,
        units: product.totalQuantity || product.quantity || 0
      }));

      // Process category breakdown with colors
      const colors = ['#667eea', '#f093fb', '#4facfe', '#11998e', '#ff9a9e', '#ffd93d', '#6bcf7f'];
      const processedCategoryBreakdown = categoryBreakdown.slice(0, 7).map((category, index) => ({
        category: category.category || category._id || 'Unknown',
        value: category.percentage || Math.round((category.totalSales / salesAnalytics.totalRevenue) * 100) || 0,
        color: colors[index] || '#667eea'
      }));

      return {
        labels,
        revenue,
        orders,
        topProducts: processedTopProducts,
        categoryBreakdown: processedCategoryBreakdown,
        loading: false,
        dataSource: 'real',
        totalRevenue: salesAnalytics.totalRevenue || revenue.reduce((a, b) => a + b, 0),
        totalOrders: salesAnalytics.totalOrders || orders.reduce((a, b) => a + b, 0),
        averageOrderValue: salesAnalytics.averageOrderValue || 
          (orders.reduce((a, b) => a + b, 0) > 0 ? 
            Math.round(revenue.reduce((a, b) => a + b, 0) / orders.reduce((a, b) => a + b, 0)) : 0)
      };
    } catch (error) {
      console.error('Error processing real data:', error);
      return generateSampleData(period);
    }
  };

  const generateSampleData = (period) => {
    const days = period === '7days' ? 7 : period === '30days' ? 30 : 180;
    const labels = [];
    const revenue = [];
    const orders = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }));
      
      // Generate realistic sample data
      revenue.push(Math.floor(Math.random() * 50000) + 10000);
      orders.push(Math.floor(Math.random() * 25) + 5);
    }

    return {
      labels,
      revenue,
      orders,
      topProducts: [
        { name: 'LED Bulbs', sales: 25000, units: 150 },
        { name: 'Ceiling Fans', sales: 18000, units: 60 },
        { name: 'MCB Switches', sales: 12000, units: 80 },
        { name: 'Electrical Wire', sales: 8000, units: 200 },
        { name: 'Power Sockets', sales: 6000, units: 90 }
      ],
      categoryBreakdown: [
        { category: 'Lighting', value: 35, color: '#667eea' },
        { category: 'Fans & Motors', value: 25, color: '#f093fb' },
        { category: 'Switches & Sockets', value: 20, color: '#4facfe' },
        { category: 'Wiring & Cables', value: 15, color: '#11998e' },
        { category: 'Others', value: 5, color: '#ff9a9e' }
      ],
      loading: false,
      dataSource: 'sample'
    };
  };

  // Modern chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          font: { size: 12, weight: '500' },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: { 
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false 
        },
        ticks: { 
          color: '#ffffff',
          font: { size: 11 }
        }
      },
      y: {
        grid: { 
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false 
        },
        ticks: { 
          color: '#ffffff',
          font: { size: 11 }
        }
      }
    }
  };

  // Revenue Chart Data
  const revenueChartData = {
    labels: salesData.labels || [],
    datasets: [
      {
        label: 'Revenue',
        data: salesData.revenue || [],
        fill: true,
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderColor: '#667eea',
        borderWidth: 3,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4
      }
    ]
  };

  // Orders Chart Data
  const ordersChartData = {
    labels: salesData.labels || [],
    datasets: [
      {
        label: 'Orders',
        data: salesData.orders || [],
        backgroundColor: [
          '#667eea', '#f093fb', '#4facfe', '#11998e', '#ff9a9e',
          '#667eea', '#f093fb', '#4facfe', '#11998e', '#ff9a9e'
        ],
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      }
    ]
  };

  // Category Breakdown Chart Data
  const categoryChartData = {
    labels: salesData.categoryBreakdown?.map(item => item.category) || [],
    datasets: [
      {
        data: salesData.categoryBreakdown?.map(item => item.value) || [],
        backgroundColor: salesData.categoryBreakdown?.map(item => item.color) || [],
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        hoverBorderWidth: 4,
        hoverBorderColor: '#ffffff'
      }
    ]
  };

  if (salesData.loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        color: '#ffffff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p>Loading Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      background: 'transparent',
      color: '#ffffff',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ 
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '2.5rem',
            fontWeight: '700',
            margin: '0 0 0.5rem 0',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            📊 Sales Analytics
          </h1>
          <p style={{ 
            color: 'rgba(255,255,255,0.7)',
            margin: 0,
            fontSize: '1.1rem'
          }}>
            Real-time business intelligence and performance metrics
          </p>
        </div>

        {/* Time Frame Selector */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { key: '7days', label: '7 Days' },
            { key: '30days', label: '30 Days' },
            { key: '6months', label: '6 Months' }
          ].map(option => (
            <button
              key={option.key}
              onClick={() => setTimeFrame(option.key)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: timeFrame === option.key 
                  ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                  : 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { 
            title: 'Total Revenue', 
            value: `₹${(salesData.totalRevenue || salesData.revenue?.reduce((a, b) => a + b, 0) || 0).toLocaleString()}`,
            icon: '💰',
            color: '#667eea'
          },
          { 
            title: 'Total Orders', 
            value: salesData.totalOrders || salesData.orders?.reduce((a, b) => a + b, 0) || 0,
            icon: '🛍️',
            color: '#f093fb'
          },
          { 
            title: 'Avg Order Value', 
            value: `₹${(salesData.averageOrderValue || Math.round((salesData.revenue?.reduce((a, b) => a + b, 0) || 0) / (salesData.orders?.reduce((a, b) => a + b, 0) || 1))).toLocaleString()}`,
            icon: '📈',
            color: '#4facfe'
          },
          { 
            title: 'Data Source', 
            value: salesData.dataSource === 'real' ? '✅ Live Data' : salesData.dataSource === 'fallback' ? '⚠️ Fallback' : '📊 Sample',
            icon: '🔄',
            color: salesData.dataSource === 'real' ? '#11998e' : '#ff9a9e'
          }
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <h3 style={{ 
              fontSize: '2rem',
              fontWeight: '700',
              margin: '0 0 0.5rem 0',
              color: stat.color
            }}>
              {stat.value}
            </h3>
            <p style={{ 
              color: 'rgba(255,255,255,0.7)',
              margin: 0,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Revenue Trend Chart */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '16px',
          padding: '2rem',
          height: '400px'
        }}>
          <h3 style={{ 
            marginBottom: '1.5rem',
            color: '#ffffff',
            fontSize: '1.4rem',
            fontWeight: '600'
          }}>
            💰 Revenue Trend
          </h3>
          <div style={{ height: '300px' }}>
            <Line data={revenueChartData} options={chartOptions} />
          </div>
        </div>

        {/* Orders Chart */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '16px',
          padding: '2rem',
          height: '400px'
        }}>
          <h3 style={{ 
            marginBottom: '1.5rem',
            color: '#ffffff',
            fontSize: '1.4rem',
            fontWeight: '600'
          }}>
            📦 Daily Orders
          </h3>
          <div style={{ height: '300px' }}>
            <Bar data={ordersChartData} options={chartOptions} />
          </div>
        </div>

        {/* Category Breakdown */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '16px',
          padding: '2rem',
          height: '400px'
        }}>
          <h3 style={{ 
            marginBottom: '1.5rem',
            color: '#ffffff',
            fontSize: '1.4rem',
            fontWeight: '600'
          }}>
            🎯 Category Performance
          </h3>
          <div style={{ height: '300px' }}>
            <Doughnut 
              data={categoryChartData} 
              options={{
                ...chartOptions,
                cutout: '60%',
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    ...chartOptions.plugins.legend,
                    position: 'bottom'
                  }
                }
              }} 
            />
          </div>
        </div>

        {/* Top Products */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '16px',
          padding: '2rem',
          height: '400px'
        }}>
          <h3 style={{ 
            marginBottom: '1.5rem',
            color: '#ffffff',
            fontSize: '1.4rem',
            fontWeight: '600'
          }}>
            🏆 Top Products
          </h3>
          <div>
            {salesData.topProducts?.map((product, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div>
                  <div style={{ 
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '0.25rem'
                  }}>
                    {product.name}
                  </div>
                  <div style={{ 
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.6)'
                  }}>
                    {product.units} units sold
                  </div>
                </div>
                <div style={{ 
                  fontWeight: '700',
                  color: '#667eea',
                  fontSize: '1.1rem'
                }}>
                  ₹{product.sales.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProfessionalSalesAnalytics;