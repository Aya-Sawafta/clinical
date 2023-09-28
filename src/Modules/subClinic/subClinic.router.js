import { Router } from "express";
import { auth } from "../../Middleware/auth.middleware.js";
import validation from "../../Middleware/validation.js";
import fileUpload, { fileValidation } from "../../Services/multerCloudinary.js";
import * as SubClinicController from './controller/subClinic.controller.js'
import { endpoints } from "./subClinic.endpoint.js";
import * as validators from "./subClinic.validation.js";
const router = Router({ mergeParams: true });

router.post('/:clinicId', auth(endpoints.create), fileUpload(fileValidation.image).single('image'), validation(validators.createSubClinic),
    SubClinicController.createSubClinic);

router.put('/update/:subClinicId', auth(endpoints.update), fileUpload(fileValidation.image).single('image'), validation(validators.updateClinic),
    SubClinicController.updateSubClinic);

router.get('/', SubClinicController.getSubClinics);


export default router;