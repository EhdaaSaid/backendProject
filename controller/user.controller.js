const User = require('../models/user.model')
const emailSetting = require('../helper/sendEmail.helper')

const register = async (req,res)=>{
    try{
        const userData = new User(req.body)
        await userData.save()
        emailSetting(userData.email, "test email")
        res.status(200).send({
            apiStatus:true,
            data:userData,
            message:"data added successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error in register"
        })
    }
}
const addAddr =  async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const addr = req.body
        user.addresses.push(addr)
        await user.save()
        res.status(200).send({
            apiStatus:true,
            data:user,
            message:"data added successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error in register"
        })
    }
}
const login = async(req,res)=>{
    try{
        let user = await User.loginUser(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.status(200).send({ apiStatus:true, data:{user, token}, message:"logged in" })
    }
    catch(e){
        res.status(500).send({ apiStatus:false, data:e.message, message:"cannot login" })
    }
}
const logOut = async(req,res)=>{
    try{  
        req.user.tokens = req.user.tokens.filter(singleToken=>{
            return singleToken.token != req.token
        })
        req.user.save()
        res.send({apiStatus:true, data:"", message:"logged out from this device"})
    }
    catch(e){
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error'})
    }
}
const logOutAll = async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send({apiStatus:true, data:"", message:"logged out from all devices"})
    }
    catch(e){
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error'})
    }
}

const getSingleUser = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        newIdUser = user.newId
        nameUser = user.name
        res.send(user)
       
        await nameUser.save()
       
      
        res.status(200).send( { apiStatus:true, data:user , message:"single User"})
    }
    catch(e){
        
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error single User'})
    }
}

const deletUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            res.status(404).send()
        }
        
        res.send(user)
       
        res.status(200).send( { apiStatus:true, data:user, message:"user Deleted"})
    } catch (e) {
           
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error user Deleted'})
    }
}


const myUser = async(req,res)=>{
    try{
        const user = await User.find().sort({"_id":-1})
      
        res.status(200).send({ apiStatus:true, data:user, message: 'Shaw All'})
    }
    catch(e){
        
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error adding item'})
    }
}


const me = async(req,res)=>{ res.send(req.user) }

module.exports = { register, addAddr, login, logOut, logOutAll, me , getSingleUser , deletUser , myUser}