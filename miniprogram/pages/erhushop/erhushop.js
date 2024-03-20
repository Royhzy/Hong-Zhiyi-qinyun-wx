var key= '';
let user='';
var priceSo=true;

Page({

  /**
   * 页面的初始数据
   */
  data: {
      open:false,
      //起点
      mark:0,
      //终点
      newmark:0,
      //开关
      istoright:false,

      list:[],

      cartList:[],  //购物车数据
      userInfo:''
  },

  //滑动
  tap_ch(){
      if(this.data.open){
          this.setData({
              open:false
          })
      }else{
          this.setData({
              open:true
          })
      }
  },
  //得到一个起点和终点
  start(res){
      this.data.mark=this.data.newmark=res.touches["0"].pageX   //小写pageX
  },
  //滑动
  move(res){
      //从左往右移动
      this.data.newmark=res.touches["0"].pageX;
      if(this.data.mark+80<this.data.newmark){
          this.istoright=true;      //开关变成true
      }
      //从右往左移动
      if(this.data.mark>this.data.newmark){
          this.istoright=false;
      }
  },
  //滑动
  end(){
      if(this.istoright){
          this.setData({
              open:true
          })
      }else{
          this.setData({
              open:false
          })
      }
  },

    getKey(e){
        this.setData({
            key:e.detail.value
        })
    },
    goSearch(){                                   //获取搜索数据
        wx.showLoading({
            title: '加载中...',
        })
        key=this.data.key;
        if(key){
            var that = this
            wx.request({
                url: 'http://www.qinyunbs.com:8090/wxapi/Yueqi/querykey?catogory=二胡&key='+key,
                success: function (res) {
                    console.log('调用',res.data)    
                if(res.data.code==400)
                {
                    wx.hideLoading()
                    wx.showToast({
                        icon:'none',
                        title:'没找到关键词相近二胡'
                    })
                }
                else{
                    that.setData({
                        list: res.data
                    })
                    wx.hideLoading()
                }
            }
        })
        }
        else{
            wx.showToast({
                icon:'error',
                title:'请输入内容'
            })
        }
    },
    goDetail(e){        //跳转商品详情页
        wx.navigateTo({
          url: '/pages/yueqiDetail/yueqiDetail?id='+e.currentTarget.dataset.id,
        })
    },

    getList(){                         //获取下拉数据
        var that = this
        wx.request({
            url: 'http://www.qinyunbs.com:8090/wxapi/Yueqi/queryfun?catogory=二胡',
            success: function (res) {
                if(res.data.length>0){
                    that.setData({
                        list:res.data
                    })
                }
            }
        })
    },

  //加入购物车
  async addgouwuche(e){
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
                        },
                    })
                    
                      const pages = getCurrentPages()            //刷新页面
                      const perpage = pages[pages.length - 1]
                      perpage.onLoad()  
                    },
                      fail:res=>{
                        console.log('授权失败',res)
                    }
                })  
            }
        })
    }
    else{
        let {item}=e.currentTarget.dataset
        var that = this
        wx.request({
            url: 'http://www.qinyunbs.com:8090/wxapi/Cart/getlength?goods_id='+item.id+'&openid='+openid,
            success: function (res) {
                if(res.data.length>0){
                    console.log("有值")
                    //num+1
                    wx.request({
                        url: 'http://www.qinyunbs.com:8090/wxapi/Cart/addcartnum?goods_id='+item.id+'&openid='+openid,
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
                    let openid= wx.getStorageSync('openid')
                    console.log("没有值")
                    var that = this
                    wx.request({
                        url: 'http://www.qinyunbs.com:8090/wxapi/Cart/addcart',
                        method:'POST',
                        data:{   //data里面放携带参数
                          "openid":openid,
                          "goodsid":item.id,
                          "inimg":item.inimg,
                          "price":item.price,
                          "title":item.title,
                          "dianpu":item.dianpu,
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


      
  xiaoliang(){             //销量按钮（只有降序）
    key=this.data.key;
    if(key){
        var that = this
        wx.request({
            url: 'http://www.qinyunbs.com:8090/wxapi/Yueqi/keySaleSort?catogory=二胡&key='+key,
            success: function (res) {
                that.setData({ 
                    list: res.data 
                })
            }
        })  
    }
    else{
        var that = this
        wx.request({
            url: 'http://www.qinyunbs.com:8090/wxapi/Yueqi/salesort?catogory=二胡',
            success: function (res) {
                that.setData({ 
                    list: res.data 
                })
            }
        })  
    }
  },

  jiage(){              //价格按钮
    key=this.data.key;
    if(priceSo==true){
        if(key){
            var that = this
            wx.request({
                url: 'http://www.qinyunbs.com:8090/wxapi/Yueqi/keyPriceSort?catogory=二胡&key='+key+'&sc=desc',
                success: function (res) {
                    that.setData({ 
                        list: res.data 
                    })
                }
            })   
        }
        else{
            var that = this
            wx.request({
                url: 'http://www.qinyunbs.com:8090/wxapi/Yueqi/pricesort?catogory=二胡&sc=desc',
                success: function (res) {
                    that.setData({ 
                        list: res.data 
                    })
                }
            }) 
        }
    }
    else if(priceSo==false){
        if(key){
            var that = this
            wx.request({
                url: 'http://www.qinyunbs.com:8090/wxapi/Yueqi/keyPriceSort?catogory=二胡&key='+key+'&sc=asc',
                success: function (res) {
                    that.setData({ 
                        list: res.data 
                    })
                }
            })   
        }
        else{
            var that = this
            wx.request({
                url: 'http://www.qinyunbs.com:8090/wxapi/Yueqi/pricesort?catogory=二胡&sc=asc',
                success: function (res) {
                    that.setData({ 
                        list: res.data 
                    })
                }
            }) 
        }    
    }
    priceSo=!priceSo
  },
  selectAll(){           //综合按钮
    this.getList()
  },

  gopiano(){
    wx.redirectTo({
        url: '/pages/yueqishop/yueqishop',
      })
  },
  goviollin(){
    wx.redirectTo({
        url: '/pages/violinshop/violinshop',
      })
  },
  goguitar(){
    wx.redirectTo({
        url: '/pages/guitarshop/guitarshop',
      })
  },
  goguzheng(){
    wx.redirectTo({
        url: '/pages/guzhengrshop/guzhengrshop',
      })
  },
  gopipa(){
    wx.redirectTo({
        url: '/pages/pipashop/pipashop',
      })
  },
  goerhu(){
    wx.redirectTo({
        url: '/pages/erhushop/erhushop',
      })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
        this.getList();

        user= wx.getStorageSync('user')
        this.setData({
          userInfo:user
        })

        let openid= wx.getStorageSync('openid')
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
     this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})