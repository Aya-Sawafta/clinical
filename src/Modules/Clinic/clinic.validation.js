import joi from 'joi';
import { generalFeilds } from '../../Middleware/validation.js';

export const createClinic= joi.object({
    name : joi.string().min(2).max(20).required(),
}).required();

export const updateClinic = joi.object({
    clinicId:generalFeilds.id,
    name : joi.string().min(2).max(20),
}).required();

export const getSpecificClinic= joi.object({
    clinicId:generalFeilds.id
}).required();