import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Services from './components/Services.jsx';
function App() {
  const appStyles = {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    color: '#0f172a',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  };

  const contentStyles = {
    flex: 1,
    maxWidth: 960,
    width: '100%',
    margin: '0 auto',
    padding: '24px 16px'
  };

  return (
    <div style={appStyles}>
      <BrowserRouter>
        <Navbar />
        <main style={contentStyles}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;