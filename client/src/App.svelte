<script>
    import Router from 'svelte-spa-router';

    import Page1 from './routes/Page1.svelte';
    import Page2 from './routes/Page2.svelte';
    import Page3 from './routes/Page3.svelte';

    const routes = {
        '/1': Page1,
        '/2': Page2,
        '/3': Page3,
        '*': Page1
    };
</script>

<!--
<nav>
    <a href="#/1">Page 1</a>
    <a href="#/2">Page 2</a>
    <a href="#/3">Page 3</a>
</nav>
-->

<main>
    <Router {routes} />
</main>
