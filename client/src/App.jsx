import { useEffect } from 'react';
import { Layout } from './layouts/Layout';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/userInfo/slice';
import { CreatePost } from './pages/CreatePost';
import { UsersList } from './pages/UsersList';
import './styles.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      dispatch(setUser(JSON.parse(userInfo)));
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/sign-in" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/users" element={<UsersList />} />
      </Route>
    </Routes>
  )
}

export default App;
