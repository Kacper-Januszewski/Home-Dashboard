<script>
  import { onMount } from 'svelte';

  let time;
  let day;
  let date;
  let month;
  let year;

  // Initialize date info once (day/month/year don't change often)
  const now = new Date();
  day = now.toLocaleDateString(undefined, { weekday: 'long' });
  date = now.getDate();
  month = now.toLocaleDateString(undefined, { month: 'long' });
  year = now.getFullYear();

  // Update time every second
  function updateTime() {
    time = new Date().toLocaleTimeString();
  }

  onMount(() => {
    updateTime(); // Initial time set
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval); // Clean up on unmount
  });

  let temperature = null;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch('http://192.168.0.184:3000/api/current-temp');
      const data = await response.json();
      temperature = data.temperature;
    } catch (err) {
      error = 'Failed to fetch temperature';
      console.error(err);
    }
  });
</script>


<main>
  <p>Today is {day}, {month} {date}, {year}</p>
  <p>Current time: {time}</p>

  <div class="card">
    <h2>Weather Info</h2>
    {#if temperature}
      <p>🌡️ Current temperature: {temperature}°C</p>
    {:else if error}
      <p style="color: red;">{error}</p>
    {:else}
      <p>Loading temperature...</p>
    {/if}
  </div>
</main>

<style>
</style>
