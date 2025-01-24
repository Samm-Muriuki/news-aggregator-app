import express from "express";
import axios from "axios";

const app = express();

// Image proxy endpoint
app.get("/image-proxy", async (req, res) => {
    const imageUrl = req.query.url;

    if (!imageUrl) {
        return res.status(400).send("Image URL is required.");
    }

    // Check if the image URL is from Nation
    const isNationImage = imageUrl.includes("nation.africa");

    if (isNationImage) {
        try {
            // Forward request to ngrok URL
            const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

            res.set("Content-Type", response.headers["content-type"]);
            res.send(response.data);
        } catch (error) {
            console.error("Error fetching image:", error.message);
            res.status(500).send("Error fetching image.");
        }
    } else {
        // Handle other cases or redirect to default
        res.status(400).send("This proxy only handles Nation images.");
    }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Image proxy running on port ${PORT}`));
