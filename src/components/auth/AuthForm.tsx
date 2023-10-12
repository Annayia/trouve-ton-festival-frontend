"use client";
import React from "react";
import {
	TextField,
	Button,
	Container,
	Typography,
	InputAdornment,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { usePathname, useRouter } from "next/navigation";
import {
	AccessTokenDto,
	ApiService,
	LoginDto,
	RegisterDto,
	UserGetDto,
} from "../../services/api.service";

export default function AuthForm() {
	const currentUrl = usePathname();
	const isLogin = currentUrl === "/login";
	const isSignUp = currentUrl === "/sign-up";
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const router = useRouter();
	const apiService: ApiService = new ApiService("http://localhost:3003");

	const handleSubmitLogin = async (email: string, password: string) => {
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
		} catch (error) {
			alert("Erreur lors de la connexion : " + error);
		}
	};

	const handleSubmitSignUp = async (email: string, password: string) => {
		try {
			const result: UserGetDto = await apiService.authSignUp({
				email,
				password,
			} as RegisterDto);
			console.log(result);
			alert("Inscription réussie " + email);
			router.push("/login");
		} catch (error) {
			alert("Erreur lors de l'inscription : " + error);
		}
	};
	return (
		<Container maxWidth="xs">
			<form
				onSubmit={(e) => {
					if (isLogin) {
						handleSubmitLogin(email, password);
					} else if (isSignUp) {
						handleSubmitSignUp(email, password);
					}
					e.preventDefault();
				}}>
				<Typography variant="h4" align="center" gutterBottom>
					{isLogin ? "Connexion" : isSignUp ? "Inscription" : null}
				</Typography>
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
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					size="large">
					{isLogin ? "Se connecter" : isSignUp ? "S'inscrire" : null}
				</Button>
			</form>
			<Typography
				variant="body2"
				align="center"
				style={{
					marginTop: "16px",
					fontWeight: "semi-bold",
				}}>
				{isLogin ? (
					<Link
						style={{
							color: "#3f51b5",
						}}
						underline="hover"
						href="/sign-up">
						Pas encore de compte ? Inscrivez-vous !
					</Link>
				) : isSignUp ? (
					<Link
						style={{
							color: "#3f51b5",
						}}
						underline="hover"
						href="/login">
						Déjà un compte ? Connectez-vous !
					</Link>
				) : null}
			</Typography>
		</Container>
	);
}
