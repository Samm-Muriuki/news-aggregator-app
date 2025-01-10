import React, { useState } from "react";
import { Card, Modal, Button } from "antd";

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
        setShowAd(false); // Close the ad modal
        window.open(url, "_blank", "noopener,noreferrer"); // Navigate to the external URL
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
            >
                <div style={{ textAlign: "center" }}>
                    <h3>Sponsored Content</h3>
                    <p>Your ad content here...</p>
                    <Button type="primary" onClick={proceedToExternal}>
                        Continue to Article
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default RSSFeedItem;
