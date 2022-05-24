<script lang="ts">
import { Icon } from 'framework7-svelte';

let stars: number;
let forks: number;

const getStats = async () => {
  const response = await (await fetch('https://api.github.com/repos/function-junctions/function-junctions')).json();
  return response;
};

void getStats().then((stats) => {
  stars = stats.stargazers_count;
  forks = stats.forks_count;
});
  
</script>

<style lang="scss">
  .content {
    margin-top: 7px;
    display: flex;
    color: white;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    width: 135px;
  }
</style>

<div class="content">
  <Icon f7="logo_github" size={20} />
  {#if typeof stars !== 'undefined' && typeof forks !== 'undefined'}
    <a
      style="color: white; margin-left: 5px"
      href="https://github.com/function-junctions/function-junctions"
      target=”_blank” 
      class="external"
    >
      {stars} stars, {forks} forks
    </a>
  {:else}
    <div style="margin-left: 5px">Loading...</div>
  {/if}
</div>