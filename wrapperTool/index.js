var axios = require("axios");
var cheerio = require("cheerio");
var absolutify = require("absolutify");

var site = 'http://dexlinx.valuedlender.com/purl/buyers';
var divId = '';
var divClass = '.sub_content';
var startStop = '<div id="idxStart"></div> <div id="idxStop"></div>';


axios.get(site)
.then(function (response) {
    var html = response.data;
    var parsed = absolutify(html, site);
    const $ = cheerio.load(parsed);
    $(divClass).text(startStop);
    return $.html();
})
