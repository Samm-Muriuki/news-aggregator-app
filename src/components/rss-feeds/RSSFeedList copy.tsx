import React, { useEffect, useState } from "react";
import { Typography, Skeleton, Col, Row } from "antd";
import { fetchCategoryArticles } from "../../services/api";
import RSSFeedItem from "./RSSFeedItem";
import FooterAd from "../ads/FooterAd";
import { AdFeedItem } from "../ads/AdFeedItem";

const { Title } = Typography;

interface RSSFeedListProps {
    category: string;
}

const RSSFeedList: React.FC<RSSFeedListProps> = ({ category }) => {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const data = await fetchCategoryArticles(category);
                setArticles(data);
            } catch (error) {
                console.error("Error fetching RSS feed:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [category]);

    // Array of placeholders for skeletons
    const skeletonData = Array.from({ length: 9 }, (_, index) => ({ key: `skeleton-${index}` }));

    // Insert ad every 3rd item in the feed (just an example)
    const feedWithAds = articles.map((item, index) => {
        if ((index + 1) % 3 === 0) {
            return <AdFeedItem key={`ad-${index}`} />; // Ad placed after every 3rd article
        }
        return (
            <RSSFeedItem
                key={item.url}
                title={item.title}
                description={item.description}
                url={item.url}
                imgSrc={item.imgSrc}
                publishedAt={item.publishedAt}
            />
        );
    });

    return (
        <>
            <Title level={3} style={{ textAlign: "center", marginBottom: "16px" }}>
                {category}
            </Title>
            <Row gutter={[16, 16]}>
                {loading ? (
                    // Show skeletons when loading
                    skeletonData.map((item) => (
                        <Col xs={24} sm={12} md={12} lg={8} xl={6} key={item.key}>
                            <Skeleton
                                active
                                avatar={{ shape: "square", size: 150 }}
                                paragraph={{ rows: 3 }}
                            />
                        </Col>
                    ))
                ) : (
                    // Show feed with ads after loading
                    feedWithAds
                )}
            </Row>
            <FooterAd />
        </>
    );
};

export default RSSFeedList;
