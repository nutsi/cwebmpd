;(function(win) {

    win.App = win.App || {};

    App.ControlsView = Backbone.View.extend({

        el: '.controls',

        events: {
            'click .next': 'next',
        'click .prev': 'prev',
        'click .playback': 'playback'
        },

        initialize: function initialize() {
            this.$playback = this.$('.playback');
            this.model.on('change', this.updateView, this);
        },

        updateView: function updateView(model) {
            if(model.changed.state) {
                this.setState(model.changed.state);
            }
        },

        prev: function prev() {
            $.ajax({
                type: 'post',
            url: '/prev',
            data: {}
            });
        },

        next: function next() {
            $.ajax({
                type: 'post',
            url: '/next',
            data: {}
            });
        },

        playback: function playback() {
            var pause, state;

            if (this.model.isPaused()) {
                pause = 0;
                state = ' play';
            } else if(this.model.isPlaying()) {
                pause = 1;
                state = ' pause';
            }
            else if (this.model.isStoping()) {
                pause = -1;
                state = ' pause'; 
                $.ajax({
                    type: 'post',
                    url: '/playidsong',
                    data: {id: this.model.get('songid')}
                });
                this.model.set('state', state);
                return;
            }

            $.ajax({
                type: 'post',
                url: '/pause',
                data: {pause: pause}
            });
            this.model.set('state', state);
        },

        setState: function setState(state) {
            var self = this
                , actions = {};

            actions[' pause'] = function pause() {
                self.$playback.attr('class', 'playback fa fa-play fa-3x');
            };

            actions[' play'] = function play() {
                self.$playback.attr('class', 'playback fa fa-pause fa-3x');
            };

            if (state == ' pause' || state == ' stop')
                actions[' pause']();
            else 
                actions[' play']();
        }

    });

}(window));
