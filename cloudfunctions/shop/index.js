// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database();
const cmd=db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    if(event.type=="getAll")
    {
        return await db.collection("yueqi").where({
                catogory:event.catogory
            }).get()
    }
    else if(event.type=="getSearch")
    {
        return await db.collection("yueqi").where(
            {
                title:db.RegExp({
                    regexp:event.key,     
                    options:'i',      
                }),
                catogory:event.catogory
            }
            ).get()
    }
    else if(event.type=="keySaleSort")
    {
        return await db.collection("yueqi").orderBy("sale","desc").where({
            title:db.RegExp({
                regexp:event.key,     
                options:'i',      
            }),
            catogory:event.catogory
        }).get()
    }
    else if(event.type=="saleSort")
    {
        return await db.collection("yueqi").orderBy("sale","desc").where({
            catogory:event.catogory
        }).get()
    }
    else if(event.type=="keyPriceSort")
    {
        return await db.collection("yueqi").orderBy("price",event.sc).where({
            title:db.RegExp({
                regexp:event.key,     
                options:'i',      
            }),
            catogory:event.catogory
        }).get()
    }
    else if(event.type=="priceSort")
    {
        return await db.collection("yueqi").orderBy("price",event.sc).where({
            catogory:event.catogory
        }).get()
    }
    else if(event.type=="addsale"){
        return await db.collection("yueqi").where({
            _id:event.goods_id
        }).update({
            data: {
                sale:cmd.inc(1)
            }
        })
    }
}