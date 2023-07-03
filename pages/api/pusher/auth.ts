import { NextApiRequest, NextApiResponse } from "next"
import {pusherServer} from "@messenger-clone/app/libs/pusher";
import getCurrentUser from "@messenger-clone/app/actions/getCurrentUser";


export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const currentUser = await getCurrentUser()

	if (!currentUser?.id) {
		return response.status(401);
	}

	const socketId = request.body.socket_id;
	const channel = request.body.channel_name;
	const data = {
		user_id: currentUser.id,
	};

	const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
	return response.send(authResponse);
};