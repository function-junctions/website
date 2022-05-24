<script lang="ts">
  import type { InputSocket, InputSockets } from 'function-junctions/types';

  export let inputs: InputSockets<{
    Style: InputSocket<string>;
  }>;

  const { value } = inputs.Style;
</script>

<p style="max-width: 230px">{$value}</p>