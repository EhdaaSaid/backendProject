const Item = require('../models/stock.model')

const addItem = async(req,res)=>{

    try{
        const item = new Item ({
            ...req.body,
            userId:req.user._id
        })
        if(req.user.position != "admin" && req.user.position != "emp" ) {throw new Error("Don't allow to you")}
        else{
            await item.save()
        res.status(200).send({ apiStatus:true, data:item, message: 'Item Added'})
        }
        
    }
    catch(e){
        
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error adding item'})
    }
}

//get all items from this user
const myItems = async(req,res)=>{
    try{
      
        await req.user.populate('myItems')
        res.status(200).send({ apiStatus:true, data:req.user.myItems, message: 'Item Added'})
    }
    catch(e){
        
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error adding item'})
    }
}

//add category to item
const addCategory =  async(req,res)=>{
    try{
        const item = await Item.findById(req.params.id)
        const cate = req.body
        item.category.push(cate)
        await item.save()
        res.status(200).send({
            apiStatus:true,
            data:item,
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

const editItem = async(req,res)=>{
    try{
        const item = await Item.findById(req.params.id)
        // res.send(post)
        // post.content = req.body.content
        for(let d in req.body){
            item[d] = req.body[d]
        }
        await item.save()
        res.status(200).send( { apiStatus:true, data:item, message:"data edited"})
    }
    catch(e){
        
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error edit item'})
    }
}

const addQuantity = async(req,res)=>{
    try{
        const item = await Item.findById(req.params.id)
        // res.send(post)
        // post.content = req.body.content
       item.quantity+=req.body.quantity
        await item.save()
        res.status(200).send( { apiStatus:true, data:item, message:"data edited"})
    }
    catch(e){
        
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error addQuantity item'})
    }
}

const sahbItem = async(req,res)=>{
    try{
        const item = await Item.findById(req.params.id)
        // res.send(post)
        // post.content = req.body.content
       item.quantity-=req.body.quantity
        await item.save()
        res.status(200).send( { apiStatus:true, data:item, message:"data edited"})
    }
    catch(e){
        
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error sahbItem item'})
    }
}





module.exports={addItem , myItems , addCategory ,editItem ,addQuantity , sahbItem}