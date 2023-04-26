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
    const player_domain = [0, 10,50,100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,
      1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000];
    const color_range = [];
    const color_start = '#001100';
    let next_color = color_start;
    for(let i = 0; i < player_domain.length; i++){
      next_color = this.ColorLuminance(next_color,0.15);
      color_range.push(next_color);
    }

    let color_scale = d3.scaleThreshold<number,string>()
    .domain(player_domain)
    .range(color_range);

    this.svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", path)
    .attr('fill', function (d:any) {
      const value = d.properties['numplayers'];
      if(value){
        return color_scale(d.properties['numplayers']);
        //return '#000';
      }
      else{
        return '#ccc';
      }
    })
    .append("title")
    .text((d:any)=> d.properties.name + ": " + d.properties.numplayers);
  }

  private ColorLuminance(hex:any, lum:any) {
    // validate hex string
	  hex = String(hex).replace(/[^0-9a-f]/gi, '');
	  if (hex.length < 6) {
	  	hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	  }
	  lum = lum || 0;

	  // convert to decimal and change luminosity
    var rgb = "#", c, i;
	  for (i = 0; i < 3; i++) {
		  c = parseInt(hex.substr(i*2,2), 16);
		  c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		  rgb += ("00"+c).substr(c.length);
	  }

	  return rgb;
  }

  
}
