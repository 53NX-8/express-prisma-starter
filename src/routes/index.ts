import {
    NextFunction,
    Request,
    Response,
    Router,
} from "express";
import AppError from "../utils/appError";
import healthCheckerRoutes from "./healthChecker.routes";
import postRoutes from "./post.routes";

const router = Router();
router.use("/posts", postRoutes);
router.use("/healthChecker", healthCheckerRoutes);
router.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
});

export default router;