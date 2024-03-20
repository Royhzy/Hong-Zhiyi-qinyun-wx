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
let teachage=''
let price=''
let introduce=''
let imgList=''
let area=''

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

  previewchushiImg: function () {                        //查看或修改头像
    var that=this;
    wx.showActionSheet({
      itemList: ["查看头像", "修改头像"], // 按钮的文字数组，长度最大为6
      itemColor: "#000000", // 按钮的文字颜色，默认#000000
      success: function (res) {
          // 用户点击的按钮序号，从上到下的顺序，从0开始
          if(res.tapIndex==0){            //查看头像
            //console.log("http://www.qinyunbs.com:8090/"+imgList.img_image)
              wx.previewImage({
                //所有图片
                urls: ["http://www.qinyunbs.com:8090/"+imgList.img_image]
              })
          }else if(res.tapIndex==1){                 
            that.setData({
              source: ''
            });
            that.uploadimg();
          } 
      },
    })
  },

  previewImg: function () {                        //查看或修改头像
    var that=this;
    var imgs = this.data.source;
    wx.showActionSheet({
      itemList: ["查看头像", "修改头像"], // 按钮的文字数组，长度最大为6
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
          }else if(res.tapIndex==1){                
            that.uploadimg();
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

  uploadFileSFZ: function (tempFilePaths){               //上传图片文件到照片墙文件夹
    wx.uploadFile({
      url: 'http://www.qinyunbs.com:8090/wxapi/Teacher/uploadinimg',
      filePath: tempFilePaths[0],
      name: 'file',
      success:function(res){
        //打印
        if(res.data){
          sfzimg =  'http://www.qinyunbs.com:8090/zhaopianqiang/'+res.data
        }
      }
    })
  },

  previewchushisfzImg: function () {                        //查看或修改身份证图像
    var that=this;
    wx.showActionSheet({
      itemList: ["查看图片", "修改图片"], // 按钮的文字数组，长度最大为6
      itemColor: "#000000", // 按钮的文字颜色，默认#000000
      success: function (res) {
          // 用户点击的按钮序号，从上到下的顺序，从0开始
          if(res.tapIndex==0){            //查看
            wx.previewImage({
              //所有图片
              urls: ["http://www.qinyunbs.com:8090/"+imgList.inimg_images]
            })
          }else if(res.tapIndex==1){                 
            that.setData({
              source: ''
            });
            that.uploadsfzimg();
          } 
      },
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
            that.uploadimg();
          } 
      },
    })
  },


  telephone(event) { //获取手机号
    telephone = event.detail.value
  },
  school(event) {
    school = event.detail.value
  },
  area(event) { 
    area = event.detail.value
  },
  instrument(event) { 
    instrument = event.detail.value
  },
  educate(event) { 
    educate = event.detail.value
  },
  teachage(event) { 
    teachage = event.detail.value
  },
  price(event) { 
    price = event.detail.value
  },
  introduce(event) { 
    introduce = event.detail.value
  },

  tijiao(){
      var that=this;
      //console.log(imgList.sfz,telephone,school,educate,area,instrument,teachage,price,introduce,touxiang,sfzimg)
      wx.request({              //修改信息
        url: 'http://www.qinyunbs.com:8090/wxapi/Teacher/updateziliao',
        method:'POST',
        data:{   
          "sfz":imgList.sfz,
          "telephone":telephone,
          "school":school,
          "educate":educate,
          "area":area,
          "instrument":instrument,
          "teachage":teachage,
          "price":price,
          "introduce":introduce,
          "img_image":touxiang,
          "inimg_images":sfzimg,
        },
        success: function (res) {
            console.log(res.data)
            wx.showToast({
              title: '修改成功！',
              icon:'none',
            });
        }
      })   
  },

  onLoad: function (options) {
    var that=this;
    openid= wx.getStorageSync('openid')
    sfz=options.sfz;
    wx.request({
      url: 'http://www.qinyunbs.com:8090/wxapi/Teacher/sfzQueryDetailfun?sfz='+sfz,
      success: function (res) {
          that.setData({ 
              list: res.data,
          })
          imgList=res.data     //后续存储
          telephone=imgList.telephone,
          school=imgList.school,
          educate=imgList.educate,
          area=imgList.area,
          instrument=imgList.instrument,
          teachage=imgList.teachage,
          price=imgList.price,
          introduce=imgList.introduce,
          touxiang=imgList.img_image,
          sfzimg=imgList.inimg_images
      }
    })

  },


})



