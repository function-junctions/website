import type { NodeBlueprint, SocketBlueprint } from 'function-junctions/types';

export type TitleNodeBlueprint = NodeBlueprint<
{
  Title: SocketBlueprint<string>;
  Subtitle: SocketBlueprint<string>;
  'Primary A': SocketBlueprint<string>;
  'Primary B': SocketBlueprint<string>;
  Secondary: SocketBlueprint<string>;
},
{
  Number: SocketBlueprint<string>;
}>;