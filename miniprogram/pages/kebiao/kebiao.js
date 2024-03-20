const formateDate = (time) => {
  let year = time.getFullYear();
  let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
  let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
  return year + '-' + month + '-' + day;
}

const getCurrWeekList = (data) => {
  //根据日期获取本周周一~周日的年-月-日
  let weekList = [],
    date = new Date(data);
  //获取当前日期为周一的日期
  date.setDate(date.getDay() == "0" ? date.getDate() - 6 : date.getDate() - date.getDay() + 1);
  // push周一数据
  weekList.push(formateDate(date));
  // console.log(weekList)
  //push周二以后日期
  for (var i = 0; i < 6; i++) {
    date.setDate(date.getDate() + 1);
    weekList.push(formateDate(date));
  }
  return weekList;
}

let time = new Date(),
    list = getCurrWeekList(time),
    weekList = []
  list.forEach(item => {
    weekList.push({
      day: [item.split('-')[1], item.split('-')[2]].join('-'),//取字段eg：08-11
      week: "星期" + "日一二三四五六".charAt((new Date(item)).getDay()),//对应周几
      isCurr: formateDate(time) == item//当天日期
    })
  });

var myDate = new Date();
var id='';
let sfz='';
let user='';
var openid='';
var dataList='';
var kebiaoList='';
let res='';
let stuname='';
  
Page({
  data: {
    time: {
      one: [
        {
          index: 1,
          timeStart: '08:30',
          timeEnd: '10:00'
        },
        {
          index: 2,
          timeStart: '10:00',
          timeEnd: '11:30'
        }
      ],
      two: [{
          index: 3,
          timeStart: '15:00',
          timeEnd: '16:30'
        },
        {
          index: 4,
          timeStart: '16:30',
          timeEnd: '18:00'
        },
      ],
      three: [
        {
          index: 5,
          timeStart: '19:00',
          timeEnd: '20:15'
        },
        {
          index: 6,
          timeStart: '20:15',
          timeEnd: '21:30'
        }
      ]
    },
    schedule: {
      one: [{          //one代表第一节课
          type: 0, //0-无  1-有
        },
        {
          type: 0, 
        }, 
        {
          type: 0,
        },
        {
          type: 0, 
        }, 
        {
          type: 0, 
        }, 
        {
          type: 0, 
        }, 
        {
          type: 0, 
        }, 
      ],
      two:[{
        type: 0, //0-无  1-有
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      }
      ],
      three:[{
        type: 0, //0-无  1-有
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      },   
      ],
      four: [{
          type: 0, //0-无  1-有
        },
        {
          type: 0, 
        }, 
        {
          type: 0,
        },
        {
          type: 0, 
        }, 
        {
          type: 0, 
        }, 
        {
          type: 0, 
        }, 
        {
          type: 0, 
        }, 
      ],
      five:[{
        type: 0, //0-无  1-有
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      }
      ],
      six:[{
        type: 0, //0-无  1-有
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      },
      {
        type: 0,
      },   
      ],   
    },
    weekList: [],
    isShow: false,
    current: {},
  },

  close() {
    this.setData({
      isShow: false
    })
  },

  formatTime(date){
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
    // return [year, month, day].join('/') + ' ' + [hour, minute, second].join(':')
    //获取当前时间戳
    var timestamp = Date.parse(new Date());  
    timestamp = timestamp / 1000;  
    //console.log("当前时间戳为：" + timestamp);  
    return timestamp;
},


  yuyue(){
    var that=this;
    let openid= wx.getStorageSync('openid')
    wx.showModal({
      editable:true,
      cancelColor: 'cancelColor',
      title: '请输入学生姓名',
      placeholderText:'预约前请注意温馨提示',
      success(res){
         if(res.confirm){
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
           if(res.content){
            wx.request({
              url: 'http://www.qinyunbs.com:8090/wxapi/Yuyue/addyuyue',
              method:'POST',
              data:{   //data里面放携带参数
                  "openid":openid,
                  "teacherid":sfz,
                  "area":dataList.area,
                  "img_image":dataList.img_image,
                  "instrument":dataList.instrument,
                  "educate":dataList.educate,
                  "name":dataList.name,
                  "price":dataList.price,
                  "school":dataList.school,
                  "status":1,
                  "shangke":0,
                  "feiyong":0,
                  "yuyuetime":that.formatTime(myDate),
                  "stuname":res.content
              },
              success: function (res) {
                setTimeout(() => {
                  wx.showToast({
                    title: '预约成功！请及时跟客服联系',
                    icon:'none'
                  })
                    setTimeout(() => {
                      wx.hideToast();
                    }, 2500)
                  }, 0);
              }
            })
           }else{
             wx.showToast({
               title: '未输入姓名',
               icon:'error'
             })
           }
           }
         }
      }
    })
  },

  kebiaoshuzu(){
    for(var i=0;i<7;i++)
    {
      for(var j=0;j<kebiaoList.length;j++)
      {
          if(kebiaoList[j].jie==1 && kebiaoList[j].weekday==i+1)
            this.data.schedule.one[i].type=1;
      }
    }
    for(var i=0;i<7;i++)
    {
      for(var j=0;j<kebiaoList.length;j++)
      {
          if(kebiaoList[j].jie==2 && kebiaoList[j].weekday==i+1)
            this.data.schedule.two[i].type=1;
      }
    }
    for(var i=0;i<7;i++)
    {
      for(var j=0;j<kebiaoList.length;j++)
      {
          if(kebiaoList[j].jie==3 && kebiaoList[j].weekday==i+1)
            this.data.schedule.three[i].type=1;
      }
    }
    for(var i=0;i<7;i++)
    {
      for(var j=0;j<kebiaoList.length;j++)
      {
          if(kebiaoList[j].jie==4 && kebiaoList[j].weekday==i+1)
            this.data.schedule.four[i].type=1;
      }
    }
    for(var i=0;i<7;i++)
    {
      for(var j=0;j<kebiaoList.length;j++)
      {
          if(kebiaoList[j].jie==5 && kebiaoList[j].weekday==i+1)
            this.data.schedule.five[i].type=1;
      }
    }
    for(var i=0;i<7;i++)
    {
      for(var j=0;j<kebiaoList.length;j++)
      {
          if(kebiaoList[j].jie==6 && kebiaoList[j].weekday==i+1)
            this.data.schedule.six[i].type=1;
      }
    }
    this.setData({
      schedule:this.data.schedule
    })
  },

  onLoad(options){
    sfz=options.sfz;
    var that = this;
    wx.request({
        url: 'http://www.qinyunbs.com:8090/wxapi/Teacher/queryDetailfun?sfz='+sfz,
        success: function (res) {
            that.setData({ 
                nlist: res.data
            })
            dataList=res.data   //dataList传给购物车储备
        }
    })

    wx.request({
      url: 'http://www.qinyunbs.com:8090/wxapi/Course/queryCourse?teacher_id='+sfz,
      success: function (res) {
          that.setData({ 
              kblist: res.data               //课表数据
          })
          kebiaoList=res.data   //kebiaoList在js储备
          that.kebiaoshuzu();
      }
    })

    user= wx.getStorageSync('user')
    that.setData({
      userInfo:user
    })

    let openid= wx.getStorageSync('openid')

  },

  onShow() {

    let time = new Date(),
      list = getCurrWeekList(time),
      weekList = []
    list.forEach(item => {
      weekList.push({
        day: [item.split('-')[1], item.split('-')[2]].join('-'),
        week: "星期" + "日一二三四五六".charAt((new Date(item)).getDay()),
        isCurr: formateDate(time) == item
      })
    });
    this.setData({
      weekList,
    })
    myDate = new Date()
  },
})