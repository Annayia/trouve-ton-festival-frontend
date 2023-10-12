'use client';
import { useEffect } from 'react';
import { ApiService } from '../services/api.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { Button, Container, Typography } from '@mui/material';
import { useUserContext } from '@/utils/contexts/UserContext';
import NavBar from '@/components/navBar/NavBar';
import { useRouter } from 'next/navigation';

export default function Home() {
  const apiService: ApiService = new ApiService();
  const { userDataLoggedIn, setUserDataLoggedIn } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    fetchuserDataLoggedInToSetIntoContext();
  }, []);

  const fetchuserDataLoggedInToSetIntoContext = async () => {
    type customJwtPayload = JwtPayload & {
      userId: number;
    };
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwt_decode<customJwtPayload>(token);
      const userData = await apiService.userById(decodedToken.userId);
      setUserDataLoggedIn(userData);
    }
  };
  // Test of the logout and of the right display of the context OK, need to use it in an app Bar then//
  return userDataLoggedIn ? (
    <>
      <NavBar />
      <Container>
        <Typography>
          {' '}
          Bonjour {userDataLoggedIn.firstname ?? userDataLoggedIn.email}
        </Typography>
      </Container>
    </>
  ) : (
    <>
      <NavBar />
      <Container>
        <h1>Veuillez vous connecter</h1>
        <Button color="inherit" onClick={() => router.push('/login')}>
          Login
        </Button>
      </Container>
    </>
  );
}
