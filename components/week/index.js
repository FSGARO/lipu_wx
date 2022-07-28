// import { weekArr } from '../../utils/text.js'
Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    title: {
      type: String,
      value: 'default value', //不存在此属性时
    },
    weekArr:{
      type:Array
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    weekArr: ''
  },
  ready:function(){
    console.log(this.data.weekArr)
  },
  methods: {
    childrenRadio:function(e){

      const index = e.currentTarget.dataset.index;
      const show = "weekArr[" + index + "].check";
      const check = this.data.weekArr[index].check;
      this.setData({
        [show]: !check
      });

      

    },
      onWeek:function(e){
        const type = e.currentTarget.dataset.type;
        this.triggerEvent('onWeek', { type: type, val: this.data.weekArr})
        console.log("213231231")
      }
  }
})