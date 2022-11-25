import { useEffect, useState } from 'react';
import { postService } from '../services/postService';
import { Box } from '@mui/material';
import { PostCard } from '../components/PostCard';

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    postService.getAll()
      .then(res => {
        setPosts(res.data);
      });
  }, []);

  useEffect(() => {
    if (shouldUpdate) {
      postService.getAll()
        .then(res => {
          setPosts(res.data);
          setShouldUpdate(false);
        });
    }
  }, [shouldUpdate]);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        maxWidth: '1500px',
        height: '100%',
        mx: 'auto',
        p: '20px',
      }}
    >
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          onAction={setShouldUpdate}
        />
      ))}
    </Box>
  );
}
