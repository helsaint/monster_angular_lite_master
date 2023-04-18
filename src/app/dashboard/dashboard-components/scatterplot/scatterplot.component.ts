import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import * as topojson from 'topojson';

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.scss']
})
export class ScatterplotComponent implements OnInit {
  private svg: any
  private margin = 50;
  private width = 400;
  private height = 300;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    d3.json('assets/json/world.json').then((data:any) => {
      const world = topojson.feature(data, data.objects.countries);
      this.drawMap(world);
    })

  }

  private drawMap(topo:any): void{
    this.svg = d3.select("figure#map")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height);

    let path = d3.geoPath();
    let projection = d3.geoMercator()
    .scale(70)
    .center([0,20])
    .translate([this.width/2, this.height/2]);
    let colorScale = d3.scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000]);

    this.svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      .attr("d", path
      .projection(projection)
      );


    
  }
  
}
