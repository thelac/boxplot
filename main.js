var url = 'https://inboxr.firebaseio.com/';
var fb = new Firebase(url);


fb.on('value', function(data) {
  // Gets JavaScript object of the form
  // data[NAME] = Array of timestamped inbox count
  // data['Daniel'][0]
  data = data.val();

  var table = document.createElement('table')
  var rowCount = 0;
  var header = table.insertRow(rowCount);
  var personHeader = header.insertCell(0);
  personHeader.innerHTML = 'Name';
  var countHeader = header.insertCell(1);
  countHeader.innerHTML = 'Count';

  for (name in data) {
    // for (time in data[name]) {
    //   console.log('name: ' + name + ' time: ' + time + ' count: ' + data[name][time].count)
    // }
    rowCount++;
    var row = table.insertRow(rowCount);
    var person = row.insertCell(0);
    person.innerHTML = name;
    var count = row.insertCell(1);

    var c = (new Firebase(url + name)).limit(1);
    c.on('value', function(dat) {
      dat = dat.val();
      for (key in dat)
        count.innerHTML = dat[key].count;
    })


    document.body.appendChild(table);

  }
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