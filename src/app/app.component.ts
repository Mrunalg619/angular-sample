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
      { 'key': 0, 'name': 'Parent 3', 'title': 'Parent Element-1', 'type': 'Parent' },
      { 'key': 1, 'name': 'ChildType-2 Element-1', 'title': 'ChildType-2 Element-1', 'parent': 0, 'type': 'ChildType-2' },
      { 'key': 2, 'name': 'ChildType-1 Element-1', 'title': 'ChildType-1 Element-1', 'parent': 0, 'type': 'ChildType-1' },
      { 'key': 3, 'name': 'ChildType-1 Element-2', 'title': 'ChildType-1 Element-2', 'parent': 0, 'type': 'ChildType-1' },
      { 'key': 4, 'name': 'Parent 2', 'title': 'Parent Element-2', 'type': 'Parent' },
      { 'key': 5, 'name': 'ChildType-2 Element-2', 'title': 'ChildType-2 Element-2', 'parent': 4, 'type': 'ChildType-2' },
      { 'key': 6, 'name': 'ChildType-1 Element-3', 'title': 'ChildType-1 Element-3', 'parent': 4, 'type': 'ChildType-1' },
      { 'key': 7, 'name': 'Parent 1', 'title': 'Parent Element-3', 'type': 'Parent' },
      { 'key': 8, 'name': 'ChildType-2 Element-3', 'title': 'ChildType-2 Element-3', 'parent': 7, 'type': 'ChildType-2' },
      { 'key': 9, 'name': 'ChildType-1 Element-4', 'title': 'ChildType-1 Element-4', 'parent': 7, 'type': 'ChildType-1' },
      { 'key': 10, 'name': 'ChildType-1 Element-5', 'title': 'ChildType-1 Element-5', 'parent': 7, 'type': 'ChildType-1' }
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
