import { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Form submitted!
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}`);
    };

    const card = {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 24,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
    };

    const heading = { margin: 0, marginBottom: 12, color: '#0f172a' };

    const formStyle = {
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        gap: 12
    };

    const labelStyle = { fontWeight: 600, color: '#334155' };
    const inputStyle = {
        padding: '10px 12px',
        borderRadius: 8,
        border: '1px solid #cbd5e1',
        fontSize: 14
    };
    const textareaStyle = {
        ...inputStyle,
        minHeight: 120,
        resize: 'vertical'
    };
    const buttonStyle = {
        alignSelf: 'flex-start',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        border: 'none',
        padding: '10px 16px',
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 700
    };

    return (
        <div style={{ padding: '20px 0' }}>
            <div style={card}>
                <h1 style={heading}>Contact Us</h1>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <div>
                        <label htmlFor="name" style={labelStyle}>Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" style={labelStyle}>Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" style={labelStyle}>Message</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            style={textareaStyle}
                            required
                        />
                    </div>

                    <button type="submit" style={buttonStyle}>Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;