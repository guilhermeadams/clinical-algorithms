import { dia } from 'jointjs';

export interface IJointData {
  readOnly: boolean,
  showSaveDialog: boolean,
  paper: dia.Paper | undefined,
  graph: dia.Graph,
}
