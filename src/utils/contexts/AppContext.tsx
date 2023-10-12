"use client";
import { UserGetDto } from "@/services/api.service";
import {
	createContext,
	useContext,
	Dispatch,
	SetStateAction,
	useState,
} from "react";

interface ContextProps {
	userId: number;
	setUserId: Dispatch<SetStateAction<number>>;
	data: UserGetDto[];
	setData: Dispatch<SetStateAction<UserGetDto[]>>;
}

const GlobalContext = createContext<ContextProps>({
	userId: 0,
	setUserId: (): number => 0,
	data: [],
	setData: (): UserGetDto[] => [],
});

import { ReactNode } from "react";

export const GlobalContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [userId, setUserId] = useState(0);
	const [data, setData] = useState<UserGetDto[]>([]);

	return (
		<GlobalContext.Provider
			value={{
				userId,
				setUserId,
				data,
				setData,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
