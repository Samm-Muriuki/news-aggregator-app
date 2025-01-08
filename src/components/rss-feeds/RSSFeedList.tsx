import React, { useEffect, useState } from "react";
import { List, Typography, Skeleton, Col, Row } from "antd";
import { fetchCategoryArticles } from "../../services/api";
import RSSFeedItem from "./RSSFeedItem";

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

    return (
        <>
            <Title level={3} style={{ textAlign: "center", marginBottom: "16px" }}>
                {category}
            </Title>
            <Row gutter={[16, 16]}>
                {(loading ? skeletonData : articles).map((item, index) => (
                    <Col xs={24} sm={12} md={12} lg={8} xl={6} key={item.key || `article-${index}`}>
                        {loading ? (
                            <Skeleton
                                active
                                avatar={{ shape: "square", size: 150 }}
                                paragraph={{ rows: 3 }}
                            />
                        ) : (
                            <RSSFeedItem
                                title={item.title}
                                description={item.description}
                                url={item.url}
                                imgSrc={item.imgSrc}
                                publishedAt={item.publishedAt}
                            />
                        )}
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default RSSFeedList;
