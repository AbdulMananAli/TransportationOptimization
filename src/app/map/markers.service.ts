import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: "root"
})
export class MarkersService {

  constructor(private http: Http) { }
  getMarkers() {
    return this.http.get("assets/data.json").pipe(map((response: Response) => response.json()));
  }
}
