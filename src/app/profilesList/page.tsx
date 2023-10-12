'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ApiService, UserGetDto } from '../../services/api.service';
import Link from 'next/link';
import Image, { ImageLoader } from 'next/image'

export default function ProfilesList() {
  const [userArray, setUserArray] = useState<UserGetDto[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiService: ApiService = new ApiService();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setUserArray(await apiService.userAll());
      setLoading(false);
    } catch (e) {
      setError(error);
      setLoading(true);
    }
  }
  const imageLoader: ImageLoader = ({ src }) => {
    return `http://localhost:3003/${src}`;
  };

  return (
    loading ?
      <>Loading...</>
      : 
      userArray?.map((user: UserGetDto, index: number)=>{
        return(
          <Card key={index} sx={{ 
            marginTop: 2,
            marginLeft:2,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          justifyContent: 'center',}}
          >
          <CardMedia
            sx={{ height: 150 }}
            title="utilisateur"
          >
            <Image
              loader={imageLoader}
              src={user.avatarUrl??"images/default_user.png"}
              alt='user profile image'
              width={100}
              height={100}
            />
          </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Utilisateur
              </Typography>
              <Typography variant="body2" color="text.secondary">
                    Nom: {user.lastname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Prénom: {user.firstname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Prénom: {user.email}
            </Typography>
            </CardContent>
            <CardActions>
              <Link href={'./../profile'}style={{textDecoration: 'none',margin: 'auto'}}>Details</Link>
            </CardActions>
          </Card>
          )
      })
  )
}
