<script lang="ts">
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;
</script>

<nav>
    <a href="/">Home</a>
    <h1>Welcome {JSON.stringify(data)}</h1>
</nav>
<slot />