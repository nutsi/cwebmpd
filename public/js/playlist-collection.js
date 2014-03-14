;(function(win) {

  win.App = win.App || {};

  App.PlaylistCollection = Backbone.Collection.extend({

    url: '/playlist'

  });


}(window));



;(function(win) {

  win.App = win.App || {};

  App.PlaylistSearchCollection = Backbone.Collection.extend({

    url: '/playlistsearch'

  });


}(window));
