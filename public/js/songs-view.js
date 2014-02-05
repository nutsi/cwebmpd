;(function(win) {

  win.App = win.App || {};

  App.SongsView = App.HiddeableView.extend({

    el: '.groups',

    events: {
      'click tbody tr': 'onSongClick',
      'mouseover tbody tr' : 'onSongOver',
      'mouseout tbody tr' : 'onSongOut',
    },

    template: _.template(
      '<tr class="view" data-album="<%= Album %>" data-artist="<%= Artist %>" data-song="<%= Title %>" >' +
      '<td><%= Title %></td>' +
      '<td><%= parseTime(Time).join(\':\') %></td>' +
      '<td><%= Artist %></td>' +
      '<td class="album"><%= Album %></td>' +
      '<td><%= Genre %></td>' +
      '</tr>'
    ),

    initialize: function initialize() {
      this.$body = this.$('tbody');
      this.$list = this.$('tlist');

      this.collection.on('sync', this.renderAll, this);
      this.collection.fetch();
    },

    render: function render(model) {
        var searched = $(searchingsong).val().toUpperCase();

        if (model.attributes['Title'].toUpperCase().indexOf(searched)== -1) {
        }
        else {
            var $line = $(this.template(model.toJSON()));
            this.$body.append($line);
        }
    },

    renderAll: function renderAll(collection) {
        var searched = $(searchingsong).val().toUpperCase();
        searched += ' ';
        var artist = '';
        var album = '';

        var ind = 0;
        if ((ind = searched.search('ARTIST:')) >= 0) {
            var sli = searched.slice(ind);
            var artist  = sli.substring(sli.indexOf(':') + 1, sli.indexOf(' '));
            searched = sli.substr(sli.indexOf(' '));
        }
        if ((ind = searched.search('ALBUM:')) >= 0) {
            var sli = searched.slice(ind);
            var album= sli.substring(sli.indexOf(':') + 1, sli.indexOf(' '));
            searched = sli.substr(sli.indexOf(' '));
        }
        searched = searched.substr(0, searched.lastIndexOf(' '));
        this.$body.empty();
        collection.each(function(model) {
            if (model.attributes['Artist'].toUpperCase().indexOf(artist)== -1) {
                return;
            }
            if (model.attributes['Album'].toUpperCase().indexOf(album)== -1) {
                return;
            }
            if (model.attributes['Title'].toUpperCase().indexOf(searched)== -1) {
                return;
            }
            var $line = $(this.template(model.toJSON()));
            this.$body.append($line);
       
        },this);
    },

    onSongClick: function onSongClick(e) {
      var $el = $(e.currentTarget);
      
      var attr = document.getElementById('check-artist');
      var attr2 = document.getElementById('check-album');
      if (attr.checked) {
          $.ajax({
              type: 'post',
              url: '/addsongs',
              data: {tags: 'Artist', search: $el.data('artist')}
          });
      }
      else if (attr2.checked) {
          $.ajax({
              type: 'post',
              url: '/addsongs',
              data: {tags: 'Album', search: $el.data('album')}
          });
      }
      else {
          $.ajax({
              type: 'post',
              url: '/addsongs',
              data: {tags: 'Title', search: $el.data('song')}
          });
      }
    },


    onSongOver: function onSongOver(e) {
       var spin = e.currentTarget;
       var tit = $(spin).css('color');
       $(spin).css('background-color', 'white');
    },

    onSongOut: function onSongOut(e) {
       var spin = e.currentTarget;
       var tit = $(spin).css('color');
       $(spin).css('background-color', '#EEEEEE');
    },
  });

}(window));
