"use client";
import * as React from "react";
import {
	useState,
	useEffect,
} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image, {
	ImageLoader,
} from "next/image";
import { useGlobalContext } from "@/utils/contexts/AppContext";

export default function MediaCard() {
	const { data } = useGlobalContext();
	const imageLoader: ImageLoader = ({
		src,
	}) => {
		return `http://localhost:3003/${src}`;
	};

	return  (
		<Card
			sx={{
				maxWidth: 645,
				marginTop: 15,
				marginLeft: 50,
				borderRadius: 2,
			}}>
			<CardMedia
				sx={{ height: 440 }}
				image={
					data[0]?.avatarUrl
				}
				title="utilisateur">
				<Image
					loader={imageLoader}
					src={
						"images/default_user.png"
					}
					alt="test"
					width={100}
					height={100}
				/>
			</CardMedia>
			<CardContent
				sx={{
					textAlign: "center",
				}}>
				<Typography
					gutterBottom
					variant="h5"
					component="div">
					Utilisateur
				</Typography>
				<div>
					<Typography
						variant="body2"
						color="text.secondary">
						Nom :{" "}
						{
							data[0]?.firstname
						}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary">
						Prénom :{" "}
						{
							data[0]?.lastname
						}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary">
						Email:{" "}
						{
							data[0]?.email
						}
					</Typography>
				</div>
			</CardContent>
			<CardActions>
				<Link
					href={
						"./profile/update"
					}
					style={{
						textDecoration:
							"none",
						margin: "auto",
					}}>
					Modifier
				</Link>
				<Link
					href={
						"./../profilesList"
					}
					style={{
						textDecoration:
							"none",
						margin: "auto",
					}}>
					Retour
				</Link>
			</CardActions>
		</Card>
	);
}
