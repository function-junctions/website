<style lang="scss" global>
  @import './App.scss';
</style>

<script lang="ts">
  /* eslint-disable no-useless-escape */
  import {
    App,
    Block,
    BlockFooter,
    Button,
    Page,
    Segmented,
    Tab,
    Tabs,
    View,
    Views,
  } from 'framework7-svelte';
  import Sidebar from '../../components/Sidebar/Sidebar.svelte';

  import Highlight from 'svelte-highlight';
  import xml from 'svelte-highlight/languages/xml';
  import typescript from 'svelte-highlight/languages/typescript';
  import shell from 'svelte-highlight/languages/shell';
  import github from 'svelte-highlight/styles/github-dark';
import { Editor } from 'function-junctions/types';

  const code = {
    installation: `
# npm
npm install function-junctions --save-dev
# yarn
yarn add function-junctions -D
# pnpm
pnpm add function-junctions -D
    `,
    editor: `
<script lang="ts">
  import type {
    Editor as EditorType,
  } from 'function-junctions/types';

  import { Editor } from 'function-junctions';

  let editor: EditorType;
<\/script>

<Editor
  nodes={{}}
  bind:instance={editor}
/>
    `,
    socket: `
const numberSocket: SocketBlueprint<number> = {
  type: 'number',
  defaultValue: 0,
};
    `,
    nodes: `
<script lang="ts">
  import type {
    NodeBlueprint,
    SocketBlueprint,
    Editor as EditorType,
  } from 'function-junctions/types';

  import { Editor } from 'function-junctions';

  import NumberNode from './NumberNode.svelte';
  import MathNode from './MathNode.svelte';

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
  bind:instance={editor}
/>
    `,
    numberNode: `
<script lang="ts">
  import type { OutputSocket, OutputSockets } from 'function-junctions/types';

  export let outputs: OutputSockets<{
    Number: OutputSocket<number>;
  }>;

  const { value } = outputs.Number;
<\/script>

<input type="number" bind:value={$value} />
    `,
    mathNode: `
<script lang="ts">
  import type {
    InputSockets,
    InputSocket,
    OutputSocket,
    OutputSockets,
  } from 'function-junctions/types';

  export let inputs: InputSockets<{
    LHS: InputSocket<number>;
    RHS: InputSocket<number>;
  }>;

  export let outputs: OutputSockets<{
    Number: OutputSocket<number>;
  }>;

  export let store: {
    type: 'addition' | 'subtraction' | 'multiplication' | 'division'
  } = {
    type: 'addition',
  };

  const { value: LHS } = inputs.LHS;
  const { value: RHS } = inputs.RHS;
  
  const { value: output } = outputs.Number;

  const getValue = () => {
    const { type } = store;

    switch (type) {
      case 'addition':
        $output = $LHS + $RHS;
        break;
      case 'subtraction':
        $output = $LHS - $RHS;
        break;
      case 'multiplication':
        $output = $LHS * $RHS;
        break;
      case 'division':
        $output = $LHS / $RHS;
        break;
    }
  };

  $: inputs, store, getValue();
<\/script>

<h1 style="text-align: center">{$output}</h1>
<select
  bind:value={store.type}
  style="width: 100%"
>
  <option value="addition">Addition</option>
  <option value="subtraction">Subtraction</option>
  <option value="multiplication">Multiplication</option>
  <option value="division">Division</option>
</select>
    `,
    state: `
<script lang="ts">
  import type {
    EditorState,
    NodeBlueprint,
    SocketBlueprint,
    Editor as EditorType,
  } from 'function-junctions/types';

  import { Editor } from 'function-junctions';

  import NumberNode from './NumberNode.svelte';
  import MathNode from './MathNode.svelte';

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
  with-panel with-panel-left-reveal dark`;

  let activeTab = window.location.hash.replace('#', '') || 'getting-started';

  $: window.location.hash = activeTab;
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
              <BlockFooter>Properties of the {'<'}<span class="text-color-blue">Editor</span>{' />'} svelte component</BlockFooter>
              <p />
              <div class="data-table">
                <table>
                  <thead>
                    <tr>
                      <th class="label-cell">Property</th>
                      <th class="label-cell">Type</th>
                      <th class="label-cell">Default</th>
                      <th class="label-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="label-cell">appearance</td>
                      <td class="label-cell">'light' | 'dark' | 'auto'</td>
                      <td class="label-cell text-color-blue">'auto'</td>
                      <td class="label-cell">The default layout apperance. On auto this is dictated by the "prefers-color-scheme" tag</td>
                    </tr>
                    <tr>
                      <td class="label-cell">editable</td>
                      <td class="label-cell">boolean</td>
                      <td class="label-cell text-color-blue">true</td>
                      <td class="label-cell">Allows nodes to be disconnected or reconnected</td>
                    </tr>
                    <tr>
                      <td class="label-cell">instance</td>
                      <td class="label-cell">Editor</td>
                      <td class="label-cell text-color-blue">Editor</td>
                      <td class="label-cell">Use with <b>bind:</b> to get the editor instance</td>
                    </tr>
                    <tr>
                      <td class="label-cell">moveable</td>
                      <td class="label-cell">boolean</td>
                      <td class="label-cell text-color-blue">true</td>
                      <td class="label-cell">Allows nodes to be moved</td>
                    </tr>
                    <tr>
                      <td class="label-cell">multiselect</td>
                      <td class="label-cell">boolean</td>
                      <td class="label-cell text-color-blue">true</td>
                      <td class="label-cell">Allows multiple nodes in the editor to be selected with the shift key</td>
                    </tr>
                    <tr>
                      <td class="label-cell">nodes</td>
                      <td class="label-cell">{'Record<string, NodeBlueprint'}></td>
                      <td class="label-cell text-color-blue"></td>
                      <td class="label-cell">Nodes to register to the editor. See more at <a on:click={() => (activeTab = 'nodes')}>Nodes</a></td>
                    </tr>
                    <tr>
                      <td class="label-cell">onReady</td>
                      <td class="label-cell">(instance: Editor) => void | undefined</td>
                      <td class="label-cell text-color-blue">undefined</td>
                      <td class="label-cell">Gets called when editor is ready</td>
                    </tr>
                    <tr>
                      <td class="label-cell">pannable</td>
                      <td class="label-cell">boolean</td>
                      <td class="label-cell text-color-blue">true</td>
                      <td class="label-cell">Allows the editor position to be panned</td>
                    </tr>
                    <tr>
                      <td class="label-cell">state</td>
                      <td class="label-cell">EditorState | undefined</td>
                      <td class="label-cell text-color-blue">undefined</td>
                      <td class="label-cell">Allows the editor to be restored to a saved state. When bound with the <b>bind:</b> key, it will update the bound variable</td>
                    </tr>
                    <tr>
                      <td class="label-cell">zoomable</td>
                      <td class="label-cell">boolean</td>
                      <td class="label-cell text-color-blue">true</td>
                      <td class="label-cell">Allows the editor to be zoomed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <h3>Usage</h3>
              <p>
                The first thing we'll do is instantiate an empty editor with no nodes or sockets.
                (Notice the use of '{'{}'}' to instanciate the nodes prop). This will give you an
                empty editor.
              </p>
              <span style="font-size: 12px">index.svelte</span>
              <Highlight language={xml} code={code.editor} />
              <br />
              <p>Now take a look at <a on:click={() => (activeTab = 'sockets')}>sockets</a> to learn about how nodes communicate with each other.</p>
            </Block>
          </Page>
        </Tab>
        <Tab tabActive={activeTab === 'sockets'}>
          <Page>
            <Block>
              <br />
              <h1>Sockets</h1>
              <p>
                Sockets are the primary method for node to node interaction.
                They are the gatekeeper and communicator, and will enable your
                nodes to connect to each other.
              </p>
              <br />
              <h3>Properties</h3>
              <BlockFooter>Properties of the <span class="text-color-blue">SocketBlueprint{'<T>'}</span> type</BlockFooter>
              <p />
              <div class="data-table">
                <table>
                  <thead>
                    <tr>
                      <th class="label-cell">Property</th>
                      <th class="label-cell">Type</th>
                      <th class="label-cell">Default</th>
                      <th class="label-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="label-cell">type</td>
                      <td class="label-cell">string</td>
                      <td class="label-cell text-color-blue"></td>
                      <td class="label-cell">The type name of your socket. Sockets must be the same type to connect to each other</td>
                    </tr>
                    <tr>
                      <td class="label-cell">defaultValue</td>
                      <td class="label-cell">T | undefined</td>
                      <td class="label-cell text-color-blue">undefined</td>
                      <td class="label-cell">The default value your socket will emit when it is not connected to another socket</td>
                    </tr>
                    <tr>
                      <td class="label-cell">color</td>
                      <td class="label-cell">string | undefined</td>
                      <td class="label-cell text-color-blue">undefined</td>
                      <td class="label-cell">A color string to differentiate your socket types</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <h3>Usage</h3>
              <p>To setup a socket, simpily create a new socket object. This will be consumed later by our nodes.</p>
              <p />
              <span style="font-size: 12px">sockets.ts</span>
              <Highlight language={typescript} code={code.socket} />
              <BlockFooter>In this example we have instantiated a new socket called 'number' with the default value of <i>0</i></BlockFooter>
              <br />
              <p>Now that we have created a socket, we can see how we setup a <a on:click={() => (activeTab = 'nodes')}>node</a></p>
            </Block>
          </Page>
        </Tab>
        <Tab tabActive={activeTab === 'nodes'}>
          <Page>
            <Block>
              <br />
              <h1>Nodes</h1>
              <p>The node is what is displayed in the editor, and enables users to interact with its
                <a on:click={() => (activeTab = 'sockets')}>sockets</a> and its corresponding
                <a on:click={() => (activeTab = 'components')}>component</a>
              </p>
              <br />
              <h3>Properties</h3>
              <BlockFooter>Properties of the <span class="text-color-blue">NodeBlueprint{'<I = Record<string, SocketBlueprint> | undefined, O = Record<string, SocketBlueprint> | undefined>'}</span> type</BlockFooter>
              <p />
              <div class="data-table">
                <table>
                  <thead>
                    <tr>
                      <th class="label-cell">Property</th>
                      <th class="label-cell">Type</th>
                      <th class="label-cell">Default</th>
                      <th class="label-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="label-cell">color</td>
                      <td class="label-cell">string | undefined</td>
                      <td class="label-cell text-color-blue">undefined</td>
                      <td class="label-cell">A color string to differentiate your nodes</td>
                    </tr>
                    <tr>
                      <td class="label-cell">component</td>
                      <td class="label-cell">typeof SvelteComponentDev</td>
                      <td class="label-cell text-color-blue"></td>
                      <td class="label-cell">The content of your node. <a on:click={() => (activeTab = 'components')}>Learn more about components here...</a></td>
                    </tr>
                    <tr>
                      <td class="label-cell">className</td>
                      <td class="label-cell">string | undefined</td>
                      <td class="label-cell text-color-blue">undefined</td>
                      <td class="label-cell">Additional classNames to add to the root of your node</td>
                    </tr>
                    <tr>
                      <td class="label-cell">inputs</td>
                      <td class="label-cell">I | undefined</td>
                      <td class="label-cell text-color-blue">undefined</td>
                      <td class="label-cell">The input sockets linked to the node</td>
                    </tr>
                    <tr>
                      <td class="label-cell">outputs</td>
                      <td class="label-cell">O | undefined</td>
                      <td class="label-cell text-color-blue">undefined</td>
                      <td class="label-cell">The output sockets linked to the node</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <h3>Usage</h3>
              <p>To setup a node, create a new node object. In this example we have created 2 nodes
                (one called "Number" and another called "Math"), using the number socket we created in the
                <a on:click={() => (activeTab = 'sockets')}> Socket</a> example.
              </p>
              <p />
              <span style="font-size: 12px">index.svelte</span>
              <Highlight language={xml} code={code.nodes} />
              <BlockFooter>If you notice in this example, you'll see there are 2 components being imported –
                 one called <i>NumberNode</i> and another called <i>MathNode</i>. This is covered in the next section: 
                 <a on:click={() => (activeTab = 'components')}>Components</a>
              </BlockFooter>
              <br />
              <p>
                Now that we have registered nodes, let's look at the contents of each
                <a on:click={() => (activeTab = 'components')}>component</a>
              </p>
            </Block>
          </Page>
        </Tab>
        <Tab tabActive={activeTab === 'components'}>
          <Page>
            <Block>
              <br />
              <h1>Components</h1>
              <p>
                Components are the content of your nodes. This is where you will mutate the values of your outputs.
              </p>
              <br />
              <h3>Properties</h3>
              <BlockFooter>Properties of the specified component</BlockFooter>
              <p />
              <div class="data-table">
                <table>
                  <thead>
                    <tr>
                      <th class="label-cell">Property</th>
                      <th class="label-cell">Type</th>
                      <th class="label-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="label-cell">inputs</td>
                      <td class="label-cell">InputSockets | undefined</td>
                      <td class="label-cell">The inputs from connected nodes</td>
                    </tr>
                    <tr>
                      <td class="label-cell">outputs</td>
                      <td class="label-cell">OutputSockets | undefined</td>
                      <td class="label-cell">The output of the node</td>
                    </tr>
                    <tr>
                      <td class="label-cell">store</td>
                      <td class="label-cell">Record{'<string, unknown>'}</td>
                      <td class="label-cell">Variables stored or to be stored in <a on:click={() => (activeTab = 'state')}>state</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <h3>Usage</h3>
              <p>
                In the previous example, we referenced a "NumberNode" component and a "MathNode" component.
              </p>
              <p />
              <span style="font-size: 12px">NumberNode.svelte</span>
              <Highlight language={xml} code={code.numberNode} />
              <BlockFooter>The output socket is bound to the {'<input />'} component which changes the output value, which leads to any
                connected input to get updated</BlockFooter>
              <br />
              <span style="font-size: 12px">MathNode.svelte</span>
              <Highlight language={xml} code={code.mathNode} />
              <BlockFooter>
                The MathNode then grabs each value from the input socket to compute a new value based on
                the computation method stored in the store property
              </BlockFooter>
              <br />
              <p>Now that the components are ready, let's put everything together by learning about <a on:click={() => (activeTab = 'state')}>state</a></p>
            </Block>
          </Page>
        </Tab>
        <Tab tabActive={activeTab === 'state'}>
          <Page>
            <Block>
              <br />
              <h1>State</h1>
              <p>
                State is a object of positions and values to be tracked
              </p>
              <br />
              <h3>Properties</h3>
              <BlockFooter>Properties of the <span class="text-color-blue">EditorState</span> type</BlockFooter>
              <BlockFooter>
                <i>
                  Note: these properties should not be edited directly and should be obtained from the editor by binding state
                </i>
              </BlockFooter>
              <br />
              <br />
              <b>Position</b>
              <BlockFooter>Properties of <span class="text-color-blue">Position</span>: ie. the position of your editor 'EditorState.position'</BlockFooter>
              <p />
              <div class="data-table">
                <table>
                  <thead>
                    <tr>
                      <th class="label-cell">Property</th>
                      <th class="label-cell">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="label-cell">originX</td>
                      <td class="label-cell">number</td>
                    </tr>
                    <tr>
                      <td class="label-cell">originY</td>
                      <td class="label-cell">number</td>
                    </tr>
                    <tr>
                      <td class="label-cell">translateX</td>
                      <td class="label-cell">number</td>
                    </tr>
                    <tr>
                      <td class="label-cell">translateY</td>
                      <td class="label-cell">number</td>
                    </tr>
                    <tr>
                      <td class="label-cell">scale</td>
                      <td class="label-cell">number</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <br />
              <b>Nodes</b>
              <BlockFooter>The properties in the <span class="text-color-blue">NodeState</span> object, which is accessed via 'EditorState.nodes[key]'</BlockFooter>
              <p />
              <div class="data-table">
                <table>
                  <thead>
                    <tr>
                      <th class="label-cell">Property</th>
                      <th class="label-cell">Type</th>
                      <th class="label-cell">Default</th>
                      <th class="label-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="label-cell">type</td>
                      <td class="label-cell">string</td>
                      <td class="label-cell text-color-blue"></td>
                      <td class="label-cell">The type of your node</td>
                    </tr>
                    <tr>
                      <td class="label-cell">store</td>
                      <td class="label-cell">{'Record<string, unknown>'}</td>
                      <td class="label-cell text-color-blue"></td>
                      <td class="label-cell">The stored state of the node</td>
                    </tr>
                    <tr>
                      <td class="label-cell">inputs</td>
                      <td class="label-cell">InputSocketState | undefined</td>
                      <td class="label-cell text-color-blue">undefined</td>
                      <td class="label-cell">The state of the input sockets linked to the node</td>
                    </tr>
                    <tr>
                      <td class="label-cell">outputs</td>
                      <td class="label-cell">OutputSocketState | undefined</td>
                      <td class="label-cell text-color-blue">undefined</td>
                      <td class="label-cell">The state of the output sockets linked to the node</td>
                    </tr>
                    <tr>
                      <td class="label-cell">x</td>
                      <td class="label-cell">number</td>
                      <td class="label-cell text-color-blue"></td>
                      <td class="label-cell">The x position of your node</td>
                    </tr>
                    <tr>
                      <td class="label-cell">y</td>
                      <td class="label-cell">number</td>
                      <td class="label-cell text-color-blue"></td>
                      <td class="label-cell">The y position of your node</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <h3>Usage</h3>
              <p>
                Now let's put everything together. This strings together all the examples featured in
                <a on:click={() => (activeTab = 'editor')}>Editor</a>,
                <a on:click={() => (activeTab = 'sockets')}>Sockets</a>,
                <a on:click={() => (activeTab = 'nodes')}>Nodes</a>, and
                <a on:click={() => (activeTab = 'components')}>Components</a>.
              </p>
              <p />
              <span style="font-size: 12px">index.svelte</span>
              <Highlight language={xml} code={code.state} />
              <br />
              <p>
                Now that we know about the basic correlation between <a on:click={() => (activeTab = 'editor')}>the editor</a>
                and it's respective components, let's take a look at
                <a on:click={() => (activeTab = 'instance')}>the editor instance...</a>
              </p>
            </Block>
          </Page>
        </Tab>
        <Tab tabActive={activeTab === 'instance'}>
          <Page>
            <Block>
              <br />
              <h1>Instance</h1>
              <p>
                The instance gives you more fine-grain control over the editor by exposing the internal
                class keeping track of your state
              </p>
              <br />
              <h3>Properties</h3>
              <BlockFooter>Properties of the <span class="text-color-blue">Editor</span> class</BlockFooter>
              <p />
              <div class="data-table">
                <table>
                  <thead>
                    <tr>
                      <th class="label-cell">Property</th>
                      <th class="label-cell">Type</th>
                      <th class="label-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="label-cell">addNode</td>
                      <td class="label-cell">
                        (key: string,
                        position?: {'{ x: number, y: number }'},
                        state?: {'{ id?: number; blueprint: '}
                        <a on:click={() => (activeTab = 'state')}>EditorState['nodes'][key]</a> {'}'}) => void</td>
                      <td class="label-cell">Add a node in the editor. The key is the key name of your registered
                        <a on:click={() => (activeTab = 'nodes')}>node</a>
                      </td>
                    </tr>
                    <tr>
                      <td class="label-cell">deleteNode</td>
                      <td class="label-cell">
                        (id: string) => void</td>
                      <td class="label-cell">Delete a specific node in the editor.
                        The ID in this context is the key of the node in the <a on:click={() => (activeTab = 'state')}>NodesState</a>
                        property
                      </td>
                    </tr>
                    <tr>
                      <td class="label-cell">cloneNode</td>
                      <td class="label-cell">
                        (id: string, position?: {'{ x: number, y: number }'}) => void</td>
                      <td class="label-cell">Clone a specific node in the editor.
                        The ID in this context is the key of the node in the <a on:click={() => (activeTab = 'state')}>NodesState</a>
                        property
                      </td>
                    </tr>
                    <tr>
                      <td class="label-cell">updateState</td>
                      <td class="label-cell">
                        () => void</td>
                      <td class="label-cell">
                        Manually call a state update. This is done automatically
                        and is unlikely you will need to call this manually
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <br />
              <p>We're at the end! To see more examples, <a on:click={() => (activeTab = 'examples')}>visit the examples page...</a></p>
            </Block>
          </Page>
        </Tab>
        <Tab tabActive={activeTab === 'examples'}>
          <Page>
            <Block>
              <br />
              <h1>Examples</h1>
              <BlockFooter>More examples will be added soon...</BlockFooter>
              <br />
              <br />
              <a class="external" href="https://stackblitz.com/edit/fjs-basic?file=src%2FApp.svelte" target="_blank">Basic example</a>
              <p />
              <a class="external" href="https://stackblitz.com/edit/fjs-json?file=src%2FApp.svelte" target="_blank">Example with serialized JSON</a>
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
      title: 'Sockets',
      color: 'purple',
      onClick: () => (activeTab = 'sockets'),
      active: activeTab === 'sockets',
    },
    {
      title: 'Nodes',
      color: 'purple',
      onClick: () => (activeTab = 'nodes'),
      active: activeTab === 'nodes',
    },
    {
      title: 'Components',
      color: 'purple',
      onClick: () => (activeTab = 'components'),
      active: activeTab === 'components',
    },
    {
      title: 'State',
      color: 'purple',
      onClick: () => (activeTab = 'state'),
      active: activeTab === 'state',
    },
    {
      title: 'Instance',
      color: 'purple',
      onClick: () => (activeTab = 'instance'),
      active: activeTab === 'instance',
    },
    { title: '' },
    {
      title: 'Examples',
      color: 'deeppurple',
      onClick: () => (activeTab = 'examples'),
      active: activeTab === 'examples',
    },
  ]} />
</App>