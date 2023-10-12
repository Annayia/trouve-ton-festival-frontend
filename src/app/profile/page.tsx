'use client';
import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Image, { ImageLoader } from 'next/image';
import { useUserContext } from '@/utils/contexts/UserContext';
import { Container, Stack } from '@mui/material';

export default function Profile() {
  const { userDataLoggedIn } = useUserContext();
  const [error, setError] = useState(null);

  const imageLoader: ImageLoader = ({ src }) => {
    return `http://localhost:3003/${src}`;
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 300,
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        <CardMedia title="utilisateur">
          <Image
            loader={imageLoader}
            src={userDataLoggedIn?.avatarUrl ?? 'images/default_user.png'}
            alt="user profile Image"
            width={200}
            height={200}
          />
        </CardMedia>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h5" component="div">
            Utilisateur
          </Typography>
          <div>
            <Typography variant="body2" color="text.secondary">
              Nom : {userDataLoggedIn?.firstname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Prénom : {userDataLoggedIn?.lastname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {userDataLoggedIn?.email}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2}>
            <Link href={'/profile/update'} style={{ textDecoration: 'none' }}>
              Modifier
            </Link>
            <Link href={'/'} style={{ textDecoration: 'none' }}>
              Retour
            </Link>
          </Stack>
        </CardActions>
      </Card>
    </Container>
  );
}
