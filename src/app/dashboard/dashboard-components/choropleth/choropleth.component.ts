import { Component, OnInit } from '@angular/core';
import { ApiBubblePlotEarningsService } from '../../../api-bubble-plot-earnings.service';


@Component({
  selector: 'app-choropleth',
  templateUrl: './choropleth.component.html',
  styleUrls: ['./choropleth.component.scss']
})
export class ChoroplethComponent implements OnInit {

  public graph = {
    data: [
      {
        x: [],
        y: [],
        text: [],
        mode: 'markers',
        type:'scatter'
      }
    ],
    layout: {title: 'Scatter Plot of Wages against value', widht:600, height: 600}
  };

  playerData:any=null;
  constructor(private api:ApiBubblePlotEarningsService) {
   }

  ngOnInit(): void {
    this.api.getBubblePlotEarnings().subscribe((data) =>{
      this.playerData = data;
      this.graph.data[0].x = this.playerData['wage_eur'];
      this.graph.data[0].y = this.playerData['value_eur'];
      this.graph.data[0].text = this.playerData['short_name'];
    })
  }

}
