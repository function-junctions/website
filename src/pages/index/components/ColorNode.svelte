<script lang="ts">
  import type { OutputSocket, OutputSockets } from 'function-junctions/types';
  import { List, ListInput } from 'framework7-svelte';

  export let outputs: OutputSockets<{
    Color: OutputSocket<string>;
  }>;

  const { value } = outputs.Color;
  $: console.log($value);
</script>

<List class="no-margin" noHairlines style="background: transparent; width: 120px">
  <ListInput
    type="colorpicker"
    placeholder="Color"
    readonly
    colorPickerParams={{
      modules: ['rgb-sliders'],
      openIn: 'popover',
      openInPhone: 'sheet',
      value: {
        hex: $value,
      },
    }}
    onColorPickerChange={(event) => ($value = event.hex) }
  />
</List>