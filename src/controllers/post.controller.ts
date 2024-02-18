import { Request, Response } from "express";
import prisma from "../lib/client"

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const allPosts = await prisma.post.findMany()
        if (allPosts.length < 0) {
            res.status(404).send({ message: 'No Posts found' })
        } else {
            res.status(200).send(allPosts);
        }
    } catch (error) {
        res.status(500).send("Something went wong");
    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const post = req.body
        const new_post = await prisma.post.create({
            data: {
                title: post.title,
                body: post.body,
            },
        })
        res.status(201).json(new_post);
    } catch (error) {
        res.status(500).send("Something went wong");

    }

}

export const getPost = async (req: Request, res: Response) => {
    const id = req.params.postID as string
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        })
        if (post) {
            res.status(200).send(post);
        } else {
            res.status(404).send({ message: 'No Post found by that id' })
        }
    } catch (error) {
        res.status(500).send("Something went wong");
    }
}