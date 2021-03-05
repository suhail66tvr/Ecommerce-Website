
var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
module.exports={
    adminSignup:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            adminData.Password=await bcrypt.hash(adminData.Password,10)
            db.get().collection(collection.ADMIN_COLLECTION).insertOne(adminData).then((data)=>{
                resolve(data.ops[0])
            })
        })
        
    },
    // adminLogin:(adminData)=>{
    //     return new Promise(async(resolve,reject)=>{
    //         let loginStatus=falseThalapathy Vijay
    //         let response={}
    //         let admin=await db.get().collection(collection.ADMIN_COLLECTION).findOne({Email:adminData.Email})
    //         if(admin){
    //             bcrypt.compare(adminData.Password,admin.Password).then((stutas)=>{
    //                 if(stutas){
    //                     console.log("login success");
    //                     // response.admin=admin
    //                     // response.stutas=true
    //                     // resolve(response)
    //                 }else{
    //                     console.log("ligin falied");
    //                     // resolve({stutas:false})
    //                 }
    //             })
    //         }else{
    //             console.log("login faile");
    //             // resolve({stutas:false})
    //         }
    //     })
    // }
}