import { dia } from 'jointjs';

export interface IJointData {
  isMaintainer: boolean,
  readOnly: boolean,
  showSaveDialog: boolean,
  paper: dia.Paper | undefined,
  graph: dia.Graph,
}
