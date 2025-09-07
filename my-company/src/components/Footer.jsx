function Footer() {
    const footerStyle = {
        borderTop: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
        color: '#475569'
    };

    const innerStyle = {
        maxWidth: 960,
        margin: '0 auto',
        padding: '16px',
        fontSize: '14px',
        textAlign: 'center'
    };

    return (
        <footer style={footerStyle}>
            <div style={innerStyle}>
                © {new Date().getFullYear()} MyCompany — Delivering Excellence
            </div>
        </footer>
    );
}

export default Footer;