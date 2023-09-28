
import mongoose, { Schema, model, Types } from 'mongoose';
const reservationSchema = new Schema({
    subClinicId: {
        type: Types.ObjectId, ref: 'SubClinic', required: true
    },
    reservationDate: {
        type: String, required: true
    },
    createdBy: { type: Types.ObjectId, ref: 'User' },

    updatedBy: { type: Types.ObjectId, ref: 'User' }
},
    {
        timestamps: true,
    })


const reservationModel = mongoose.models.Reservation || model('Reservation', reservationSchema);
export default reservationModel;