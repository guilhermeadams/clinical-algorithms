import { dia } from 'jointjs';

export interface IJointData {
  loadingGraph: boolean,
  paper: dia.Paper | undefined,
  graph: dia.Graph,
  options: object,
}
