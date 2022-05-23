<script lang="ts">
  import type { OutputSocket, OutputSockets } from 'function-junctions/types';
  
  export let outputs: OutputSockets<{
    Text: OutputSocket<string>;
  }>;

  const { value } = outputs.Text;
</script>

<div style="margin: 5px">
  <input type="text" bind:value={$value} />
</div>