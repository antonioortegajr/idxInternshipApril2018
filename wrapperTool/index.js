var axios = require("axios");
var cheerio = require("cheerio");
var absolutify = require("absolutify");

var site = 'http://dexlinx.valuedlender.com/purl/buyers';
var divId = '';
var divClass = '.sub_content';
var startStop = '<div id="idxStart"></div> <div id="idxStop"></div>';
var FALines = '<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet"> <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"/>'


axios.get(site)
.then(function (response) {
    var html = response.data;
    var parsed = absolutify(html, site);
    const $ = cheerio.load(parsed);
    $('head').prepend(FALines);
    $(divClass).text(startStop);
    console.log($.html());
    return $.html();
})
