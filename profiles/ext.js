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
    //[ "dojox", "../dojox" ],
    [ "ext", "../../ext" ]
  ]
}

