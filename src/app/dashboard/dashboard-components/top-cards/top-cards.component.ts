import { Component, OnInit } from '@angular/core';
import {topcard,topcards} from './top-cards-data';
import { ApiGeneralService } from '../../../api-general.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  testtopcards:topcard[];
  playerData:any = null;

  constructor(private api:ApiGeneralService) { 
    
    this.testtopcards = [];
    //this.testtopcards=topcards;
  }

  ngOnInit(): void {
    this.api.getPlayers().subscribe((data) =>{
      this.playerData=data;
      let topcard_item: topcard;
      let array_icons = ['bi bi-people', 'bi bi-heart', 'bi bi-wallet', 'bi bi-arrow-up',
    'bi bi-piggy-bank', 'bi bi-globe','bi bi-compass','bi bi-currency-euro', 
    'bi bi-compass','bi bi-currency-euro', 'bi bi-person','bi bi-currency-euro'];
      let array_subtitle = ['# of players in dataset', 'Median Age', 'Median Wage', 
      'Median Height', 'Median Weight', 'Mode Nationality']
      //for(let i =0 ; i < 4; i++){
      //  topcard_item = {bgcolor:array_bgcolor[i], 'icon': array_icons[i], 
      //  title:String(this.playerData['Median Age']), subtitle:array_subtitle[i]};
      //  this.testtopcards.push(topcard_item);
      //  console.log(this.playerData);
      //}
      let i = 0;
      for(const [key,value] of Object.entries(this.playerData)){
        topcard_item = {bgcolor:'success', 'icon': array_icons[i],
      title:String(this.playerData[key]), subtitle: key};
      this.testtopcards.push(topcard_item); 
      i = i+1;
      }
    })
  }

}
