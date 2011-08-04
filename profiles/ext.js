dependencies = {
  stripConsole : 'all',
  action : 'clean,release',
  optimize : 'shrinksafe',
  releaseName : 'js',
  localeList : 'en-us',

  layers: [
    {
      name: "../ext/base.js",
      resourceName : "ext.base",
      dependencies: [
        "ext.base"
      ]
    }
  ],

  prefixes: [
    //[ "dijit", "../dijit" ],
    //[ "dojox", "../dojox" ],
    [ "ext", "../../ext" ]
  ]
}

