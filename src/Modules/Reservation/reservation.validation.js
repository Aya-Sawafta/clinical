import joi from "joi";
import { generalFeilds } from "../../Middleware/validation.js";


export const createReservation = joi.object({
    reservationDate: joi.required(),
    subClinicId: generalFeilds.id
}).required();
