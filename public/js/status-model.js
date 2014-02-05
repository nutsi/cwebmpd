;(function(win) {

  win.App = win.App || {};

  App.StatusModel = Backbone.Model.extend({

    states: {
      PAUSE: ' pause',
      PLAY: ' play',
      STOP: ' stop',
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

    isStoping: function isStoping() {
        return this.get('state') == this.states.STOP;
    },

    isPlaying: function isPlaying() {
      return this.get('state') == this.states.PLAY;
    },

    songID: function songID() {
        return this.get('songid');
    }

  });

}(window));
