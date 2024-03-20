// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database();
const cmd=db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    if(event.type=="getSearchTeacher")
    {
        return await db.collection("teacher").where(cmd.and([
            {
                area:db.RegExp({
                    regexp:event.b,
                    options:'i',
                })
            },
            {
                instrument:db.RegExp({
                    regexp:event.a,
                    options:'i',
                })
            }
            ])).get()
    }
    else if(event.type=="guanzhuTeacher"){
        return await db.collection("guanzhu").where({
            _openid:event.yhopenid
        }).get()
    }
    else if(event.type=="yuyueTeacher"){
        return await db.collection("yuyue").where({
            _openid:event.yhopenid
        }).get()
    }
}