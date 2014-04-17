var fb = new Firebase('https://inboxr.firebaseio.com');

fb.on('value', function(data) {
  // Gets JavaScript object of the form
  // data[NAME] = Array of timestamped inbox count
  // data['Daniel'][0]
  data = data.val();

});

d3.select("body")
  .append("svg")
  .attr("width", 50)
  .attr("height", 50)
  .append("circle")
  .attr("cx", 25)
  .attr("cy", 25)
  .attr("r", 25)
  .style("fill", "purple");