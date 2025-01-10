import React, { useEffect, useState } from "react";
import { Card } from "antd";

// Fetch and parse the VAST XML from the API
const fetchAdData = async () => {
    const response = await fetch("https://api.iboard.dev/adverts/v1/serve/11e98461-9110-4017-93a9-2837eff71f4f");
    const xmlText = await response.text();
    return parseVastXML(xmlText); // Assume parseVastXML parses XML and returns an object with ad details
};

// Function to parse VAST XML
const parseVastXML = (xmlText: string) => {
    // Implement XML parsing logic or use an XML parsing library to extract relevant data.
    return {
        title: "Ad 1", // Placeholder for parsed data
        videoUrl: "https://cdn.iboard.dev/451693f6-1882-4390-ab80-a009ce4991d1/Blueband_Zidisha Ladha_Advert.mp4", // Example video
    };
};

const AdPlaceholders: React.FC<{ position?: "top" | "bottom" | "left" | "right" }> = ({ position }) => {
    const [adData, setAdData] = useState<any>(null);
    // console.log("adData: ", adData);


    useEffect(() => {
        fetchAdData().then((data) => setAdData(data));
    }, []);

    if (!adData) return <Card style={{ textAlign: "center", background: "#e6f7ff" }}><p>Loading Ad...</p></Card>;

    const styles = {
        top: { marginBottom: 16 },
        bottom: { margin: "16px 0" },
        left: { marginBottom: 16 },
        right: { marginBottom: 16 },
    };

    return (
        <video width="300" controls>
            <source src={adData.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default AdPlaceholders;
