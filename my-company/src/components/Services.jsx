function Services() {
    const card = {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 24,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
    };

    const heading = { margin: 0, marginBottom: 12, color: '#0f172a' };
    const list = { margin: 0, paddingLeft: 20, color: '#334155', lineHeight: 1.8 };

    return (
        <div style={{ padding: '20px 0' }}>
            <div style={card}>
                <h1 style={heading}>Our Services</h1>
                <ul style={list}>
                    <li>Technology Consulting</li>
                    <li>Market Analysis</li>
                    <li>Product Development</li>
                </ul>
            </div>
        </div>
    );
}

export default Services;