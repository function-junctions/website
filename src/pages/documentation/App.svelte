<style lang="scss" global>
  @import './App.scss';
</style>

<script lang="ts">
  import {
    App,
    Block,
    BlockFooter,
    Page,
    Tab,
    Tabs,
    View,
    Views,
  } from 'framework7-svelte';
  import Sidebar from '../../components/Sidebar/Sidebar.svelte';

  import Highlight from 'svelte-highlight';
  import xml from 'svelte-highlight/languages/xml';
  import shell from 'svelte-highlight/languages/shell';
  import github from 'svelte-highlight/styles/github-dark';

  const code = {
    installation: `
# npm
npm install function-junctions --save-dev
# yarn
yarn add function-junctions -D
# pnpm
pnpm add function-junctions -D
    `,
    usage: `
<script lang="ts">
  import type {
    EditorState,
    NodeBlueprint,
    SocketBlueprint,
    Editor as EditorType,
  } from 'function-junctions/types';

  import { Editor } from 'function-junctions';

  import NumberNode from './components/NumberNode.svelte';
  import MathNode from './components/MathNode.svelte';

  let state: EditorState = {
    nodes: {
      0: {
        x: 40,
        y: 107,
        type: 'Number',
        outputs: {
          Number: {
            type: 'number',
            value: 2,
          },
        },
      },
      1: {
        x: 300,
        y: 127,
        type: 'Math',
        inputs: {
          LHS: {
            type: 'number',
            connection: {
              connectedNodeId: '0',
              connectedSocketId: 'Number',
            },
          },
          RHS: {
            type: 'number',
            connection: {
              connectedNodeId: '0',
              connectedSocketId: 'Number',
            },
          },
        },
      },
    },
  };

  const numberSocket: SocketBlueprint<number> = {
    type: 'number',
    defaultValue: 0,
  };
  
  const numberNode: NodeBlueprint<Record<string, never>,
    {
      Number: SocketBlueprint<number>
    }> = {
      outputs: {
        Number: numberSocket,
      },
      component: NumberNode,
      color: 'linear-gradient(#228cfd, #007aff)',
    };

  const mathNode: NodeBlueprint<{
    LHS: SocketBlueprint<number>
    RHS: SocketBlueprint<number>
  },
    {
      Number: SocketBlueprint<number>
    }
    > = {
      inputs: {
        LHS: numberSocket,
        RHS: numberSocket,
      },
      outputs: {
        Number: numberSocket,
      },
      component: MathNode,
      color: 'linear-gradient(#ff5776, #ff2d55)',
    };

  const nodes = {
    Number: numberNode,
    Math: mathNode,
  };

  let editor: EditorType;
<\/script>

<Editor
  {nodes}
  bind:state
  bind:instance={editor}
/>
    `,
  };

  document.getElementsByTagName('html')[0].className = `
  ${document.getElementsByTagName('html')[0].className}
  with-panel with-panel-left-reveal`;

  let activeTab = 'getting-started';
</script>

<svelte:head>
  {@html github}
</svelte:head>

<App {...{
  theme: 'ios',
  autoDarkMode: false,
  dark: true,
  name: 'Function Junctions',
}}>
  <Views>
    <View main>
      <Tabs>
        <Tab tabActive={activeTab === 'getting-started'}>
          <Page>
            <Block>
              <br />
              <h1>Getting Started</h1>
              <BlockFooter>
                Getting started assumes you have setup a working svelte project.
                To learn more about setting up a svelte environment, visit
                <a href="https://kit.svelte.dev/docs/introduction" class="external" target=”_blank”>the SvelteKit docs...</a>
              </BlockFooter>
              <br />
              <h3>Installation</h3>
              <Highlight language={shell} code={code.installation} />
              <br />
              <p>Next, learn how to start interacting with <a on:click={() => (activeTab = 'editor')}>the editor...</a></p>
            </Block>
          </Page>
        </Tab>
        <Tab tabActive={activeTab === 'editor'}>
          <Page>
            <Block>
              <br />
              <h1>Editor</h1>
              <p>
                The editor is the central component to interact with nodes, state, and events.
              </p>
              <br />
              <h3>Properties</h3>
            </Block>
          </Page>
        </Tab>
      </Tabs>
    </View>
  </Views>
  <Sidebar items={[
    {
      title: 'Getting Started',
      color: 'purple',
      onClick: () => (activeTab = 'getting-started'),
      active: activeTab === 'getting-started',
    },
    {
      title: 'Editor',
      color: 'purple',
      onClick: () => (activeTab = 'editor'),
      active: activeTab === 'editor',
    },
    {
      title: 'Nodes',
      color: 'purple',
      onClick: () => (activeTab = 'nodes'),
      active: activeTab === 'nodes',
    },
    {
      title: 'Sockets',
      color: 'purple',
      onClick: () => (activeTab = 'sockets'),
      active: activeTab === 'sockets',
    },
    {
      title: 'State',
      color: 'purple',
      onClick: () => (activeTab = 'state'),
      active: activeTab === 'state',
    },
  ]} />
</App>