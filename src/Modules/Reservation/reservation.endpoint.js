import { roles } from "../../Middleware/auth.middleware.js";

export const endpoints ={
    create : [roles.User , roles.Admin],
    update : [roles.User , roles.Admin], 
   get:[roles.Admin , roles.User , , roles.SuperAdmin]
 }