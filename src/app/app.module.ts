import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatRadioModule } from "@angular/material";
import {TabModule} from "angular-tabs-component";
import {MatTabsModule} from "@angular/material/tabs";

import { AppComponent } from "./app.component";
import { MapComponent } from "./map/map.component";
import { MarkersService } from "./map/markers.service";

import { MapService } from "./map.service";

import "leaflet";
import "leaflet.vectorgrid";
import { HttpModule } from "@angular/http";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [
    MapComponent,
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    HttpModule,
    TabModule,
    MatRadioModule,
    MatTabsModule
  ],
  providers: [MapService, MarkersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
