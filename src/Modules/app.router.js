import connectDB from '../../DB/connection.js';
import { globalErrorHandel } from '../Services/errorHandling.js';
import AuthRouter from './Auth/Auth.router.js';
import UserRouter from './User/User.router.js';
import ClinicRouter from './Clinic/clinic.router.js'
import SubClinicRouter from './subClinic/subClinic.router.js'
import ReservationRouter from './Reservation/reservation.router.js'

import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fullPath = path.join(__dirname, '../upload');

const initApp = (app, express) => {

    app.use(cors());
    connectDB();
    app.use(express.json());
    app.use('/upload', express.static(fullPath));
    app.use("/auth", AuthRouter);
    app.use('/user', UserRouter);
    app.use('/clinic', ClinicRouter);
    app.use('/subClinic', SubClinicRouter);
    app.use('/reservation', ReservationRouter);
    app.use('/*', (req, res) => {
        return res.json({ message: "page not found" });
    })
    //global error handler
    app.use(globalErrorHandel)

}
export default initApp;