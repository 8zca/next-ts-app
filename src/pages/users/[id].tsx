import React from 'react'
import { GetServerSideProps } from 'next'
import { User } from '@/interfaces'
import Layout from '@/components/Layout'
import ListDetail from '@/components/ListDetail'

type Props = {
  data?: User
  errors?: string
}

export default class StaticPropsDetail extends React.Component<Props> {
  render() {
    const { data, errors } = this.props

    if (errors) {
      return (
        <Layout title='Error | Next.js + TypeScript Example'>
          <p>
            <span style={{ color: 'red' }}>Error:</span> {errors}
          </p>
        </Layout>
      )
    }

    return (
      <Layout title={`${data ? data.name : 'User Detail'} | Next.js + TypeScript Example`}>
        {data && <ListDetail item={data} />}
      </Layout>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.query.id
  const res = await fetch(`http://localhost:3000/api/users/${id}`)
  const data = await res.json()

  return { props: { data } }
}
