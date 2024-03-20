let touxiang=''
let sfzimg=''
let sqname = ''
let sfz = ''
let telephone = ''
let school = ''
let instrument = ''
let educate = ''
let tempFilePathsTX=''
let tempFilePathsSFZ=''
let openid=''

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
　　//初始化为空
    source:'',
    jsimg: '',
    sfzsource:''
  },
 
/**
 * 上传图片
 */
  uploadimg:function(){
    var that = this;
    wx.chooseImage({  //从本地相册选择图片或使用相机拍照
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
 
      success:function(res){
       //前台显示
        that.setData({
          source: res.tempFilePaths
        })
 
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        tempFilePathsTX = res.tempFilePaths
        that.uploadFileTX(tempFilePathsTX);
      }
    })
  },

  uploadFileTX: function (tempFilePaths){               //上传图片文件
    wx.uploadFile({
      url: 'http://www.qinyunbs.com:8090/wxapi/Renzheng/uploadimg',
      filePath: tempFilePaths[0],
      name: 'file',
      success:function(res){
        //打印
        if(res.data){
          touxiang =  'http://www.qinyunbs.com:8090/jiaoshitouxiangrz/'+res.data
        }
      }
    })
  },

  previewImg: function () {                        //查看或修改头像
    var that=this;
    var imgs = this.data.source;
    wx.showActionSheet({
      itemList: ["查看头像", "删除头像"], // 按钮的文字数组，长度最大为6
      itemColor: "#000000", // 按钮的文字颜色，默认#000000
      success: function (res) {
          // 用户点击的按钮序号，从上到下的顺序，从0开始
          if(res.tapIndex==0){            //查看头像
              wx.previewImage({
                //当前显示图片
                current: imgs,
                //所有图片
                urls: imgs
              })
          }else if(res.tapIndex==1){                 //删除头像
            imgs.splice(0, 1);
            that.setData({
              source: ''
            });
          } 
      },
    })
  },

  uploadsfzimg:function(){
    var that = this;
    wx.chooseImage({  //从本地相册选择图片或使用相机拍照
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
 
      success:function(res){
       //前台显示
        that.setData({
          sfzsource: res.tempFilePaths
        })
 
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        tempFilePathsSFZ = res.tempFilePaths
        that.uploadFileSFZ(tempFilePathsSFZ);
      }
    })
  },

  uploadFileSFZ: function (tempFilePaths){               //上传图片文件
    wx.uploadFile({
      url: 'http://www.qinyunbs.com:8090/wxapi/Renzheng/uploadsfzimg',
      filePath: tempFilePaths[0],
      name: 'file',
      success:function(res){
        //打印
        if(res.data){
          sfzimg =  'http://www.qinyunbs.com:8090/jiaoshisfzrz/'+res.data
        }
      }
    })
  },

  previewsfzImg: function () {                        //查看或修改身份证图像
    var that=this;
    var imgs = this.data.sfzsource;
    wx.showActionSheet({
      itemList: ["查看图片", "删除图片"], // 按钮的文字数组，长度最大为6
      itemColor: "#000000", // 按钮的文字颜色，默认#000000
      success: function (res) {
          // 用户点击的按钮序号，从上到下的顺序，从0开始
          if(res.tapIndex==0){            //查看
              wx.previewImage({
                //当前显示图片
                current: imgs,
                //所有图片
                urls: imgs
              })
          }else if(res.tapIndex==1){                 //删除身份证图像
            imgs.splice(0, 1);
            that.setData({
              sfzsource: ''
            });
          } 
      },
    })
  },


  name(event) { //获取姓名
    sqname = event.detail.value
  },
  sfz(event) { 
    sfz = event.detail.value
  },
  telephone(event) { //获取手机号
    telephone = event.detail.value
  },
  school(event) {
    school = event.detail.value
  },
  instrument(event) { 
    instrument = event.detail.value
  },
  educate(event) { 
    educate = event.detail.value
  },

  tijiao(){
      var that=this;
      wx.request({
        url: 'http://www.qinyunbs.com:8090/wxapi/Renzheng/chaxunrenzheng?openid='+openid,
        success: function (res) {
          //console.log(res.data)
            if(res.data.code!=400){
                wx.showToast({
                  title: '您已经申请过',
                  icon:'error'
                })
            }else{
              wx.request({              //添加认证记录
                url: 'http://www.qinyunbs.com:8090/wxapi/Renzheng/shenqingrenzheng',
                method:'POST',
                data:{   
                  "openid":openid,
                  "name":sqname,
                  "sfz":sfz,
                  "telephone":telephone,
                  "school":school,
                  "instrument":instrument,
                  "status":1,
                  "educate":educate,
                  "img_image":touxiang,
                  "sfzimg_image":sfzimg,
                },
                success: function (res) {
                     setTimeout(() => {
                        wx.showToast({
                          title: '提交申请成功！即将回到主页',
                          icon:'none',
                        });
                        setTimeout(() => {
                          wx.hideToast();
                          wx.reLaunch({
                            url: '/pages/index/index'
                        })
                        }, 2500)
                    }, 0);
                }
        })   
            }
        }
      })



  },

  onLoad: function (options) {
    openid= wx.getStorageSync('openid')
  },


})



