import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as L from "leaflet";

@Injectable()
export class MapService {
  public map: L.Map;
  public baseMaps: any;


  constructor(private http: HttpClient) {

    this.baseMaps = {
      OpenStreetMap: L.tileLayer(
        "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        {
          zIndex: 1
        }
      ),
      Esri: L.tileLayer(
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        {
          zIndex: 1
        }
      ),
      CartoDB: L.tileLayer(
        "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        {
          zIndex: 1
        }
      )
    };
  }


  disableMouseEvent(elementId: string) {
    const element = <HTMLElement>document.getElementById(elementId);

    L.DomEvent.disableClickPropagation(element);
    L.DomEvent.disableScrollPropagation(element);
  }



  toggleMarkerEditing(on: boolean) {
    if (on) {
      this.map.on("click", this.addMarker.bind(this));
    } else {
      this.map.off("click");
    }
  }

  fitBounds(bounds: L.LatLngBounds) {
    this.map.fitBounds(bounds, {});
  }


  private addMarker(e: L.LeafletMouseEvent) {
    const shortLat = Math.round(e.latlng.lat * 1000000) / 1000000;
    const shortLng = Math.round(e.latlng.lng * 1000000) / 1000000;
    const popup = `<div>Latitude: ${shortLat}<div><div>Longitude: ${shortLng}<div>`;
    const icon = L.icon({
      iconUrl: "assets/marker-icon.png",
      shadowUrl: "assets/marker-shadow.png"
    });


    const marker = L.marker(e.latlng, {
      draggable: true,
      icon
    })
      .bindPopup(popup, {
        offset: L.point(12, 6)
      })
      .addTo(this.map)
      .openPopup();

    marker.on("click", () => marker.remove());
  }

}
