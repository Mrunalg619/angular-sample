import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as go from 'gojs';
const $ = go.GraphObject.make;

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent {

  public diagram: go.Diagram = null;

  @Input()
  public model: go.Model;
  
  @Input() 
  public validationModel: any;
  
  @Output()
  public nodeClicked = new EventEmitter();


  constructor() {
  }

  public ngAfterViewInit() {
    const validationModel = this.validationModel;
    const PrimaryBlue = "#105FAE";
    const LightGreen = "#8FBB33";
    const LightBlue = "#0D8ACF";
    const Orange = "#F45614";
    const LightOrange = "#EB8F0F";
    const Green = "#1D9C44";
    const DarkBlue = "#232B42";

    const primaryStroke = PrimaryBlue;
    const primaryFill = LightBlue;
    const lineStroke = LightGreen;
    const lightStroke = "#FFF";
    const fieldStroke = "#000";
    
    this.diagram = $(go.Diagram, 'myDiagramDiv',
      { 
        "toolManager.hoverDelay": 10,
        'toolManager.toolTipDuration': 50000,
        layout:
          $(go.TreeLayout,
            {
              isOngoing: true,
              treeStyle: go.TreeLayout.StyleLayered, //new
              layerStyle: go.TreeLayout.LayerSiblings, //new
              alignment: go.TreeLayout.AlignmentStart, //new
              nodeSpacing: 20, // new
              nodeIndent: 0, // new
              nodeIndentPastParent: 0, // new
              breadthLimit: 0, // new
              rowIndent: 10, // new
              rowSpacing: 25, // new
              setsPortSpot: true, // new
              setsChildPortSpot: true, // new
              // arrangement: go.TreeLayout.AlignmentStart, //original
              // properties for most of the tree:
              angle: 0,
              // angle: 90 // original
              layerSpacing: 35,
              layerSpacingParentOverlap: 0, // New
              sorting: go.TreeLayout.SortingForwards, // new
              compaction: go.TreeLayout.CompactionBlock, // new
              // properties for the "last parents":
              // alternateAngle: 0,
              // alternateLayerSpacing: 35,
              // alternateAlignment: go.TreeLayout.AlignmentBus,
              // alternateNodeSpacing: 20,
              comparer: go.LayoutVertex.smartComparer
            }),
        'undoManager.isEnabled': true
      }
    );

    function textStyle(color) {
      if (!color) color = primaryStroke;
      return [
        { font: "13px Roboto, sans-serif", stroke: color }
      ]
    }

    function icon(code, props) {
      if (!code) throw new Error("no icon font code given");
      if (!props) props = [];
      return $(go.TextBlock, code,
        { font: "16px Material Icons", height: 14, margin: 4 },
        props);
    }

    function validationIcon1(that) {
      return $(go.TextBlock,
        new go.Binding("text", "", (k) => {
          if (k.type != "Parent") {
            return (that.validationModel[k.key].message ? "\uE002" : "\ue86c");
          } else {
            return "";
          }
        }),
        { font: "16px Material Icons", height: 16, width: 16, margin: 4 },
        { // for Validation of Parent
          stroke: lightStroke,
          cursor: 'pointer',
          toolTip: myToolTip
        }
      );
    }

    function showToolTip(obj, diagram, tool) {
      var toolTipDIV = document.getElementById('toolTipDIV');
      var pt = diagram.lastInput.viewPoint;
      toolTipDIV.style.left = (pt.x + 10) + "px";
      toolTipDIV.style.top = (pt.y + 10) + "px";
      // console.log("current obj", validationModel);
      // setToolTipObj(obj.part.data);
      if(validationModel[obj.part.data.key].message) {
        toolTipDIV.style.display = "block";
        let msgObj = getErrorMessage(validationModel[obj.part.data.key].message);
        document.getElementById("toolTipParagraph").innerHTML ="<p style='transition: 0s 180s;'>"+ msgObj.text + "</p>" + "<a href='"+msgObj.url+"' target='_blank'>" + msgObj.url + "</a>";
      }
    }

    function hideToolTip(diagram, tool) {
      setTimeout(() => {
        var toolTipDIV = document.getElementById('toolTipDIV');
        toolTipDIV.style.display = "none";
      },10000);
    }

    var myToolTip = $(go.HTMLInfo, {
      show: showToolTip,
      hide: hideToolTip
      /*
        since hideToolTip is very simple,
        we could have set mainElement instead of setting hide:
      mainElement: document.getElementById('toolTipDIV')
      */
    });

    function getErrorMessage(txt) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const errorObj = {
        text: '',
        url: ''
      };
      txt.replace(urlRegex, function(url) {
        errorObj.url = url
      });
      const errorTxt = txt.replace(errorObj.url, '');
      errorObj.text = errorTxt;
      return errorObj;
    }

    function onNodeClick(data) {
      console.log('data on click: ',data);
    }


    // define the Node template
    this.diagram.nodeTemplate =
      $(go.Node, 'Auto',
        // for sorting, have the Node.text be the data.name
        new go.Binding('text', 'name'),
        // bind the Part.layerName to control the Node's layer depending on whether it isSelected
        new go.Binding('layerName', 'isSelected', function (sel) { return sel ? 'Foreground' : ''; }).ofObject(),
        new go.Binding("location", "", (k) => {
          return k.part.data.type == 'Parent' ? new go.Point(k.part.location.x, k.part.location.y) : ( k.part.data.type == 'ChildType-2' ? new go.Point(400, k.part.location.y) : new go.Point(550, k.part.location.y));
        }).ofObject(),
        // define the node's outer shape
        $(go.Shape, 'Rectangle',
          {
            name: 'SHAPE', fill: 'lightblue', stroke: null,
            // set the port properties:
            portId: '', fromLinkable: true, toLinkable: true,
          },
          new go.Binding('fill', '', function (node) {
            // modify the fill based on the tree depth level
            const levelColors = ['#2672EC', '#1D9C44', '#AC193D', '#8C0095', '#5133AB',
              '#008299', '#D24726', '#008A00', '#094AB2'];
            let color = node.findObject('SHAPE').fill;
            const dia: go.Diagram = node.diagram;
            if (dia && dia.layout.network) {
              dia.layout.network.vertexes.each(function (v: go.TreeVertex) {
                if (v.node && v.node.key === node.data.key) {
                  const level: number = v.level % (levelColors.length);
                  color = levelColors[level];
                }
              });
            }
            return color;
          }).ofObject()
        ),
        $(go.Panel, 'Horizontal',
          // define the panel where the text will appear
          $(go.Panel, "Horizontal",
            { row: 1, alignment: new go.Spot(0, 0.5) },
            validationIcon1(this)
          ),
          $(go.Panel, 'Table',
            {
              maxSize: new go.Size(150, 999),
              minSize: new go.Size(150, NaN),
              margin: new go.Margin(6, 10, 0, 3),
              defaultAlignment: go.Spot.Left
            },
            $(go.RowColumnDefinition, { column: 2, width: 4 }),
            $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },  // the name
              {
                row: 0, column: 0, columnSpan: 5,
                font: '12pt Segoe UI,sans-serif',
                editable: true, isMultiline: false,
                minSize: new go.Size(10, 16)
              },
              new go.Binding('text', 'name').makeTwoWay()),
            $(go.TextBlock, 'Title: ', { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
              { row: 1, column: 0 }),
            $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
              {
                row: 1, column: 1, columnSpan: 4,
                editable: true, isMultiline: false,
                minSize: new go.Size(10, 14),
                margin: new go.Margin(0, 0, 0, 3)
              },
              new go.Binding('text', 'title').makeTwoWay()),
            $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
              { row: 2, column: 0 },
              new go.Binding('text', 'key', function (v) { return 'ID: ' + v; })),
            $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
              { name: 'parent', row: 2, column: 3 }, // we include a name so we can access this TextBlock when deleting Nodes/Links
              new go.Binding('text', 'parent', function (v) { return 'Parent: ' + v; })),
            $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },  // the comments
              {
                row: 3, column: 0, columnSpan: 5,
                font: 'italic 9pt sans-serif',
                wrap: go.TextBlock.WrapFit,
                editable: true,  // by default newlines are allowed
                minSize: new go.Size(10, 14)
              },
              new go.Binding('text', 'comments').makeTwoWay())
          ),  // end Table Panel
          $(go.Panel, "Horizontal",
            { row: 1, alignment: new go.Spot(1, 0) },
            icon("\uE5CD", { // click this to delete an Parent
              stroke: lightStroke,
              cursor: 'pointer',
              click: (e, obj) => {
                const node = obj.part;
                const data = node.data;
                console.log('data: ', data);
                e.event.stopPropagation();
                e.event.stopImmediatePropagation();
                e.event.preventDefault();
                e.event.cancelBubble = true;
              }
            })  // cross icon
          )
        ) // end Horizontal Panel
      );  // end Node

    // define the Link template
    this.diagram.linkTemplate =
      $(go.Link,
        {
          routing: go.Link.Orthogonal,
          selectable: false
        },
        $(go.Shape, { strokeWidth: 2, stroke: "#333" })
      );

    // this.diagram.defaultTool = this.diagram.toolManager;  
    this.diagram.model = this.model;

    // when the selection changes, emit event to app-component updating the selected node
    this.diagram.addDiagramListener('ChangedSelection', (e) => {
      const node = this.diagram.selection.first();
      console.log("this is on node click", node);
      //this.nodeClicked.emit(node);
    });
    // this.diagram = this.diagramDiv;
  }

}
