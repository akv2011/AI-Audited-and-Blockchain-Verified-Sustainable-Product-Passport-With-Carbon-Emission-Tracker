import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './SustainabilityDashboard.css';

const SustainabilityDashboard = () => {
  const [widgets, setWidgets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const API_BASE_URL = 'http://localhost:3001';

  useEffect(() => {
    fetchDashboardData();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/dashboard/widgets`);
      const data = await response.json();
      
      if (data.success) {
        setWidgets(data.widgets);
        setLastUpdated(data.last_updated);
        setError(null);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (err) {
      setError('Error connecting to API: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'critical': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return '✅';
      case 'warning': return '⚠️';
      case 'critical': return '🚨';
      default: return '📊';
    }
  };

  if (loading && !widgets) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-main">
          <div className="loading">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>🌱 Walmart Sustainability Dashboard</h1>
          <div className="last-updated">
            Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Never'}
            <button onClick={fetchDashboardData} className="refresh-btn">
              🔄 Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {widgets && (
          <div className="widgets-grid">
            {/* Carbon Footprint Widget */}
            <div className="widget carbon-widget">
              <div className="widget-header">
                <h3>🌍 Carbon Footprint</h3>
                <span className="status-icon">
                  {getStatusIcon(widgets.carbon_footprint.status)}
                </span>
              </div>
              <div className="widget-content">
                <div className="metric-value">
                  {widgets.carbon_footprint.current} <span className="unit">kg CO₂e</span>
                </div>
                <div className="metric-target">
                  Target: {widgets.carbon_footprint.target} kg CO₂e
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{
                      width: `${Math.min(100, (widgets.carbon_footprint.current / widgets.carbon_footprint.target) * 100)}%`,
                      backgroundColor: getStatusColor(widgets.carbon_footprint.status)
                    }}
                  ></div>
                </div>
                <div className="trend">
                  📈 Trend: {widgets.carbon_footprint.trend}
                </div>
              </div>
            </div>

            {/* Renewable Energy Widget */}
            <div className="widget energy-widget">
              <div className="widget-header">
                <h3>🌞 Renewable Energy</h3>
                <span className="status-icon">
                  {getStatusIcon(widgets.renewable_energy.status)}
                </span>
              </div>
              <div className="widget-content">
                <div className="metric-value">
                  {widgets.renewable_energy.percentage}%
                </div>
                <div className="metric-target">
                  Target: {widgets.renewable_energy.target}%
                </div>
                <div className="circular-progress">
                  <div 
                    className="circle-fill"
                    style={{
                      background: `conic-gradient(${getStatusColor(widgets.renewable_energy.status)} ${widgets.renewable_energy.percentage * 3.6}deg, #e0e0e0 0deg)`
                    }}
                  >
                    <div className="circle-inner">
                      {widgets.renewable_energy.percentage}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Energy Efficiency Widget */}
            <div className="widget efficiency-widget">
              <div className="widget-header">
                <h3>⚡ Energy Efficiency</h3>
                <span className="status-icon">
                  {getStatusIcon(widgets.energy_efficiency.status)}
                </span>
              </div>
              <div className="widget-content">
                <div className="metric-value">
                  {widgets.energy_efficiency.current} <span className="unit">kWh</span>
                </div>
                <div className="metric-target">
                  Target: ≤ {widgets.energy_efficiency.target} kWh
                </div>
                <div className="gauge">
                  <div 
                    className="gauge-fill"
                    style={{
                      width: `${Math.min(100, (widgets.energy_efficiency.current / (widgets.energy_efficiency.target * 1.5)) * 100)}%`,
                      backgroundColor: getStatusColor(widgets.energy_efficiency.status)
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Sustainability Score Widget */}
            <div className="widget score-widget">
              <div className="widget-header">
                <h3>🏆 Sustainability Score</h3>
                <span className="grade-badge">
                  {widgets.sustainability_score.grade}
                </span>
              </div>
              <div className="widget-content">
                <div className="score-display">
                  <div className="score-circle">
                    <div className="score-value">
                      {widgets.sustainability_score.overall}
                    </div>
                    <div className="score-max">/100</div>
                  </div>
                </div>
                <div className="score-breakdown">
                  <div className="score-item">
                    <span>Overall Performance</span>
                    <span className="score-grade">{widgets.sustainability_score.grade}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights Widget */}
            <div className="widget insights-widget">
              <div className="widget-header">
                <h3>🤖 AI Insights</h3>
              </div>
              <div className="widget-content">
                <div className="insights-list">
                  <div className="insight-item">
                    <span className="insight-icon">💡</span>
                    <span>Carbon emissions trending downward this month</span>
                  </div>
                  <div className="insight-item">
                    <span className="insight-icon">🎯</span>
                    <span>Energy efficiency improved by 5% vs last quarter</span>
                  </div>
                  <div className="insight-item">
                    <span className="insight-icon">🌱</span>
                    <span>Renewable energy adoption ahead of schedule</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Widget */}
            <div className="widget actions-widget">
              <div className="widget-header">
                <h3>⚡ Quick Actions</h3>
              </div>
              <div className="widget-content">
                <div className="action-buttons">
                  <button className="action-btn primary">
                    📊 View Full Analytics
                  </button>
                  <button className="action-btn secondary">
                    📈 Generate Report
                  </button>
                  <button className="action-btn secondary">
                    🔔 Configure Alerts
                  </button>
                  <button className="action-btn secondary">
                    📱 Mobile Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI-Powered Recommendations Section */}
        <div className="recommendations-section">
          <h2>🤖 AI-Powered Recommendations</h2>
          <div className="recommendations-grid">
            <div className="recommendation-card high-priority">
              <div className="rec-header">
                <span className="priority-badge high">High Priority</span>
                <span className="rec-icon">🎯</span>
              </div>
              <h4>Optimize Transportation Routes</h4>
              <p>AI analysis suggests 15% carbon reduction possible by optimizing shipping routes and consolidating deliveries.</p>
              <div className="rec-impact">
                <span className="impact-value">-12.5 kg CO₂e</span>
                <span className="impact-label">potential monthly reduction</span>
              </div>
            </div>

            <div className="recommendation-card medium-priority">
              <div className="rec-header">
                <span className="priority-badge medium">Medium Priority</span>
                <span className="rec-icon">⚡</span>
              </div>
              <h4>Increase Renewable Energy</h4>
              <p>Current renewable energy usage at {(widgets && widgets.renewable_energy && widgets.renewable_energy.percentage) || 0}%. Target increase to 50% by Q2.</p>
              <div className="rec-impact">
                <span className="impact-value">+{50 - ((widgets && widgets.renewable_energy && widgets.renewable_energy.percentage) || 0)}%</span>
                <span className="impact-label">renewable energy target</span>
              </div>
            </div>

            <div className="recommendation-card low-priority">
              <div className="rec-header">
                <span className="priority-badge low">Low Priority</span>
                <span className="rec-icon">♻️</span>
              </div>
              <h4>Material Efficiency Improvement</h4>
              <p>Implement circular economy principles to reduce material waste and improve recycling rates.</p>
              <div className="rec-impact">
                <span className="impact-value">8-12%</span>
                <span className="impact-label">waste reduction potential</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityDashboard;
