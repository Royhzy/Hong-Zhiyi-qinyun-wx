// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database();
const cmd=db.command;


// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    if(event.type=="guanzhu"){
        return await db.collection("guanzhu").add({
            data:{
                _openid:event.openid,
                teacher_id:event.teacher_id,
                area:event.area,
                img:event.img,
                instrument:event.instrument,
                introduce:event.introduce,
                name:event.name,
                selected:event.selected,
                pingjia:event.pingjia,
                price:event.price,
                school:event.school,
                teachAge:event.teachAge,
                telephone:event.telephone
            }
        })
    }
    else if(event.type=="getguanzhu"){
        return await db.collection("guanzhu").where({
            teacher_id:event.id,
            _openid:event.openid
        }).get()
    }
    else if(event.type=="quguanzhu"){
        return await db.collection("guanzhu").where({
            teacher_id:event.id,
            _openid:event.openid
        }).remove()
    }
    else if(event.type=="yuyue"){
        return await db.collection("yuyue").add({
            data:{
                _openid:event.openid,
                teacher_id:event.teacher_id,
                area:event.area,
                img:event.img,
                instrument:event.instrument,
                name:event.name,
                price:event.price,
                school:event.school,
                yajin:false,
                shangke:false,
                allfeiyong:false
            }
        })
    }
    // else if(event.type=="addteacher"){
    //     return await db.collection("teacher-copy").where({
    //         area:"泉州晋江市"
    //     }).update({
    //         data:{
    //             inimg:event.inimg,
    //             course:event.course
    //         }
    //     })
    // }
}