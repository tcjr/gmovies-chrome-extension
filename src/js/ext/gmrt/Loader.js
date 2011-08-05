dojo.provide('ext.gmrt.Loader');

dojo.declare('ext.gmrt.Loader', null, {

  constructor: function() {
    this.allMovies = {};
  },

  loadMovies: function(rtUrl) {
    //console.debug("LOADING... this=%o", this);

    var loadDef = dojo.xhrGet({
      url: rtUrl,
      handleAs: 'xml'
    }).then(  dojo.hitch(this, function(xmlDoc) {
      //console.debug("THEN... this=%o", this);
      this._addMovies(xmlDoc);
    }));

    return loadDef;
  },

  _addMovies: function(xmlDoc) {
    var itemNodes = xmlDoc.getElementsByTagName('item');
    //console.debug("ITEM NODES: %o", itemNodes);

    dojo.forEach(itemNodes, function(itemNode) {
      var title = itemNode.getElementsByTagName('title')[0].textContent.replace(/^\s*/,'');

      if ((title.indexOf('%') > 0) && (title.indexOf('%') < title.indexOf(' '))) {
        title = this.keyFor(title.substr(title.indexOf('%')+2));
      } else {
        title = this.keyFor(title);
      }

  		//var link = itemNode.getXlements.getElementsByTagName('link')[0].textContent,
  		//var description = itemNode.getXlements.getElementsByTagName('description')[0].textContent
  		var rt = itemNode.getElementsByTagNameNS('*', 'tomatometer_percent')[0].textContent;
  		var link = itemNode.getElementsByTagName('link')[0].textContent;

  		//console.debug("MOVIE: %s", title);
      var movie = {
        title: title,
        rating: rt,
        link: link
      };
  		
  		//console.debug("..adding movie: %o", movie);
  		this.allMovies[title] = movie;
    }, this);

    //console.debug("movie count = %o", this.allMovies.length);

  },
  
  getMovieInfo: function(title) {
    //console.debug("looking up %s", title);
    var movie = this.allMovies[this.keyFor(title)];
    //console.debug("resp: %o", movie);
    if (movie == undefined) {
      // todo: use factory?
      movie = {
        rating: '',
        link: ''
      };
    }
    return movie;
  },
  
  keyFor: function(txt) {
    return txt.toUpperCase().replace(/[^\w\s]/gi, '');
  }
  
});
