import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Layout from '@/components/Layout'
import List from '@/components/List'
import { RootState } from '@/state/store'
import { fetchUsers } from '@/state/modules/users'

const Users: React.FC = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: RootState) => state.users)
  const fetch = () => dispatch(fetchUsers())

  useEffect(() => {
    fetch()
  }, [])

  let content = null
  if (users.loading) {
    content = <div>loading...</div>
  } else if (users.error) {
    content = <div>fetch error</div>
  } else {
    content = <List items={users.list} />
  }

  return (
    <Layout title='Users List | Next.js + TypeScript Example'>
      <h1>Users List</h1>
      {content}
      <p>
        <Link href='/'>
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  )
}

export default Users
