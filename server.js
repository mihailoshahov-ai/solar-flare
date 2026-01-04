const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '/')));

app.get('/proxy/nasa/:endpoint', async (req, res) => {
    try {
        const { endpoint } = req.params;
        const response = await axios.get(`https://api.nasa.gov/DONKI/${endpoint}`, { params: req.query });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Proxy fetch failed' });
    }
});

app.listen(PORT, () => {
    console.log(`\n🪐 AUTONOMY NODE ONLINE`);
    console.log(`Dashboard available at: http://localhost:${PORT}`);
});