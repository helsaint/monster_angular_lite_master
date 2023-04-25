import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiChoroplethService } from '../../../api-choropleth.service';
import * as d3 from 'd3';
import * as topojson from 'topojson';

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.scss']
})
export class ScatterplotComponent implements OnInit {
  private svg: any;
  private dataset_geo: any;
  private dataset_sofifa: any;
  private margin = 50;
  private width = 400;
  private height = 300;

  constructor(private http:HttpClient, private api:ApiChoroplethService) { }

  ngOnInit(): void {
    
    //d3.json('assets/json/world.json').then((data:any) => {
    //  const world = topojson.feature(data, data.objects.countries);
    //  this.drawMap(world);
    //  console.log(data);
    //})

    d3.json('assets/json/world-countries.json').then((data:any) =>{
      //console.log(data.features);
      this.dataset_geo = data;
      //this.drawMap(data);
    })
    
    this.api.getChoroplethData().subscribe((data)=>{
      //this.drawMap(this.dataset_geo);
      this.dataset_sofifa = data;
      this.fillMap(this.dataset_sofifa);
      for (const i in this.dataset_geo.features){
        if(this.dataset_sofifa.hasOwnProperty(this.dataset_geo.features[i].id)){
          let str_temp = this.dataset_geo.features[i].id;
          let int_temp = this.dataset_sofifa[str_temp]
          this.dataset_geo.features[i].properties.numplayers = int_temp;  
        }else{
          let str_temp = this.dataset_geo.features[i].id;
          this.dataset_geo.features[i].properties.numplayers = 0;
        }
      }
      this.drawMap(this.dataset_geo);
    })

  }

  private fillMap(data: any): void{
    
  }

  private drawMap(topo:any): void{

    this.svg = d3.select(".map")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height);

    let projection = d3.geoMercator()
    .scale(70)
    .center([0,20])
    .translate([this.width/2, this.height/2]);

    let path = d3.geoPath().projection(projection);

    let color_scale = d3.scaleThreshold<number,string>()
    .domain([10,50,100,200,300,400,500,600,700,800,900,1000,1500,2000,2500,3000])
    .range(d3.schemeCategory10);

    this.svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", path)
    .style('fill', function (d:any) {
      const value = d.properties['numplayers'];
      if(value){
        return color_scale(d.properties['numplayers']);
        //return '#000';
      }
      else{
        return '#ccc';
      }
    });
  }

  
}
