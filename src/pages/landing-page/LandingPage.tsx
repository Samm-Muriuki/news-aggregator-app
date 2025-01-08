import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/header/Navbar";
import RSSFeedList from "../../components/rss-feeds/RSSFeedList";

const LandingPage: React.FC = () => {
    const { category } = useParams<{ category?: string }>();
    // console.log("category: ", category);


    return (
        <RSSFeedList category={category || "Main Headlines"} />
    );
};

export default LandingPage;
