import { Injectable } from '@angular/core';
import { Plot } from 'src/app/models/plot.model';

@Injectable({
  providedIn: 'root'
})
export class PlotService {

  constructor() { }

  public calculatePlotProductivity(plot: Plot): Plot {
    if (plot.area && plot.production.length > 0) {
      let sum = 0;
      plot.production.forEach(registry => sum += registry);
      plot.plotProductivity = sum/plot.area;
    } else {
      plot.plotProductivity = 0;
    }

    return plot;
  }
}
