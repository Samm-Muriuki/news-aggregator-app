import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const FooterAd = () => {
    const [collapsed, setCollapsed] = useState(true);

    // Use effect to simulate delayed opening and closing of the ad
    useEffect(() => {
        const openTimer = setTimeout(() => {
            setCollapsed(false);
        }, 10000); // 5 seconds delay before ad opens

        // Close the ad after it's opened, and wait 15 seconds before reopening
        const closeTimer = setTimeout(() => {
            setCollapsed(true);
        }, 120000); // 2 minutes after opening before closing

        return () => {
            clearTimeout(openTimer);
            clearTimeout(closeTimer);
        }; // Cleanup on component unmount
    }, [collapsed]); // Dependency on collapsed state to repeat the process

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
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
                    maxHeight: collapsed ? "0" : "300px", // Set maxHeight for smooth animation
                    overflow: "hidden", // Hide overflow during animation
                    transition: "max-height 6s ease-in-out", // Transition for smooth opening/closing
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src="https://via..com/60"
                        alt="Ad"
                        style={{ marginRight: 10 }}
                    />
                    <div>
                        <h3 style={{ margin: 0 }}>J. Mwangi in despair</h3>
                        <p style={{ margin: 0 }}>Airtime 4 Insurance</p>
                    </div>
                </div>
                <Button type="primary" style={{ borderRadius: 20 }}>
                    Open
                </Button>
            </Card>
            {/* Collapse Arrow */}
            <div
                style={{
                    position: "absolute",
                    top: -20, // Adjust to place the arrow above the ad
                    left: 10, // Adjust to place the arrow on the left
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
