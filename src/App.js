import React, { useState, useEffect } from 'react';
// import ReactGA from 'react-ga4';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Testimonials from './Components/Testimonials';
import Portfolio from './Components/Portfolio';

function App() {
  const [resumeData, setResumeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ReactGA.initialize('UA-110570651-1');
    // ReactGA.send({ hitType: "pageview", page: window.location.pathname });

    // Fetch resume data from public folder
    fetch(`${process.env.PUBLIC_URL}/resumeData.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load resume data: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setResumeData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading resume data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="App" style={{ textAlign: 'center', padding: '50px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App" style={{ textAlign: 'center', padding: '50px' }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Header data={resumeData.main} />
      <About data={resumeData.main} />
      <Resume data={resumeData.resume} />
      <Portfolio data={resumeData.portfolio} />
      <Testimonials data={resumeData.testimonials} />
      <Contact data={resumeData.main} />
      <Footer data={resumeData.main} />
    </div>
  );
}

export default App;
