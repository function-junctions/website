<style lang="scss" global>
  @import './App.scss';
</style>

<script lang="ts">
  import type {
    EditorState,
    NodeBlueprint,
    SocketBlueprint,
    Editor as EditorClass,
  } from 'function-junctions/types';
  import TextNode from './components/TextNode.svelte';
  import { Editor } from 'function-junctions';
  import TitleNode from './components/TitleNode.svelte';
  import GitHubNode from './components/GitHubNode.svelte';
  import ColorNode from './components/ColorNode.svelte';
  import StyleNode from './components/StyleNode.svelte';
  import { App, Page, View } from 'framework7-svelte';
  import WelcomeNode from './components/WelcomeNode.svelte';
  import Welcome from '../../components/Welcome/Welcome.svelte';

  let width = window.innerWidth;
  const middleX = width / 2;

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

  const JSONSocket: SocketBlueprint<string> = {
    type: 'JSON',
    defaultValue: '',
    color: '#673ab7',
  };

  const titleNode: NodeBlueprint<{
    Title: SocketBlueprint<string>;
    Subtitle: SocketBlueprint<string>;
    'Primary A': SocketBlueprint<string>;
    'Primary B': SocketBlueprint<string>;
    'Secondary A': SocketBlueprint<string>;
    'Secondary B': SocketBlueprint<string>;
  },
  {
    Style: SocketBlueprint<string>;
  }> = {
    outputs: {
      Style: JSONSocket,
    },
    inputs: {
      Title: stringSocket,
      Subtitle: stringSocket,
      'Primary A': colorSocket,
      'Primary B': colorSocket,
      'Secondary A': colorSocket,
      'Secondary B': colorSocket,
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

  const styleNode: NodeBlueprint<{
    Style: SocketBlueprint<string>;
  }, Record<string, never>> = {
    inputs: {
      Style: JSONSocket,
    },
    component: StyleNode,
    color: 'linear-gradient(#673ab7, #563098)',
  };

  const githubNode: NodeBlueprint<Record<string, never>, Record<string, never>> = {
    component: GitHubNode,
    className: 'node-no-title',
  };

  const welcomeNode: NodeBlueprint<Record<string, never>, Record<string, never>> = {
    component: WelcomeNode,
    className: 'node-no-title',
    style: `width: ${width - 600}px; height: 400px;overflow-y: scroll`,
  };

  const nodes = {
    Title: titleNode,
    Text: textNode,
    GitHub: githubNode,
    Color: colorNode,
    Style: styleNode,
    Welcome: welcomeNode,
  };

  let state: EditorState = {
    nodes: {
      0: {
        x: 40,
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
        x: 70,
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
        x: 40,
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
        x: width - 220,
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
        x: 80,
        y: 520,
        type: 'Color',
        outputs: {
          Color: {
            type: 'color',
            value: '#f975f7',
          },
        },
      },
      5: {
        x: width - 250,
        y: 540,
        type: 'Color',
        outputs: {
          Color: {
            type: 'color',
            value: '#f008b7',
          },
        },
      },
      6: {
        x: middleX - 300,
        y: 30,
        type: 'Title',
        inputs: {
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
          'Secondary A': {
            connection: {
              connectedNodeId: '4',
              connectedSocketId: 'Color',
            },
            type: 'color',
            value: '#f975f7',
          },
          'Secondary B': {
            type: 'color',
            value: '#f008b7',
            connection: {
              connectedNodeId: '5',
              connectedSocketId: 'Color',
            },
          },
        },
        outputs: {
          type: 'JSON',
          value: '{"Primary A":"#a441d2","Primary B":"#e8b7ff","Secondary A":"#f975f7","Secondary B":"#f008b7"}',
        },
      },
      7: {
        x: width - 280,
        y: 70,
        type: 'Style',
        inputs: {
          Style: {
            connection: {
              connectedNodeId: '6',
              connectedSocketId: 'Style',
            },
            type: 'JSON',
            value: '{"Primary A":"#a441d2","Primary B":"#e8b7ff","Secondary A":"#f975f7","Secondary B":"#f008b7"}',
          },
        },
      },
      8: {
        x: middleX - 88.5,
        y: 310,
        type: 'GitHub',
      },
      9: {
        x: middleX - ((width - 600) / 2),
        y: 470,
        type: 'Welcome',
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
      {#if width > 1050}
        <Editor
          {nodes}
          pannable={false}
          zoomable={false}
          appearance="dark"
          bind:state
        />
      {:else}
        <Welcome showCrazyTitle />
      {/if}
    </Page>
  </View>
</App>