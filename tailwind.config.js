// * If you want to add something, then use your first name with it
// * eg. s-red-10 / m-red-15

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                roboto: "Roboto",
            },
            colors: {
                primary: "#FF1F1F",
                secondary: "#1F1F1F",
            },
            boxShadow: {
                primary: "0 3px 13px 2px rgba(255, 0, 0, 0.8)",
            },
            screens: {
                s_base: "350px",
                s_mobile: "450px",
                s_tablet: "850px",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
