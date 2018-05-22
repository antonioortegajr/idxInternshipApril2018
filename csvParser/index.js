var axios = require("axios");
var fs = require("fs");
var rawData = '';
var data = [];
var csvContent = '';
//Change this to your rest endpoint.
var url = 'yourRestEndpoint';

//Gets your rest endpoint and sorts into an array of arrays
async function apiCall() {
  await axios.get(url)
    .then(function (response) {
      rawData = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    rawData.records.forEach(function(item) {
      name = item.name;
      time = item.date_entered;
      converted = item.converted;
      email = item.email1;

      set = [name, email, converted, time];

      data.push(set);
    });
  return data;
}

//Takes arrays from apiCall function and changes them into csv format
async function formatData() {
  var input = await apiCall();
  const header = ['Name', 'Email', 'Converted', 'Date/Time']

  input.forEach(function(rowArray) {
    var row = rowArray.join(','); 
    csvContent += row + '\r\n';
  });
  return header + '\r\n' + csvContent;
}

//Takes csv formatted data and creates a csv file in the same directory
async function createFile(fileName) {
  var csvData = await formatData();
  await fs.appendFile(fileName + '.csv', csvData, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

createFile('csvData');
