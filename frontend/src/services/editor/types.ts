import { dia } from 'jointjs';

export interface IJointData {
  showSaveDialog: boolean,
  paper: dia.Paper | undefined,
  graph: dia.Graph,
}
