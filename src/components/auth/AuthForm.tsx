"use client";
import React, { useEffect, useState } from "react";
import {
	TextField,
	Button,
	Container,
	Typography,
	InputAdornment,
	CircularProgress,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import {
	AccessTokenDto,
	ApiService,
	LoginDto,
	RegisterDto,
	ResetPwdDto,
	StringEmailDto,
	UserGetDto,
} from "../../services/api.service";
import { TextLinkHrefEnum } from "@/utils/enums/text-link-href";
import LoadingComponent from "../loading";

interface AuthformPros {
	formContext: TextLinkHrefEnum;
}

export default function AuthForm(props: AuthformPros) {
	const apiService: ApiService = new ApiService("http://localhost:3003");
	const router = useRouter();
	const searchParams = useSearchParams();

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [submitBtnText, setSubmitBtnText] = React.useState<string>("");
	const [resetPwdToken, setResetPwdToken] = React.useState<string | null>(searchParams.get("resetToken"));
	const [email, setEmail] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");

	useEffect(() => {
		switch (props.formContext) {
			case TextLinkHrefEnum.login:
				setSubmitBtnText("Connexion");
				setIsLoading(false);
				break;
			case TextLinkHrefEnum.register:
				setSubmitBtnText("Inscription");
				setIsLoading(false);
				break;
			case TextLinkHrefEnum.forgotPwd:
				setSubmitBtnText("Envoyer");
				setIsLoading(false);
				break;
			case TextLinkHrefEnum.resetPwd:
				setSubmitBtnText("Enregistrer");
				if (resetPwdToken)
					setIsLoading(false);
				else
				alert("Reset token is not present");
				break;
			default:
				setSubmitBtnText("Go");
				setIsLoading(false);
				break;
		}
	}, []);

	const submitLogin = async () => {
		try {
			const result: AccessTokenDto = await apiService.authSignIn({
				email,
				password,
			} as LoginDto);
			if (result.accessToken) {
				alert("Connexion réussie" + email);
				localStorage.setItem("access_token", result.accessToken);
				router.push("/profile");
			}
		} catch (error: any) {
			alert("Erreur lors de la connexion : " + error.message);
		}
	};

	const submitSignUp = async () => {
		try {
			const result: UserGetDto = await apiService.authSignUp({
				email,
				password,
			} as RegisterDto);
			console.log(result);
			alert("Inscription réussie " + email);
			router.push("/login");
		} catch (error: any) {
			alert("Erreur lors de l'inscription : " + error.message);
		}
	};

	const submitForgotPassword = async () => {
		try {
			await apiService.authForgotPwd({email: email} as StringEmailDto);
			alert("Vous allez recevoir un email contenant le lien pour modifier votre mot de passe");
			router.push("/login");
		} catch (error: any) {
			alert("Erreur lors de la demande de changement de mot de passe : " + error.message);
		}
	};

	const submitResetPassword = async () => {
		try {
			await apiService.authResetPwd({password: password, token: resetPwdToken} as ResetPwdDto);
			alert("Votre mot de passe a bien été modifié");
			router.push("/login");
		} catch (error: any) {
			alert("Erreur lors de la modification de votre mot de passe : " + error.message);
		}
	};

	const handleSubmitForm = async () => {
		switch (props.formContext) {
			case TextLinkHrefEnum.login:
				await submitLogin();
				break;
			case TextLinkHrefEnum.register:
				await submitSignUp();
				break;
			case TextLinkHrefEnum.forgotPwd:
				await submitForgotPassword();
				break;
			case TextLinkHrefEnum.resetPwd:
				await submitResetPassword();
				break;
			default:
				break;
		}
	}

	return (
		!isLoading ?
			<Container maxWidth="xs">
				{props.formContext !== TextLinkHrefEnum.resetPwd ?
					<TextField
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AccountCircle />
								</InputAdornment>
							),
						}}
						fullWidth
						required
						margin="normal"
					/>
					: null
				}
				{props.formContext !== TextLinkHrefEnum.forgotPwd ?
					<TextField
						label="Mot de passe"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Lock />
								</InputAdornment>
							),
						}}
						fullWidth
						required
						margin="normal"
					/>
					: null
				}
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					size="large"
					onClick={handleSubmitForm}>
					{submitBtnText}
				</Button>
			</Container>
			: <LoadingComponent />
	);
}
