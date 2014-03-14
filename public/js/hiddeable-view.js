;(function(win) {

  win.App = win.App || {};

  App.HiddeableView = Backbone.View.extend({

    show: function show() {
      this.$el.removeClass('hidden');

      return this.$el;
    },

    hide: function hide() {
      this.$el.addClass('hidden');

      return this.$el;
    },

  isHidden: function isHidden() {
      if (this.$el.hasClass('hidden') == false)
        return false;
    return true;
  }
  });

}(window));
