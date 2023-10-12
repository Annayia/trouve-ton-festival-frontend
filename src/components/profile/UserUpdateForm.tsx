'use client'

import React, { useState } from "react";
import {ApiService, UserGetDto, UserUpdateDto} from '../../services/api.service';
import Router, { useRouter } from "next/navigation";

import {
	TextField,
	Button,
	Container,
} from "@mui/material";
import ToolBoxService from "@/services/toolbox.service";
import { useUserContext } from "@/utils/contexts/UserContext";

export default function UserUpdateForm() {
    const apiService: ApiService = new ApiService();
	const router = useRouter();
    const [lastname, setLastname] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
	const { userDataLoggedIn, setUserDataLoggedIn } = useUserContext();

    async function handleSubmitForm() {
        //send Data over server
        const updatedUser: UserUpdateDto = new UserUpdateDto({
            id: userDataLoggedIn!.id,
            email: userDataLoggedIn!.email,
            lastname:  !ToolBoxService.stringIsNullOrWhiteSpace(lastname)? lastname : userDataLoggedIn?.lastname,
            firstname: !ToolBoxService.stringIsNullOrWhiteSpace(firstname)? firstname : userDataLoggedIn?.firstname,
        })
        const updatedUserData :UserGetDto= await apiService.userUpdate(updatedUser);
				router.refresh();
    }

    return (
			<Container maxWidth="xs">
					<TextField
						label="Nom"
						type="text"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						fullWidth
						required
						margin="normal"
					/>
					<TextField
						label="Prénom :"
						type="text"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
						fullWidth
						required
						margin="normal"
					/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					size="large"
					onClick={handleSubmitForm}>
                    Validez
				</Button>
			</Container>
	);
};
