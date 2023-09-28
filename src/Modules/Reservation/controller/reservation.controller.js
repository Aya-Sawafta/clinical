import { asyncHandler } from "../../../Services/errorHandling.js";
import moment from 'moment';
import reservationModel from "../../../../DB/model/reservation.model.js";
import createInvoice from '../../../Services/pdf.js';
import { sendEmail } from "../../../Services/sendEmail.js";
import subClinicModel from "../../../../DB/model/SubClinic.model.js";
import userModel from "../../../../DB/model/User.model.js";

export const createReservation= asyncHandler(async (req, res, next) => {
 const{subClinicId , reservationDate } = req.body;
 const subClinic= await subClinicModel.findById({_id:subClinicId}).select("_id")

 if(!subClinic){
    return next(new Error(`Cannot find subClinic`,{cause:400}))
}

    const time = await subClinicModel.findOne({availableDate:reservationDate}); 
      
     if(time){
        if(time == reservationDate){
          return next(new Error(`un available date`,{cause:400}))
    }
     
     }
        const reservation = await reservationModel.create({subClinicId:subClinic},{reservationDate:reservationDate},{createdBy:req.user._id})

    
      await sendEmail(req.user.email , "Patient Review - created" ,'welcome',{
        path:'invoice.pdf',
        contentType:'application/pdf'
      })
      
      

 return res.status(201).json({message:"success creating reservation",reservation})
});
