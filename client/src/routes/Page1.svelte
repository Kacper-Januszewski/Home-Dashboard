<script>
    import { onMount } from 'svelte';

    let time;
    let day;
    let date;
    let month;
    let year;

    // Date info (static)
    const now = new Date();
    day = now.toLocaleDateString(undefined, { weekday: 'long' });
    date = now.getDate();
    month = now.toLocaleDateString(undefined, { month: 'long' });
    year = now.getFullYear();

    const apiUrl1 = import.meta.env.VITE_API_URL_1;
    const apiUrl2 = import.meta.env.VITE_API_URL_2;

    // Update time every second
    function updateTime() {
        time = new Date().toLocaleTimeString();
    }

    onMount(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    });

    // Weather temperature
    let temperature = null;
    let tempError = null;

    onMount(async () => {
        try {
            const response = await fetch(`${apiUrl1}/api/current-temp`);
            const data = await response.json();
            temperature = data.temperature;
        } catch (err) {
            tempError = 'Failed to fetch temperature';
            console.error(err);
        }
    });

    // Network stats
    let download = null;
    let upload = null;
    let netError = null;

    async function fetchNetworkStats() {
        try {
            const response = await fetch(`${apiUrl1}/api/network`);
            const data = await response.json();

            // Convert MB/s to KB/s with 2 decimals
            download = (data.download * 1024).toFixed(2);
            upload = (data.upload * 1024).toFixed(2);
        } catch (err) {
            netError = 'Failed to fetch network stats';
            console.error(err);
        }
    }

    // Fetch network stats every 3 seconds
    onMount(() => {
        fetchNetworkStats();
        const interval = setInterval(fetchNetworkStats, 1000);
        return () => clearInterval(interval);
    });
</script>

<main>
    <div class="card">
        <p>Today is {day}, {date} {month}, {year}</p>
        <p>Current time: {time}</p>
    </div>

    <div class="card" style="margin-top:1em;">
        <h2>Weather Info</h2>
        {#if temperature !== null}
            <p>🌡️ Current temperature: {temperature}°C</p>
        {:else if tempError}
            <p style="color: red;">{tempError}</p>
        {:else}
            <p>Loading temperature...</p>
        {/if}
    </div>

    <div class="card" style="margin-top:1em;">
        <h2>Network Usage</h2>
        {#if download !== null && upload !== null}
            <p>⬇️ Download: {download} KB/s</p>
            <p>⬆️ Upload: {upload} KB/s</p>
        {:else if netError}
            <p style="color: red;">{netError}</p>
        {:else}
            <p>Loading network stats...</p>
        {/if}
    </div>
</main>

<style>
    main {
        font-family: Arial, sans-serif;
        padding: 1rem;
    }
    .card {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 8px;
        max-width: 300px;
    }
</style>
