import userModel from "../../../../DB/model/User.model.js";
import cloudinary from "../../../Services/cloudinary.js";
import { asyncHandler } from "../../../Services/errorHandling.js";
import { compare, hash } from "../../../Services/hashAndCompare.js";

export const profilePic = asyncHandler(async (req, res, next) => {
    //  const{Uid}=req.user.id;

    if (!req.file) {
        return next(new Error("please provide a file"));
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/admin` });
    const user = await userModel.findOneAndUpdate(req.id, { image: { secure_url, public_id } })


    await cloudinary.uploader.destroy(user.image.public_id);
    user.image = { secure_url, public_id };

    return res.json({ message: "success", user });

})



export const updatePassword = async (req, res, next) => {

    const { oldPassword, newPassword } = req.body;

    const user = await userModel.findById(req.user.id);

    const match = compare(oldPassword, user.password)
    if (!match) {
        return next(new Error("invalid password "));
    }
    const hashPassword = hash(newPassword);
    await userModel.findByIdAndUpdate(req.id, { password: hashPassword });
    return res.json({ message: "success" })

}

export const shareProfile = async (req, res, next) => {

    const user = await userModel.findById(req.params.id).select('userName email ');

    if (!user) {
        return next(new Error("invalid profile id"));
    } else {

        return res.json({ message: 'success', user });
    }

}


export const createAdmin = asyncHandler(async (req, res, next) => {
    const { userName, email, password ,role} = req.body;

    if (await userModel.findOne({ email })) {
        return next(new Error(`duplicate email ${email}`, { cause: 409 }))

    }

    // const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,{ folder: `${process.env.APP_NAME}/userAdmin` });
    const HashPassword = hash(password);
    const createAdmin = await userModel.create({ userName, email, role,password: HashPassword, createdBy: req.user._id, role: "Admin" });

    return res.status(201).json({ message: "Done", createAdmin });
})


export const updateAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.body
   // const{id}= req.params;
    const admin = await userModel.findById(req.params.userId);

    if (!admin) {

        return next(new Error('invalid user', { cause: 400 }))
    }

    if (admin.role==req.body.role) {
        return next(new Error(`email ${email} is already Admin`, { cause: 409 }))

    }
   admin.role=req.body.role

    admin.updatedBy = req.user._id;
    admin.createdBy = req.user._id
    await admin.save();
    return res.status(200).json({ message: 'success' })
})


export const forceDeleteAdmin = asyncHandler(async(req, res , next)=>{
    let {AdminId} = req.params;
     const admin = await userModel.findOneAndDelete({_id:AdminId , delete:true} );
    
     if(!admin){
        return next (new Error('Admin not found',{cause:400}))
     }
     return res.status(200).json({message:'success',admin})
});

export const softDeleteAdmin = asyncHandler(async(req, res , next)=>{
    let {AdminId} = req.params;
     const admin = await userModel.findOneAndUpdate({_id:AdminId , delete:false} , {delete:true} , {new:true});
     if(!admin){
        return next (new Error('Admin not found',{cause:400}))
     }
     return res.status(200).json({message:'success',admin})
});