var id='';
var openid='';
var dangqianList='';
var myName='';
var myPhone='';
var myAddress='';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName: '',
        Phone: '',
        Address: '',
        showAddress: true,
        addAddress: false,
        goodslist:[],
        totalMoney:0,
        totalNum:0,
        stardata: [1, 2, 3, 4, 5],
    },

    getList(){                         
        var that=this;
        wx.request({                      //获取商品
            url: 'http://www.qinyunbs.com:8090/wxapi/Yueqi/queryDetailfun?id='+id,
            success: function (res) {
                that.setData({ 
                    goodslist:res.data 
                })
                dangqianList=res.data
            }
        })

        wx.request({          //获取评价
            url: 'http://www.qinyunbs.com:8090/wxapi/Pingjia/querypingjia?goods_id='+id,
            success: function (res) {
                that.setData({ 
                    pingjialist: res.data
                })
            }
          })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        id=options.id;

        let openid= wx.getStorageSync('openid')
        this.getList()

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