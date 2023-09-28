
import mongoose, {Schema,model, Types} from 'mongoose';
const clinicSchema = new Schema ({
    name:{
        type :String,
        required: true,
        unique: true
    },
    slug:{
        type : String,
        required : true
    },
    
    createdBy : {
       type: Types.ObjectId ,ref:'User',required : true
    },
    updatedBy : {
        type: Types.ObjectId ,ref:'User',required : true
     },
},
{ 
    toJSON :{virtuals:true},

    toObject:{virtuals:true},

  timestamps:true, 
})
clinicSchema.virtual('subClinic',{
    localField: '_id',
    foreignField : 'clinicId',
    ref:'subClinic'

})
const clinicModel = mongoose.models.Clinic ||  model('Clinic', clinicSchema);
export default clinicModel;


