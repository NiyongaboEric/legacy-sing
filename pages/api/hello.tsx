import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  lang: string
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ lang: 'Typesrcipt' })
}