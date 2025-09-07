function Home() {
    const card = {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 24,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
    };

    const heading = { margin: 0, marginBottom: 8, color: '#0f172a' };
    const lead = { margin: 0, color: '#334155' };

    return (
        <div style={{ padding: '20px 0' }}>
            <div style={card}>
                <h1 style={heading}>Welcome to Our Company</h1>
                <p style={lead}>We are dedicated to delivering excellence in all our services.</p>
            </div>
        </div>
    );
}

export default Home;