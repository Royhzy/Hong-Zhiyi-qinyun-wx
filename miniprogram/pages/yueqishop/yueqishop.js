const db=wx.cloud.database();
const cmd=db.command;
var key= '';
let user=''

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
            console.log('可以执行搜索')
            wx.cloud.callFunction({
                name:'fenye',
                data:{
                    key:key,
                    type:"getSearchPiano"
                }
            }).then(res=>{
                    wx.hideLoading()
                    console.log('调用成功',res.result.data)
       
                if(res.result.data&&res.result.data.length==0)
                {
                    wx.showToast({
                        icon:'none',
                        title:'没找到关键词相近钢琴'
                    })
                }
                else{
                    this.setData({
                        list:res.result.data
                    })
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
        var len=this.data.list.length
        console.log('当前list的长度',len)

        wx.cloud.callFunction({
            name:'fenye',
            data:{
                len:len,
                pageNum:20,
                type:"getAllPiano"
            }
        }).then(res=>{
            console.log('调用成功',res.result.data)
            var dataList=res.result.data
            this.setData({
                list:this.data.list.concat(dataList)
            })
        }).catch(res=>{
            console.log('调用失败',res)
        })
    },

  touchBottom(){                 //scrollview触底
    this.getList()
  },

  //加入购物车
  async addgouwuche(e){
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

                      const pages = getCurrentPages()
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
        try{
            let res=await db.collection("carts").doc(item._id).get()
            console.log('有值')
            await db.collection("carts").doc(item._id).update({
                data:{
                    num:cmd.inc(1)
                }
            })
            setTimeout(() => {
                wx.showToast({
                  title: '添加购物车成功',
                  icon: "success",
                });
                setTimeout(() => {
                  wx.hideToast();
                }, 500)
              }, 0);
        }catch(err){
            console.log("没有值")
            
            await db.collection("carts").add({
                data:{
                    _id:item._id,
                    inimg:item.inimg,
                    price:item.price,
                    title:item.title,
                    dianpu:item.dianpu,
                    place:item.place,
                    sale:item.sale,
                    num:1,
                    selected:false
                }
            })
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
    }

  },

//   xiaoliang(){             //销量按钮

//   },

  selectAll(){           //全部按钮
    this.getList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
        this.getList();

        //计算scroll-view高度
        let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
        let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
        let ratio = 750 / windowWidth;
        this.setData({
            scroll_height: (windowHeight - 140) * ratio
        })

        user= wx.getStorageSync('user')
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