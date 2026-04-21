tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#00d4ff",
                "accent-violet": "#7c3aed",
                "background-light": "#f5f8f8",
                "background-dark": "#03030d",
                "glass": "rgba(255, 255, 255, 0.03)",
                "glass-border": "rgba(255, 255, 255, 0.1)",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"],
                "sans": ["Inter", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px" },
            boxShadow: {
                "glow-primary": "0 0 20px rgba(0, 212, 255, 0.4)",
                "glow-accent": "0 0 20px rgba(124, 58, 237, 0.4)",
            }
        },
    },
};

