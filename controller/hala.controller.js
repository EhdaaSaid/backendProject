const Hala= require('../models/halat.model')

const addHala = async(req,res)=>{

    try{
        const hala = new Hala ({
            ...req.body,
            userId:req.user._id
        })
        if(req.user.position != "admin" && req.user.position != "emp") {throw new Error("Don't allow to you")}
        else{
            await hala.save()
        res.status(200).send({ apiStatus:true, data:hala, message: 'Hala Added'})
        }
        
    }
    catch(e){
        
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error adding item'})
    }
}


//count wagabat
const countHala = async(req,res)=>{

    try{
                
            let data= await Hala.find({date: req.body})
          //  console.log(data)
            let count = 0
            data.forEach(d=>{
                // console.log(d.wagabat)
                count+=d.wagabat
            })
        //    console.log(count)
            res.status(200).send({ apiStatus:true, data:count, message: 'Daily Wagabat'})
        
        
    }
    catch(e){
        
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error counting wagabat'})
    }
}



//get all items from this user
const myHalat = async(req,res)=>{
    try{
        const hala = await Hala.find().sort({"_id":-1})
      
        res.status(200).send({ apiStatus:true, data:hala, message: 'Shaw All'})
    }
    catch(e){
        
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error adding item'})
    }
}

const editHala = async(req,res)=>{
    try{
        const hala = await Hala.findById(req.params.id)
        // res.send(post)
        // post.content = req.body.content
        for(let d in req.body){
            hala[d] = req.body[d]
        }
        await hala.save()
        res.status(200).send( { apiStatus:true, data:hala, message:"data edited"})
    }
    catch(e){
        
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error edit item'})
    }
}

const getSingleHala = async(req,res)=>{
    try{
        const hala = await Hala.findById(req.params.id)
        res.send(hala)
        // post.content = req.body.content
        // for(let d in req.body){
        //     hala[d] = req.body[d]
        // }
        await hala.save()
        console.log(hala)
        res.status(200).send( { apiStatus:true, data:hala, message:"data edited"})
    }
    catch(e){
        
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error edit item'})
    }
}




const deletHala = async (req, res) => {
    try {
        const hala = await Hala.findByIdAndDelete(req.params.id)

        if (!hala) {
            res.status(404).send()
        }
        
        res.send(hala)
       
        res.status(200).send( { apiStatus:true, data:hala, message:"data edited"})
    } catch (e) {
           
        res.status(500).send({ apiStatus:false, data:e.message, message: 'error edit item'})
    }
}






//add assignment to emp from admin
const assignTask= async (req,res)=>{
    try{
        if(req.user.position != "admin") {throw new Error ("you dont an Emp")}
        taskId = req.params.id
        const task = await Task.findById(taskId)
        if(!task) res.send('task not found')
        const assigned = await User.findOne({_id:req.body.empId, position:"emp"})
        if(!assigned) res.send('emp not found')
        task.assigned = req.body.empId
        await task.save()
        res.status(200).send( { apiStatus:true, data:req.user.myTasks, message:"task Ass"})
    }
    catch(e){
    res.status(500).send({ apiStatus:false, data:e.message, message: "error adding post data" })
    }
}



module.exports={addHala , myHalat ,editHala  , getSingleHala, countHala, assignTask ,deletHala}


