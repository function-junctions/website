<script lang="ts">
  import { Block, Button } from 'framework7-svelte';
  import Title from '../Title/Title.svelte';

  export let showCrazyTitle = false;
</script>

<style lang="scss">
  a {
    text-decoration: underline;
    color: white;
    margin-right: 10px;
  }

  h1 {
    line-height: 55px;
    margin-bottom: 30px;
  }
</style>

<br />
<Block style="text-align: center">
  <Block>
    {#if showCrazyTitle}
      <br />
      <Title headerSize={60} subHeaderSize={20} subHeaderMarginTop={-55} />
      <br />
      <br />
    {:else}
      <h1 style="font-family: 'Horsemen';font-size: 24px">Function <span style="color: #f975f7">Junctions</span></h1>
    {/if}
    <h3 style="font-weight: 400">
      <i>The simplest way to develop a stunning visual programming interface</i>
    </h3>
    <p style="font-weight: 300">
      Function Junctions is a svelte library designed to give you the best experience developing a node-based visual programming editor. With very minimal boiler-plate code, it seamlessly handles reactivity and state with very little performance overhead.
    </p>
    <br />
    <br />
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    "
    >
      <Button
        outline
        color="purple"
        style="
          width: 300px;
          text-transform: none;
        "
        href="/documentation#getting-started"
        class="external"
        sveltekit:reload
      >
        Get Started
      </Button>
      <br />
      <br />
      <div style="display: flex"> 
        <a href="/documentation#getting-started" class="external" sveltekit:reload>Documentation</a>
        <a>Examples</a>
      </div>
      <br />
    </div>
  </Block>
</Block>