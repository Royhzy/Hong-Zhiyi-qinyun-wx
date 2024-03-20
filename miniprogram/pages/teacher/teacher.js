const db=wx.cloud.database();
const cmd=db.command;
var key= '';
var Indexs=0;
var Indexs2=0;
var selectDatas=["钢琴", "小提琴", "吉他","古筝","琵琶","二胡"];
var selectDatas2=["鲤城区", "丰泽区", "晋江市","洛江区","其他"];

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
        selectDatas: ["钢琴", "小提琴", "吉他","古筝","琵琶","二胡"], //下拉列表的数据1
        indexs: 0, //选择的下拉列 表下标,

        shows2:false,
        selectDatas2: ["鲤城区", "丰泽区", "晋江市","洛江区","其他"], //下拉列表的数据
        indexs2:0
    },


    getKey(e){
        this.setData({
            key:e.detail.value
        })
    },

    goDetail(e){        //跳转商品详情页
        wx.navigateTo({
          url: '/pages/teacherDetail/teacherDetail?sfz='+e.currentTarget.dataset.id,
        })
    },

    getList(){                         //获取下拉数据
        wx.showLoading({
            title: '加载中...',
        })

        var that = this
        wx.request({
            url: 'http://www.qinyunbs.com:8090/wxapi/Teacher/getSearchTeacher?instrument='+selectDatas[Indexs]+'&area='+selectDatas2[Indexs2],
            success: function (res) {
                wx.hideLoading()
                if(res.data.code==400)
                {
                    wx.showToast({
                        icon:'none',
                        title:'暂无相关老师'
                    })
                }
                else{
                    that.setData({
                        list: res.data
                    })
                }
        }
    })
    },



    // 点击下拉显示框
    selectTaps() {
        this.setData({
            shows: !this.data.shows,
        })
    },
    // 点击下拉列表
    optionTaps(e) {
      Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
      this.setData({
        indexs: Indexs,
        shows: !this.data.shows
      })
      this.getList()
    },

    selectTaps2() {
        this.setData({
            shows2: !this.data.shows2,
        })
    },
    // 点击下拉列表
    optionTaps2(e) {
      Indexs2 = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
      this.setData({
        indexs2: Indexs2,
        shows2: !this.data.shows2
      })
      this.getList()
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {                                //重新进入时为第一个选项
        wx.showLoading({
            title: '加载中...',
        })

        var that = this
        wx.request({
            url: 'http://www.qinyunbs.com:8090/wxapi/Teacher/getSearchTeacher?instrument=钢琴&area=鲤城区',
            success: function (res) {
                if(res.data.code==400)
                {
                    wx.showToast({
                        icon:'none',
                        title:'暂无相关老师'
                    })
                }
                else{
                    that.setData({
                        list: res.data
                    })
                }
                wx.hideLoading()
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
    // onReachBottom() {
    //     setTimeout(() => {
    //         wx.showToast({
    //           title: '没有更多老师了',
    //           icon: "none",
    //         });
    //         setTimeout(() => {
    //           wx.hideToast();
    //         }, 500)
    //       }, 0);
    // },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})