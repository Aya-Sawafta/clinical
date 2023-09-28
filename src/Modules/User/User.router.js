import {Router} from 'express';
import * as userController from './Controller/User.controller.js';
import { auth, roles } from '../../Middleware/auth.middleware.js';
import fileUpload, { fileValidation } from '../../Services/multerCloudinary.js';
import validation from '../../Middleware/validation.js'
import * as validators from './User.validation.js';
import { endpoints } from './user.endpoints.js';

const router =Router();

router.patch('/profilePic',auth(endpoints.update),fileUpload(fileValidation.image).single('image'),
validation(validators.profilePic),
userController.profilePic);

router.patch('/updatePassword',auth(),validation(validators.updatePassword),userController.updatePassword);

router.get('/:id/profile',validation(validators.shareProfile),userController.shareProfile);

router.post('/createAdmin',auth(endpoints.AddAdmin),userController.createAdmin);
router.patch('/updateAdmin/:userId',auth(endpoints.updateAdmin),userController.updateAdmin);
router.patch('/softDelete/:AdminId',auth(endpoints.softDeleteAdmin),userController.softDeleteAdmin);
router.delete('/forceDelete/:AdminId',auth(endpoints.forceDeleteAdmin),userController.forceDeleteAdmin);


export default router;