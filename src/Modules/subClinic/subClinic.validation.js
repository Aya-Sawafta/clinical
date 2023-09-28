import joi from "joi";
import { generalFeilds } from "../../Middleware/validation.js";


export const createSubClinic= joi.object({
    name : joi.string().min(2).max(20).required(),
    clinicLocation : joi.string().min(2).max(20).required(),
    availableDate: joi.required(),
    file : generalFeilds.file,
    clinicId : generalFeilds.id
}).required();

export const updateClinic = joi.object({
    clinicId:generalFeilds.id,
    subClinicId:generalFeilds.id,
    name : joi.string().min(2).max(20),
    clinicLocation : joi.string().min(2).max(20).required(),
    file : generalFeilds.file,
}).required();
