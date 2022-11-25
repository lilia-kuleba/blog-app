import { v4 as uuidv4 } from "uuid"
import { Post } from '../models/Post.js';
import { User } from '../models/User.js';
import { Role } from '../models/Role.js';
import { ApiError } from '../exceptions/ApiError.js';

function normalize({ id, title, authorName, content, createdAt }) {
  return { id, title, authorName, createdAt, content };
}

async function getAll() {
  const posts = await Post.findAll();

  return posts.map(normalize);
}

async function create({ title, authorId, content }) {
  if (!title || !authorId || !content) {
    throw ApiError.BadRequest('Send full object model');
  }

  const author = await User.findOne({
    where: { id: authorId },
    include: Role,
  });

  if (!author) {
    throw ApiError.BadRequest('Author does not exist');
  }

  const id = uuidv4();
  const newBlog = {
    id,
    title,
    content,
    authorName: author.userName,
    userId: author.id,
  };

  await Post.create(newBlog);

  return normalize(newBlog);
}

async function edit({ postId, userId, title, content, }) {
  const post = await Post.findOne({
    where: { id: postId },
  });
  const author = await User.findOne({
    where: { id: userId },
    include: Role,
  });

  if (!post) {
    throw ApiError.BadRequest('Post does not exist');
  }

  if (!author) {
    throw ApiError.BadRequest('Author does not exist');
  }

  if (author.id !== userId) {
    throw ApiError.Unauthorized();
  }

  const updatedPost = await Post.update({
    title,
    content,
  }, { where: { id: postId }});

  return normalize(updatedPost);
}

async function deletePost({ postId, userId }) {
  const post = await Post.findOne({
    where: { id: postId },
  });
  const author = await User.findOne({
    where: { id: userId },
    include: Role,
  });

  if (!post) {
    throw ApiError.BadRequest('Post does not exist');
  }

  if (!author) {
    throw ApiError.BadRequest('Author does not exist');
  }

  if (
    author.id !== userId &&
    !author.roles.map(role => role.roleName).includes('admin')
  ) {
    throw ApiError.Unauthorized();
  }

  await Post.destroy({
    where: {
      id: postId,
    },
  });
}

export const postService = {
  getAll,
  create,
  edit,
  deletePost,
};
