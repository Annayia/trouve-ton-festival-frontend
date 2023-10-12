'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Image, { ImageLoader } from 'next/image';
import { useUserContext } from '@/utils/contexts/UserContext';


export default function Profile() {
	const { userDataLoggedIn } = useUserContext();
  const [error, setError] = useState(null);

  const imageLoader: ImageLoader = ({ src }) => {
    return `http://localhost:3003/${src}`
  }

  return(
      <Card sx={{ maxWidth: 645, marginTop: 15, marginLeft: 50, borderRadius: 2 }}>
        <CardMedia
        sx={{ height: 200 }}
        title="utilisateur"
        >
          <Image
            loader={imageLoader}
            src={userDataLoggedIn?.avatarUrl??"images/default_user.png"}
            style={{marginLeft: 220}}
            alt='user profile Image'
            width={200}
            height={200}
          />
        </CardMedia>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h5" component="div">
              Utilisateur
          </Typography>
          <div >
            <Typography variant="body2" color="text.secondary">
                Nom :  {userDataLoggedIn?.firstname}
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
            <Link href={'/profile/update'} style={{textDecoration: 'none', margin: 'auto' }}>
              Modifier
            </Link>
            <Link href={'/'} style={{textDecoration: 'none',margin: 'auto'}}>
              Retour
            </Link>
          </CardActions>
        </Card>
  )
}
