import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as go from 'gojs';
const $ = go.GraphObject.make;

@Component({
  selector: 'app-staging',
  templateUrl: './staging.component.html',
  styleUrls: ['./staging.component.css']
})
export class StagingComponent implements OnChanges {
  
  constructor() { }

  ngOnChanges() {
    
  }

}
