const aqiService = async () => {
    try {
        const API_KEY = process.env.IQAIR_API_KEY;
        const city = "pune";
        const state = "maharashtra";
        const country = "india";

        const response = await fetch(
            `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const res = await response.json();

        if (!res || !res.data || !res.data.current || !res.data.current.pollution) {
            throw new Error("Invalid AQI response from API");
        }

        return {
            aqi: res.data.current.pollution.aqius,
            city: res.data.city,
        };
    } catch (error) {
        console.error({ "error in aqiservice": error.message });
        return { error: "Failed to fetch AQI data" }; // ✅ Always return a valid response
    }
};

export default aqiService;
