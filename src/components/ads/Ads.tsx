import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Card, Affix } from "antd";
import { useLocation } from "react-router-dom";
import AdPlaceholders from "./AdPlaceholders";

// Popup Ad Component
const PopupAd = ({ visible, onClose }: any) => (
    <Modal
        open={visible}
        footer={null}
        onCancel={onClose}
        centered
        style={{ textAlign: "center" }}
    >
        <div style={{ textAlign: "center", cursor: "pointer" }}>
            <h3>Airtime 4 Insurance</h3>
            <p>
                Purchase airtime using <strong>Buy Goods</strong> Till <strong>181818</strong> & get a complimentary insurance cover
            </p>
            <Button
                type="primary"
                size="large"
                style={{ marginTop: 16, borderRadius: 20 }}
                onClick={() => window.open("https://airtime4insurance.com/", "_blank")}
            >
                Click Here to Learn More
            </Button>
        </div>
    </Modal>
);


// Static Overlay Ad Component
const StaticOverlayAd = () => (
    <Affix offsetBottom={10}>
        <Card
            style={{
                width: 180,
                position: "fixed",
                bottom: 120,
                left: 20,
                zIndex: 1000,
                backgroundColor: "rgba(255, 255, 255, 0)", // Semi-transparent white
                backdropFilter: "blur(5px)", // Blur effect for glassy look
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                textAlign: "center",
                backgroundImage: "url('/gift.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <h3
                style={{
                    marginBottom: 8,
                    color: "#fff",
                    textShadow: "0 1px 3px rgba(0, 0, 255, 0.9)",
                }}
            >
                Airtime Purchase{" "}
                <span
                    style={{
                        fontWeight: "bold",
                        color: "#00FF00",
                        fontSize: "1.2em",
                        textShadow: "0 2px 5px rgba(255, 215, 0, 0.2)",
                    }}
                >
                    Buy Goods
                </span>{" "}
                <span
                    style={{
                        fontWeight: "bold",
                        color: "#FFD700",
                        fontSize: "1.2em",
                        textShadow: "0 2px 5px rgba(255, 215, 0, 0.7)",
                    }}
                >
                    171717
                </span>{" "}
                has{" "}
                <span
                    style={{
                        color: "#fff",
                        textShadow: "0 1px 3px rgba(0, 0, 255, 0.9)",
                    }}
                >
                    Surprise Rewards
                </span>
            </h3>
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
                setShowAd(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        showAd && (
            <div style={{ position: "fixed", top: 80, right: 20, width: 300, zIndex: 1000 }}>
                <AdPlaceholders />
            </div>
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
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const startPopupTimer = () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setPopupVisible(true); // Show popup after 1 minute
            }, 60000);
        };

        const resetTimer = () => {
            setPopupVisible(false);
            startPopupTimer();
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
