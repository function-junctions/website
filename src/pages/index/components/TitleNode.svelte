<script lang="ts">
  import type { InputSockets, InputSocket, OutputSockets } from 'function-junctions/types';
  import OtherTitle from '../../../components/Title/OtherTitle.svelte';
  
  export let inputs: InputSockets<{
    Title: InputSocket<string>;
    Subtitle: InputSocket<string>;
    'Primary A': InputSocket<string>;
    'Primary B': InputSocket<string>;
    Secondary: InputSocket<string>;
  }>;

  const { value: header } = inputs.Title;
  const { value: subheader } = inputs.Subtitle;
  const { value: primaryA } = inputs['Primary A'];
  const { value: primaryB } = inputs['Primary B'];
  const { value: secondary } = inputs['Secondary'];

  $: console.log($primaryA);
</script>

<OtherTitle
  style="width: 600px"
  header={$header.slice(0, 11)}
  subheader={$subheader}
  primaryA={$primaryA}
  primaryB={$primaryB}
  secondary={$secondary}
/>
