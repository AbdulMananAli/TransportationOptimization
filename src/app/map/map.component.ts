import { Component, OnInit  } from "@angular/core";
import { Observable } from "rxjs/Rx";
import * as L from "leaflet";
import { MapService } from "../map.service";
import {icon} from "leaflet";
import "rxjs/add/operator/catch";
import { MarkersService } from "./markers.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})

export class MapComponent implements OnInit {
  address: string;
  map;

constructor(
    public mapService: MapService,
    public markersservice: MarkersService
  ) {
    this.address = "";
  }


startMarker;
route1;
route2;
route3;
endMarker;
counterr = 1;
markers = [];
showShipment = false;
routeHighlight = 0;
selectedRow;
ProcessingCentre;
TransportVendor;
TransportCustomer;
score;
eCost;
arrival: Date;
ScoreValue = 0;
normalizerForType = 0;
normalizerForVendor = 0;
normalizerForCustomer = 0;
delayRoute = 0;
delayType = 0;
delayVendor = 0;
delayCustomer = 0;
totalDelay = 0;
showDate;
routeColor = "green";
routeNumber;
TTCost = 0;
TVCost = 0;
TCCost = 0;


setClickedRow(i) {
  this.selectedRow = i;
}

mapmap() {
  this.map = L.map("map", {
    zoomControl: false,
    center: L.latLng(33.682321, 73.058726),
    zoom: 5,
    minZoom: 1,
    maxZoom: 40,
    layers: [this.mapService.baseMaps.OpenStreetMap]
  });
}

routeColorChange() {
  if (this.routeNumber === 1) {
    this.map.removeLayer(this.route1);
    this.route1 =  L.polyline([this.markers[this.counterr][0]["Route1"]], {color: this.routeColor}).addTo(this.map);
  }
  if (this.routeNumber === 2) {
    this.map.removeLayer(this.route2);
    this.route2 =  L.polyline([this.markers[this.counterr][0]["Route2"]], {color: this.routeColor}).addTo(this.map);
  }
  if (this.routeNumber === 3) {
    this.map.removeLayer(this.route3);
    this.route3 =  L.polyline([this.markers[this.counterr][0]["Route3"]], {color: this.routeColor}).addTo(this.map);
  }
}

setRouteColor() {
  this.routeColor = "green";
  if (this.score <= 50) {
    this.routeColor = "red";
  }
  if (this.score  > 50 && this.score <= 70) {
    this.routeColor = "orange";
  }
}

setScore() {
  this.score = 0;
}

setShowShipment() {
  this.showShipment = true;
}

clearSettings() {
  this.ProcessingCentre = "";
  this.TransportVendor = "";
  this.TransportCustomer = "";
  this.setScore();
  this.eCost = 0;
  this.showDate = "False";
 }

removeLayers() {
  this.map.removeLayer(this.route1);
  this.map.removeLayer(this.route2);
  this.map.removeLayer(this.route3);
}

removeMarkers() {
  this.map.removeLayer(this.startMarker);
  this.map.removeLayer(this.endMarker);
}

addRoutes() {
this.route1 =  L.polyline([this.markers[this.counterr][0]["Route1"]]).addTo(this.map);
this.route1.bindPopup("Selected " + this.markers[this.counterr][0]["Processing Centre"][0]["r"]).openPopup();
this.route2 =  L.polyline([this.markers[this.counterr][0]["Route2"]]).addTo(this.map);
this.route1.bindPopup("Selected " + this.markers[this.counterr][0]["Processing Centre"][1]["r"]).openPopup();
this.route3 =  L.polyline([this.markers[this.counterr][0]["Route3"]]).addTo(this.map);
this.route1.bindPopup("Selected " + this.markers[this.counterr][0]["Processing Centre"][2]["r"]).openPopup();
}

addMarkers() {
  this.startMarker =
  L.marker([this.markers[this.counterr][0]["startLat"], this.markers[this.counterr][0]["startLng"]], {
    icon: icon({
 iconSize: [25, 41],
iconAnchor: [13, 41],
iconUrl:  "assets/marker-icon.png",
shadowUrl: "assets/marker-shadow.png"
  })
}).addTo(this.map);
this.startMarker.bindPopup(this.markers[this.counterr][0]["startName"]).openPopup();

this.endMarker = L.marker([this.markers[this.counterr][0]["endLat"], this.markers[this.counterr][0]["endLng"]], {
  icon: icon({
 iconSize: [25, 41],
iconAnchor: [13, 41],
iconUrl:  "assets/marker-icon.png",
shadowUrl: "assets/marker-shadow.png"
  })
}).addTo(this.map);
this.endMarker.bindPopup(this.markers[this.counterr][0]["endName"]).openPopup();

}

sRoute() {
this.setScore();
this.eCost = 0;
this.showDate = "True";
this.addMarkers();
this.addRoutes();
}

nRoute() {
  this.map.setZoom(5);
  this.counterr += 1;
  this.removeMarkers();
  this.removeLayers();
  this.addMarkers();
  this.addRoutes();
  this.clearSettings();
 }

 pRoute() {
  this.map.setZoom(5);
  this.counterr -= 1;
  this.removeMarkers();
  this.removeLayers();
  this.addMarkers();
  this.addRoutes();
  this.clearSettings();
}

pickRoute(value, PC, iScore, cost, d) {

 this.ProcessingCentre = PC;
 this.score = iScore;
 this.eCost = cost;
 this.delayRoute = d;
 this.totalDelay  = this.delayRoute + this.delayType + this.delayVendor + this.delayCustomer;
 this.showDate = "True";
 this.routeNumber = value;
 this.setRouteColor();
  if (value === 1) {
    this.removeLayers();
    this.route3 =  L.polyline([this.markers[this.counterr][0]["Route3"]]).addTo(this.map);
    this.route2 =  L.polyline([this.markers[this.counterr][0]["Route2"]]).addTo(this.map);
    this.route1 =  L.polyline([this.markers[this.counterr][0]["Route1"]], {color: this.routeColor}).addTo(this.map);
    this.arrival = new Date();
    this.arrival.setDate( this.arrival.getDate() + this.totalDelay );
  }
  if (value === 2) {
    this.removeLayers();
    this.route1 =  L.polyline([this.markers[this.counterr][0]["Route1"]]).addTo(this.map);
    this.route3 =  L.polyline([this.markers[this.counterr][0]["Route3"]]).addTo(this.map);
    this.route2 =  L.polyline([this.markers[this.counterr][0]["Route2"]], {color: this.routeColor}).addTo(this.map);
    this.arrival = new Date();
    this.arrival.setDate( this.arrival.getDate() + d );
  }
  if (value === 3) {
    this.removeLayers();
    this.route1 =  L.polyline([this.markers[this.counterr][0]["Route1"]]).addTo(this.map);
    this.route2 =  L.polyline([this.markers[this.counterr][0]["Route2"]]).addTo(this.map);
    this.route3 =  L.polyline([this.markers[this.counterr][0]["Route3"]], {color: this.routeColor}).addTo(this.map);
    this.arrival = new Date();
    this.arrival.setDate( this.arrival.getDate() + d );
  }
}
pickTransportType(iScore, d, costChange) {
  this.eCost -= this.TTCost;
  this.eCost += costChange;
  this.TTCost = costChange;
  this.delayType = d;
  this.totalDelay  = this.delayRoute + this.delayType + this.delayVendor + this.delayCustomer;
  this.showDate = "True";
  this.score = this.score - this.normalizerForType;
  this.score = this.score + iScore;
  this.normalizerForType = iScore;
  this.arrival = new Date();
  this.arrival.setDate( this.arrival.getDate() + this.totalDelay );
  this.setRouteColor();
  this.routeColorChange();
}

pickTransportVendor(vendor, iScore, d, costChange) {
  this.eCost -= this.TVCost;
  this.eCost += costChange;
  this.TVCost = costChange;
  this.delayVendor = d;
  this.totalDelay  = this.delayRoute + this.delayType + this.delayVendor + this.delayCustomer;
  this.showDate = "True";
  this.TransportVendor = vendor;
  this.score = this.score - this.normalizerForVendor;
  this.score = this.score + iScore;
  this.normalizerForVendor = iScore;
  this.arrival = new Date();
  this.arrival.setDate( this.arrival.getDate() + this.totalDelay );
  console.log(this.score);
  this.setRouteColor();
  this.routeColorChange();
}

pickTransportCustomer(TC, iScore, d, costChange) {
  this.eCost -= this.TCCost;
  this.eCost += costChange;
  this.TCCost = costChange;
this.delayCustomer = d;
this.totalDelay  = this.delayRoute + this.delayType + this.delayVendor + this.delayCustomer;
this.showDate = "True";
this.TransportCustomer = TC;
this.score -= this.normalizerForCustomer;
this.score += iScore;
this.normalizerForCustomer = iScore;
this.arrival = new Date();
this.arrival.setDate( this.arrival.getDate() + this.totalDelay );
this.setRouteColor();
this.routeColorChange();
}
clickZoom() {
   this.map.setView([this.markers[this.counterr][0]["startLat"], this.markers[this.counterr][0]["startLng"]]);
   this.map.panTo([this.markers[this.counterr][0]["Route1"][1][0], this.markers[this.counterr][0]["Route2"][1][1]]);

}


  ngOnInit() {
    this.markersservice.getMarkers().subscribe(
      responseMark => {
        this.markers = responseMark;
        console.log(this.markers);
      }
    );

this.mapmap(); {
        L.control.zoom({ position: "topright" }).addTo(this.map);
        L.control.layers(this.mapService.baseMaps).addTo(this.map);
        L.control.scale().addTo(this.map);

        this.mapService.map = this.map;

      }
  }
}
