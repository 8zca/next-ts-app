import React from 'react'
import { Layout } from '@/components/helpers'
import { Users } from '@/components/standalones'

const UsersPage: React.FC = () => (
  <Layout title='Users List | Next.js + TypeScript Example'>
    <Users />
  </Layout>
)

export default UsersPage
