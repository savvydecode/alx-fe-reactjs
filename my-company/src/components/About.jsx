function About() {
    const card = {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 24,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
    };

    const heading = { margin: 0, marginBottom: 8, color: '#0f172a' };
    const text = { margin: 0, color: '#334155', lineHeight: 1.6 };

    return (
        <div style={{ padding: '20px 0' }}>
            <div style={card}>
                <h1 style={heading}>About Us</h1>
                <p style={text}>
                    Our company has been providing top-notch services since 1990. We specialize in various
                    fields including technology, marketing, and consultancy.
                </p>
            </div>
        </div>
    );
}

export default About;