// tailwind.config.js

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    darkMode: 'media', // or 'clas'
    theme: {
        extend: {
            colors: {
                primary: "#3498db",
                secondary: "#f1c40f",
            },
        },
    },
    plugins: [],
};
