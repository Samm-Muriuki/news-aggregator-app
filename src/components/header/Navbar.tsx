import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    const categories = [
        "Main Headlines",
        "Kenya News",
        "World News",
        "Politics",
        // "Opinion",
        "Sports",
        "Business",
        "Eve Woman",
        // "Columnists",
        "Magazines",
        "Agriculture",
        // "KTN Videos",
        // "Entertainment"
    ];

    return (
        <Menu mode="horizontal" theme="dark">
            {categories.map((category) => (
                <Menu.Item key={category}>
                    <Link to={`/rss-feeds/${encodeURIComponent(category)}`}>{category}</Link>
                </Menu.Item>
            ))}
        </Menu>
    );
};

export default Navbar;
