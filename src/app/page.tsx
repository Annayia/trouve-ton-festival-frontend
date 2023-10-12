'use client';
import { useEffect } from 'react';
import { ApiService } from '../services/api.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { Button, Container } from '@mui/material';
import { useUserContext } from '@/utils/contexts/UserContext';

export default function Home() {
  const router = useRouter();
  const apiService: ApiService = new ApiService();
  const { userDataLoggedIn, setUserDataLoggedIn } = useUserContext();

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
    <Container>
      <h1>
        Bonjour {userDataLoggedIn.firstname ?? userDataLoggedIn.email}
      </h1>
      <Button onClick={() => router.push('/profilesList')}>
        Profiles List
      </Button>
      <Button onClick={() => router.push('/profile')}>Profile</Button>{' '}
      <Button
        onClick={() => {
          localStorage.removeItem('access_token');
          setUserDataLoggedIn(undefined);
          router.push('/');
        }}
      >
        Logout
      </Button>
    </Container>
  ) : (
    <Container>
      <h1>Veuillez vous connecter</h1>
      <Button onClick={() => router.push('/login')}>Login</Button>
    </Container>
  );
}
