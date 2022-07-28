//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    site: [{
      id: 1,
      name: '教学楼1',
      checkShow: false,
      checkSelect: false,
      children: [{
        id: 1,
        name: '101',
        checkSelect: false
      }, {
        id: 2,
        name: '101',
        checkSelect: false
      }, {
        id: 3,
        name: '101',
        checkSelect: false
      }]
    },
    {
      id: 1,
      name: '教学楼2',
      checkShow: false,
      checkSelect: false,
      children: [{
        id: 1,
        name: '101',
        checkSelect: false
      }, {
        id: 2,
        name: '101',
        checkSelect: false
      }, {
        id: 3,
        name: '101',
        checkSelect: false
      }]
    }
    ],
    allCheck: false,
    operateType: ''
  },
  onLoad: function (options) {
    this.setData({
      operateType: options.type
    })
  },
  onUnload: function () {
    let pages = getCurrentPages();
    let currPage = null;
    if (pages.length) {
      currPage = pages[pages.length - 2];
    }
    if (currPage.route == 'pages/news/editinfo/index') {
      if (this.data.operateType == 'zimu') {
        currPage.setData({
          'pushForm.siteList': "pushForm位置赋值"
        })
      } else if (this.data.operateType == 'msg') {
        currPage.setData({
          'newsform.siteList': "newsform位置赋值"
        })
      }

    }



  },
  fatherRadio(e) {
    const rowIndex = e.currentTarget.dataset.index;
    const display = "site[" + rowIndex + "].checkSelect";
    const fatherCheck = !this.data.site[rowIndex].checkSelect;
    this.setData({
      [display]: fatherCheck
    });
    for (var i = 0; i < this.data.site[rowIndex].children.length; i++) {
      console.log(i)
      var childrenCheck = "site[" + rowIndex + "].children[" + i + "].checkSelect";
      this.setData({
        [childrenCheck]: fatherCheck
      });
    }
  },
  childrenRadio(e) {
    console.log(e)
    const liidnex = e.currentTarget.dataset.liidnex;
    const aidnex = e.currentTarget.dataset.aidnex;
    
  },
  changeAllcheck: function () {
    const allCheck = !this.data.allCheck;
    this.setData({
      allCheck: !this.data.allCheck
    });
    for (var i = 0; i < this.data.site.length; i++) {
      const fatherCheck = "site[" + i + "].checkSelect";
      for (var j = 0; j < this.data.site[i].children.length; j++) {
        var childrenCheck = "site[" + i + "].children[" + j + "].checkSelect";
        this.setData({
          [fatherCheck]: allCheck,
          [childrenCheck]: allCheck
        });
      }
    }

  },
  showSon(e) {
    console.log(e.currentTarget.dataset.index);
    const index = e.currentTarget.dataset.index;
    const show = "site[" + index + "].checkShow";
    console.log(show)
    console.log(!this.show)
    const checkShow = this.data.site[index].checkShow;
    this.setData({
      [show]: !checkShow
    });
  }


})