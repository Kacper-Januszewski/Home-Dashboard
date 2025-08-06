const app = express();
const PORT = 3000;

// Replace 'mykey' with your actual API key
const API_KEY = 'qeorj7v9mulj4pt3bc7wjh9tffod31ihdcl9u83b';

const METEOSOURCE_URL = `https://www.meteosource.com/api/v1/free/point?place_id=warsaw&sections=current,hourly&language=en&units=auto&key=${API_KEY}`;

app.get('/api/current-temp', async (req, res) => {
    try {
        const response = await fetch(METEOSOURCE_URL, {
            headers: {
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch weather data' });
        }

        const data = await response.json();

        // Extract temperature from "current"
        const temperature = data.current?.temperature;

        if (temperature === undefined) {
            return res.status(500).json({ error: 'Temperature data not found' });
        }

        res.json({ temperature });
    } catch (error) {
        console.error('Error fetching weather:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
