var url = 'https://inboxr.firebaseio.com/';
var fb = new Firebase(url);

var table = document.createElement('table');
document.body.appendChild(table);

fb.on('value', function(data) {
  // Gets JavaScript object of the form
  // data[NAME] = Array of timestamped inbox count
  // data['Daniel'][0]

  // This is shit because it grabs all the data,
  // when we don't want all of it; this is why
  // loading times are slow
  data = data.val();

  table.innerHTML = '';

  var rowCount = 0;
  var header = table.insertRow(rowCount);
  var personHeader = header.insertCell(0);
  personHeader.innerHTML = 'Name';
  var countHeader = header.insertCell(1);
  countHeader.innerHTML = 'Count';

  for (name in data) {
    // This is also shit beacuse it's not ordered
    rowCount++;
    var row = table.insertRow(rowCount);
    var person = row.insertCell(0);
    person.innerHTML = name;
    var count = row.insertCell(1);

    var c = (new Firebase(url + name)).limit(1);
    c.on('value', function(dat) {
      // I mean, seriously?
      dat = dat.val();
      for (key in dat)
        count.innerHTML = dat[key].count;
    })

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