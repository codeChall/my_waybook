import { Router, Request, Response } from 'express';
import { getPosts, createPost } from '../controllers/PostController';

const postsRouter = Router();

postsRouter.get('/posts', (req: Request, res: Response) => {
    console.log('aaaaaaaaaaaaaaa');
    getPosts(req, res);
});

postsRouter.post('/post', (req: Request, res: Response) => {
    createPost(req, res);
});

export default postsRouter;