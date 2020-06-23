import React from 'react'
import Link from 'next/link'
import { User } from '@/interfaces'

type Props = {
  data: User
}

const ListItem: React.FC<Props> = ({ data }) => (
  <Link href={`/users/${data.id}`}>
    <a>
      {data.id}: {data.name}
    </a>
  </Link>
)

export default ListItem
