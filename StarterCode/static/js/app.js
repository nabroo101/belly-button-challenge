//testing the connection between app.js and index.html
console.log("test")

//using d3 libary to read samlpes.json from a url
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
d3.json(url).then(function(data){
  console.log(data);
  loadDemographics(data.names[0],data)
  loadComboBox(data)
  createCharts(data.names[0], data)
})

function loadDemographics(id, data) {
  console.log("loadDemographics") // load demogrphic subject info age , country , gender ....
}
function loadComboBox(data){
  console.log("loadComboBox") // load drop down list with all subject's ids
  let names = data.names;
  let sel = document.getElementById("selDataset");
  names.forEach(name => {
    opt = new Option (name,name)
    sel.appendChild(opt)
  });
}
function createCharts(id, data){
  console.log("createCharts")// create bar chart and buble chart for given subject id
  let bar = document.getElementById("bar");
  let gauge = document.getElementById("gauge");
  let bubble = document.getElementById("bubble"); 
  bar.innerText = "";
  gauge.innerText = "";
  bubble.innerText = "";
  // var trace1 = {
  //   x: [1, 2, 3, 4],
  //   y: [10, 11, 12, 13],
  //   mode: 'markers',
  //   marker: {
  //     size: [40, 60, 80, 100]
  //   }
  // };
  
  // var data = [trace1];
  
  // var layout = {
  //   title: 'Marker Size',
  //   showlegend: false,
  //   height: 600,
  //   width: 600
  let traceBubble = {
    x : otu_ids,
    y : sample_values

  }
  };
  
  Plotly.newPlot('myDiv', data, layout);
}
function optionChanged(id){
  d3.json(url).then(function(data){
    console.log("optionChanged", id);
    loadDemographics(id,data)
    createCharts(id, data)
  })
}