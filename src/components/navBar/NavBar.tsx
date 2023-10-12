'use client';
import React from 'react';
import { useUserContext } from '@/utils/contexts/UserContext';
import { AppBar, Button, Container, IconButton, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TextLinkHrefEnum } from '@/utils/enums/text-link-href';
import { useRouter } from 'next/navigation';
const NavBar = () => {
  const { userDataLoggedIn, setUserDataLoggedIn } = useUserContext();
  const router = useRouter();

  return userDataLoggedIn ? (
    <>
      <AppBar>
        <Stack justifyContent={'space-between'} direction={'row'}>
          <IconButton onClick={() => router.push(TextLinkHrefEnum.home)}>
            <HomeIcon />
          </IconButton>
          <Button
            color="inherit"
            onClick={() => {
              router.push(TextLinkHrefEnum.profileList);
            }}
          >
            Liste des profils
          </Button>
          <Stack direction={'row'}>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem('access_token');
                setUserDataLoggedIn(undefined);
                router.push(TextLinkHrefEnum.home);
              }}
            >
              Logout
            </Button>
            <IconButton
              color="inherit"
              onClick={() => {
                router.push(TextLinkHrefEnum.profile);
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Stack>
        </Stack>
      </AppBar>
    </>
  ) : (
    <></>
  );
};

export default NavBar;
