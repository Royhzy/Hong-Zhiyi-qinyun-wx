// Page({

//     /**
//      * 页面的初始数据
//      */
//     data: {
//         jieguo1:"",
//         jieguo2:"",
//         jieguo3:"",
//         tupians:[]
//     },

//     myimg:function(){
//         var that=this;
//         wx.chooseImage({
//                 count: 4, // 默认9
//                 sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//                 sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//                 success(res) {
//                   // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//                   var tempFilePaths = res.tempFilePaths;
//                   that.setData({
//                     jieguo1:tempFilePaths,
//                     jieguo2:tempFilePaths[0],
//                     tupians:tempFilePaths,
//                   });
//                   console.log('返回图片路径信息', res.tempFilePaths)

//                 //   for (var i = 0; i < that.data.tupians.length; i++) {
//                 //     //console.log(that.data.tupians[i])
//                 //     // wx.uploadFile({
//                 //     //   url: 'url',
//                 //     //   filePath: tempFilePaths[i],
//                 //     //   name: 'name',
        
//                 //     // })
//                 //   }

                
//                 }
//         })
//     },


//     // 预览图片
//     previewImg: function (e) {
//       //获取当前图片的下标
//       var index = e.currentTarget.dataset.index;
//       //所有图片
//       var imgs = this.data.imgs;
//       wx.previewImage({
//         //当前显示图片
//         current: imgs[index],
//         //所有图片
//         urls: imgs
//       })
//     },
//     /**
//      * 生命周期函数--监听页面加载
//      */
//     onLoad(options) {

//     },

//     /**
//      * 生命周期函数--监听页面初次渲染完成
//      */
//     onReady() {

//     },

//     /**
//      * 生命周期函数--监听页面显示
//      */
//     onShow() {

//     },

//     /**
//      * 生命周期函数--监听页面隐藏
//      */
//     onHide() {

//     },

//     /**
//      * 生命周期函数--监听页面卸载
//      */
//     onUnload() {

//     },

//     /**
//      * 页面相关事件处理函数--监听用户下拉动作
//      */
//     onPullDownRefresh() {

//     },

//     /**
//      * 页面上拉触底事件的处理函数
//      */
//     onReachBottom() {

//     },

//     /**
//      * 用户点击右上角分享
//      */
//     onShareAppMessage() {

//     }
// })




/*

const app = getApp()
Page({
  data: {
    imgs: [],
  },
  // 添加图片
  add_photo(e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({ //图片相机的选择chooseMedia
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], //只能通过拍照方式进行
      // sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log('返回图片路径信息', res.tempFilePaths)
        var imgs = that.data.imgs;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        that.setData({
          imgs: imgs
        });
        // console.log('图片合集', that.data.imgs);
      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
    // console.log('上传图片合集', this.data.imgs);
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
})


*/




Page({
 
  /**
   * 页面的初始数据
   */
  data: {
　　//初始化为空
    source:'',
    jsimg: '',
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
        //console.log(res)
       //前台显示
        that.setData({
          source: res.tempFilePaths
        })
 
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
         wx.uploadFile({
          url: 'http://www.qinyunbs.com:8090/wxapi/Shangchuan/uploadimg',
          filePath: tempFilePaths[0],
          name: 'file',
          success:function(res){
            //打印
            if(res.data){
              console.log('http://www.qinyunbs.com:8090/jiaoshitouxiang/'+res.data)
            }
          }
        })
       
      }
    })
  },
})

