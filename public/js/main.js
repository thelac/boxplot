(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// making stuff responsive

// d3.select(window)
//	.on("resize", sizeChange);

// console.log($("#container").width()/900)
// function sizeChange() {
// 	console.log($("#container").width()/900)
//     d3.select("g").attr("transform", "scale(" + $("#container").width()/900 + ")");
//     $("svg").height($("#container").width()*0.618);
// }

function filt(arr, name) {
  var filtered = arr.filter(function(d) {
    return d.id == name;
  });

  filtered.sort(function(a, b) {
    return a.time - b.time;
  })

  return filtered;
}
var colors = ["steelblue", "black", "red", "gold", "olivedrab", "powderblue", "orange", "orchid", "saddlebrown"]
var w = 960
var h = 500
var margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 30
},
  width = w - margin.left - margin.right,
  height = h - margin.top - margin.bottom;

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
  })

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("https://inboxr.firebaseio.com/inboxr.json", function(data) {

  var dataset = []

  for (var d in data) {
    dataset.push({
      "time": new Date(data[d].time),
      "count": data[d].count,
      "id": data[d].id
    })
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
    }
    ix++;
  }
  var y_offset = 0;

  names_arr = []
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
    i = names_arr[j].name

    svg.append("svg:rect")
      .attr("x", 20)
      .attr("y", 40 + y_offset)
      .attr("style", "stroke: " + names_dict[i].color)
      .attr("height", "1")
      .attr("width", 32);


    svg.append("svg:text")
      .attr("x", 55)
      .attr("y", 45 + y_offset)
      .text(i);


    svg.append("svg:text")
      .attr("x", 120)
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZGFuaWVsc3VvL2luYm94ci9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9kYW5pZWxzdW8vaW5ib3hyL2NsaWVudC9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gbWFraW5nIHN0dWZmIHJlc3BvbnNpdmVcblxuLy8gZDMuc2VsZWN0KHdpbmRvdylcbi8vXHQub24oXCJyZXNpemVcIiwgc2l6ZUNoYW5nZSk7XG5cbi8vIGNvbnNvbGUubG9nKCQoXCIjY29udGFpbmVyXCIpLndpZHRoKCkvOTAwKVxuLy8gZnVuY3Rpb24gc2l6ZUNoYW5nZSgpIHtcbi8vIFx0Y29uc29sZS5sb2coJChcIiNjb250YWluZXJcIikud2lkdGgoKS85MDApXG4vLyAgICAgZDMuc2VsZWN0KFwiZ1wiKS5hdHRyKFwidHJhbnNmb3JtXCIsIFwic2NhbGUoXCIgKyAkKFwiI2NvbnRhaW5lclwiKS53aWR0aCgpLzkwMCArIFwiKVwiKTtcbi8vICAgICAkKFwic3ZnXCIpLmhlaWdodCgkKFwiI2NvbnRhaW5lclwiKS53aWR0aCgpKjAuNjE4KTtcbi8vIH1cblxuZnVuY3Rpb24gZmlsdChhcnIsIG5hbWUpIHtcbiAgdmFyIGZpbHRlcmVkID0gYXJyLmZpbHRlcihmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGQuaWQgPT0gbmFtZTtcbiAgfSk7XG5cbiAgZmlsdGVyZWQuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEudGltZSAtIGIudGltZTtcbiAgfSlcblxuICByZXR1cm4gZmlsdGVyZWQ7XG59XG52YXIgY29sb3JzID0gW1wic3RlZWxibHVlXCIsIFwiYmxhY2tcIiwgXCJyZWRcIiwgXCJnb2xkXCIsIFwib2xpdmVkcmFiXCIsIFwicG93ZGVyYmx1ZVwiLCBcIm9yYW5nZVwiLCBcIm9yY2hpZFwiLCBcInNhZGRsZWJyb3duXCJdXG52YXIgdyA9IDk2MFxudmFyIGggPSA1MDBcbnZhciBtYXJnaW4gPSB7XG4gIHRvcDogMjAsXG4gIHJpZ2h0OiAyMCxcbiAgYm90dG9tOiAzMCxcbiAgbGVmdDogMzBcbn0sXG4gIHdpZHRoID0gdyAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICBoZWlnaHQgPSBoIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbnZhciB4ID0gZDMudGltZS5zY2FsZSgpXG4gIC5yYW5nZShbMCwgd2lkdGhdKTtcblxudmFyIHkgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAucmFuZ2UoW2hlaWdodCwgMF0pO1xuXG52YXIgeEF4aXMgPSBkMy5zdmcuYXhpcygpXG4gIC5zY2FsZSh4KVxuICAub3JpZW50KFwiYm90dG9tXCIpO1xuXG5cbnZhciB5QXhpcyA9IGQzLnN2Zy5heGlzKClcbiAgLnNjYWxlKHkpXG4gIC50aWNrRm9ybWF0KGQzLmZvcm1hdChcImRcIikpXG4gIC5vcmllbnQoXCJsZWZ0XCIpO1xuXG52YXIgbGluZSA9IGQzLnN2Zy5saW5lKClcbiAgLmludGVycG9sYXRlKFwiYmFzaXNcIilcbiAgLngoZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiB4KGQudGltZSk7XG4gIH0pXG4gIC55KGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4geShkLmNvdW50KTtcbiAgfSlcblxudmFyIHN2ZyA9IGQzLnNlbGVjdChcImJvZHlcIikuYXBwZW5kKFwic3ZnXCIpXG4gIC5hdHRyKFwid2lkdGhcIiwgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gIC5hcHBlbmQoXCJnXCIpXG4gIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIixcIiArIG1hcmdpbi50b3AgKyBcIilcIik7XG5cbmQzLmpzb24oXCJodHRwczovL2luYm94ci5maXJlYmFzZWlvLmNvbS9pbmJveHIuanNvblwiLCBmdW5jdGlvbihkYXRhKSB7XG5cbiAgdmFyIGRhdGFzZXQgPSBbXVxuXG4gIGZvciAodmFyIGQgaW4gZGF0YSkge1xuICAgIGRhdGFzZXQucHVzaCh7XG4gICAgICBcInRpbWVcIjogbmV3IERhdGUoZGF0YVtkXS50aW1lKSxcbiAgICAgIFwiY291bnRcIjogZGF0YVtkXS5jb3VudCxcbiAgICAgIFwiaWRcIjogZGF0YVtkXS5pZFxuICAgIH0pXG4gIH1cblxuICB4LmRvbWFpbihkMy5leHRlbnQoZGF0YXNldCwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkLnRpbWU7XG4gIH0pKTtcbiAgeS5kb21haW4oZDMuZXh0ZW50KGRhdGFzZXQsIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZC5jb3VudDtcbiAgfSkpO1xuXG4gIHN2Zy5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcInggYXhpc1wiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyBoZWlnaHQgKyBcIilcIilcbiAgICAuY2FsbCh4QXhpcyk7XG5cbiAgc3ZnLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpXG4gICAgLmNhbGwoeUF4aXMpXG4gICAgLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtOTApXCIpXG4gICAgLmF0dHIoXCJ5XCIsIDYpXG4gICAgLmF0dHIoXCJkeVwiLCBcIi43MWVtXCIpXG4gICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJlbmRcIilcbiAgICAudGV4dChcIkNvdW50XCIpO1xuXG4gIHZhciBuYW1lc19kaWN0ID0ge307XG4gIGZvciAodmFyIGkgaW4gZGF0YXNldCkge1xuICAgIG5hbWVzX2RpY3RbZGF0YXNldFtpXS5pZF0gPSAwO1xuICB9XG5cbiAgdmFyIGl4ID0gMDtcblxuICBmb3IgKHZhciBpIGluIG5hbWVzX2RpY3QpIHtcbiAgICBuYW1lc19kaWN0W2ldID0ge1xuICAgICAgXCJjb2xvclwiOiBjb2xvcnNbaXhdXG4gICAgfVxuICAgIGl4Kys7XG4gIH1cbiAgdmFyIHlfb2Zmc2V0ID0gMDtcblxuICBuYW1lc19hcnIgPSBbXVxuICBmb3IgKHZhciBpIGluIG5hbWVzX2RpY3QpIHtcbiAgICB2YXIgbmFtZV9zbGljZSA9IGZpbHQoZGF0YXNldCwgaSk7XG5cbiAgICBuYW1lc19kaWN0W2ldLmxhc3QgPSBuYW1lX3NsaWNlLnNsaWNlKC0xKVswXS5jb3VudDtcblxuICAgIHN2Zy5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAuZGF0dW0obmFtZV9zbGljZSlcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsaW5lXCIpXG4gICAgICAuYXR0cihcInN0eWxlXCIsIFwic3Ryb2tlOiBcIiArIG5hbWVzX2RpY3RbaV0uY29sb3IpXG4gICAgICAuYXR0cihcImRcIiwgbGluZSk7XG5cbiAgICBuYW1lc19hcnIucHVzaCh7XG4gICAgICBcIm5hbWVcIjogaSxcbiAgICAgIFwibGFzdFwiOiBuYW1lc19kaWN0W2ldLmxhc3RcbiAgICB9KTtcbiAgfVxuXG4gIG5hbWVzX2Fyci5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYS5sYXN0IC0gYi5sYXN0O1xuICB9KTtcblxuICBmb3IgKHZhciBqIGluIG5hbWVzX2Fycikge1xuICAgIGkgPSBuYW1lc19hcnJbal0ubmFtZVxuXG4gICAgc3ZnLmFwcGVuZChcInN2ZzpyZWN0XCIpXG4gICAgICAuYXR0cihcInhcIiwgMjApXG4gICAgICAuYXR0cihcInlcIiwgNDAgKyB5X29mZnNldClcbiAgICAgIC5hdHRyKFwic3R5bGVcIiwgXCJzdHJva2U6IFwiICsgbmFtZXNfZGljdFtpXS5jb2xvcilcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIFwiMVwiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCAzMik7XG5cblxuICAgIHN2Zy5hcHBlbmQoXCJzdmc6dGV4dFwiKVxuICAgICAgLmF0dHIoXCJ4XCIsIDU1KVxuICAgICAgLmF0dHIoXCJ5XCIsIDQ1ICsgeV9vZmZzZXQpXG4gICAgICAudGV4dChpKTtcblxuXG4gICAgc3ZnLmFwcGVuZChcInN2Zzp0ZXh0XCIpXG4gICAgICAuYXR0cihcInhcIiwgMTIwKVxuICAgICAgLmF0dHIoXCJ5XCIsIDQ1ICsgeV9vZmZzZXQpXG4gICAgICAudGV4dChuYW1lc19kaWN0W2ldLmxhc3QpO1xuXG4gICAgeV9vZmZzZXQgPSB5X29mZnNldCArIDE4O1xuICB9XG5cbiAgLy8gY2hhcnQgdGl0bGVcblxuICAvLyBzdmcuYXBwZW5kKFwic3ZnOnRleHRcIilcbiAgLy8gICAgIC5hdHRyKFwieFwiLCB3LzItNTApXG4gIC8vICAgICAuYXR0cihcInlcIiwgMjApXG4gIC8vICAgICAuYXR0cihcImlkXCIsIFwidGl0bGVcIilcbiAgLy8gICAgIC50ZXh0KFwiSW5ib3hyXCIpO1xufSk7Il19
