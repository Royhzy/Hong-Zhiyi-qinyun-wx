var myDate = new Date();
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
    },

    huoqudizhi() {
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.address']) {
                    wx.chooseAddress({ 
                        success: (res) =>{
                            let uname=res.userName;
                            let address=res.provinceName + res.cityName + res.detailInfo;
                            let phone=res.telNumber;
                            wx.setStorageSync('uname',uname)    
                            wx.setStorageSync('address',address)
                            wx.setStorageSync('phone',phone)       

                            this.setData({
                                userName: uname,
                                Address: address,                          
                                Phone: phone,                               
                                addAddress: true,
                                showAddress: false
                            })        

                            myName=res.userName;
                            myPhone=res.telNumbe;
                            myAddress=res.provinceName + res.cityName + res.detailInfo;
                        }
                    })
                } 
                else {
                    if (res.authSetting['scope.address'] == false) {        
                        wx.openSetting({       
                            success(res) {       
                             console.log(res.authSetting)                     
                            }    
                        })
                    } else {  
                         wx.chooseAddress({      
                         success:(res)=>{     
                            let uname=res.userName;
                            let address=res.provinceName + res.cityName + res.detailInfo;
                            let phone=res.telNumber;
                            wx.setStorageSync('uname',uname)    
                            wx.setStorageSync('address',address)
                            wx.setStorageSync('phone',phone)   
                            that.setData({
                                userName: uname,
                                Address: address,                          
                                Phone: phone,                               
                                addAddress: true,
                                showAddress: false
                            })

                            myName=res.userName;
                            myPhone=res.telNumbe;
                            myAddress=res.provinceName + res.cityName + res.detailInfo;
                        }
                    })
                }   
            }   
        }   
    }) 
},

    getList(){                         //获取数据
        var that=this;
        wx.request({
            url: 'http://www.qinyunbs.com:8090/wxapi/Yueqi/queryDetailfun?id='+id,
            success: function (res) {
                that.setData({ 
                    goodslist:res.data 
                })
                dangqianList=res.data
            }
        })
    },


    zhifu(){
        let openid= wx.getStorageSync('openid')
        if(myName&&myPhone&&myAddress){
            wx.showModal({
                cancelColor: 'cancelColor',
                title: '当前为模拟支付',
                content:'点击确认生成订单',
                success:(res)=>{
                    if(res.confirm){
                        var that=this;
                        wx.request({              //添加订单
                            url: 'http://www.qinyunbs.com:8090/wxapi/Dingdan/adddingdan',
                            method:'POST',
                            data:{   
                              "openid":openid,
                              "goodsid":dangqianList.id,
                              "inimg_image":dangqianList.inimg_image,
                              "price":dangqianList.price,
                              "title":dangqianList.title,
                              "dianpu":dangqianList.dianpu,
                              "num":1,
                              "shouhuo":0,
                              "pingjia":0,
                              "status":1,
                              "xiadantime":this.formatTime(myDate),
                              "name":myName,
                              "phone":myPhone,
                              "address":myAddress,
                            },
                            success: function (res) {
                                 //销量sale+1,num-1
                                 wx.request({
                                     url: 'http://www.qinyunbs.com:8090/wxapi/Yueqi/addsale?id='+id,
                                     success: function (res) {
                                         console.log(res,'这是id',id)
                                     }
                                 }) 

                                 setTimeout(() => {
                                    wx.showToast({
                                      title: '购买成功！即将回到主页',
                                      icon:'none',
                                    });
                                    setTimeout(() => {
                                      wx.hideToast();
                                      wx.reLaunch({
                                        url: '/pages/index/index'
                                    })
                                    }, 1500)
                                }, 0);
                            }
                        })   
                    }
                }
              })
        }
        else{
            wx.showToast({
                title: '请输入姓名号码地址信息！',
                icon:'none'
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
        let uname=wx.getStorageSync('uname');
        let address=wx.getStorageSync('address');
        let phone=wx.getStorageSync('phone');

        myName=wx.getStorageSync('uname');
        myAddress=wx.getStorageSync('address');
        myPhone=wx.getStorageSync('phone');
        this.setData({
            userName: uname,
            Address: address,                          
            Phone: phone,                               
            addAddress: true,
            showAddress: false
        })    
        myDate = new Date()
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