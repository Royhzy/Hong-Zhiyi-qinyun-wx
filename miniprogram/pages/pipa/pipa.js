// pages/piano/piano.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /*
    player(audio) {
        var that = this
        //title不写或放空会报错哦，即使不报错ios系统会不播放，所以必须加
        audio.title = '音乐'
     
        //这点需知微信小程序上线不能超过2M,音乐文件会很大，所以要放在服务器上才可以
        audio.src = 'cloud://qinyun-7geq104o41d95220.7169-qinyun-7geq104o41d95220-1312824116/钢琴安妮.mp3'
        
        //音乐播放结束后继续播放此音乐，循环不停的播放
        audio.onEnded(() => {
          that.player(wx.getBackgroundAudioManager())
        })
      },
      */

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       // this.player(wx.getBackgroundAudioManager())
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
       // this.player(wx.getBackgroundAudioManager())
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
       // wx.getBackgroundAudioManager().stop();
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
       // wx.getBackgroundAudioManager().stop();
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