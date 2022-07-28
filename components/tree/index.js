Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
 
    treeArrIndex: {// 默认为0，当前循环的第几层，用于tree样式展示
      type: Number,
      value: 0
    },
    treeArr: Array
  },
  
    data: {
      collapse: true ,// 每个tree组件对应自己的collapse属性；（true:折叠/false:展开;）
      // treeList: [],
      // checked: {}
      treeArr2:[]
    },
    // observers:{
    //   "treeArr":function(treeArr){
    //     console.log("treeArr 数据有变化",treeArr)
    //     this.setData({
    //       treeArr2 : treeArr
    //     })
    //   }
    // },
    // ready:function(){
    //   this.setData({
    //     treeList:this.properties.treeArr
    //   })
    // },
  
    methods: {
      tapTreeItem: function(e) { // 点击项
        console.log(e)
        var item = e.currentTarget.dataset.item;
        if (item.items) { // 其下有子节点，可折叠展开操作
          let item = e.currentTarget.dataset.item;
          if (item.items) { // 其下有子节点，可折叠展开操作
            this.triggerEvent('treeTaps', {item}) 
          }
        } 
      },
      optionAction: function(arrays, obj) {
        for(let item of arrays) {
          if(item.id == obj.id) {
            item.checked = !obj.checked
            // item.collapse = !isarray.collapse
            if(item.items) {
              this.juDge(item.items, obj)
            }
          } else {
            if(item.items) {
              this.optionAction(item.items, obj)
            }
          }
        }
        return arrays
      },
      juDge(array, obj) {
        for(let item of array) {
          item.checked = !obj.checked
          // item.collapse = !obj.collapse
          if(item.items) {
            this.juDge(item.items, obj)
          }
        }
        console.log(array)
        return array
      },
      treenodetap: function(e) { // 递归的最终子节点
        console.log(e)
        var item = e.detail.item;
        this.triggerEvent('treeTap', { item }); // 将当前的点击项的数据传递给父页面
      },
      //点击复选框
      checkboxChange:function(e){
          let item = e.currentTarget.dataset.item
        console.log("checkboxChange===>",item)
          console.log(item)
          this.triggerEvent('treeTap', {item})
      },
     //传给父组件的函数
      treeTap:function(e) {
        console.log("子级treeTap===》",e)
        let item = e.detail.item
        this.triggerEvent('treeTap', {item})
      },
      //阻止事件冒泡
      // onStopEvent:function(){}
      	// 子页面添加 bind:treeTaps="treeTaps"
		treeTaps:function(e) {
			console.log("treeTaps===>",e)
			let item = e.detail.item
			this.triggerEvent('treeTaps', {item})
		  }
    }
  })