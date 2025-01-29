import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        if (typeof window.gtag === 'function') {
            window.gtag('config', 'G-J0DF1CGLDG', { page_path: location.pathname });
        } else {
            console.error('Google Analytics script is not loaded.');
        }
    }, [location]);

};

export default usePageTracking;