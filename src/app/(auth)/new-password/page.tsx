'use client';
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import TextLinkComponent from '@/components/text/text-link';
import { TextLinkHrefEnum } from '@/utils/enums/text-link-href';
import { Typography } from '@mui/material';

export default function newPassword() {
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Définir un nouveau mot de passe
      </Typography>
      <AuthForm
				formContext={TextLinkHrefEnum.resetPwd}
      />
    </>
  );
}
