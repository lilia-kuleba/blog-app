import { Box, Button, TextareaAutosize, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { postService } from '../services/postService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const CreatePost = () => {
  const navigate = useNavigate();
  const userId = useSelector(state => state.userInfo.id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    await postService.createPost({
      title,
      content,
      authorId: userId,
    })
    navigate('/');
  };

  useEffect(() => {
    if (!userId) {
      navigate('/');
    }
  }, [userId]);

  if (!userId) return null;

  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        m: '0 auto',
        gap: '12px',
        pt: '20px',
      }}
      onSubmit={onSubmit}
    >
      <Typography
        variant='h3'
        sx={{ mb: '12px' }}
        textAlign="center"
      >
        Create Post
      </Typography>
      <TextField
        size="small"
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Typography variant="h5" sx={{ mb: '4px' }}>
        Content
      </Typography>
      <TextareaAutosize
        minRows={10}
        value={content}
        placeholder="Content"
        onChange={e => setContent(e.target.value)}
        style={{
          resize: 'none',
          padding: '10px 14px',
        }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!title || !content}
      >
        Create
      </Button>
    </Box>
  )
};