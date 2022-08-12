const db=wx.cloud.database();
const cmd=db.command;
var key= '';
var openid='';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      totalMoney:0,
      totalNum:0,
      cartList:[],
      selectAllStatus:false  // 全选状态
  },
    goDetail(e){                       //跳转商品详情页
        wx.navigateTo({
          url: '/pages/yueqiDetail/yueqiDetail?id='+e.currentTarget.dataset.id,
        })
    },

    getList(yhopenid){                         //获取数据（最多100条）
        wx.cloud.callFunction({
            name:'gouwuche',
            data:{
                yhopenid:yhopenid,
                type:"getCart"
            }
        }).then(res=>{
            console.log('调用成功',res.result.data)
            var dataList=res.result.data
            this.setData({
                list:res.result.data
            })
            //计算件数和价格
            if(dataList.length>0){
                this.setCart(res.result.data)
            }
        }).catch(res=>{
            console.log('调用失败',res)
        })
    },

    touchBottom(){
        wx.showToast({
            title: '购物车没有更多东西了',
            icon:'none'
        })
    },

    jia(e){
        var id=e.currentTarget.dataset.id
        var numList=this.data.list
        numList.forEach(item=>{
            if(item._id==id)
            {
                if(item.num<99){
                    item.num+=1
                    if(item.selected==true)
                    {
                        this.setData({
                            totalMoney:this.data.totalMoney+=item.price,
                            totalNum:this.data.totalNum+=1,
                        })
                    }
                    wx.cloud.callFunction({
                        name:'gouwuche',
                        data:{
                            id:item._id,
                            type:"jiaNum",
                            yhopenid:openid
                        }
                    })
                }else{
                    wx.showToast({
                      title: '数量不能大于99',
                      icon:'none'
                    })
                }
            }
            this.setData({
                list:numList
            })
        })
    },
    
    jian(e){
        var id=e.currentTarget.dataset.id
        var numList=this.data.list
        numList.forEach(item=>{
            if(item._id==id)
            {
                if(item.num>1){
                    item.num-=1
                    if(item.selected==true){
                        this.setData({
                            totalMoney:this.data.totalMoney-=item.price,
                            totalNum:this.data.totalNum-=1
                        })
                    }

                    wx.cloud.callFunction({
                        name:'gouwuche',
                        data:{
                            id:item._id,
                            type:"jianNum",
                            yhopenid:openid
                        }
                    })
                }else{
                    wx.showToast({
                      title: '该物品不能再减少了',
                      icon:'none'
                    })
                }
            }
            this.setData({
                list:numList
            })
        })
    },

    setCart(carts){         //计算件数和价格
        var totalNum=0;
        var totalMoney=0;
        carts.forEach(item=>{
            if(item.selected==true)
            {
                totalNum += item.num
                totalMoney += item.num * item.price
            }
        })
        this.setData({
            totalNum,
            totalMoney
        })
    },

    jishu(){                               //若选择全部，则自动全选
        let carts = this.data.list;          // 获取购物车列表
        var a=0;                            //若选择全部，则全选
        for (let i = 0; i < carts.length; i++) {
            if(carts[i].selected==true){
                a++;
            }
        }
        if(a==carts.length){
            this.setData({
                selectAllStatus:true
            })
        }else{
            this.setData({
                selectAllStatus:false           
            })
        }      
    },

    selectList(e) {                  //选择
        let id=e.currentTarget.dataset.id
        const index = e.currentTarget.dataset.index;  // 获取data- 传进来的index
        let carts = this.data.list;          // 获取购物车列表
        const selected = carts[index].selected;     // 获取当前商品的选中状态
        this.jishu()

        carts[index].selected = !selected;       // 改变状态
        console.log(index,carts[index].selected)
        this.jishu()

        this.setData({
          list: carts
        });
        wx.cloud.callFunction({
            name:'gouwuche',
            data:{
                id:id,
                type:"udSelected",
                selected:carts[index].selected,
                yhopenid:openid
         }
        })
        this.setCart(carts)
    },

    selectAll(){                    //全选
        let selectAllStatus = this.data.selectAllStatus;  // 是否全选状态
        selectAllStatus = !selectAllStatus;
        let carts = this.data.list;
      
        for (let i = 0; i < carts.length; i++) {
          carts[i].selected = selectAllStatus;      // 改变所有商品状态
        }
        this.setData({
          selectAllStatus: selectAllStatus,
          list: carts
        });
        wx.cloud.callFunction({
            name:'gouwuche',
            data:{
                type:"SelectedAll",
                selected:selectAllStatus,
                yhopenid:openid
         }
        })
        this.setCart(carts)
    },


    removeList(){                           //删除
        let carts = this.data.list;
        var n=0;
        for (let i = 0; i < carts.length; i++) {         //判断有没有要删除的记录
            if(carts[i].selected==false) 
            {
                n++;
            }
        }
        if(n==carts.length)               //全部没被选中
        {
            wx.showToast({
              title: '没有被选择删除的物品',
              icon:"none"
            })
        }
        else{
            wx.cloud.callFunction({
                name:'gouwuche',
                data:{
                    type:"removeSelect",
                    yhopenid:openid
             }
            }).then(res=>{
                wx.showToast({
                  title: '删除成功',
                })
                this.setData({
                    carts: carts
                })
            })
        }

            let selectAllStatus = this.data.selectAllStatus;
            if(selectAllStatus==true){         // 如果购物车为空（判断是否全选删除）
                var totalMoney=0;
                var totalNum=0;
    
                const pages = getCurrentPages()                  //刷新
                const perpage = pages[pages.length - 1]
                perpage.onLoad() 
    
                selectAllStatus=!selectAllStatus    //删除后改变全选状态

                this.setData({
                    totalMoney:totalMoney,
                    totalNum:totalNum,
                    selectAllStatus:selectAllStatus 
                })
            }else{               // 如果不为空
                this.setCart(carts)
                this.getList(openid)
            } 
    },

    goshop(){
        wx.navigateTo({
          url:'/pages/yueqishop/yueqishop',
        })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取用户openid
    let that = this;    
    wx.cloud.callFunction({      
        name: 'getOpenid', 
    }).then(res=>{
        console.log('openid: ', res.result.openid)
        openid = res.result.openid
        this.getList(res.result.openid);
    }) 

    //计算scroll-view高度
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    let ratio = 750 / windowWidth;
    this.setData({
        scroll_height: (windowHeight - 100) * ratio
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