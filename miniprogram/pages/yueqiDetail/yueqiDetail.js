var id='';
let user='';
var openid='';
var dataList='';

Page({

    /**
     * 页面的初始数据
     */
    data: {
      userInfo:'',
    },

    
    goCart(){
        wx.reLaunch({
          url: '/pages/gouwuche/gouwuche'
        })
    },

    async addgouwuche(){
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
        var that = this
        wx.request({
            url: 'http://www.qinyunbs.com:8090/wxapi/Cart/getlength?goods_id='+id+'&openid='+openid,
            success: function (res) {
                if(res.data.length>0){
                    console.log("有值")
                    //num+1
                    wx.request({
                        url: 'http://www.qinyunbs.com:8090/wxapi/Cart/addcartnum?goods_id='+id+'&openid='+openid,
                        success: function (res) {
                            setTimeout(() => {
                                wx.showToast({
                                  title: '添加购物车成功',
                                  icon: "success",
                                });
                                setTimeout(() => {
                                  wx.hideToast();
                                }, 500)
                              }, 0);
                        }
                    }) 
                }else{
                    console.log("没有值")
                    var that = this
                    wx.request({
                        url: 'http://www.qinyunbs.com:8090/wxapi/Cart/addcart',
                        method:'POST',
                        data:{   //data里面放携带参数
                          "openid":openid,
                          "goodsid":id,
                          "inimg":dataList.inimg_image,
                          "price":dataList.price,
                          "title":dataList.title,
                          "dianpu":dataList.dianpu,
                          "num":1,
                          "selected":1,
                        },
                        success: function (res) {
                            setTimeout(() => {
                                wx.showToast({
                                  title: '添加购物车成功',
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

    goumai(){
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
                      fail:res=>{
                        console.log('授权失败',res)
                    }
                })  
            }
        })
    }
    else{
        wx.navigateTo({
          url: '/pages/lijijiesuan/lijijiesuan?id='+id,
        })
    }      
    },

    ckpj(e){
      wx.navigateTo({
        url: '/pages/pingjiaDetail/pingjiaDetail?id='+e.currentTarget.dataset.id,
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        id=options.id;
        var that = this
        wx.request({
            url: 'http://www.qinyunbs.com:8090/wxapi/Yueqi/queryDetailfun?id='+id,
            success: function (res) {
                that.setData({ 
                    list: res.data
                })
                dataList=res.data   //dataList传给购物车储备
            }
        })

        user= wx.getStorageSync('user')
        this.setData({
          userInfo:user
        })

        let openid= wx.getStorageSync('openid')

        wx.request({          //查询评价
          url: 'http://www.qinyunbs.com:8090/wxapi/Pingjia/querypingjia?goods_id='+id,
          success: function (res) {
              that.setData({ 
                  pingjialist: res.data
              })
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