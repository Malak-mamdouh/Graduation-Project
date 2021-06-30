import { Component, OnInit } from '@angular/core';
import { Lock } from './lock';
import { TrackingService } from './tracking.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Position } from '@angular/compiler';
import { ActivatedRoute , ParamMap } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  location = {longitude: 1 , latitude: 2 , tripId: 1 };
  lockas = {};
   map!: mapboxgl.Map ;
  succs: any;
  id: number;
  croods: Position[][] = [] ;
// tslint:disable-next-line:typedef-whitespace
// tslint:disable-next-line:prefer-const



  constructor(private trackservvice: TrackingService, private activatedroute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
     this.id = params.id;
     console.log(this.id);
    });
    mapboxgl.accessToken = 'pk.eyJ1Ijoibm91cm1haGVyIiwiYSI6ImNrbmhiajdjMDBjY3Myb3BnOTE5ZjNqMWMifQ.cIq23rv3yZ7lXz4ABWF1eg';
    const container = document.getElementById('map');
  }
// tslint:disable-next-line:typedef
getmap(){
  this.map = new mapboxgl.Map({container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
 center: this.croods[0],
  zoom: 18
  } );
  this.map.on('load',  () => {
    this.map.addSource('route', {
    type: 'geojson',
    data: {
    type: 'Feature',
    properties: {},
    geometry: {
    type: 'LineString',
  coordinates: this.croods
    }
    }
    });
    this.map.addLayer({
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
    'line-join': 'round',
    'line-cap': 'round'
    },
    paint: {
    'line-color': '#888',
    'line-width': 8
    }
    });
    });
}
 // tslint:disable-next-line:typedef
setlocation(){
   navigator.geolocation.watchPosition( succ => {
     this.location.longitude = succ.coords.longitude;
     this.location.latitude = succ.coords.latitude;
     this.location.tripId = this.id;
     this.trackservvice.sendLocation( this.location).subscribe( res => {console.log('nour'); } );
    }, err => {console.log(err); },
    );
 }
 // tslint:disable-next-line:typedef
getlocation(){
// tslint:disable-next-line:no-unused-expression

this.trackservvice.getLocation(1).subscribe( succ => {this.succs = succ;
                                                      console.log(this.succs);
                                                      this.succs.forEach((element: any) => {
                                                         // tslint:disable-next-line:no-unused-expression
                                                      // tslint:disable-next-line:prefer-const
                                                      let lo =  element.longitude;
                                                      // tslint:disable-next-line:prefer-const
                                                      let la = element.latitude;
                                                      // tslint:disable-next-line:prefer-const
                                                      let result = [lo, la];
                                                      this.croods.push(result);

                                                       });
                                                       // tslint:disable-next-line:prefer-const

                                                       // tslint:disable-next-line:prefer-const

                                                      console.log(this.croods);

                                                      this.getmap();
} );
 }
}
