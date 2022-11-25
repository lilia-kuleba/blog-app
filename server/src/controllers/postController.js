import { postService } from '../services/postService.js';

async function getAllBlog(req, res) {
  const blogs = await postService.getAll();

  res.send(blogs);
}

async function createPost(req, res) {
  const { title, authorId, content } = req.body;

  const newBlog = await postService.create({
    title,
    authorId,
    content,
  });

  res.send(newBlog);
}

async function editPost(req, res) {
  const { postId } = req.params;
  const { userId, title, content } = req.body;

  await postService.edit({
    postId,
    userId,
    title,
    content,
  });

  res.sendStatus(201);
}

async function deletePost(req, res) {
  const { postId } = req.params;
  const { userId } = req.query;

  const deletedPost = await postService.deletePost({
    postId,
    userId,
  });

  res.send(deletedPost);
}

export const postController = {
  getAllBlog,
  createPost,
  editPost,
  deletePost,
};