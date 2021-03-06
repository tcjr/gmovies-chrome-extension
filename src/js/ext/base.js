dojo.provide("ext.base");

dojo.require("dojo.DeferredList");
dojo.require("dojo.string");
dojo.require("ext.gmrt.Loader");

/**
 * Any functionality that depends on the DOM being available
 * should be passed inside a function to dojo.ready.
 */
dojo.ready(function() {
  console.debug("HERE WE GO!  Dojo version is %o", dojo.version);

  var titleNode = dojo.byId('title_bar');
  var msg = '<div>Now with RottenTomatoes!</div>';
  dojo.place(msg, titleNode, 'after');

  var loader = new ext.gmrt.Loader();
  var allLoads = new dojo.DeferredList([
    loader.loadMovies('http://i.rottentomatoes.com/syndication/rss/in_theaters.xml'),
    loader.loadMovies('http://i.rottentomatoes.com/syndication/rss/opening.xml')
  ]);
  
  // Wait for both loads to finish before continuing
  allLoads.then(function(){
   
    console.debug("All loaded. %o", loader.allMovies);
    
    var movieNodes = dojo.query(".showtimes .movie");
    movieNodes.forEach(function(movieNode) {
      var name = dojo.query(".name a", movieNode)[0].innerText;
      console.debug("Movie: %o", name);
      
      var rtInfo = loader.getMovieInfo(name);
      console.debug("... rtInfo is %o", rtInfo);

      // RATING PERCENTAGE
      if ((rtInfo.rating!="") && (!isNaN(rtInfo.rating))) {
        var infoNode = dojo.query(".info", movieNode)[0];
        //console.debug("Rating is %o (isNan returns %o)", rtInfo.rating, isNaN(rtInfo.rating));
        var ratingText = dojo.string.substitute('<nobr>: </nobr><nobr style="color:${0};">${1}%</nobr>', 
          [(rtInfo.rating<60 ? 'red' : 'green'), rtInfo.rating]);
        //var ratingText = '<nobr>: </nobr><nobr style="color:green;">'+rtInfo.rating+'</nobr>';
        dojo.place(ratingText, infoNode, 'last');
      }
      
      // RT LINK
      if (rtInfo.link!="") {
        var linkNodes = dojo.query(".info > a", movieNode);
        if (linkNodes.length != 0) {
          var lastLink = linkNodes[linkNodes.length-1];
          var linkText = dojo.string.substitute('<span> - </span><a href="${0}">RT</a>', [rtInfo.link]);
          dojo.place(linkText, lastLink, 'after');
        }
      }
      
    } /*, this */);
      
    
  });
  
  
});


