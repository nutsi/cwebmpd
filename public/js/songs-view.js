;(function(win) {

  win.App = win.App || {};

  App.SongsView = App.HiddeableView.extend({

/*    events: {
      'click .group': 'showGroup'
    },

    el: '.groups',

    initialize: function initialize() {
      this.$list = this.$('.list');
      this.collection.on('sync', this.showGroup, this);
      this.collection.fetch();
    },

    showGroup: function showGroup(e) {
        this.$list.empty();
      var $target = $(e.currentTarget);
      var group = $target.data('group');
      var groups = this.collection.groupBy(group);

      _.each(groups, function(value, key) {
        console.log(value);
          this.$list.append($('<h2></h2>').text(key));
          _.each(value, function(v) {
              this.$list.append('<table class="table"><thead><tr><th>Title</th></tr></thead><tbody>');
              this.$list.append(
         //     var $t = $('<div></div>').text(v.get('Title') + '  ' + v.get('Album')+ '   ' + v.get('Artist'));
          //    this.$list.append($t);
          }, this);
      }, this);
    }

  });
*/
    el: '.groups',

    events: {
      'click tbody tr': 'onSongClick',
      'mouseover tbody tr' : 'onSongOver',
      'mouseout tbody tr' : 'onSongOut',
    },

    template: _.template(
      '<tr class="view" data-album="<%= Album %>">' +
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
      console.log($el.data('album'));
      
      /*$.ajax({
        type: 'post',
        url: '/playidsong',
        data: {id: $el.data('id')}
      });*/
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
