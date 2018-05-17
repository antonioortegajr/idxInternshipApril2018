var axios = require("axios");
var fs = require("fs");
var rawData = '';
var data = [];
var csvContent = '';

async function apiCall() {
  await axios.get('sampleEndPoint')
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

async function formatData() {
  var input = await apiCall();
  const header = ['Name', 'Email', 'Converted', 'Date/Time']

  input.forEach(function(rowArray) {
    var row = rowArray.join(','); 
    csvContent += row + '\r\n';
  });
  return header + '\r\n' + csvContent;
}

async function createFile(fileName) {
  var csvData = await formatData();
  await fs.appendFile(fileName + '.csv', csvData, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

createFile('csvData');
