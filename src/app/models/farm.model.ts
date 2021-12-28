import { Plot } from './plot.model';
import * as moment from 'moment';

export class Farm {
  public name: string;
  public id: string;
  public plotQuantity: number = 0;
  public plots: Plot[] = [];
  public farmProductivity: number = 0;

  constructor(name: string, plotQuantity?: number) {
    this.name = name;
    this.id = moment().unix().toString();

    if(plotQuantity) {
      this.plotQuantity = plotQuantity;
    }
  }
}
