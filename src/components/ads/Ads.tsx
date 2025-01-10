import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Card, Affix } from "antd";
import { useLocation } from "react-router-dom";

// Popup Ad Component
const PopupAd = ({ visible, onClose }: any) => (
    <Modal
        open={visible}
        footer={null}
        onCancel={onClose}
        centered
        style={{ textAlign: "center" }}
    >
        <h3>Popup Ad Placeholder</h3>
        <p>This is a test ad displayed as a popup.</p>
        <Button type="primary" onClick={onClose}>
            Close Ad
        </Button>
    </Modal>
);

// Static Overlay Ad Component
const StaticOverlayAd = () => (
    <Affix offsetBottom={10}>
        <Card style={{ width: 300, position: "fixed", bottom: 120, left: 20, zIndex: 1000 }}>
            <h3>Static Overlay Ad</h3>
            <p>Ad content goes here.</p>
        </Card>
    </Affix>
);

// Transition Ad Component
const TransitionAd = () => {
    const [showAd, setShowAd] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 1500 && scrollY < 2500) {
              setShowAd(true); // Show ad between 1500px and 2500px scroll
            } else {
              setShowAd(false); // Hide ad when not in this range
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        showAd && (
            <Card style={{ position: "fixed", top: 80, right: 20, width: 300, zIndex: 1000 }}>
                <h3>Transition Ad</h3>
                <p>Ad content triggered on scroll.</p>
            </Card>
        )
    );
};

// Pre-Redirect Ad Component
const PreRedirectAd = ({ onProceed }: any) => (
    <div style={{ textAlign: "center", padding: 20 }}>
        <h3>Pre-Redirect Ad</h3>
        <p>Ad content displayed before redirection.</p>
        <Button type="primary" onClick={onProceed}>
            Proceed
        </Button>
    </div>
);

const AdComponents = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const location = useLocation();
    const timerRef = useRef<NodeJS.Timeout | null>(null); // Use ref to store the timer ID

    useEffect(() => {
        const startPopupTimer = () => {
            if (timerRef.current) clearTimeout(timerRef.current); // Clear any existing timer
            timerRef.current = setTimeout(() => {
                setPopupVisible(true); // Show popup after 2 minutes
            }, 120000);
        };

        const resetTimer = () => {
            setPopupVisible(false); // Hide popup on interaction
            startPopupTimer(); // Restart the timer
        };

        // Start timer on mount
        startPopupTimer();

        // Listen for user interactions
        window.addEventListener("scroll", resetTimer);
        window.addEventListener("click", resetTimer);

        return () => {
            // Cleanup timers and event listeners
            if (timerRef.current) clearTimeout(timerRef.current);
            window.removeEventListener("scroll", resetTimer);
            window.removeEventListener("click", resetTimer);
        };
    }, [location.pathname]); // Depend only on the current path to reset logic on navigation

    return (
        <>
            <PopupAd visible={isPopupVisible} onClose={() => setPopupVisible(false)} />
            <StaticOverlayAd />
            <TransitionAd />
        </>
    );
};

export default AdComponents;
