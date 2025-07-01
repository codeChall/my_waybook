import { Request, Response } from 'express';
import { Posts } from '../models/PostModel';

export const getPosts = async (_req: Request, res: Response) => {
  const postsList = await Posts.find();

  console.log('Posts list:', postsList);
  res.json(postsList);
};

export const createPost = async (req: Request, res: Response) => {
  const { title, description, createdAt, image, voblers } = req.body;
  const newItem = new Posts({ title, description, createdAt, image, voblers });
  await newItem.save();
  res.status(201).json(newItem);
};