import React, { useEffect, useState } from "react";
import { List, Typography, Skeleton } from "antd";
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
        <div style={{ padding: "24px" }}>
            <Title level={3}>{category}</Title>
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={loading ? skeletonData : articles}
                renderItem={(item, index) => (
                    <List.Item key={item.key || `article-${index}`}>
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
                    </List.Item>
                )}
            />
        </div>
    );
};

export default RSSFeedList;
