'use strict';

$(function(){
    var today = new Date().getDay()

    var updateFields = function(){    
        var menu = chrome.storage.sync.get("week", function(obj) {
            for (var i = 0; i<5; i++){
                if(today === obj.week[i].day){
                    $.each(obj.week[i], function(key, val) {
                        $("#"+key).html(val);
                    });
                }    
            }
        });
    }
    updateFields();

    var pullMenu = function(){
        $.getJSON("http://api.teknolog.fi/taffa/en/json/week/", function(data){
            // testmenu = {week: data};
            $.each(data, function(i) {
                chrome.storage.sync.set({week: data});
            });
            updateFields();
        });
    }
    pullMenu();

});
