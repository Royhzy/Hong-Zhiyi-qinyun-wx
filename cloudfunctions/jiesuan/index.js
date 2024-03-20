// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database();
const cmd=db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    if(event.type=="get")
    {
        return await db.collection("carts").where({
            _openid:event.yhopenid,
            selected:true
        }).get()
    }
    else if(event.type=="addDingdan"){
        return await db.collection("dingdan").add({
            data:{
                _openid:event.openid,
                goods_id:event.goods_id,
                inimg:event.inimg,
                price:event.price,
                title:event.title,
                dianpu:event.dianpu,
                num:event.num,
                xiadantime:event.xiadantime,
                name:event.name,
                phone:event.phone,
                address:event.address,
                shouhuo:false
            }
        })
    }
    else if(event.type=="getDingdan"){
        return await db.collection("dingdan").orderBy("xiadantime","desc").where({
            _openid:event.yhopenid,
        }).get()
    }
    else if(event.type=="getdaishou"){
        return await db.collection("dingdan").orderBy("xiadantime","desc").where({
            _openid:event.yhopenid,
            shouhuo:false
        }).get()
    }
    else if(event.type=="querenshouhuo"){
        return await db.collection("dingdan").where({
            _id:event._id
        }).update({
            data: {
                shouhuo:true
            }        
        }) 
    }
    else if(event.type=="lijijiesuan"){
        return await db.collection("dingdan").add({
            data:{
                _openid:event.openid,
                goods_id:event.goods_id,
                inimg:event.inimg,
                price:event.price,
                title:event.title,
                dianpu:event.dianpu,
                num:event.num,
                xiadantime:event.xiadantime,
                name:event.name,
                phone:event.phone,
                address:event.address,
                shouhuo:false
            }
        })        
    }
}