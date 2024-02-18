import { Router } from "express";
import { getStatus } from "../controllers/healthChecker.controller";

const router = Router();

router.get('', getStatus)

export default router