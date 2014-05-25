// THIS IS THE MAIN JAVASCRIPT FILE
// This reads in the data from Firebase, and renders it
// This code is being called from dashboard.jade, which is invoked by routes/index.js


/////////////////////////////////////
// making stuff responsive (Currently unused)

// d3.select(window)
//  .on("resize", sizeChange);

// console.log($("#container").width()/900)
// function sizeChange() {
//    console.log($("#container").width()/900)
//    d3.select("g").attr("transform", "scale(" + $("#container").width()/900 + ")");
//    $("svg").height($("#container").width()*0.618);
// }


/////////////////////////////////////
// Setting some things up

// Placeholder until user revealed in backend
target = "kevin375493@gmail.com";

// Current function for dynamically setting css based on user.
// TODO: Change to class with settings done at CSS level.
function target2(focus_type)
{
  if (focus_type === target) {
    return "bold";
  }
  else {
    return "normal";
  }
}

function filt(arr, name) {
  var filtered = arr.filter(function(d) {
    return d.id == name;
  });

  filtered.sort(function(a, b) {
    return a.time - b.time;
  });

  return filtered;
}

// Style-related constants
var colors = ["steelblue", "black", "red", "gold", "olivedrab", "powderblue", "orange", "orchid", "saddlebrown", "springgreen", "Chocolate"],
  w = 960,
  h = 500,
  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 30
  },
  width = w - margin.left - margin.right,
  height = h - margin.top - margin.bottom;

// D3 / Graph-related
var x = d3.time.scale()
  .range([0, width]);

var y = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");


var yAxis = d3.svg.axis()
  .scale(y)
  .tickFormat(d3.format("d"))
  .orient("left");

var line = d3.svg.line()
  .interpolate("basis")
  .x(function(d) {
    return x(d.time);
  })
  .y(function(d) {
    return y(d.count);
  });


/////////////////////////////////////
// Creates the plot on the page, waiting to be populated with data (I think?)

var svg = d3.select("#dash").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/////////////////////////////////////
// This makes the call to Firebase for the data, and plugs it into D3 to render as a graph

var dir = window.location.href;
dir = dir.substr(dir.length - 1) === '/' ? dir.substring(0, dir.length - 1) : dir;
d3.json(dir + '/data', function(data) {

  var dataset = [];

  for (var d in data) {
    dataset.push({
      "time": new Date(data[d].time),
      "count": data[d].count,
      "id": data[d].id
    });
  }

  x.domain(d3.extent(dataset, function(d) {
    return d.time;
  }));

  y.domain(d3.extent(dataset, function(d) {
    return d.count;
  }));

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Count");

  var names_dict = {};
  for (var i in dataset) {
    names_dict[dataset[i].id] = 0;
  }

  var ix = 0;

  for (var i in names_dict) {
    names_dict[i] = {
      "color": colors[ix]
    };
    ix++;
  }

  var y_offset = 0;

  names_arr = [];

  for (var i in names_dict) {
    var name_slice = filt(dataset, i);

    names_dict[i].last = name_slice.slice(-1)[0].count;

    svg.append("path")
      .datum(name_slice)
      .attr("class", "line")
      .attr("style", "stroke: " + names_dict[i].color)
      .attr("d", line);

    names_arr.push({
      "name": i,
      "last": names_dict[i].last
    });
  }

  names_arr.sort(function(a, b) {
    return a.last - b.last;
  });

  for (var j in names_arr) {
    i = names_arr[j].name;

    svg.append("svg:rect")
      .attr("x", 55)
      .attr("y", 40 + y_offset)
      .attr("style", "stroke: " + names_dict[i].color)
      .attr("height", "1")
      .attr("width", 32);

    svg.append("svg:text")
      .attr("x", 90)
      .attr("y", 45 + y_offset)
      .text(i)
      .attr("style", "font-weight: " + target2(i));


    svg.append("svg:text")
      .attr("x", 20)
      .attr("y", 45 + y_offset)
      .text(names_dict[i].last);

    y_offset = y_offset + 18;
  }

  // chart title

  // svg.append("svg:text")
  //     .attr("x", w/2-50)
  //     .attr("y", 20)
  //     .attr("id", "title")
  //     .text("Inboxr");
});