import { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

export const UsersList = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.userInfo);

  const [users, setUsers] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const onUserDelete = async (userId) => {
    await adminService.deleteUser({
      userId,
      adminId: user.id,
    });
    setShouldUpdate(true);
  };

  const onUserPromote = async (userId) => {
    await adminService.promoteUser({
      userId,
      adminId: user.id,
    });
    setShouldUpdate(true);
  }

  useEffect(() => {
    if (!user || !user.roles.includes('admin')) {
      navigate('/');
    }
  }, [user])

  useEffect(() => {
    if (user.id && !users.length) {
      adminService.getAllUsers(user.id)
        .then(res => {
          setUsers(res.data);
        });
    }
  }, [user.id]);

  useEffect(() => {
    if (shouldUpdate && user.id && users.length) {
      adminService.getAllUsers(user.id)
        .then(res => {
          setUsers(res.data);
        });
      setShouldUpdate(false);
    }
  }, [shouldUpdate]);

  return (
    <TableContainer sx={{ height: '100%' }}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{ maxWidth: '150px' }}>ID</TableCell>
            <TableCell align="right" sx={{ maxWidth: '60px' }}>Real Name</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Sex</TableCell>
            <TableCell align="right">Roles</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Actions</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ maxWidth: '150px' }}
              >
                {user.id}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ maxWidth: '40px' }}
              >
                {user.realName}
              </TableCell>
              <TableCell component="th" scope="row">
                {user.userName}
              </TableCell>
              <TableCell component="th" scope="row">
                {user.sex}
              </TableCell>
              <TableCell component="th" scope="row">
                {user.roles.join(', ')}
              </TableCell>
              <TableCell component="th" scope="row">
                {format(new Date(user.createdAt), 'dd-mm-yyyy, H:mm')}
              </TableCell>
              <TableCell component="th" scope="row">
                {!user.roles.includes('admin') && (
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => onUserDelete(user.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      onClick={() => onUserPromote(user.id)}
                    >
                      Promote
                    </Button>
                  </Box>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};