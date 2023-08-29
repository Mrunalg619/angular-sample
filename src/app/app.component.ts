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
      { 'key': 0, 'name': 'SDE 3', 'title': 'System Data Element', 'type': 'SDE' },
      { 'key': 1, 'name': 'WM DGC Glossary', 'title': 'DGC Glossary', 'parent': 0, 'type': 'DGC' },
      { 'key': 2, 'name': 'Account Number', 'title': 'PII Element', 'parent': 0, 'type': 'PII' },
      { 'key': 3, 'name': 'Account Id', 'title': 'PII Element', 'parent': 0, 'type': 'PII' },
      { 'key': 4, 'name': 'SDE 2', 'title': 'System Data Element', 'type': 'SDE' },
      { 'key': 5, 'name': 'Finance DGC Glossary', 'title': 'DGC Glossary', 'parent': 4, 'type': 'DGC' },
      { 'key': 6, 'name': 'Capital Gains', 'title': 'PII Element', 'parent': 4, 'type': 'PII' },
      { 'key': 7, 'name': 'SDE 1', 'title': 'System Data Element', 'type': 'SDE' },
      { 'key': 8, 'name': 'HR DGC Glossary', 'title': 'DGC Glossary', 'parent': 7, 'type': 'DGC' },
      { 'key': 9, 'name': 'Last Name', 'title': 'PII Element', 'parent': 7, 'type': 'PII' },
      { 'key': 10, 'name': 'First Name', 'title': 'PII Element', 'parent': 7, 'type': 'PII' }
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
