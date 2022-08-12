// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database();
const cmd=db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    if(event.type=="getAllTeacher")
    {
        return await db.collection("teacher").skip(event.len).limit(event.pageNum).get()
    }
    else if(event.type=="getSearchTeacher")
    {
        return await db.collection("teacher").where(cmd.or([
            {
                name:db.RegExp({
                    regexp:event.key,     
                    options:'i',      
                })
            },
            {
                area:db.RegExp({
                    regexp:event.key,
                    options:'i',
                })
            },
            {
                instrument:db.RegExp({
                    regexp:event.key,
                    options:'i',
                })
            }
            ])).get()
    }
    else if(event.type=="getAllPiano")
    {
        return await db.collection("piano").skip(event.len).limit(event.pageNum).get()
    }
    else if(event.type=="getSearchPiano")
    {
        return await db.collection("piano").where(
            {
                title:db.RegExp({
                    regexp:event.key,     
                    options:'i',      
                })
            }
            ).get()
    }
}