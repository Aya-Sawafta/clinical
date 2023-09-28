import mongoose, { model, Schema, Types } from "mongoose";

const subClinicSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    slug:{
        type: String,
        required: true,
    },
    image:{
       type: Object,
        required: true,
    },
    clinicId :{
        type : Types.ObjectId ,
         ref:'Clinic',
         required: true
    },
    clinicLocation:{
        type: String,
        required: true,
    },
    phoneNumber:[{

        type: String,
        required: true,
        unique: true
    
    }],
    doctorName:{
        type:String
    },
    availableDate:{
        type:String , required : true
    },
    availableTime:{
        type:String ,
    },

    createdBy : {
        type: Types.ObjectId ,ref:'User',required : true
     },
     updatedBy : {
         type: Types.ObjectId ,ref:'User',required : true
      },

},
   
)
const subClinicModel = mongoose.models.SubClinic || model('subClinic' , subClinicSchema);
export default subClinicModel;