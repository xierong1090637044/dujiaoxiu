Component({
    externalClasses: ['i-class'],

    properties: {
        percent: {
            type: Number,
            value: 0
        },
      count: Number,
      numbers: Number,
        // normal || active || wrong || success
        status: {
            type: String,
            value: 'normal'
        },
        strokeWidth: {
            type: Number,
            value: 5
        },
        hideInfo: {
            type: Boolean,
            value: false
        }
    },
    
  ready() {
    
    this.getNumber()
  },

  methods: {
    getNumber:function()
    {
      const data = this.data;
      var that = this;
      setTimeout(function () {
        const percent = Math.round(data.count / data.numbers * 100);
        if (percent > 100) {
          that.setData({ percent: 100 })
        } else {
          that.setData({ percent: percent })
        }
      }, 500)
      
      
    }
  }
});
