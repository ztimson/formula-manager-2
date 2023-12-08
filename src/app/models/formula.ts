import {Component} from './component';

export interface Formula {
  ref?: any;

  approved: boolean;
  approvedOn: Date | any;
  components: {component: Component; quantity: number}[];
  createdOn: Date | any;
  id: string;
  name: string;
  total?: number
}
