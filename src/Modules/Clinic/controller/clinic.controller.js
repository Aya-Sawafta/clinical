import { asyncHandler } from "../../../Services/errorHandling.js";
import cloudinary from "../../../Services/cloudinary.js";
import clinicModel from "../../../../DB/model/Clinic.model.js"

import slugify from "slugify";

export const createClinic = asyncHandler(async (req, res, next) => {
    const name = req.body.name.toLowerCase();
    if (await clinicModel.findOne({ name })) {
        return next(new Error(`duplicate clinic name ${name}`, { cause: 409 }))

    }
    const clinic = await clinicModel.create({ name, slug: slugify(name) ,createdBy:req.user._id , updatedBy:req.user._id });


    return res.status(201).json({ message: "success", clinic: clinic })
})

export const updateClinic = asyncHandler(async (req, res, next) => {
    const clinic = await clinicModel.findById(req.params.clinicId);
   
    if (!clinic) {
        
      return next(new Error('invalid clinic',{cause:400}))
    }
 
    if (req.body.name) {
        if (clinic.name == req.body.name) {
            return next(new Error(`old name match new name`, { cause: 400 }))
        }
        if (await clinicModel.findOne({ name: req.body.name })) {
            return next(new Error(`duplicate clinic `), { cause: 409 });
        }
        clinic.name = req.body.name;
        clinic.slug = slugify(req.body.name);
    }
    
    clinic.updatedBy = req.user._id;
    clinic.createdBy=req.user._id 
    await clinic.save();
    return res.status(200).json({message:'success'})
})

export const getSpecificClinic = asyncHandler(async (req, res, next) => {
    const clinic = await clinicModel.findById(req.params.clinicId);
    return res.status(200).json({ message: "success", clinic })
})

export const getAllClinics = asyncHandler(async (req, res, next) => {

    const clinics = await clinicModel.find()//.populate('subClinic');
    return res.status(200).json({ message: "success", clinics });
});