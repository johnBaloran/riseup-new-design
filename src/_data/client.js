module.exports = {
    name: "Rise Up League",
    email: "support@riseupleague.com",
    socials: {
        facebook: "https://www.facebook.com/riseupleague",
        instagram: "https://www.instagram.com/riseupleague",
    },
    //! Make sure you include the file protocol (e.g. https://) and that NO TRAILING SLASH is included
    domain: "https://www.riseupleague.com",
    // Passing the isProduction variable for use in HTML templates
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
