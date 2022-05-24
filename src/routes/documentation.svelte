<style global>
  @import 'framework7/css/bundle';
  @import 'framework7-icons';
</style>

<script lang="ts">
  // @ts-expect-error
  import Framework7 from 'framework7/lite-bundle';
  import Framework7Svelte from 'framework7-svelte';
  import { onMount } from 'svelte';

  // https://framework7.io/svelte/init-app
  
  onMount(() => {
    Framework7.use(Framework7Svelte);
  });
</script>

<svelte:head>
  <title>Function Junctions</title>
</svelte:head>

<h1>DOCS</h1>