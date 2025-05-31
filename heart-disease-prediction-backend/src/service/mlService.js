const axios = require('axios');

const getPrediction = async (features) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict', { features });
        return response.data;
    } catch (error) {
        console.error('Error in ML model:', error.message);
        return { error: error.message };
    }
};

module.exports = { getPrediction };