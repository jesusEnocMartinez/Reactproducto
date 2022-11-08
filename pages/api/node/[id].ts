import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const productId = req.query.id

	if(req.method === 'DELETE') {
		const Product = await prisma.product.delete({
			where: {id: Number(productId)}
		})
		res.json(Product)
	} else {
		console.log("Product could not be created");
	}
}