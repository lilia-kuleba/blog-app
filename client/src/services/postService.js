import { axiosClient } from './http/axiosClient';

function getAll() {
  return axiosClient.get('/posts');
}

function createPost({ title, authorId, content }) {
  const newBlog = {
    title,
    authorId,
    content,
  };

  return axiosClient.post('/posts/create', newBlog);
}

function editPost({ postId, userId, title, content }) {
  return axiosClient.put(`posts/edit/${postId}`, {
    userId,
    title,
    content,
  })
}

function deletePost({ postId, userId }) {
  const params = {
    userId,
  };

  return axiosClient.delete(`posts/delete/${postId}`, {
    params,
  });
}

export const postService = {
  getAll,
  editPost,
  deletePost,
  createPost,
};
