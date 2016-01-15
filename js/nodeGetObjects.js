var jsdom = require("jsdom");

jsdom.env({
    url: "http://tidesandcurrents.noaa.gov/stations.html?type=All%20Stations&sort=0",
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (err,window){
	var $ = window.$;
	$("body > div.container-fluid > div:nth-child(5) > div.span9 > div > div.row-fluid > div").addClass("stateList");

	var dataStorage = {
	    "example":[]
	}
	
	var stateList = $(".stateList");
	var count = 0;
	stateList.children().each(function(){
	    var mainContainer = $(this).children()[0];
	    var name = mainContainer.id;
	    count++;
	    console.log(name, count);
	    dataStorage[name] = [];
	    var allStateElements = $(mainContainer).children();
	    	var gotFirst = false;
	$(allStateElements).each(function () {
	    if(gotFirst != false) {
		//We got past the first result.
		$(this).children().each(function(){
		    var dataObject = $(this);

		    var children = dataObject.children();
		    var dateString = dataObject.find('.datefield').html();
		    var index = dateString.indexOf("-"); // get the index of the dash
		    var firstDate = dateString.substr(0,index-1); // -1 for spacing
		    var lastDate = dateString.substr(index+2);  // +2 for spacing
		    var data = {
			element: $(this),
			name: dataObject.find('a').html(),
			startDate: firstDate,
			endDate: lastDate,
			dataid: dataObject.attr('id').replace("a", ""),
		    }
		    data.link = "http://tidesandcurrents.noaa.gov/inventory.html?id="+data.dataid;
		    dataStorage[name].push(data);
		});
	    } else {
		gotFirst = true;
	    }
	});
    });
    console.log(dataStorage);
    }
});
