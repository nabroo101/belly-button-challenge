//testing the connection between app.js and index.html
console.log("test");

//using d3 libary to read samlpes.json from a url
const url =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function (data) {
  console.log(data);

  loadDemographics(data.names[0], data);
  loadComboBox(data);
  createCharts(data.names[0], data);
});

function loadDemographics(id, data) {
  console.log("loadDemographics"); // load demogrphic subject info age , country , gender ....
}
function loadComboBox(data) {
  console.log("loadComboBox"); // load drop down list with all subject's ids
  let names = data.names;
  let sel = document.getElementById("selDataset");
  names.forEach((name) => {
    opt = new Option(name, name);
    sel.appendChild(opt);
  });
}
function createCharts(sample) {
  d3.json(url).then(function (data) {
    // console.log(data);
    // console.log("test2");
    let samples = data.samples;
    // console.log(samples)
    let sampleArray = samples.filter((sample940) => sample940.id == sample);
    // console.log(sampleArray);
    let result = sampleArray[0];
    // console.log(result)
    //creating variables for sample_result, otu_ids , otu_lables
    let sample_values = result.sample_values;
    console.log("values");
    console.log(sample_values);

    // otu_ids variable
    let otu_ids = result.otu_ids;
    console.log("otu_ids");
    console.log(otu_ids);

    // otu_labels variable
    let otu_labels = result.otu_labels;
    console.log("otu_labels");
    console.log(otu_labels);

    //creating chart refrence : https://plotly.com/javascript/colorscales/
    let bubbleChart = {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      marker: {
        size: sample_values,
        colorscale: "Picnic",
      },
    };
    // variable for the buble chart data
    let bubbleChartData = [bubbleChart];

    // bubble chart layout
    let bubbleChartLayout = {
      title: "IDs vs Sample Values",
      xaxis: { title: "otu_ids" },
      yaxis: { title: "sample_values" },
    };
    Plotly.newPlot("bubble", bubbleChartData, bubbleChartLayout);
    // creating bar chart refrence https://plotly.com/javascript/horizontal-bar-charts/
    let barChartData = [{
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).map(i => 'OTU' + i).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'

    }];
    let barChartLayout = {
      title: "10 Sample IDs vs Sample Values"
    }
    //using id=bar in html file
    Plotly.newPlot('bar', barChartData, barChartLayout);
  
  });
};

function createMetaData(sample) {
  d3.json(url).then(function (data) {
    let metaData = data.metadata;
    // filtering
    let metaDataArray = metaData.filter(metadataObject => metadataObject.id == sample);
    let metaDataResult = metaDataArray[0];
    
    console.log('metadata result')
    console.log(metaDataResult)

    let metaDataPanel = d3.select("#sample-metadata");
    // clean the metadatapanel
    metaDataPanel.html("")

    for (i in metaDataResult){
      metaDataPanel.append("h5").text(i.toUpperCase() + ": " + metaDataResult[i]);

    };
    

  })
}