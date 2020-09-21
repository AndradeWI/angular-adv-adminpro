import { Component, Input } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent {

  @Input() title: string = 'Sem título'

   // Doughnut
@Input('labels') doughnutChartLabels: Label[] = ['label1', 'label2', 'label3'];
@Input('data') doughnutChartData: MultiDataSet = [
     [350, 450, 100],
   ];
   public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public colors: Color[] = [
    {backgroundColor: [ '#6857E6', '#009FEE', '#FFB414' ]}
  ]

}
