;(function(win) {

  win.App = win.App || {};

  App.CurrentSongView = Backbone.View.extend({

    el: '.song',

    template: _.template('<%= Artist %> - <%= Title %>'),

    initialize: function initialize() {
      this.$title = this.$('.title');
      this.$album = this.$('.album');
      this.$artist = this.$('.artist');

      this.model.on('change', this.render, this);
    },

    setTitle: function setTitle() {
      var text = this.template(model.attributes);
      this.$documentTitle(text);
    },

    render: function render(model) {
      this.$title.html(model.get('Title') + "<i> (" + model.get('Id') + ")</i>");
      this.$artist.html(model.get('Artist'));
      this.$album.html(model.get('Album'));
    }

  });

}(window));
