// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database();
const cmd=db.command;
// 云函数入口函数
exports.main = async (event, context) => {
    if(event.type=="getCart")
    {
        return await db.collection("carts").where({
            _openid:event.yhopenid
        }).get()
    }
    else if(event.type=="jiaNum")
    {
        return await db.collection("carts").where({
            _id:event.id
        }).update({
            data: {
                num: cmd.inc(1)
            }
        })        
    }
    else if(event.type=="jianNum")
    {
        return await db.collection("carts").where({
            _id:event.id
        }).update({
            data: {
                num: cmd.inc(-1)
            }
        })       
    }
    else if(event.type=="udSelected")
    {
        return await db.collection("carts").where({
            _id:event.id
        }).update({
            data: {
                selected:event.selected
            }
        })       
    }
    else if(event.type=="SelectedAll")
    {
        return await db.collection("carts").where({
            _openid:event.yhopenid
        }).update({
            data: {
                selected:event.selected
            }
        })         
    }
    else if(event.type=="removeSelect")
    {
        return await db.collection("carts").where({
            _openid:event.yhopenid,
            selected:true
        }).remove()       
    }
    else if(event.type=="jiesuanUd"){
        return await db.collection("carts").where({
            _openid:event.yhopenid,
            selected:true
        }).remove()
    }
    else if(event.type=="getSelected"){
        return await db.collection("carts").where({
            _openid:event.yhopenid,
            selected:true
        }).get()
    }
}