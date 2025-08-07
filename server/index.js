const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

let previousStats = null;
let previousTime = Date.now();

app.use(cors());

// Replace 'mykey' with your actual API key
const API_KEY = 'qeorj7v9mulj4pt3bc7wjh9tffod31ihdcl9u83b';

const METEOSOURCE_URL = `https://www.meteosource.com/api/v1/free/point?place_id=warsaw&sections=current,hourly&language=en&units=auto&key=${API_KEY}`;

function getNetworkBytes() {
    return new Promise((resolve, reject) => {
        exec("cat /proc/net/dev", (error, stdout) => {
            if (error) return reject(error);

            const lines = stdout.split("\n").slice(2);
            let totalRecv = 0;
            let totalTrans = 0;

            lines.forEach(line => {
                const parts = line.trim().split(/[:\s]+/);
                if (parts.length < 17) return;

                const iface = parts[0];
                if (iface === 'wlan0') {
                    totalRecv += parseInt(parts[1]);  // received bytes
                    totalTrans += parseInt(parts[9]); // transmitted bytes
                }
            });

            resolve({ totalRecv, totalTrans });
        });
    });
}

app.get('/api/network', async (req, res) => {
    try {
        console.log('Current:', currentStats);
        console.log('Previous:', previousStats);
        console.log('Time delta (s):', (now - previousTime) / 1000);

        const now = Date.now();
        const currentStats = await getNetworkBytes();

        let result = {
            download: 0,
            upload: 0
        }

        if (previousStats) {
            const timeDeltaSec = (now - previousTime) / 1000;
            const bytesRecvDelta = currentStats.totalRecv - previousStats.totalRecv;
            const bytesTransDelta = currentStats.totalTrans - previousStats.totalTrans;

            result = {
                download: (bytesRecvDelta / 1024 / 1024) / timeDeltaSec,
                upload: (bytesTransDelta / 1024 / 1024 ) / timeDeltaSec
            };
        }

        previousStats = currentStats;
        previousTime = now;

        res.json(result);
    } catch (error) {
        res.status(500).json({error: 'Failed to get network stats'})
    }
})

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
