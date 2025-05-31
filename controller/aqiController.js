import aqiService from "../services/aqiService.js"
const getAqi = async (req, res) => {
    try {
        const response = await aqiService();
        if (!response) throw new Error("AQI Service returned undefined");
        res.json(response);
    } catch (error) {
        console.error("AQI Controller Error:", error.message);
        res.status(500).json({ error: "Failed to fetch AQI data" });
    }
};

export default getAqi;
