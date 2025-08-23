const jwt=require('jsonwebtoken')

//admin authentication middleware

const authAdmin=async (req,res,next)=>{
    try {
        const {atoken}=req.headers
        if(!atoken){
            res.json({success:false,message:"Not authorized login"})
        }
        const token_decode=jwt.verify(atoken,process.env.JWT_SECRET)

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            res.json({success:false,message:"Not authorized login"})
        }
        next()
    } catch (error) {
        console.log(error)
        res.send({success:true,message:error.message})
    }
}
module.exports={authAdmin}