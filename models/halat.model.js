const mongoose = require('mongoose')
const validator = require('validator')

const HalaSchama = mongoose.Schema( {
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    code:{
        type:Number,
        required:true,
        unique: true
    },
    name:{
        type : String,
        trim : true,
        required : true,
        lowercase : true , 
        minlengh : 3 ,
        maxlengh : 20
    }, 
    wagabat :{
        type : Number,
        required: true,
        validate(value){

        }
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        unique: true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error( 'not egy number')
        }
    }, 
    
    status : {
        type : Boolean,
        default: false
    },
   

   
} , {timestamps:true}
)



HalaSchama.methods.toJSON = function(){
    const hala = this.toObject()
    
    delete hala.__v
    return hala
}


const Hala = mongoose.model('Hala', HalaSchama)

module.exports = Hala





