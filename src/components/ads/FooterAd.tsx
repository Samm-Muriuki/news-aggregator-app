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

        const closeTimer = setTimeout(() => {
            setCollapsed(true);
        }, 120000); // 2 minutes after opening before closing

        return () => {
            clearTimeout(openTimer);
            clearTimeout(closeTimer);
        };
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
                    maxHeight: collapsed ? "0" : "300px",
                    overflow: "hidden",
                    transition: "max-height 6s ease-in-out",
                    cursor: "pointer",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src="https://via..com/60"
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
