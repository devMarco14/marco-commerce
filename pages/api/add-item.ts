import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: 'secret_t9MpgvBmX38dcjHvESAWc9JzKpRzUsSloyuh54zqJEf',
})

const databaseID = '91505deb762041cf93bffe09acfcf9a9'

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseID },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    })
    console.log(response)
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query

  if (name == null) {
    return res.status(400).json({ message: 'No name' })
  }
  try {
    await addItem(String(name))
    res.status(200).json({ message: `Success ${name} added` })
  } catch (error) {
    res.status(400).json({ message: `Failed ${name} added` })
  }
}
