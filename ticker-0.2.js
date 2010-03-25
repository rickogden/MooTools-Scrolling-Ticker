var Ticker = new Class({
    Implements: Options,
    options: {
        speed: 3,
        interval: 45,
        direction: 'left'
    },
    initialize: function(el, options){
        this.setOptions(options);
        this.ticker = el;
        var width = el.getStyle('width');
        el.setStyles({
            'overflow': 'hidden',
		    'white-space': 'nowrap',
		    'padding': 0,
		    'padding-left': width
        });
        var list = el.getElements('li');
        list.setStyle('display','inline');
        this.scrollsize = el.getScrollSize().x;
        list.getLast().setStyle('margin-right', width);
        this.scrollposition = (this.options.direction == 'right') ? this.scrollsize : 0;
        el.addEvent('mouseenter', this.stop.bind(this));
        el.addEvent('mouseleave', this.start.bind(this));
        this.start();
    },
    
    scrollLeft: function(){
            this.scrollposition += this.options.speed;
            this.ticker.scrollTo(this.scrollposition);
            if(this.scrollposition >= this.scrollsize) {
                this.scrollposition = 0;
            }
    },
    
    scrollRight: function(){
            this.scrollposition -= this.options.speed;
            this.ticker.scrollTo(this.scrollposition);
            if(this.scrollposition <= 0) {
                this.scrollposition = this.scrollsize;
            }
    },
    
    start: function(){
        if(this.options.direction == 'right') this.period = this.scrollRight.periodical(this.options.interval, this);
        else this.period = this.scrollLeft.periodical(this.options.interval, this);
    },
    
    stop: function(){
        $clear(this.period);
    }
});
