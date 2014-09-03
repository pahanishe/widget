/*
 *  Twitter updates widget
 *  By Goldin Pavel
 *  Dependencies: jQuery v1.11.1
 */

jQuery.noConflict();

var widget = function($){

        var isMobile = function(browser) {
              if(browser.match(/iPhone/i) || browser.match(/Android/i) || browser.match(/iPad/i) || browser.match(/iPod/i)){
                return true;
              } else {
                return false;
              }
            }(navigator.userAgent),

            callJson = function(obj){
              $.ajax({
                cache: false,
                url: obj.url
              }).done(function(data) {
                obj.callback(data);
              });
            },

            truncation = function(objArr){
              $.each(objArr, function( index, value ){
                var obj = $(value);
                if (obj.height() > 36) {
                    var wordsArr = obj.html().split(/\s+/g);
                    wordsArr.push(' ...');

                    do {
                        wordsArr.splice(-2, 1);
                        obj.html( wordsArr.join(' ') );
                    } while(obj.height() > 36);
                }
              });
            },

            renderHtml = function(obj){

              if(!obj.data){return "";}

              var returnHtml = "<div class=\"widget\">"
                                +"<h1>PCH Tweets Homework</h1>";
                  if(isMobile){
                    returnHtml +="<div class='scroll'>";
                  }
                  returnHtml += "<ul>",
                  tweetsArr = obj.data.statuses;

              if(tweetsArr.length === 0){return "";}

              for(var i = 0; i < tweetsArr.length; i++){
                returnHtml +="<li>"
                            +"<a href=\"https://twitter.com/"+tweetsArr[i].user.screen_name+"\">"
                            +"<p>"
                            +"<img src=\""+tweetsArr[i].user.profile_image_url+"\"/>"
                            +"<span class=\"username\">@"+tweetsArr[i].user.screen_name+"</span>"
                            +"<span class=\"post\">"+tweetsArr[i].text+"</span>"
                            +"<span class=\"clear\"></span>"
                            +"</p>"
                            +"</a>"
                            +"</li>";
              }

              returnHtml +="</ul>"
                          if(isMobile){
                            returnHtml +="</div>";
                          }
              returnHtml +="<a class=\"refresh click"+obj.container+"\"></a>"
                          +"<div class=\"clear\"></div>"
                          +"</div>";
              return returnHtml;
            };


        return function(config){

                if(!config){return undefined;}

                var timeout,
                    callback = function(data){
                      var refreshLink = ".click" + config.container,
                          elContainer = $("." + config.container);

                      elContainer.html(renderHtml({
                        data : data,
                        container : config.container
                      }));

                      truncation(elContainer.find("span.post"));

                      clearTimeout(timeout);

                      timeout = setTimeout(start, 3000);

                      $(refreshLink).click(function(){
                        console.log('refresh');
                        clearTimeout(timeout);
                        start();
                      });
                    },

                    start = function(){
                              callJson({
                                callback : callback,
                                url : config.url
                              });
                    };

                start();

              };


      }(jQuery);

/* Add Widget */
jQuery("document").ready(function(){
  var widgetA = new widget({
    container:'elA',
    url:"pch_twitter_response_1.json"
  }),

  widgetB = new widget({
    container:'elB',
    url:"pch_twitter_response_2.json"
  });

  widgetC = new widget({
    container:'elC',
    url:"pch_twitter_response_1.json"
  });
});
