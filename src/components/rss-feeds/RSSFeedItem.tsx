import React from "react";
import { Card } from "antd";

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
    return (
        <Card
            hoverable
            cover={<img alt={title} src={imgSrc} style={{ maxHeight: "200px", objectFit: "cover" }} />}
        >
            <Card.Meta
                title={<a href={url} target="_blank" rel="noopener noreferrer">{title}</a>}
                description={<p>{description}</p>}
            />
            <p style={{ marginTop: "10px", fontSize: "12px", color: "gray" }}>
                Published: {new Date(publishedAt).toLocaleString()}
            </p>
        </Card>
    );
};

export default RSSFeedItem;
