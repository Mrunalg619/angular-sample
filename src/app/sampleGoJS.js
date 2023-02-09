
const $ = go.GraphObject.make;

myDiagram =
  new go.Diagram("myDiagramDiv",
    {
      layout: $(go.TreeLayout, { angle: 90 }),
      "undoManager.isEnabled": true
    });
// $(go.Picture,cursor: 'pointer'
          //   {
          //     name: 'Picture',
          //     desiredSize: new go.Size(39, 50),
          //     margin: new go.Margin(6, 8, 6, 10)
          //   },
          //   new go.Binding('source', 'key', function(key) {
          //     if (key < 0 || key > 16) return ''; // There are only 16 images on the server
          //     return 'assets/HS' + key + '.png';
          //   })
          // ),
// Material Icons:
// icon("\uE87C"),  // face
// icon("\uE7FD"),  // person
// icon("\uE7FB"),  // people
// icon("\uE0BE"),  // email
// icon("\uE0B0"),  // call
// icon("\ue896"),  // list
// icon("\uE0C9"),  // message

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

function nodeStyle() {
  return [
    // With a dark background, the standard shadow doesn't seem right
    //{ isShadowed: true, shadowOffset: new go.Point(2, 2), shadowColor: "#DDD", shadowBlur: 6 }
  ];
}

function textStyle(color) {
  if (!color) color = primaryStroke;
  return [
    { font: "13px Roboto, sans-serif", stroke: color }
  ]
}

function titleStyle(color) {
  if (!color) color = primaryStroke;
  return [
    { font: "small-caps bold 11px Roboto, sans-serif", stroke: color }
  ]
}

function fieldStyle(color) {
  if (!color) color = fieldStroke;
  return [
    { font: "13px Roboto, sans-serif", stroke: color }
  ]
}

function fieldSeparator(row) {
  return [
    $(go.RowColumnDefinition,
      { row: row-1, separatorPadding: new go.Margin(0, 0, 11, 0) }),
    $(go.RowColumnDefinition,
      { row: row, separatorStroke: "rgba(0,0,0,0.3)", separatorPadding: new go.Margin(11, 0, 0, 0) })
  ];
}

function icon(code, props) {
  if (!code) throw new Error("no icon font code given");
  if (!props) props = [];
  return $(go.TextBlock, code,
            { font: "16px Material Icons", height: 14, margin: 4 },
            props);
}

function photo(props) {
  if (!props) props = [];
  return $(go.Panel, "Spot", { name: "PHOTO"},  //???
    $(go.Shape, "Circle", { width: 44, strokeWidth: 0, fill: lightStroke }),
    $(go.Panel, "Spot",
      { isClipping: true },
      $(go.Shape, "Circle", { width: 40, strokeWidth: 0 }),
      $(go.Picture, { width: 40, height: 40 },
        new go.Binding("source", "id",
                        k => "https://gojs.net/latest/samples/images/HS" + k + ".jpg"))
    ),
    props
  );
}

function header() {
  return $(go.Panel, "Table",
    {
      stretch: go.GraphObject.Horizontal,
      minSize: new go.Size(240, NaN),
      margin: 2,
      defaultSeparatorPadding: 4
    },
    $(go.Panel, "Horizontal",
      { alignment: go.Spot.Left },
      photo({ margin: 4 }),
      $(go.Panel, "Vertical",
        { margin: 4, defaultAlignment: go.Spot.Left },
        $(go.TextBlock, textStyle(lightStroke),
          { font: "bold 16px Roboto" },
          new go.Binding("text", "name")),
        $(go.TextBlock, textStyle(lightStroke),
          new go.Binding("text", "title"))
      )
    ),
    $(go.RowColumnDefinition,
      { row: 1, separatorStroke: lightStroke, separatorStrokeWidth: 0.5 }),
    $(go.Panel, "Horizontal",
      { row: 1, alignment: go.Spot.Left },
      icon("\uE7FB", { stroke: lightStroke }),  // people
      $(go.TextBlock, textStyle(lightStroke), "0",
        new go.Binding("text", "numreports"))
    ),
    $(go.Panel, "Horizontal",
      { row: 1, alignment: go.Spot.Right },
      icon("\uE0BE", { stroke: lightStroke }),  // email
      icon("\uE0B0", { stroke: lightStroke }),  // call
      icon("\ue896",  // list
        { // click this to cycle through the different kinds of cards
          stroke: lightStroke,
          click: (e, icon) => {
            e.diagram.commit(diag => {
              const cat = icon.part.category;
              const next = (cat === "") ? "A" : ((cat === "A") ? "B" : "");
              icon.part.category = next;
            })
          }
        })
    )
  );
}

// define a node template consisting of a common header and a custom footer
function defineNodeTemplate(name, footer) {
  footer.stretch = go.GraphObject.Horizontal;
  footer.margin = 8;
  myDiagram.nodeTemplateMap.add(name,
    $(go.Node, "Spot", nodeStyle(),
      $(go.Panel, "Table",
        $(go.Panel, "Auto",
          { row: 0, stretch: go.GraphObject.Horizontal },
          $(go.Shape, "RoundedTopRectangle",
            { fill: primaryFill, strokeWidth: 0, parameter1: 4 },
            new go.Binding("fill", "color")),
          header()  // same header for each kind of node template
        ),
        $(go.Panel, "Auto",
          { row: 1, stretch: go.GraphObject.Horizontal },
          $(go.Shape, "RoundedBottomRectangle",
            { fill: lightStroke, strokeWidth: 0, parameter1: 4 }),
          footer  // but the footer varies for each kind of node template
        )
      ),
      $(go.Panel, "Auto",  // each node has a circled icon at the bottom
        { alignment: go.Spot.Bottom },
        $(go.Shape, "Circle",
          {
            fill: lineStroke, stroke: lightStroke, strokeWidth: 2,
            spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight
          },
          new go.Binding("fill", "isTreeLeaf",
                          leaf => leaf ? LightBlue : LightGreen).ofObject()),
        icon("\uE7FB", { stroke: lightStroke })  // people
      )
    ));
}

defineNodeTemplate("",
  $(go.Panel, "Table",
    { defaultAlignment: go.Spot.Left },
    $(go.TextBlock, titleStyle(), { row: 0 }, "POSITION ID"),
    $(go.TextBlock, fieldStyle(), { row: 1 }, new go.Binding("text", "id"))
  ));

defineNodeTemplate("A",
  $(go.Panel, "Table",
    { defaultAlignment: go.Spot.Left, defaultSeparatorPadding: new go.Margin(2, 6) },
    $(go.TextBlock, titleStyle(), { row: 0, column: 0 }, "POSITION ID"),
    $(go.TextBlock, fieldStyle(), { row: 1, column: 0 }, "",
      new go.Binding("text", "id")),
    $(go.TextBlock, titleStyle(), { row: 0, column: 1 }, "GRADE"),
    $(go.TextBlock, fieldStyle(), { row: 1, column: 1 }, "",
      new go.Binding("text", "grade")),
    fieldSeparator(2),
    $(go.TextBlock, titleStyle(), { row: 2, column: 0 }, "ANNUAL RATE"),
    $(go.TextBlock, fieldStyle(), { row: 2, column: 1 }, "$",
      new go.Binding("text", "salary", s => "$"+s)),
    fieldSeparator(3),
    $(go.TextBlock, titleStyle(), { row: 3, column: 0 }, "BONUS PLAN"),
    $(go.TextBlock, fieldStyle(), { row: 4, column: 0 }, "",
      new go.Binding("text", "bonusplan")),
    $(go.TextBlock, titleStyle(), { row: 3, column: 1 }, "TARGET %"),
    $(go.TextBlock, fieldStyle(), { row: 4, column: 1 }, "100",
      new go.Binding("text", "bonustarget")),
    fieldSeparator(5),
    $(go.TextBlock, titleStyle(), { row: 5, column: 0 }, "SUBGRADE"),
    $(go.TextBlock, fieldStyle(), { row: 6, column: 0 }, "",
      new go.Binding("text", "subgrade"))
  ));

defineNodeTemplate("B",
  $(go.Panel, "Table",
    { defaultSeparatorPadding: new go.Margin(2, 6) },
    $(go.RowColumnDefinition, { column: 0, alignment: go.Spot.Right }),
    $(go.RowColumnDefinition, { column: 1, alignment: go.Spot.Left }),
    $(go.TextBlock, titleStyle(), { row: 0, column: 0 }, "POS ID"),
    $(go.TextBlock, fieldStyle(), { row: 0, column: 1 }, "",
      new go.Binding("text", "id")),
    $(go.TextBlock, titleStyle(), { row: 1, column: 0 }, "GRADE"),
    $(go.TextBlock, fieldStyle(), { row: 1, column: 1 }, "",
      new go.Binding("text", "grade")),
    fieldSeparator(2),
    $(go.TextBlock, titleStyle(Green), { row: 2, column: 0 }, "LOW"),
    $(go.TextBlock, fieldStyle(Green), { row: 2, column: 1 }, "$",
      new go.Binding("text", "low", s => "$"+s)),
    $(go.TextBlock, titleStyle(primaryStroke), { row: 3, column: 0 }, "MID"),
    $(go.TextBlock, fieldStyle(primaryStroke), { row: 3, column: 1 }, "$",
      new go.Binding("text", "mid", s => "$"+s)),
    $(go.TextBlock, titleStyle(Orange), { row: 4, column: 0 }, "HIGH"),
    $(go.TextBlock, fieldStyle(Orange), { row: 4, column: 1 }, "$",
      new go.Binding("text", "high", s => "$"+s)),
    fieldSeparator(5),
    $(go.TextBlock, titleStyle(), { row: 5, column: 0 }, "ANNUAL RATE"),
    $(go.TextBlock, fieldStyle(), { row: 5, column: 1 }, "$",
      new go.Binding("text", "salary", s => "$"+s)),
    $(go.TextBlock, titleStyle(), { row: 6, column: 0 }, "BONUS PLAN"),
    $(go.TextBlock, fieldStyle(), { row: 6, column: 1 }, "",
      new go.Binding("text", "bonusplan")),
    $(go.TextBlock, titleStyle(), { row: 7, column: 0 }, "TARGET %"),
    $(go.TextBlock, fieldStyle(), { row: 7, column: 1 }, "100",
      new go.Binding("text", "bonustarget")),
    $(go.TextBlock, titleStyle(), { row: 8, column: 0 }, "SUBGRADE"),
    $(go.TextBlock, fieldStyle(), { row: 8, column: 1 }, "",
      new go.Binding("text", "subgrade"))
  ));

myDiagram.linkTemplate =
  $(go.Link,
    { routing: go.Link.Orthogonal },
    $(go.Shape, { stroke: lineStroke, strokeWidth: 2 })
  );

// Show the diagram's model in JSON format
function save() {
  document.getElementById("mySavedModel").value = myDiagram.model.toJson();
  myDiagram.isModified = false;
}
function load() {
  myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
}
document.getElementById("SaveButton").onclick = save;
document.getElementById("LoadButton").onclick = load;

load();
  

// define a tooltip for each node that displays the color as text
            // $("ToolTip",
            //   $(go.TextBlock, { margin: 4 },
            //     new go.Binding("text", "", (k) => { return getToolTipTxt(k, that) }))
            // )  // end of Adornment