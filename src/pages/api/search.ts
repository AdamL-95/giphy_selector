import getSearchData from "@/lib/getSearchData"
import { MultiResponse } from "giphy-api"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MultiResponse>
) {
  const { searchQuery, offset } = req.query
  const data = await getSearchData(searchQuery ?? "", offset ?? "")
  res.status(data.meta.status).json(data)
}
