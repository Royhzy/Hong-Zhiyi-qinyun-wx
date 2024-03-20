var myDate = new Date();
let openid='';
let dingdan_id='';
let user='';
let neirong='';
let dataList='';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flag:0,
        stardata: [1, 2, 3, 4, 5],
    },

    changeColor: function (e) {
        var index = e.currentTarget.dataset.index;
        var num = e.currentTarget.dataset.no;
        var that = this;
        if(num == 1) {
          that.setData({
            flag:1,
          });
        } else if (num == 2){
          that.setData({
            flag:2,
          });
        } else if (num == 3) {
          that.setData({
            flag:3,
          });
        } else if (num == 4) {
          that.setData({
            flag:4,
          });
        } else if (num == 5) {
          that.setData({
            flag:5,
          });
        }
    },

    content(event) { //获取评价内容
        neirong = event.detail.value
    },

    tijiao(){
        if(this.data.flag==0||!neirong){
            wx.showToast({
              title: '请填写完整评价',
              icon:'error'
            })
        }else{
            wx.request({              //添加评价记录
                url: 'http://www.qinyunbs.com:8090/wxapi/Pingjia/addpingjia',
                method:'POST',
                data:{   
                  "openid":openid,
                  "goodsid":dataList[0].goodsid,
                  "title":dataList[0].title,
                  "inimg_image":dataList[0].inimg_image,
                  "nickName":user.nickName,
                  "avatarUrl":user.avatarUrl,
                  "xing":this.data.flag,
                  "neirong":neirong,
                  "dingdanid":dingdan_id,
                  "pingjia_time":this.formatTime(myDate),
                },
                success: function (res) {
                    wx.request({
                        url: 'http://www.qinyunbs.com:8090/wxapi/Dingdan/updatepingjia?id='+dingdan_id,
                        success: function (res) {
                            setTimeout(() => {
                                wx.showToast({
                                  title: '评价成功！即将回到订单页',
                                  icon:'none',
                                });
                                setTimeout(() => {
                                  wx.hideToast();
                                  wx.reLaunch({
                                    url: '/pages/dingdan/dingdan'
                                })
                                }, 2500)
                            }, 0);
                        }
                    })
                }
            })   
        }
    },

    formatTime(date){
      //获取当前时间
      // var year = date.getFullYear()
      // var month = date.getMonth() + 1
      // var day = date.getDate()
   
      // var hour = date.getHours()
      // var minute = date.getMinutes()
      // var second = date.getSeconds()

      // if(hour<10)
      // {
      //     hour='0'+hour;
      // }
      // if(minute<10)
      // {
      //     minute='0'+minute;
      // }
      // if(second<10)
      // {
      //     second='0'+second;
      // }
      //var riqi=[year, month, day].join('/') + ' ' + [hour, minute, second].join(':');
      
      //获取当前时间戳
      var timestamp = Date.parse(new Date());  
      timestamp = timestamp / 1000;  
      //console.log("当前时间戳为：" + timestamp);  
      return timestamp;
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        user= wx.getStorageSync('user')
        this.setData({
            userInfo:user
        })

        dingdan_id=options.dingdan_id;
        openid= wx.getStorageSync('openid')
        var that = this
        wx.request({
            url: 'http://www.qinyunbs.com:8090/wxapi/Dingdan/idgetdingdan?id='+dingdan_id,
            success: function (res) {
              if(res.data.length>0){
                that.setData({
                    list:res.data
                })
                dataList=res.data;
                console.log(dataList)
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