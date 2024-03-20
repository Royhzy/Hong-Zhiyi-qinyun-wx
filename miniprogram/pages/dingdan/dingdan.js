var openid='';
var cur='';
var o=1;   //为了不让onshow第一次执行

Page({

    /**
     * 页面的初始数据
     */
    data: {
      isRefresh: false,
      currentTab: 0,
      tabList: [
        {
        name: '全部'
      },
      {
        name: '待收货'
      }
    ],
    list:[],
    shouhuoList:[],
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
        title: '没有更多订单啦',
        icon:"none"
      })
    },

    goDetail(e){        //跳转商品详情页
      wx.navigateTo({
        url: '/pages/yueqiDetail/yueqiDetail?id='+e.currentTarget.dataset.id,
      })
  },

  getList(){                         //获取下拉数据
    let openid= wx.getStorageSync('openid')
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
        url: 'http://www.qinyunbs.com:8090/wxapi/Dingdan/getdingdan?openid='+openid,
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

  getshouhuoList(){
      let openid= wx.getStorageSync('openid')
      var that = this
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
          url: 'http://www.qinyunbs.com:8090/wxapi/Dingdan/getnshouhuodingdan?openid='+openid,
          success: function (res) {
            if(res.data.length>0){
              that.setData({
                shouhuoList:res.data
              })
            }
          }
      })
      wx.hideLoading()
  },

  querenshouhuo(e){
    let id=e.currentTarget.dataset.id
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '确认收货',
      content:'请确认是否收到商品',
      success:(res)=>{
          if(res.confirm){
            wx.request({
              url: 'http://www.qinyunbs.com:8090/wxapi/Dingdan/udshouhuo?id='+id,
              success: function (res) {
                  setTimeout(() => {
                    wx.showToast({
                      title: '确认收货成功！',
                    });
                    setTimeout(() => {
                      wx.hideToast();
                    }, 3000)
                  }, 0);
                  //刷新
                  const pages = getCurrentPages()
                  const perpage = pages[pages.length - 1]
                  perpage.onLoad()  
              }
          })
          }
      }
    })
  },

  daipingjia(e){
    wx.navigateTo({
      url: '/pages/pingjia/pingjia?dingdan_id='+e.currentTarget.dataset.id,
    })
  },

    onLoad: function (options) {

          let openid= wx.getStorageSync('openid')
          this.getList()
          this.getshouhuoList() 
    },
  
  
    onShow: function () {
      if(o!=1){          //先执行onload
        const pages = getCurrentPages()
        const perpage = pages[pages.length - 1]
        perpage.onLoad()  
      }
      o+=1;
    },
})