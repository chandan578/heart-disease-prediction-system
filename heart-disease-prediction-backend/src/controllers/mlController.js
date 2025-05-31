const predictionService = require("../service/mlService");

exports.predict = async (req, res) => {
    try {
        const { features } = req.body;

        if (!features || !Array.isArray(features)) {
            return res.status(400).json({ error: "Invalid input format" });
        }

        const prediction = await predictionService.getPrediction(features);
        res.json({ prediction });
    } catch (error) {
        console.error("Error in prediction:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
