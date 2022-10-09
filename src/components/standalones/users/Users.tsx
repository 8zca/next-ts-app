import React from 'react'
import Link from 'next/link'

import List from './List'
import { useQuery } from '@tanstack/react-query'
import { UserType } from '@/state/modules/users'
import request from '@/utils/request'

const Users: React.FC = () => {
  const users = useQuery(['todos'], () => request<UserType[]>('/api/users'), { refetchInterval: 5 * 1000 * 60 })

  let content = null
  if (users.data) {
    content = <List items={users.data} />
  } else if (users.isError) {
    content = <div>loading...</div>
  } else {
    content = <div>fetch error</div>
  }

  return (
    <>
      <h1>Users List</h1>
      {content}
      <p>
        <Link href='/'>
          <a>Go home</a>
        </Link>
      </p>
    </>
  )
}

export default Users
