const mongoose = require('mongoose')
const validator = require('validator')

const ItemSchama = mongoose.Schema( {
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type : String,
        trim : true,
        required : true,
        lowercase : true , 
        minlengh : 3 ,
        maxlengh : 20
    }, 
    quantity :{
        type : Number,
        required: true,
        validate(value){

        }
    },
   
    unit : {
        type :String,
        trim :true,
        required:true,
        enum:["kg","liter"]
    },
    
    category :[
        {
            catType:{
                type:String,
                trim:true,
                required:true,
                enum:[{name:"mogamad" , limit:100},{name:"bekala", limit:50},{name:"khodar" , limit:100},
                {name:"etara" , limit:100}]

            },
            catDetails:{
                type:String,
                trim:true,
                enum : function(){
                    if(this.catType== "mogamad") return['لحمة','فراخ','خضار'] 
                    else if(this.catType== "bekala") return['زيت' ,'سكر' ,'مكرونة','ارز'] 
                    else if(this.catType== "khodar") return['بطاطس' ,'طماطم' ,'فاصوليا','لوبيا','فلفل','جزر'] 
                    else if(this.catType== "etara") return['بهارات فراخ' ,'كمون' ,'ملح','فلفل اسود'] 
                    else console.log("ادخل فى المكان الصحيح")
                }
            }
        }
     ], 
    note : {
        type : String,
        
    },
    status : {
        type : Boolean,
        default: false
    },
   

   
} , {timestamps:true}
)



ItemSchama.methods.toJSON = function(){
    const item = this.toObject()
    
    delete item.__v
    return item
}


const Item = mongoose.model('Item', ItemSchama)

module.exports = Item





