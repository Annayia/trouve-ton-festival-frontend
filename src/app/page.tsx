import Image from "next/image";
import styles from "./page.module.css";
import { AccessTokenDto, ApiService, LoginDto, UserGetDto } from "./services/api.service";
import { useEffect, useState } from "react";

export default async function Home() {
	// const apiService: ApiService = new ApiService("http://localhost:3003");

	// const [isSigned, UpdateIsSigned] = useState<boolean>(false);

	// useEffect(() => {
	// 	signIn();
	// }, []);

	// useEffect(() => {
	// 	if (isSigned)
	// 		getUserAll();
	// }, [isSigned]);

	// const signIn = async () => {
	// 	let result: AccessTokenDto = await apiService.authSignIn({ email: 'foo@bar.com', password: 'foobar1234'} as LoginDto);
	// 	localStorage.setItem('access_token', result.accessToken);
	// 	UpdateIsSigned(true);
	// }

	// const getUserAll = async () => {
	// 	let resultUser: UserGetDto[] = await apiService.userAll();
	// 	console.debug(resultUser);
	// }

	return (
		<main
			className={
				styles.main
			}></main>
	);
}
