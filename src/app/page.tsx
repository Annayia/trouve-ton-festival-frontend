"use client";
import { useGlobalContext } from "../utils/contexts/AppContext";
import { useEffect } from "react";
import { ApiService } from "../services/api.service";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useRouter } from "next/navigation";


export default function Home() {
	const router = useRouter();
	const apiService: ApiService = new ApiService();
	const { data, setData } = useGlobalContext();

	
	useEffect(() => {
		fetchDataToSetIntoContext();
	}, []);

	const fetchDataToSetIntoContext = async () => {
		type customJwtPayload = JwtPayload & {
			userId: number;
		};
		const token = localStorage.getItem("access_token");
		if (token) {
			const decodedToken = jwt_decode<customJwtPayload>(token);
			const userData = await apiService.userById(decodedToken.userId);
			setData([userData]);
		}
	};
	if (data.length === 0) {
	router.push("/login");
		
	}
	else {
		router.push("/profile");
	}
}
