;(function(win) {

  win.App = win.App || {};

  App.SongsCollection = Backbone.Collection.extend({

    groups: ['Artist', 'Album', 'Genre'],

    initialize: function() {
      var self = this;

      _.each(this.groups, function createGroups(group) {
        self['groupBy' + group] = function group() {
          return self.groupBy(group);
        }
      });
    },

    url: '/collection'

  });


}(window));
