const db=wx.cloud.database();
const cmd=db.command;
var key= '';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[]
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
                    type:"getSearchTeacher"
                }
            }).then(res=>{
                    wx.hideLoading()
                    console.log('调用成功',res.result.data)
       
                if(res.result.data&&res.result.data.length==0)
                {
                    wx.showToast({
                        icon:'none',
                        title:'没找到关键词相近老师'
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
          url: '/pages/teacherDetail/teacherDetail?id='+e.currentTarget.dataset.id,
        })
    },

    getList(){                         //获取下拉数据
        wx.showLoading({
            title: '加载中...',
        })
        var len=this.data.list.length
        console.log('当前list的长度',len)

        wx.cloud.callFunction({
            name:'fenye',
            data:{
                len:len,
                pageNum:20,
                type:"getAllTeacher"
            }
        }).then(res=>{
            wx.hideLoading()
            console.log('调用成功',res.result.data)
            var dataList=res.result.data
            if(dataList.length<=0){
                wx.showToast({
                  title: '没有更多老师了',
                  icon:'none'
                })
            }
            this.setData({
                list:this.data.list.concat(dataList)
            })
        }).catch(res=>{
            console.log('调用失败',res)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
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
        this.getList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})