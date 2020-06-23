import React from 'react'
import { Layout } from '@/components/helpers'
import { Todo } from '@/components/standalones'

const TodoPage: React.FC = () => (
  <Layout title='Todo | Next.js + TypeScript Example'>
    <Todo />
  </Layout>
)

export default TodoPage
