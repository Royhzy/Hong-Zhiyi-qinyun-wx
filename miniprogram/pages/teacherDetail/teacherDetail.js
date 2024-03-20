var id='';
let user='';
var openid='';
var dataList='';
let res='';
let sfz='';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:'',
        gzres:''
    },

    async guanzhu(){
        let openid= wx.getStorageSync('openid')
        if(user==''){
            wx.getSetting({
                success (res) {
                      // 没有授权做引导处理
                      wx.getUserProfile({
                        desc: '必须授权才可以使用',
                        success:res=>{
                          let user=res.userInfo
                          //把用户信息缓存到本地
                          wx.setStorageSync('user',user)
                         // 获取code凭证
                         wx.login({
                          success: (res) => {
                           // 传递code凭证
                          wx.request({
                              url: `https://api.weixin.qq.com/sns/jscode2session`,
                              method:'GET',
                              data:{
                                  appid:'wx57a86f1615a36adf',
                                  js_code:res.code,
                                  secret:'948537fb459c2037c342f6ddc87b23e0',
                                  grant_type:'authorization_code'
                              },
                              success: res => {
                                console.log('存入的openid：'+res.data.openid)
                                wx.setStorageSync('openid',res.data.openid)
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
                                wx.reLaunch({
                                    url: '/' + perpage.route //当前页面路由地址
                                })
                           }                       
                          },
                      })            
                        },
                          fail:res=>{
                            console.log('授权失败',res)
                        }
                    })  
                }
            })
        }
        else{
            var that = this;
            wx.request({
                url: 'http://www.qinyunbs.com:8090/wxapi/Guanzhu/getlength?teacher_id='+sfz+'&openid='+openid,
                success: function (res) {
                    if(res.data.length>0){
                        //取消关注
                        wx.request({
                            url: 'http://www.qinyunbs.com:8090/wxapi/Guanzhu/rmguanzhu?teacher_id='+sfz+'&openid='+openid,
                            success: function (res) {
                                that.setData({
                                    gzres:0
                                })
                                setTimeout(() => {
                                    wx.showToast({
                                      title: '取消关注成功',
                                      icon: "none",
                                    });
                                    setTimeout(() => {
                                      wx.hideToast();
                                    }, 500)
                                  }, 0);
                            }
                        }) 
                    }else{
                        wx.request({
                            url: 'http://www.qinyunbs.com:8090/wxapi/Guanzhu/addguanzhu',
                            method:'POST',
                            data:{   //data里面放携带参数
                                "openid":openid,
                                "teacher_id":sfz,
                                "area":dataList.area,
                                "img_image":dataList.img_image,
                                "instrument":dataList.instrument,
                                "educate":dataList.educate,
                                "name":dataList.name,
                                "price":dataList.price,
                                "school":dataList.school,
                                "teachage":dataList.teachage,
                            },
                            success: function (res) {
                                that.setData({
                                    gzres:1
                                })
                                setTimeout(() => {
                                    wx.showToast({
                                      title: '关注成功',
                                      icon: "success",
                                    });
                                    setTimeout(() => {
                                      wx.hideToast();
                                    }, 500)
                                  }, 0);
                            }
                        })
                    }
                }
            })  
        }
    
      },

    yuyue(e){
        wx.navigateTo({
            url: '/pages/kebiao/kebiao?sfz='+e.currentTarget.dataset.id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        sfz=options.sfz;
        var that = this
        wx.request({
            url: 'http://www.qinyunbs.com:8090/wxapi/Teacher/queryDetailfun?sfz='+sfz,
            success: function (res) {
                that.setData({ 
                    list: res.data,
                })
                dataList=res.data   //dataList传给购物车储备
            }
        })

        user= wx.getStorageSync('user')
        that.setData({
          userInfo:user
        })

        let openid= wx.getStorageSync('openid')

        wx.request({                //重新进入页面判断按钮要显示为关注还是已关注
            url: 'http://www.qinyunbs.com:8090/wxapi/Guanzhu/getlength?teacher_id='+sfz+'&openid='+openid,
            success: function (res) {
                if(res.data.length>0){
                    that.setData({ 
                        gzres:1
                    })
                }else{
                    that.setData({ 
                        gzres:0
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