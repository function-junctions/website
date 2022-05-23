<style lang="scss" global>
  @import './App.scss';
</style>

<script lang="ts">
  import type { TitleNodeBlueprint } from './components/TitleNode';
  import type {
    EditorState,
    NodeBlueprint,
    SocketBlueprint,
    Editor as EditorClass,
  } from 'function-junctions/types';
  import TextNode from './components/TextNode.svelte';
  import { Editor } from 'function-junctions';
  import TitleNode from './components/TitleNode.svelte';
  import { App, Page, View } from 'framework7-svelte';
import GitHubNode from './components/GitHubNode.svelte';
import ColorNode from './components/ColorNode.svelte';

  const colorSocket: SocketBlueprint<string> = {
    type: 'color',
    defaultValue: '#ffffff',
    color: '#bf33d8',
  };

  const stringSocket: SocketBlueprint<string> = {
    type: 'string',
    defaultValue: '',
    color: '#ff9500',
  };

  const titleNode: TitleNodeBlueprint = {
    outputs: {
      Number: stringSocket,
    },
    inputs: {
      Title: stringSocket,
      Subtitle: stringSocket,
      'Primary A': colorSocket,
      'Primary B': colorSocket,
      Secondary: colorSocket,
    },
    component: TitleNode,
    className: 'node-transparent',
  };

  const textNode: NodeBlueprint<Record<string, never>, {
    Text: SocketBlueprint<string>;
  }> = {
    outputs: {
      Text: stringSocket,
    },
    component: TextNode,
    color: 'linear-gradient(#ff9500, #fda62b)',
  };

  const colorNode: NodeBlueprint<Record<string, never>, {
    Color: SocketBlueprint<string>;
  }> = {
    outputs: {
      Color: colorSocket,
    },
    component: ColorNode,
    color: 'linear-gradient(#bf33d8, #9c27b0)',
  };

  const githubNode: NodeBlueprint<Record<string, never>, Record<string, never>> = {
    component: GitHubNode,
    className: 'node-no-title',
  };

  const nodes = {
    Title: titleNode,
    Text: textNode,
    GitHub: githubNode,
    Color: colorNode,
  };

  let state: EditorState = {
    nodes: {
      0: {
        x: (window.innerWidth / 2) - 540,
        y: 107,
        type: 'Text',
        outputs: {
          Text: {
            type: 'string',
            value: 'Function',
          },
        },
      },
      1: {
        x: (window.innerWidth / 2) - 570,
        y: 240,
        type: 'Text',
        outputs: {
          Text: {
            type: 'string',
            value: 'Junctions',
          },
        },
      },
      2: {
        x: (window.innerWidth / 2) - 540,
        y: 370,
        type: 'Color',
        outputs: {
          Color: {
            type: 'color',
            value: '#a441d2',
          },
        },
      },
      3: {
        x: (window.innerWidth / 2) + 340,
        y: 400,
        type: 'Color',
        outputs: {
          Color: {
            type: 'color',
            value: '#e8b7ff',
          },
        },
      },
      4: {
        x: (window.innerWidth / 2) + 300,
        y: 540,
        type: 'Color',
        outputs: {
          Color: {
            type: 'color',
            value: '#f975f7',
          },
        },
      },
      5: {
        x: (window.innerWidth / 2) - 300,
        y: 30,
        type: 'Title',
        inputs: {
          'Primary A': {
            type: 'number',
            value: 0,
          },
          'Primary B': {
            type: 'number',
            value: 0,
          },
          'Secondary': {
            type: 'number',
            value: 0,
          },
          Title: {
            connection: {
              connectedNodeId: '0',
              connectedSocketId: 'Text',
            },
            type: 'string',
            value: 'Function',
          },
          Subtitle: {
            connection: {
              connectedNodeId: '1',
              connectedSocketId: 'Text',
            },
            type: 'string',
            value: 'Junctions',
          },
          'Primary A': {
            connection: {
              connectedNodeId: '2',
              connectedSocketId: 'Color',
            },
            type: 'color',
            value: '#a441d2',
          },
          'Primary B': {
            connection: {
              connectedNodeId: '3',
              connectedSocketId: 'Color',
            },
            type: 'color',
            value: '#e8b7ff',
          },
          'Secondary': {
            connection: {
              connectedNodeId: '4',
              connectedSocketId: 'Color',
            },
            type: 'color',
            value: '#f975f7',
          },
        },
      },
      6: {
        x: (window.innerWidth / 2) - 87.5,
        y: 292,
        type: 'GitHub',
      },
    },
  };

  $: console.log(state);
</script>

<App {...{
  theme: 'ios',
  autoDarkMode: false,
  dark: true,
  name: 'Kitchen Sink',
}}>
  <View main>
    <Page>
      <Editor
        {nodes}
        pannable={false}
        zoomable={false}
        appearance="dark"
        bind:state
      />
    </Page>
  </View>
</App>