import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DiagramComponent } from './diagram/diagram.component';
import { InspectorComponent } from './inspector/inspector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { StagingComponent } from './staging/staging.component';
import { CommonService } from './common.service';

@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent,
    InspectorComponent,
    StagingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
