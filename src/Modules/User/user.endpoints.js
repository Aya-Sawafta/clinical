import { roles } from "../../Middleware/auth.middleware.js";

 export const endpoints ={
   get:[roles.SuperAdmin],
   update : [roles.User],
   AddAdmin:[roles.SuperAdmin],
   updateAdmin:[roles.SuperAdmin],
   softDeleteAdmin:[roles.SuperAdmin],
   forceDeleteAdmin:[roles.SuperAdmin],

 }