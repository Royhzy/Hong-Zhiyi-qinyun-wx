
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:''
    },
    //点击登录
    loadByWechat(){
        wx.getUserProfile({
          desc: '必须授权才可以使用',
          success:res=>{
            let user=res.userInfo
            //把用户信息缓存到本地
            wx.setStorageSync('user',user)
            console.log("用户信息",user)
            this.setData({
              userInfo:user
            })
          },
            fail:res=>{
              console.log('授权失败',res)
            }
        })
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let user= wx.getStorageSync('user')
        console.log('进入小程序loginDetail页面获取缓存',user)
        this.setData({
          userInfo:user
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
      const pages = getCurrentPages()
      const perpage = pages[pages.length - 1]
      perpage.onLoad() 
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