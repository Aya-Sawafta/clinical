import { Router } from "express";
import * as clinicController from './controller/clinic.controller.js';
import * as validators from './clinic.validation.js'
import validation from "../../Middleware/validation.js";
import SubClinicRouter from '../subClinic/subClinic.router.js'
import { auth, roles } from "../../Middleware/auth.middleware.js";
import { endpoints } from "./clinic.endpoint.js";
//mongodb+srv://sawaftaaya5:42x5SuDZFxTu8RoY@cluster0.hjmzbqs.mongodb.net/clinic
const router = Router();

router.use('/:clinicId/subClinic', SubClinicRouter)

router.post('/',auth(endpoints.create),validation(validators.createClinic),clinicController.createClinic)

 router.put('/update/:clinicId', auth(endpoints.update) ,clinicController.updateClinic);

 router.get('/:clinicId',auth(endpoints.get),validation(validators.getSpecificClinic),clinicController.getSpecificClinic);

router.get('/',auth(Object.values(roles)),clinicController.getAllClinics)




export default router;