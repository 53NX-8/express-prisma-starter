import { Router } from "express";
import { createPost, getAllPosts, getPost } from "../controllers/post.controller";

const router = Router();

router.route('').get(getAllPosts).post(createPost)
router.route('/:postID').get(getPost)

export default router