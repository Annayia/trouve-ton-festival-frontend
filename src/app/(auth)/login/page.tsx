"use client";
import React from "react";
import AuthForm from "../../../components/auth/AuthForm";
import { Link, Typography } from '@mui/material';

export default function login() {
  return (
    <>
      <AuthForm />
      <Typography
        variant="body2"
        align="center"
        style={{
          marginTop: '16px',
          fontWeight: 'semi-bold',
        }}
      >
        <Link
          style={{
            color: '#3f51b5',
          }}
          underline="hover"
          href="/sign-up"
        >
          Pas encore de compte ? Inscrivez-vous !
        </Link>
      </Typography>
    </>
  );
}
