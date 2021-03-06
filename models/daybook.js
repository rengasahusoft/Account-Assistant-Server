import mongoose from 'mongoose'
var Schema = mongoose.Schema;
import autoIncrement from 'mongoose-auto-increment'

var dayBookSchema = new Schema({
   type : {type  : String , lowercase : true , trim :true, required : true},
   amount : { type : Number , required :true },
   name : { type : String, },
   depositorId : { type : Schema.Types.ObjectId, ref : 'Depositor' },
   pawnId : { type : Schema.Types.ObjectId, ref : 'Pawn' },
   createdAt : {type : Date},
   updatedAt : {type : Date ,default  : Date.now}
})

export default mongoose.model('DayBook',dayBookSchema,'dayBook');
