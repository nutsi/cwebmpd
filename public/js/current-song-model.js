;(function(win) {

  win.App = win.App || {};

  App.CurrentSongModel = Backbone.Model.extend({

    initialize: function initialize() {
      var self = this
        , ws = /*io.connect('http://localhost:3000/currentsong');*/ new WebSocket('ws://localhost:3000/currentsong');

      ws.addEventListener('message', function(e) {
        self.set(JSON.parse(e.data));
      });
    },

    getTime: function getTime(ratio) {
      var time = this.get('Time');
      return toInt(ratio ? ratio * time : time);
    }

  });


}(window));
