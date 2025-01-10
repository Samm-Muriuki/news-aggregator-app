import React, { useState } from "react";
import { Card, Modal, Button } from "antd";
import AdPlaceholders from "../ads/AdPlaceholders";

interface RSSFeedItemProps {
    title: string;
    description: string;
    url: string;
    imgSrc: string;
    publishedAt: string;
}

const RSSFeedItem: React.FC<RSSFeedItemProps> = ({
    title,
    description,
    url,
    imgSrc,
    publishedAt,
}) => {
    const [showAd, setShowAd] = useState(false);

    const handleRedirect = () => {
        setShowAd(true); // Show the ad modal
    };

    const proceedToExternal = () => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <>
            <Card
                hoverable
                cover={<img alt={title} src={imgSrc} style={{ maxHeight: "200px", objectFit: "cover" }} />}
            >
                <Card.Meta
                    title={
                        <span
                            onClick={handleRedirect}
                            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                        >
                            {title}
                        </span>
                    }
                    description={<p>{description}</p>}
                />
                <p style={{ marginTop: "10px", fontSize: "12px", color: "gray" }}>
                    Published: {new Date(publishedAt).toLocaleString()}
                </p>
            </Card>

            {/* Pre-Redirect Ad Modal */}
            <Modal
                open={showAd}
                footer={null}
                onCancel={() => setShowAd(false)}
                centered
                width={"80%"}
                style={{
                    textAlign: "center",
                }}
            >
                <Card
                    style={{
                        backgroundImage: "url('/surprise.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                        height: "auto",
                        minHeight: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Button
                        type="primary"
                        onClick={proceedToExternal}
                        style={{
                            position: "absolute",
                            bottom: "-30px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            borderRadius: "20px",
                        }}
                    >
                        Continue to Article
                    </Button>
                </Card>
            </Modal>
        </>
    );
};

export default RSSFeedItem;
