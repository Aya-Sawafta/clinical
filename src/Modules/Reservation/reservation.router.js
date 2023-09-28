import { Router } from "express";
import { auth } from "../../Middleware/auth.middleware.js";
import validation from "../../Middleware/validation.js";
import * as ReservationController from './controller/reservation.controller.js';
import * as validators from "./reservation.validation.js";
import { endpoints } from "./reservation.endpoint.js";
const router = Router();

router.post('/', auth(endpoints.create), validation(validators.createReservation), ReservationController.createReservation);

export default router;