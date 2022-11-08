import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const {slug,description,inventery,price} = req.body

	try {
		await prisma.product.create({
			data: {
				slug,
                description,
                inventery,
                price
			}
		})
		res.status(200).json({message: 'Product Created'})
	} catch (error) {
		console.log("Failure");
	}
}