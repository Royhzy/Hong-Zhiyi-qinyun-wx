let openid = ''
let sfz=''
let aa=''

Page({
    data: {
      status:'',
    }, 

    goziliao(){
      wx.navigateTo({
        url: '/pages/ziliaoxiangqing/ziliaoxiangqing?sfz='+sfz,
      })
    },

    gokebiao(){
      wx.navigateTo({
        url: '/pages/jskebiao/jskebiao?sfz='+sfz,
      })
    },
    
    gokecheng(){
      wx.navigateTo({
        url: '/pages/jskecheng/jskecheng?currentTab=0&sfz='+sfz,
      }) 
    },

    godaishang(){
      wx.navigateTo({
        url: '/pages/jskecheng/jskecheng?currentTab=1&sfz='+sfz,
      }) 
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      openid= wx.getStorageSync('openid')
      var that=this;
      wx.request({
        url: 'http://www.qinyunbs.com:8090/wxapi/Renzheng/chaxunrenzheng?openid='+openid,
        success: function (res) {
            if(res.data.length){
              that.setData({
                status:res.data[0].status,
                reason:res.data[0].reason
              })
              sfz=res.data[0].sfz
              wx.request({
                url: 'http://www.qinyunbs.com:8090/wxapi/Teacher/sfzQueryDetailfun?sfz='+sfz,
                success: function (res) {
                    that.setData({ 
                        list: res.data,
                    })
                }
              })
            }
        }
      })
    },



    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})