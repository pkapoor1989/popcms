/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function parseNodesToNav(nodes, level) { 
	var list;
			console.log(nodes);
	if (nodes) {

		var list = "<ul class='navLevel" + level + "'>";
		for(var i=0; i<nodes.length; i++) {
			list += parseNodeToNav(nodes[i], level);
		}
		list += "</ul>";
	}
    return list;
}

function parseNodeToNav(node, level) { // takes a node object and turns it into a <li>
    var item = "<li><a href='" + node.url + "'>"; 
    item += node.name; 
    if(node.pages) item += parseNodesToNav(node.pages, level + 1);
	item += "</a></li>";
    return item;
}


exports.register = function(handlebars){ 
    handlebars.registerHelper('select', function(selected, options) {
        console.log("Selected:"+selected);
        return options.fn(this).replace(
            new RegExp(' value=\"' + selected + '\"'),
            '$& selected="selected"');
    }); 

	handlebars.registerHelper('nav', function (pages, options){
		if(pages)
		{ 
			return parseNodesToNav(pages, 0);
		}
	});


    handlebars.registerHelper('ifMatch', function (v1, v2, options) {
        if (v1 === v2) {
            console.log(v1 + " does match " + v2);
            return options.fn(this);
        }
            console.log(v1 + " does NOT match " + v2);
        return options.inverse(this);
    });
    
    handlebars.registerHelper('ifMatchTwice', function (v1, v2, v3, v4, options) {
        if (v1 === v2 && v3 === v4) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    
    handlebars.registerHelper('ifMatchPlusNullOrEmpty', function (match1Item, match2Item, nullOrEmptyItem, options) {
        if (match1Item === match2Item && (nullOrEmptyItem === null || nullOrEmptyItem === "") ) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    
    handlebars.registerHelper('ifNullOrEmpty', function (v1, options) {
        if (v1 === null || v1 === "") {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    handlebars.registerHelper('for', function (from, to, incr, block) {
        var accum = '';
        for (var i = from; i < to; i += incr)
            accum += block.fn(i);
        return accum;
    });

    handlebars.registerHelper('times', function (n, block) {
        var accum = '';
        for (var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    });

    handlebars.registerHelper('forlength', function (item, block) {
        var accum = '';
        for (var i = 0; i < item.length; i++)
            accum += block.fn(i);
        return accum;
    }); 
}