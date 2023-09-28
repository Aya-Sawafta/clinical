import { roles } from "../../Middleware/auth.middleware.js";

 export const endpoints ={
    create : [roles.Admin , roles.SuperAdmin],
    update : [roles.Admin , roles.SuperAdmin],
   //  get : [otherRoles]  
   get:[roles.Admin , roles.User , roles.SuperAdmin]
 }