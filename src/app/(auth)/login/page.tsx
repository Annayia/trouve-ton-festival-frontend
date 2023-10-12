'use client';
import React from 'react';
import AuthForm from '../../../components/auth/AuthForm';
import TextLinkComponent from '@/components/text/text-link';
import { TextLinkHrefEnum } from '@/utils/enums/text-link-href';
import { Typography } from '@mui/material';

export default function login() {
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Connexion
      </Typography>
      <AuthForm formContext={TextLinkHrefEnum.login} />
      <TextLinkComponent
        href={TextLinkHrefEnum.register}
        text="Pas encore de compte ? Inscrivez-vous !"
      />
      <TextLinkComponent
        href={TextLinkHrefEnum.forgotPwd}
        text="Vous avez oubliez votre mot de passe ? par ici !"
      />
    </>
  );
}
