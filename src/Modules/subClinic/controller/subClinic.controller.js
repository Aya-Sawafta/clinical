import slugify from "slugify";
import moment from "moment";
import subClinicModel from "../../../../DB/model/SubClinic.model.js";
import userModel from "../../../../DB/model/User.model.js";
import cloudinary from "../../../Services/cloudinary.js";
import { asyncHandler } from "../../../Services/errorHandling.js";

export const createSubClinic = asyncHandler(async (req, res, next) => {
    let date = new Date(req.body.availableDate)
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
   date = date.toLocaleDateString();
   req.body.availableTime=time;
    req.body.availableDate = date;
    req.body.availableTime = hours +":"+ minutes;
    const user = await userModel.findById(req.user._id).select("userName");
    const uname = user.userName;
    const { clinicId } = req.params;
    const { name, clinicLocation } = req.body;

    if (await subClinicModel.findOne({ name })) {

        return next(new Error(`duplicate subClinic name ${name}`, { cause: 409 }))

    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/subClinic` });

    const subClinic = await subClinicModel.create({ name, slug: slugify(name), clinicId,availableTime:req.body.availableTime,availableDate:req.body.availableDate, clinicLocation, image: { secure_url, public_id }, createdBy: req.user._id, updatedBy: req.user._id, doctorName: uname })


    return res.status(201).json({ message: "success", subClinic })
});


export const updateSubClinic = asyncHandler(async (req, res, next) => {

    const { clinicId, subClinicId } = req.params;

    const subClinic = await subClinicModel.findOne({ _id: subClinicId, clinicId });

    if (!subClinic) {
        return next(new Error(`Invalid clinic ${subClinicId}`), { cause: 400 })
    }

    if (req.body.name) {
        if (subClinic.name == req.body.name) {
            return next(new Error(`old name match new name`, { caus: 400 }))
        }

        if (await subClinicModel.findOne({ name: req.body.name })) {
            return next(new Error(`duplicate subClinic `), { cause: 409 });
        }

        subClinic.name = req.body.name;
        subClinic.slug = slugify(req.body.name);
    }

    if (req.file) {

        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/subClinic` });

        await cloudinary.uploader.destroy(subClinic.image.public_id);
        subClinic.image = { secure_url, public_id };
    }
    subClinic.updatedBy = req.user._id;
    subClinic.createdBy = req.user._id;

    await subClinic.save();

    return res.status(201).json({ message: "success", subClinic });
});

export const getSubClinics = asyncHandler(async (req, res, next) => {

    const subClinics = await subClinicModel.find().populate({
        path: 'clinicId',
        select: 'name',
    });
    return res.status(200).json({ message: "success", subClinics });
});
