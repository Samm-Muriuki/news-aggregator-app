import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { trackEvent } from "../../analytics";

const FooterAd = () => {
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        const openTimer = setTimeout(() => {
            setCollapsed(false);
            trackEvent("Ad Interaction", "Ad Auto-Opened", "FooterAd"); // Track auto-open event
        }, 10000); // 10 seconds delay before ad opens

        const closeTimer = setTimeout(() => {
            setCollapsed(true);
            trackEvent("Ad Interaction", "Ad Auto-Closed", "FooterAd"); // Track auto-close event
        }, 120000); // 2 minutes after opening before closing

        return () => {
            clearTimeout(openTimer);
            clearTimeout(closeTimer);
        };
    }, [collapsed]); // Runs when `collapsed` changes

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
        trackEvent("Ad Interaction", collapsed ? "Ad Expanded" : "Ad Collapsed", "FooterAd");
    };

    const handleAdClick = () => {
        trackEvent("Ad Interaction", "Clicked Footer Ad", "FooterAd");
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                zIndex: 1000,
                backgroundColor: "#f0f2f5",
                borderTop: "1px solid #d9d9d9",
            }}
        >
            {/* Ad Content */}
            <Card
                bodyStyle={{
                    display: collapsed ? "none" : "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                }}
                style={{
                    margin: 0,
                    maxHeight: collapsed ? "0" : "300px",
                    overflow: "hidden",
                    transition: "max-height 0.6s ease-in-out",
                    cursor: "pointer",
                }}
                onClick={handleAdClick} // Track ad clicks
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src="https://via.placeholder.com/60"
                        alt="Ad"
                        style={{ marginRight: 10 }}
                    />
                    <div>
                        <h3 style={{ margin: 0 }}>Purchase airtime using Buy Goods Till 171717 and get a surprise reward</h3>
                    </div>
                </div>
            </Card>

            {/* Collapse Arrow */}
            <div
                style={{
                    position: "absolute",
                    top: -20,
                    left: 10,
                    backgroundColor: "#fff",
                    border: "1px solid #d9d9d9",
                    borderRadius: "30%",
                    width: 30,
                    height: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    zIndex: 1001,
                }}
                onClick={toggleCollapse}
            >
                {collapsed ? (
                    <UpOutlined style={{ fontSize: "16px" }} />
                ) : (
                    <DownOutlined style={{ fontSize: "16px" }} />
                )}
            </div>
        </div>
    );
};

export default FooterAd;
