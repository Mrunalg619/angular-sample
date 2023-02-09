import { Component } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public diagram: go.Diagram = null;
  public selectedNode = null;
  public model: go.TreeModel = new go.TreeModel(
    [
      { 'key': 0, 'name': 'Stella', 'title': 'CEO', 'type': 'SDE' },
      { 'key': 1, 'name': 'Luke Warm', 'title': 'VP Marketing/Sales', 'parent': 0, 'type': 'DGC' },
      { 'key': 2, 'name': 'Meg Meehan Hoffa', 'title': 'Sales', 'parent': 0, 'type': 'PII' },
      { 'key': 3, 'name': 'Peggy Flaming', 'title': 'VP Engineering', 'parent': 0, 'type': 'PII' },
      { 'key': 4, 'name': 'Mrunal', 'title': 'CEO1', 'type': 'SDE' },
      { 'key': 5, 'name': 'Luke Warm', 'title': 'VP Marketing/Sales', 'parent': 4, 'type': 'DGC' },
      { 'key': 6, 'name': 'Meg Meehan Hoffa', 'title': 'Sales', 'parent': 4, 'type': 'PII' },
      { 'key': 7, 'name': 'Avinash', 'title': 'CEO2', 'type': 'SDE' },
      { 'key': 8, 'name': 'Luke Warm', 'title': 'VP Marketing/Sales', 'parent': 7, 'type': 'DGC' },
      { 'key': 9, 'name': 'Meg Meehan Hoffa', 'title': 'Sales', 'parent': 7, 'type': 'PII' },
      { 'key': 10, 'name': 'Peggy Flaming', 'title': 'VP Engineering', 'parent': 7, 'type': 'PII' }
    ]
  );
  public validationModel: any = [
    { "key": 0, "message": "something relevant https://stackoverflow.com/questions/48438367/add-text-on-mouse-hover-on-gojs-diagram" },
    { "key": 1, "message": "something relevant https://stackoverflow.com/questions/48438367/add-text-on-mouse-hover-on-gojs-diagram" },
    { "key": 2, "message": "something relevant https://stackoverflow.com/questions/48438367/add-text-on-mouse-hover-on-gojs-diagram" },
    { "key": 3, "message": "something relevant https://stackoverflow.com/questions/48438367/add-text-on-mouse-hover-on-gojs-diagram" },
    { "key": 4, "message": "something relevant https://stackoverflow.com/questions/48438367/add-text-on-mouse-hover-on-gojs-diagram" },
    { "key": 5, "message": "something relevant https://stackoverflow.com/questions/48438367/add-text-on-mouse-hover-on-gojs-diagram" },
    { "key": 6, "message": "something relevant https://stackoverflow.com/questions/48438367/add-text-on-mouse-hover-on-gojs-diagram" },
    { "key": 7, "message": "something relevant https://stackoverflow.com/questions/48438367/add-text-on-mouse-hover-on-gojs-diagram" },
    { "key": 8, "message": "something relevant https://stackoverflow.com/questions/48438367/add-text-on-mouse-hover-on-gojs-diagram" },
    { "key": 9, "message": "something relevant https://stackoverflow.com/questions/48438367/add-text-on-mouse-hover-on-gojs-diagram" },
    { "key": 10 }
  ]
  public setSelectedNode(node) {
    this.selectedNode = node;
  }

}
