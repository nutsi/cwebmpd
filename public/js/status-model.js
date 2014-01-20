;(function(win) {

  win.App = win.App || {};

  App.StatusModel = Backbone.Model.extend({

    states: {
      PAUSE: ' pause',
      PLAY: ' play',
    },

    initialize: function initialize() {
      var self = this
        , ws = new WebSocket('ws://localhost:3000/status');

      ws.addEventListener('message', function(e) {
        self.set(JSON.parse(e.data));
      });
    },

    isPaused: function isPaused() {
      return this.get('state') == this.states.PAUSE;
    },

    isPlaying: function isPlaying() {
      return this.get('state') == this.states.PLAY;
    }

  });

}(window));
