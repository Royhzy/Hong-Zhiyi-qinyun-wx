
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

          // 获取code凭证
          wx.login({
            success: (res) => {
             // 调用requestCode() 传递code凭证
            this.requestCode(res.code);
            },
          })
        },
          fail:res=>{
            console.log('授权失败',res)
          }
      })

    },
  // 接收code凭证
  requestCode(code) {
    wx.request({
      url: `https://api.weixin.qq.com/sns/jscode2session`,
      method:'GET',
      data:{
          appid:'wx57a86f1615a36adf',
          js_code:code,
          secret:'948537fb459c2037c342f6ddc87b23e0',
          grant_type:'authorization_code'
      },
      success: res => {
        console.log('存入的openid：'+res.data.openid)
        wx.setStorageSync('openid',res.data.openid)
        this.setData({
          openid: res.data.openid
        })
      }
    })
  }, 

  goDingdan(){
    let user= wx.getStorageSync('user')
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
    }else{
      wx.navigateTo({
        url: '/pages/dingdan/dingdan',
      })    
    }
  },

  gorenzheng(){
    let user= wx.getStorageSync('user')
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
    }else{
      wx.navigateTo({
        url: '/pages/renzheng/renzheng',
      })
    }
  },

  goGuanzhu(){
    let user= wx.getStorageSync('user')
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
    }else{
      wx.navigateTo({
        url: '/pages/guanzhu/guanzhu?currentTab=0',
      })
    }
  },

  goYuyue(){
    let user= wx.getStorageSync('user')
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
    }else{
      wx.navigateTo({
        url: '/pages/guanzhu/guanzhu?currentTab=1',
      })
    }
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
    let user= wx.getStorageSync('user')
    this.setData({
      userInfo:user
    })
    
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