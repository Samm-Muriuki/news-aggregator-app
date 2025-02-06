import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-QKERHC2HX8";

export const initGA = () => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageView = (path: string) => {
    ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
    ReactGA.event({ category, action, label, value });
};

export const trackScrollDepth = () => {
    window.addEventListener("scroll", () => {
        const scrolled = Math.floor((window.scrollY / document.documentElement.scrollHeight) * 100);
        if (scrolled % 10 === 0) {
            ReactGA.event({ category: "Scroll", action: `Scrolled ${scrolled}%` });
        }
    });
};
