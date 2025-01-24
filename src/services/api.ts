import axios from 'axios';
import newsImage from '../components/images/newsImage.jpg';

interface Article {
    title: string;
    description: string;
    url: string;
    source: string;
    publishedAt: string;
    imgSrc: string;
}

// Standard RSS Feeds
const RSS_FEEDS: Record<string, string> = {
    "Main Headlines": "https://www.standardmedia.co.ke/rss/headlines.php",
    "Nation": "https://nation.africa/kenya/rss.xml",
    "Kenya News": "https://www.standardmedia.co.ke/rss/kenya.php",
    "World News": "https://www.standardmedia.co.ke/rss/world.php",
    "Politics": "https://www.standardmedia.co.ke/rss/politics.php",
    "Opinion": "https://www.standardmedia.co.ke/rss/opinion.php",
    "Sports": "https://www.standardmedia.co.ke/rss/sports.php",
    "Business": "https://www.standardmedia.co.ke/rss/business.php",
    "Columnists": "https://www.standardmedia.co.ke/rss/columnists.php",
    "Magazines/Pullouts": "https://www.standardmedia.co.ke/rss/magazines.php",
    "Agriculture": "https://www.standardmedia.co.ke/rss/agriculture.php",
    "KTN Videos": "https://www.standardmedia.co.ke/rss/ktnvideos.php",
    "Eve Woman": "https://www.standardmedia.co.ke/rss/evewoman.php",
    "Entertainment (SDE)": "https://www.standardmedia.co.ke/rss/entertainment.php",
};

// Helper function to fetch and parse RSS feeds
// const fetchRSSFeed = async (url: string): Promise<Article[]> => {
//     try {
//         const response = await axios.get(url, { responseType: 'document' });
//         // console.log("response: ", response);
//         // console.log("Raw response data:", response.data);
//         const parser = new DOMParser();
//         // console.log("parser: ", parser);
//         // const xml = parser.parseFromString(response.data, "text/xml");
//         // console.log("xml: ", xml);
//         const xml = response.data;
//         // console.log("XML document:", xml);
//         const items = Array.from(xml.querySelectorAll("item"));
//         // console.log("items: ", items);        
        
//         return items.map((item: any, index) => {
//             const mediaContent = item.getElementsByTagName("media:content")[0];
//             // console.log("mediaContent via getElementsByTagName: ", mediaContent);

//             // Extract the URL from the media:content tag
//             const imgSrc = mediaContent?.getAttribute("url") || newsImage; // Use default image if no URL found
//             // console.log(`Item ${index + 1} imgSrc:`, imgSrc);

//             return {
//                 title: item.querySelector("title")?.textContent || "No title",
//                 description: item.querySelector("description")?.textContent || "No description",
//                 url: item.querySelector("link")?.textContent || "",
//                 publishedAt: item.querySelector("pubDate")?.textContent || "",
//                 source: "Standard Digital",
//                 imgSrc, // Image URL extracted from media:content or default
//             };
//         });
//     } catch (error) {
//         console.error(`Error fetching RSS feed from ${url}:`, error);
//         return [];
//     }
// };

const fetchRSSFeed = async (url: string): Promise<Article[]> => {
    try {
        // Construct API URL for rss2json
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;

        // Fetch the parsed JSON from rss2json
        const response = await axios.get(apiUrl);
        // console.log("response: ", response);
        const items = response.data.items; // Extract feed items
        // console.log("items: ", items);

        // Map items to the Article interface
        return items.map((item: any) => ({
            title: item.title,
            description: item.description || "No description available.",
            url: item.link,
            publishedAt: item.pubDate || "Unknown date",
            source: response.data.feed.title || "Unknown source", // Use the feed title as the source
            imgSrc: item?.enclosure?.link, // Use thumbnail or fallback image
            // imgSrc: item?.enclosure?.link ? `http://localhost:4000/image-proxy?url=${encodeURIComponent(item.enclosure.link)}` : newsImage,
            // imgSrc: item?.enclosure?.link
            //     ? `https://b59f-102-213-93-57.ngrok-free.app/image-proxy?url=${encodeURIComponent(item.enclosure.link)}`
            //     : newsImage,
        }));
    } catch (error: any) {
        console.error("Error fetching RSS feed:", error.message);
        return [];
    }
};

// Fetch articles for a specific category
export const fetchCategoryArticles = async (category: string): Promise<Article[]> => {
    const url = RSS_FEEDS[category];
    if (!url) throw new Error(`Category ${category} not found in RSS_FEEDS.`);
    return fetchRSSFeed(url);
};

// Fetch articles for "General" category (sample from all categories)
export const fetchGeneralArticles = async (): Promise<Article[]> => {
    const categoryUrls = Object.values(RSS_FEEDS);
    const allArticles = await Promise.all(categoryUrls.map(fetchRSSFeed));
    return allArticles.flat();
};
