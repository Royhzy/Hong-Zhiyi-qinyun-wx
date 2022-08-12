// pages/location/location.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:"泉州师范学院软件学院",
        phone:"17705052595",
        weixin:"hongzy1014",
        markers:[
            {
                id:0,
                name:"我家琴行",
                address:"阿里巴巴",
                longitude:118.584438,
                latitude:24.910592,
                width:30,
                height:30
            }]
    },

    clickMap(e)
    {
        console.log(e.currentTarget.dataset.marker)
        var marker=e.currentTarget.dataset.marker
        wx.getLocation({
            type: 'wgs84',
            success (res) {
                wx.openLocation({
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                  name:marker.name,
                  address:marker.address,
                  scale:18
                })
            },
            fail(res){
                console.log("获取位置失败",res)
                wx.showModal({
                  title:"需要授权",
                  "content":"需要获取信息，才可以实现导航，点击去设置开启位置权限",
                  "confirmText":"去设置",
                  success(res){
                      console.log("弹窗点击",res)
                      if(res.confirm){
                          wx.openSetting()
                      }
                  }
                })
            }
        })
    },
    callPhone(e){
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.phone,
        })
    },
    copyWeChat(event){
        wx.setClipboardData({
          data: event.currentTarget.dataset.weixin,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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