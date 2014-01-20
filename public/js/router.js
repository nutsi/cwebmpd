;(function(win) {

  win.App = win.App || {};

  App.Router = Backbone.Router.extend({

    routes: {
      "playlist": "playlist",
      "songs": "songs"
    },

      initialize: function() {
      },

      playlist: function playlist() {
          App.songsView.hide();
          App.playlistView.show();
      },

      songs: function songs() {
          App.playlistView.hide();
          App.songsView.show();
      },

  });

}(window));

