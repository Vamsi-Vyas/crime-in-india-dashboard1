import React, { useState } from 'react';
import axios from 'axios';
import { 
  LayoutDashboard, 
  PlusCircle, 
  BarChart3, 
  MapPin, 
  Info,
  ChevronRight,
  TrendingDown,
  Activity,
  AlertTriangle,
  Globe
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api/report';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    reportNumber: '',
    dateReported: '',
    dateOfOccurrence: '',
    timeOfOccurrence: '',
    city: '',
    crimeCode: '',
    crimeDomain: 'Arson',
    crimeDescription: '',
    victimAge: '',
    victimGender: 'M',
    weaponUsed: 'None',
    caseClosed: 'No',
    dateCaseClosed: '',
    policeDeployed: 1
  });
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const categories = [
    'Arson', 'Assault', 'Burglary', 'Counterfeiting', 'Cybercrime', 
    'Domestic Violence', 'Drug Offense', 'Extortion', 'Firearm Offense', 
    'Fraud', 'Homicide', 'Identity Theft', 'Illegal Possession', 
    'Kidnapping', 'Public Intoxication', 'Robbery', 'Sexual Assault', 
    'Shoplifting', 'Traffic Violation', 'Vandalism', 'Vehicle - Stolen'
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: 'Reporting incident...', type: 'info' });
    
    try {
      const response = await axios.post(API_URL, formData);
      setStatus({ 
        loading: false, 
        message: 'Successfully updated Excel database!', 
        type: 'success' 
      });
      // Reset form
      setFormData({
        reportNumber: '',
        dateReported: '',
        dateOfOccurrence: '',
        timeOfOccurrence: '',
        city: '',
        crimeCode: '',
        crimeDomain: 'Arson',
        crimeDescription: '',
        victimAge: '',
        victimGender: 'M',
        weaponUsed: 'None',
        caseClosed: 'No',
        dateCaseClosed: '',
        policeDeployed: 1
      });
      
      // Auto-clear success message
      setTimeout(() => setStatus({ loading: false, message: '', type: '' }), 5000);
      
    } catch (err) {
      console.error(err);
      setStatus({ 
        loading: false, 
        message: 'Failed to update database. Is the backend running?', 
        type: 'error' 
      });
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo d-flex items-center gap-2">
          <Globe size={24} style={{ color: 'var(--accent-color)' }} />
          SHIELD AI
        </div>
        
        <nav className="nav-links">
          <div 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={20} />
            Overview
          </div>
          <div 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={20} />
            Analytics
          </div>
          <div 
            className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <MapPin size={20} />
            Crime Map
          </div>
          <div 
            className={`nav-item ${activeTab === 'report' ? 'active' : ''}`}
            onClick={() => setActiveTab('report')}
          >
            <PlusCircle size={20} />
            Report News
          </div>
        </nav>

        <div style={{ marginTop: 'auto' }} className="nav-item">
          <Info size={20} />
          About Shield
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header">
          <div>
            <h1>Crime Analytics Dashboard</h1>
            <p style={{ color: 'var(--text-dim)', marginTop: '5px' }}>
              Real-time monitoring and reporting system for India
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <div 
              style={{ 
                background: 'rgba(30, 215, 96, 0.1)', 
                color: 'var(--accent-color)', 
                padding: '8px 15px', 
                borderRadius: '8px',
                fontSize: '0.85rem'
              }}
            >
              System Online
            </div>
          </div>
        </header>

        {/* Overview Description */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="glass-card" style={{ marginBottom: '20px', lineHeight: '1.8' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '15px', color: 'var(--accent-color)' }}>National Crime Intelligence Platform</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)' }}>
                India is a vast and diverse nation, and managing its security requires comprehensive, real-time data analysis. 
                This platform serves as a centralized hub to monitor, report, and analyze incident data across different states and territories.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div className="glass-card" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <h3 style={{ color: 'var(--accent-secondary)', fontSize: '1.3rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <TrendingDown size={20} /> National Statistics
                </h3>
                <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
                  <li style={{ marginBottom: '12px' }}>• <strong style={{ color: '#fff', fontSize: '1.1rem' }}>24.5%</strong> Increase in Cyber Crime incidents year-over-year.</li>
                  <li style={{ marginBottom: '12px' }}>• <strong style={{ color: '#fff', fontSize: '1.1rem' }}>42.8K</strong> Total projected incidents across metropolitan areas.</li>
                  <li style={{ marginBottom: '12px' }}>• <strong style={{ color: '#fff', fontSize: '1.1rem' }}>78.5%</strong> Average resolution rate for theft and vandalism.</li>
                  <li style={{ marginBottom: '12px' }}>• <strong style={{ color: '#fff', fontSize: '1.1rem' }}>₹1.2 Billion</strong> Estimated financial impact from digital fraud.</li>
                  <li style={{ marginBottom: '12px' }}>• <strong style={{ color: '#fff', fontSize: '1.1rem' }}>+12%</strong> Rise in reported vehicle thefts in Northern regions.</li>
                </ul>
              </div>

              <div className="glass-card" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <h3 style={{ color: 'var(--accent-color)', fontSize: '1.3rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={20} /> Regional Focus
                </h3>
                <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
                  <li style={{ marginBottom: '12px' }}>• <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Maharashtra & Delhi</strong> account for ~35% of all reported cyber incidents.</li>
                  <li style={{ marginBottom: '12px' }}>• <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Southern States</strong> show highest conviction rates at nearly 68%.</li>
                  <li style={{ marginBottom: '12px' }}>• <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Tier-2 Cities</strong> seeing a 15% spike in financial scams.</li>
                  <li style={{ marginBottom: '12px' }}>• <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Coastal Areas</strong> reporting a 5% drop in smuggling activities.</li>
                  <li style={{ marginBottom: '12px' }}>• <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Eastern Border</strong> tightening security reduced trafficking by 8%.</li>
                </ul>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div className="glass-card" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <h3 style={{ color: 'var(--accent-secondary)', fontSize: '1.3rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Activity size={20} /> System Architecture
                </h3>
                <p style={{ lineHeight: '1.7', color: 'var(--text-dim)' }}>
                  This dashboard is powered by a robust <strong>Node.js backend</strong> securely connected to Google Cloud Services. Data is ingested through the <em>Report News</em> module and instantly synchronized with Google Sheets.
                </p>
                <p style={{ lineHeight: '1.7', color: 'var(--text-dim)', marginTop: '10px' }}>
                  The visualization engine relies on embedded <strong>Tableau Public</strong> dashboards that read from the live sheets, ensuring a zero-latency update cycle for analysts and officers on the ground.
                </p>
              </div>

              <div className="glass-card" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <h3 style={{ color: 'var(--accent-color)', fontSize: '1.3rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertTriangle size={20} /> Strategic Objectives
                </h3>
                <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
                  <li style={{ marginBottom: '10px' }}><strong>1. Predictive Policing:</strong> Utilize historical heatmaps to deploy units proactively.</li>
                  <li style={{ marginBottom: '10px' }}><strong>2. Transparency:</strong> Provide accurate, tampered-proof records of regional incidents.</li>
                  <li style={{ marginBottom: '10px' }}><strong>3. Resource Allocation:</strong> Identify under-served jurisdictions via dynamic charting.</li>
                </ul>
              </div>
            </div>

            <div className="glass-card" style={{ lineHeight: '1.8' }}>
              <p style={{ fontSize: '1.1rem' }}>
                Use the <strong>Analytics</strong> tab for deep-dive demographic charts, the <strong>Crime Map</strong> to explore geographical distributions, or securely submit data through the <strong>Report News</strong> module. All data is synchronized instantly, ensuring decision-makers always have access to the latest on-ground realities.
              </p>
            </div>
          </div>
        )}

        {/* Tableau Embed Section - Analytics */}
        {activeTab === 'analytics' && (
          <section className="tableau-section animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.4rem' }}>Advanced Analytics Visualization</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Powered by Tableau Public</div>
            </div>
            
            <div className="tableau-container">
                <iframe 
                  src="https://public.tableau.com/views/crimealaysisdashboardfinal/CRIMEANALYSISDASHBOARD?:showVizHome=no&:embed=true&:tabs=yes&:refresh=yes" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 'none', background: '#fff' }}
                  title="Tableau Crime Analytics"
                />
            </div>
          </section>
        )}

        {/* Tableau Embed Section - Map */}
        {activeTab === 'map' && (
          <section className="tableau-section animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.4rem' }}>Crime Map Dashboard</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Powered by Tableau Public</div>
            </div>
            
            <div className="tableau-container">
                <iframe 
                  src="https://public.tableau.com/views/mapcrime/CrimedistributionmapIndia?:showVizHome=no&:embed=true&:tabs=yes&:refresh=yes" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 'none', background: '#fff' }}
                  title="Tableau Crime Map"
                />
            </div>
          </section>
        )}

        {/* Reporting Section (Real-time update feature) */}
        {activeTab === 'report' && (
          <section id="report" className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PlusCircle size={24} style={{ color: 'var(--accent-color)' }} />
              <h2 style={{ fontSize: '1.4rem' }}>Update Dashboard News</h2>
            </div>

            <div className="glass-card">
              <div style={{ display: 'flex', gap: '40px' }}>
                <div style={{ flex: 1 }}>
                  <form className="report-form" onSubmit={handleFormSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label>Report Number</label>
                        <input 
                          type="text" 
                          name="reportNumber" 
                          placeholder="e.g. 123456" 
                          value={formData.reportNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Date Reported</label>
                        <input 
                          type="date" 
                          name="dateReported" 
                          value={formData.dateReported}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label>Date of Occurrence</label>
                        <input 
                          type="date" 
                          name="dateOfOccurrence" 
                          value={formData.dateOfOccurrence}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Time of Occurrence</label>
                        <input 
                          type="time" 
                          name="timeOfOccurrence" 
                          value={formData.timeOfOccurrence}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label>City</label>
                        <input 
                          type="text" 
                          name="city" 
                          placeholder="e.g. Mumbai" 
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Crime Code</label>
                        <input 
                          type="number" 
                          name="crimeCode" 
                          placeholder="e.g. 576" 
                          value={formData.crimeCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Crime Domain</label>
                        <select 
                          name="crimeDomain" 
                          value={formData.crimeDomain}
                          onChange={handleInputChange}
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label>Date of Occurrence</label>
                        <input 
                          type="date" 
                          name="dateOfOccurrence" 
                          value={formData.dateOfOccurrence}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Time of Occurrence</label>
                        <input 
                          type="time" 
                          name="timeOfOccurrence" 
                          value={formData.timeOfOccurrence}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label>Victim Age</label>
                        <input 
                          type="number" 
                          name="victimAge" 
                          min="0"
                          placeholder="e.g. 35"
                          value={formData.victimAge}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Victim Gender</label>
                        <select name="victimGender" value={formData.victimGender} onChange={handleInputChange}>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="X">Other/Unknown</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Weapon Used</label>
                        <input 
                          type="text" 
                          name="weaponUsed" 
                          placeholder="e.g. Knife, None"
                          value={formData.weaponUsed}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label>Police Deployed</label>
                        <input 
                          type="number" 
                          name="policeDeployed" 
                          min="0"
                          value={formData.policeDeployed}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Case Closed</label>
                        <select name="caseClosed" value={formData.caseClosed} onChange={handleInputChange}>
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Date Case Closed</label>
                        <input 
                          type="date" 
                          name="dateCaseClosed" 
                          value={formData.dateCaseClosed}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Crime Description</label>
                      <textarea 
                        name="crimeDescription" 
                        rows="3" 
                        placeholder="Provide details about the incident..."
                        value={formData.crimeDescription}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className={`btn-primary ${status.loading ? 'btn-disabled' : ''}`}
                      disabled={status.loading}
                    >
                      {status.loading ? 'Processing...' : 'Upload News to Dashboard'}
                    </button>

                    {status.message && (
                      <div style={{ 
                        marginTop: '15px', 
                        padding: '12px', 
                        borderRadius: '8px',
                        background: status.type === 'success' ? 'rgba(30,215,96,0.1)' : 'rgba(255,77,77,0.1)',
                        color: status.type === 'success' ? 'var(--accent-color)' : 'var(--accent-secondary)',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <AlertTriangle size={18} />
                        {status.message}
                      </div>
                    )}
                  </form>
                </div>

                <div style={{ width: '300px', padding: '20px', borderLeft: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h4 style={{ color: 'var(--text-dim)' }}>Reporting Guidelines</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', marginTop: '5px' }}></div>
                      Entries are directly written to crime_dataset_india.csv.
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-secondary)', marginTop: '5px' }}></div>
                      Tableau dashboards with live connections will update on next refresh.
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', marginTop: '5px' }}></div>
                      Ensure accurate location data for geographic heatmapping.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
