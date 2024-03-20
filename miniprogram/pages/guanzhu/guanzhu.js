var openid='';
var cur='';
var dangqianList='';
var o=1;   //为了不让onshow第一次执行
var myDate = new Date();
let sfz='';

Page({

    /**
     * 页面的初始数据
     */
    data: {
      isRefresh: false,
  
      currentTab: 0,
      tabList: [
        {
        name: '关注老师'
      },
      {
        name: '预约课程'
      }
    ],

    list:[],
    yuyuelist:[]
    },
  
    tabNav(e) {
      let currentTab = e.currentTarget.dataset.index
      this.setData({
        currentTab
      })
    },
    handleSwiper(e) {
      let {current,source} = e.detail
      if (source === 'autoplay' || source === 'touch') {
        const currentTab = current
        this.setData({
          currentTab
        })
      }
    },
    handleTolower(e){
      wx.showToast({
        title: '没有更多老师啦',
        icon:"none"
      })
    },

    goDetail(e){        //跳转商品详情页
      wx.navigateTo({
        url: '/pages/teacherDetail/teacherDetail?sfz='+e.currentTarget.dataset.id,
      })
  },

  getList(){                         //获取下拉数据
    let openid= wx.getStorageSync('openid')
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
        url: 'http://www.qinyunbs.com:8090/wxapi/Guanzhu/getguanzhu?openid='+openid,
        success: function (res) {
            if(res.data.length>0){
              that.setData({
                list:res.data
		        })
            }
        }
    })
    wx.hideLoading()
  },

  
  getyuyueList(){                         //获取下拉数据
    let openid= wx.getStorageSync('openid')
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
        url: 'http://www.qinyunbs.com:8090/wxapi/Yuyue/getyuyue?openid='+openid,
        success: function (res) {
          if(res.data.length>0){
            that.setData({
              yuyuelist:res.data
          })
          dangqianList=res.data;
          }
        }
    })
    wx.hideLoading()
},
    zhifu(e){
      var that=this;
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '确认支付',
        content:'请确认该节课已上完后再支付（若没上课请联系客服）',
        success(res){
          if(res.confirm){
              let {item}=e.currentTarget.dataset
              wx.request({              //修改zhifu
                  url: 'http://www.qinyunbs.com:8090/wxapi/Yuyue/udzhifu?id='+item.id+'&feiyongtime='+that.formatTime(myDate),
                  success: function (res) {
                    setTimeout(() => {
                      wx.showToast({
                        title: '支付成功！',
                        icon:'none',
                      });
                        setTimeout(() => {
                          wx.hideToast();
                        }, 2500)
                      }, 0);
                  }
              })
               //带有参数id的刷新
               const pages = getCurrentPages()
               const perpage = pages[pages.length - 1] //当前页面
               const keyList = Object.keys(perpage.options) //当前页面携带的路由参数
               if(keyList.length > 0){
                let keys = '?'
                 keyList.forEach((item, index) =>{ 
                     index === 0 ? 
                      keys = keys + item + '=' + perpage.options[item] : keys = keys + '&' + item + '=' + perpage.options[item] })
                      wx.reLaunch({
                         url: '/' + perpage.route + keys
                      })
                }else{
                  wx.navigateTo({
                      url: '/' + perpage.route //当前页面路由地址
                })
             }    
          }
        }
      })
    },

    formatTime(date){
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
   
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()

      if(hour<10)
      {
          hour='0'+hour;
      }
      if(minute<10)
      {
          minute='0'+minute;
      }
      if(second<10)
      {
          second='0'+second;
      }
   
      return [year, month, day].join('/') + ' ' + [hour, minute, second].join(':')
  },

    onLoad: function (options) {
      cur=options.currentTab;
      this.setData({
        currentTab:cur
      })

      let openid= wx.getStorageSync('openid')
      this.getList()
      this.getyuyueList() 
    },
  
  
    onShow: function () {
      if(o!=1){          //先执行onload
        const pages = getCurrentPages()
        const perpage = pages[pages.length - 1]
        perpage.options.currentTab=this.options.currentTab
        perpage.onLoad(perpage.options)  
      }
      o+=1;
    },
})