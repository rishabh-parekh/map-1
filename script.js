// Code goes here
/////// Chapter 1: Creaet Circle and Rectangles with Mouse Event
// a. Create the Container Size based on max x and y 

var max_x = 300;
var max_y = 200;
var svgContainer1 = d3.select("#chap-1").append("svg")
  .attr("width", max_x)
  .attr("height", max_y)

// Tool tip implementatoin
 
var tooltip = d3.select("#chap-1")
  .append("div").attr("id","#toolTip")
  .style("position", "relative")
  .style("visibility", "hidden")
  .text("a simple tooltip");

tooltip.append("div").attr("id","tailShadow");
tooltip.append("div").attr("id","tail1");
tooltip.append("div").attr("id","tail2");

// Create a Circle with Radius = 40, at x 50, y 50
// Listen to Mouse events -- on mouseover, change the color to red
// on mouseout, change the color to green

svgContainer1.append("circle")
  .style("stroke", "gray")
  .style("fill", "white")
  .attr("r", 40)
  .attr("cx", 50)
  .attr("cy", 50)
  .on("mouseover", function() {
    d3.select(this).style("fill", "red");
  })
  .on("click",function() {
    d3.select(this).style("fill", "yellow");
    d3.select(this).style("label","Circle");
    tooltip.style("visibility", "visible");
    
  })
  .on("mouseout", function() {
    d3.select(this).style("fill", "green");
    tooltip.style("visibility", "hidden");

  });

// Create a rectange with width and height of 40x50, at location 120,25

svgContainer1.append("rect")
  .style("stroke", "gray")
  .style("fill", "white")
  .attr("width", 40)
  .attr("height", 50)
  .attr("x", 120)
  .attr("y", 25)
  .on("mouseover", function() {
    d3.select(this).style("fill", "red");
  })
  .on("mouseout", function() {
    d3.select(this).style("fill", "green");
  });

// Add more rectanges, keep the y coordinates same 
svgContainer1.append("rect")
  .style("stroke", "gray")
  .style("fill", "white")
  .attr("width", 40)
  .attr("height", 50)
  .attr("x", 160)
  .attr("y", 25)
  .on("mouseover", function() {
    d3.select(this).style("fill", "red");
  })
  .on("mouseout", function() {
    d3.select(this).style("fill", "green");
  });

svgContainer1.append("rect")
  .style("stroke", "gray")
  .style("fill", "white")
  .attr("width", 40)
  .attr("height", 50)
  .attr("x", 200)
  .attr("y", 25)
  .on("mouseover", function() {
    d3.select(this).style("fill", "red");
  })
  .on("mouseout", function() {
    d3.select(this).style("fill", "green");
  });



/////// Chapter 2: Using Paths to draw Line Data and SVG Line
// a. The line data is x and y lines from point 1 to point 2
// You can have multiple line data to draw different free form 
// geometries 

var lineData = [{
  "x": 1,
  "y": 5
}, {
  "x": 20,
  "y": 20
}, {
  "x": 40,
  "y": 10
}, {
  "x": 60,
  "y": 40
}, {
  "x": 80,
  "y": 5
}, {
  "x": 100,
  "y": 60
}, {
  "x": 1,
  "y": 5
}];


//This is the accessor function to draw a step drawing
var lineFunctionStep = d3.svg.line()
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  })
  .interpolate("step-after");

//This is the accessor function to draw monotone smooth 
var lineFunctionMono = d3.svg.line()
  .x(function(d) {
    return d.x + 100;
  })
  .y(function(d) {
    return d.y;
  })
  .interpolate("monotone");


//This is the accessor function to draw straight lines. 
var lineFunctionLiner = d3.svg.line()
  .x(function(d) {
    return d.x + 200;
  })
  .y(function(d) {
    return d.y;
  })
  .interpolate("linear");

//The SVG Container
var svgContainer2 = d3.select("#chap-2").append("svg")
  .attr("width", 300)
  .attr("height", 100);

//The line SVG Path we draw Step
var lineGraph = svgContainer2.append("path")
  .attr("d", lineFunctionStep(lineData))
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .attr("fill", "none");
//The line SVG Path we draw Monotone
var lineGraph = svgContainer2.append("path")
  .attr("d", lineFunctionMono(lineData))
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .attr("fill", "none");
//The line SVG Path we draw straight line
var lineGraph = svgContainer2.append("path")
  .attr("d", lineFunctionLiner(lineData))
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .attr("fill", "none");
//////////////////////////
/////// Chapter 3: We start drawing the Atrium. 
// First get the Map Image from the WBHS website. 
// Crop the Atrium and save it to postimg.org
// Add the Image here for reference. Once finish the SVG vector image, then this image can be deleted. 



var svgContainer3 = d3.select("#chap-3").append("svg")
  .attr("width", 500)
  .attr("height", 500)
svgContainer3.append("image")
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', 500)
  .attr('height', 240)
  .attr("xlink:href", "http://s12.postimg.org/p2ayuixvh/Screen_Shot_2015_04_26_at_9_29_08_PM.png")




// Read the x, y, and width and height for 200, 202, blank, 204, 206
// Draw using approximate aspect ratio, but keep the width and height in round numbers. 


d3.json("shapes.json", function(json) {
  /* Define the data for the circles */
  var elem = svgContainer3.selectAll("g")
    .data(json.rooms)

  /*Create and place the "blocks" containing the rooms and the text */
  var elemEnter = elem.enter()
    .append("g")
    .attr("transform", function(d) {
      return "translate(0,0)"
    })

  /*Create the rooms for each block */
  var room = elemEnter.append("rect")
    .attr("width", function(d) {
      return d.w
    })
    .attr("height", function(d) {
      return d.h
    })
    .attr("x", function(d) {
      return d.x
    })
    .attr("y", function(d) {
      return d.y
    })
    .attr("stroke", "black")
    .attr("fill", "white")

  /* Create the text for each room */
  elemEnter.append("text")
    .attr("x", function(d){return d.x})
    .attr("y", function(d){return d.y})
    .attr("dx", function(d){return 15})
    .attr("dy", function(d){return 15})
    .text(function(d) {
      return d.label
    })
    
   // create a selection to bind the data to
  var paths = svgContainer3.selectAll('paths')
    // bind the incoming data
    .data(json.paths)
   // for each incoming datapoint...
  var pathEnter = paths.enter()
    // append a path element...
    .append('svg:path')
    // giving it a pathdata attribute corresponding to the current element in the data array
    .attr('d', function(d) { 
      d = lineFunctionStep(d.lineData)
      return d; })
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("fill", "none")

  .text(function(d){
    return d.label;
  })
  .attr("x", function(d){
      return pathEnter.centroid(d)[0];
  })
  .attr("y", function(d){
      return  pathEnter.centroid(d)[1];
  })
  .attr("text-anchor","middle")
  .attr('fill', 'blue');
  
})
