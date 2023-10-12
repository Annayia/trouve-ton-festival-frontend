"use client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {ApiService, UserGetDto} from '../services/api.service';
import Link from 'next/link';

export default function MediaCard() {
  const [userData, setUserData] = useState<UserGetDto>()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiService: ApiService = new ApiService();


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async (id=11) => {
    try {
      const userData = await apiService.userById(id);
      setLoading(false);
      setUserData(userData);
    } catch (e) {
      setError(error);
      setLoading(true);
    }
  }

  return(
      loading ?
        <></>
        :
        <Card sx={{ maxWidth: 645, marginTop: 15, marginLeft: 50, borderRadius: 2 }}>
          <CardMedia
              sx={{ height: 440 }}
              image={userData?.avatarUrl}
              title="utilisateur"
            />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              Utilisateur
            </Typography>
            <div >

              <Typography variant="body2" color="text.secondary">
                  Nom :  {userData?.firstname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  Prénom : {userData?.lastname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  Email: {userData?.email}
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            <Link href={'./profile/update'} style={{textDecoration: 'none', margin: 'auto' }}>
              Modifier
            </Link>
            <Link href={'./../profilesList'} style={{textDecoration: 'none',margin: 'auto'}}>
              Retour
            </Link>
          </CardActions>
        </Card>
  )
}
