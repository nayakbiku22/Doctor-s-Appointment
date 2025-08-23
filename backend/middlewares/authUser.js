const jwt=require('jsonwebtoken')

//user authentication middleware

const authUser=async (req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            res.json({success:false,message:"Not authorized login"})
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        req.user={userId:token_decode.id}
       
        next()
    } catch (error) {
        console.log(error)
        res.send({success:false,message:error.message})
    }
}
module.exports={authUser}