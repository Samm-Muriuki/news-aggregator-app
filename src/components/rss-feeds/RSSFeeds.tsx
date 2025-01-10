import React, { useEffect, useState } from "react";
import { List, Card, Typography, Spin } from "antd";
import { fetchCategoryArticles } from "../../services/api";

const { Title } = Typography;

interface RSSFeedProps {
    category: string;
}

const RSSFeed: React.FC<RSSFeedProps> = ({ category }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArticles = async () => {
            setLoading(true);
            try {
                const data: any = await fetchCategoryArticles(category);
                setArticles(data);
            } catch (error) {
                console.error("Error fetching RSS feed:", error);
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, [category]);

    if (loading) return <Spin size="large" />;

    return (
        <div>
            <Title level={3}>{category}</Title>
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={articles}
                renderItem={(article: any) => (
                    <List.Item>
                        <Card
                            title={article.title}
                            extra={<a href={article.url}>Read More</a>}
                            cover={
                                <img
                                    alt={article.title}
                                    src={article.imgSrc}
                                    style={{ maxHeight: "200px", objectFit: "cover" }}
                                />
                            }
                        >
                            <p>{article.description}</p>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default RSSFeed;
