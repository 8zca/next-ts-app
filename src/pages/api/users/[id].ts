import { NextApiRequest, NextApiResponse } from 'next'
import { sampleUserData } from '@/utils/sample-data'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string
  try {
    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data')
    }

    const user = sampleUserData.find((row) => row.id === Number(id))
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ statusCode: 404, message: 'Cannot find user' })
    }

    res.status(200).json(sampleUserData)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
