import { useState } from 'react';
import { useSelector } from 'react-redux';
import { postService } from '../services/postService';
import { format } from 'date-fns';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';

export const PostCard = ({ post, onAction }) => {
  const user = useSelector(state => state.userInfo);

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [mode, setMode] = useState('view');

  const isActionBarVisible =
    user.userName === post.authorName ||
    user.roles.includes('admin');

  const cancelEditing = () => {
    setMode('view');
    setTitle(post.title);
    setContent(post.content);
  };

  const onEdit = async () => {
    await postService.editPost({
      postId: post.id,
      userId: user.id,
      title,
      content,
    });
    setMode('view');
    onAction(true);
  };

  const onDelete = async () => {
    await postService.deletePost({
      postId: post.id,
      userId: user.id,
    });
    setMode('view');
    onAction(true);
  };

  return (
    <Card sx={{ width: 250, minHeight: '200px', height: 'max-content' }}>
      <CardContent>
        {mode === 'view' && (
          <>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {format(new Date(post.createdAt), 'dd, MMMM, H:mm')}
            </Typography>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {post.authorName}
            </Typography>
            <Typography variant="body2">
              {post.content}
            </Typography>
          </>
        )}
        {mode === 'edit' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Typography
              variant="h5"
              sx={{ mb: '12px' }}
            >
              Edit post
            </Typography>
            <TextField
              size="small"
              label="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <TextareaAutosize
              placeholder="Content"
              minRows={5}
              value={content}
              onChange={e => setContent(e.target.value)}
              style={{
                resize: 'none',
                padding: '10px 14px',
              }}
            />
          </Box>
        )}
      </CardContent>
      {isActionBarVisible && (
        <CardActions sx={{ px: '16px' }}>
          {mode === 'view' && (
            <>
              <Button
                size="small"
                color="error"
                onClick={onDelete}
              >
                Delete
              </Button>
              {user.userName === post.authorName && (
                <Button
                  size="small"
                  onClick={() => setMode('edit')}
                >
                  Edit
                </Button>
              )}
            </>
          )}
          {mode === 'edit' && (
            <>
              <Button
                size="small"
                color="error"
                onClick={cancelEditing}
              >
                Cancel
              </Button>
              <Button
                size="small"
                disabled={
                  title === post.title && content === post.content
                }
                onClick={onEdit}
              >
                Save
              </Button>
            </>
          )}
        </CardActions>
      )}
    </Card>
  )
};