// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database();
const cmd=db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    if(event.type=="haveNum"){
        return await db.collection("carts").where({
            goods_id:event.goods_id,
            _openid:event.openid               
        }).update({
            data:{
                num:cmd.inc(1)
            }
        })
    }
    else if(event.type=="noNum"){
        return await db.collection("carts").add({
            data:{
                _openid:event.openid,
                goods_id:event.goods_id,
                inimg:event.inimg,
                price:event.price,
                title:event.title,
                dianpu:event.dianpu,
                num:event.num,
                selected:event.selected,
            }
        })
    }
}