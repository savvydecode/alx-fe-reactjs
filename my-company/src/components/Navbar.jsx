import { NavLink } from 'react-router-dom';

function Navbar() {
    const navStyle = {
        backgroundColor: '#0f172a',
        color: '#ffffff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    };

    const innerStyle = {
        maxWidth: 960,
        margin: '0 auto',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    };

    const brandStyle = {
        fontWeight: 800,
        letterSpacing: '0.5px',
        fontSize: '18px',
        color: '#ffffff',
        textDecoration: 'none'
    };

    const linksStyle = {
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
    };

    const linkBase = {
        color: '#cbd5e1',
        textDecoration: 'none',
        padding: '8px 12px',
        borderRadius: 8,
        fontWeight: 600,
        transition: 'background 0.2s, color 0.2s'
    };

    const getLinkStyle = ({ isActive }) => ({
        ...linkBase,
        color: isActive ? '#ffffff' : linkBase.color,
        backgroundColor: isActive ? '#1e293b' : 'transparent'
    });

    return (
        <nav style={navStyle}>
            <div style={innerStyle}>
                <NavLink to="/" style={brandStyle}>
                    MyCompany
                </NavLink>
                <div style={linksStyle}>
                    <NavLink to="/" style={getLinkStyle} end>Home</NavLink>
                    <NavLink to="/about" style={getLinkStyle}>About</NavLink>
                    <NavLink to="/services" style={getLinkStyle}>Services</NavLink>
                    <NavLink to="/contact" style={getLinkStyle}>Contact</NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;