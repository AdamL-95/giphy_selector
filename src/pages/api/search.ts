import getSearchData from "@/lib/getSearchData"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchQuery, offset } = req.query
  const data = await getSearchData(searchQuery ?? "", offset ?? "")
  res.status(data.meta.status).json(data)
}
