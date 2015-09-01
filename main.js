var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request('http://substack.net/images/', function(error,response, body){
	if (!error && response.statusCode==200 ){
		var $ = cheerio.load(body)
		var tags = $("tr")

		var generate_string = "";
		tags.each(function(index,tag){

			var size = $(tag).children("td").eq(1).text();
			var perm = $(tag).children("td").first().text();
			var url = $(tag).children("td").last().children("a").attr('href');
			var re = /(?:\.([^.]+))?$/;
			var ext = re.exec(url)[0];
			if (ext == "") {
				ext = "Directory";
			}
			generate_string += perm + "," + url + "," + ext + '\n';
		});
		fs.writeFile('image.csv',generate_string);
	}

})