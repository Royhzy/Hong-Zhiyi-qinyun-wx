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
      bianji:false,
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
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
   
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
  
      if(hour<10)
      {
          hour='0'+hour;
      }
      if(minute<10)
      {
          minute='0'+minute;
      }
      if(second<10)
      {
          second='0'+second;
      }
      
      return [year, month, day].join('/') + ' ' + [hour, minute, second].join(':')
  },
  
  addkeyueone(e){        //点击加号变可约
    this.data.schedule.one[e.currentTarget.dataset.id].type=1;
    this.setData({
      schedule:this.data.schedule
    })
  },
  subkeyueone(e){        //点击加号变可约
    this.data.schedule.one[e.currentTarget.dataset.id].type=0;
    this.setData({
      schedule:this.data.schedule
    })
  },

  addkeyuetwo(e){        //点击加号变可约
    this.data.schedule.two[e.currentTarget.dataset.id].type=1;
    this.setData({
      schedule:this.data.schedule
    })
  },
  subkeyuetwo(e){        //点击加号变可约
    this.data.schedule.two[e.currentTarget.dataset.id].type=0;
    this.setData({
      schedule:this.data.schedule
    })
  },

  addkeyuethree(e){        //点击加号变可约
    this.data.schedule.three[e.currentTarget.dataset.id].type=1;
    this.setData({
      schedule:this.data.schedule
    })
  },
  subkeyuethree(e){        //点击加号变可约
    this.data.schedule.three[e.currentTarget.dataset.id].type=0;
    this.setData({
      schedule:this.data.schedule
    })
  },

  addkeyuefour(e){        //点击加号变可约
    this.data.schedule.four[e.currentTarget.dataset.id].type=1;
    this.setData({
      schedule:this.data.schedule
    })
  },
  subkeyuefour(e){        //点击加号变可约
    this.data.schedule.four[e.currentTarget.dataset.id].type=0;
    this.setData({
      schedule:this.data.schedule
    })
  },

  addkeyuefive(e){        //点击加号变可约
    this.data.schedule.five[e.currentTarget.dataset.id].type=1;
    this.setData({
      schedule:this.data.schedule
    })
  },
  subkeyuefive(e){        //点击加号变可约
    this.data.schedule.five[e.currentTarget.dataset.id].type=0;
    this.setData({
      schedule:this.data.schedule
    })
  },

  addkeyuesix(e){        //点击加号变可约
    this.data.schedule.six[e.currentTarget.dataset.id].type=1;
    this.setData({
      schedule:this.data.schedule
    })
  },
  subkeyuesix(e){        //点击加号变可约
    this.data.schedule.six[e.currentTarget.dataset.id].type=0;
    this.setData({
      schedule:this.data.schedule
    })
  },

  bianji(){
    this.setData({
      bianji:true
    })
  },
  baocunxiugai(){            //先删除再加入
    this.setData({
      bianji:false
    })
    var that=this;
    wx.request({              //全部删除记录
       url: 'http://www.qinyunbs.com:8090/wxapi/Course/deletekebiao?teacher_id='+sfz,
       success: function (res) {
        for(var i=0;i<7;i++){     //全部添加记录
          if(that.data.schedule.one[i].type==1){
            wx.request({              
              url: 'http://www.qinyunbs.com:8090/wxapi/Course/updatekebiao',
              method:'POST',
              data:{   
                "name":dataList.name,
                "teacher_id":sfz,
                "jie":1,
                "weekday":i+1,
              }
            })  
          }
          if(that.data.schedule.two[i].type==1){
            wx.request({              
              url: 'http://www.qinyunbs.com:8090/wxapi/Course/updatekebiao',
              method:'POST',
              data:{   
                "name":dataList.name,
                "teacher_id":sfz,
                "jie":2,
                "weekday":i+1,
              }
            })  
          }
          if(that.data.schedule.three[i].type==1){
            wx.request({              
              url: 'http://www.qinyunbs.com:8090/wxapi/Course/updatekebiao',
              method:'POST',
              data:{   
                "name":dataList.name,
                "teacher_id":sfz,
                "jie":3,
                "weekday":i+1,
              }
            })  
          }
          if(that.data.schedule.four[i].type==1){
            wx.request({              
              url: 'http://www.qinyunbs.com:8090/wxapi/Course/updatekebiao',
              method:'POST',
              data:{   
                "name":dataList.name,
                "teacher_id":sfz,
                "jie":4,
                "weekday":i+1,
              }
            })  
          }
          if(that.data.schedule.five[i].type==1){
            wx.request({              
              url: 'http://www.qinyunbs.com:8090/wxapi/Course/updatekebiao',
              method:'POST',
              data:{   
                "name":dataList.name,
                "teacher_id":sfz,
                "jie":5,
                "weekday":i+1,
              }
            })  
          }
          if(that.data.schedule.six[i].type==1){
            wx.request({              
              url: 'http://www.qinyunbs.com:8090/wxapi/Course/updatekebiao',
              method:'POST',
              data:{   
                "name":dataList.name,
                "teacher_id":sfz,
                "jie":6,
                "weekday":i+1,
              }
            })  
          }
        }
        wx.showToast({
          title: '修改成功！',
          icon:'success'
        })
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
              dataList=res.data   
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