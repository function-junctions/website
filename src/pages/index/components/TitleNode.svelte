<script lang="ts">
  import type {
    InputSockets,
    InputSocket,
    OutputSocket,
    OutputSockets,
  } from 'function-junctions/types';
  import Title from '../../../components/Title/Title.svelte';
  
  export let inputs: InputSockets<{
    Title: InputSocket<string>;
    Subtitle: InputSocket<string>;
    'Primary A': InputSocket<string>;
    'Primary B': InputSocket<string>;
    'Secondary A': InputSocket<string>;
    'Secondary B': InputSocket<string>;
  }>;

  export let outputs: OutputSockets<{
    Style: OutputSocket<string>;
  }>;

  const { value: header } = inputs.Title;
  const { value: subheader } = inputs.Subtitle;
  const { value: primaryA } = inputs['Primary A'];
  const { value: primaryB } = inputs['Primary B'];
  const { value: secondaryA } = inputs['Secondary A'];
  const { value: secondaryB } = inputs['Secondary B'];

  const { value: output } = outputs.Style;

  $: $output = JSON.stringify({
    'Primary A': $primaryA,
    'Primary B': $primaryB,
    'Secondary A': $secondaryA,
    'Secondary B': $secondaryB,
  });
</script>

<Title
  style="width: 600px"
  header={$header.slice(0, 11)}
  subheader={$subheader}
  primaryA={$primaryA}
  primaryB={$primaryB}
  secondaryA={$secondaryA}
  secondaryB={$secondaryB}
/>
