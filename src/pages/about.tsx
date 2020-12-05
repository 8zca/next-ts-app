import React from 'react'
import Link from 'next/link'
import Layout from '../components/helpers/Layout'

const AboutPage: React.FunctionComponent = () => (
  <Layout title='About | Next.js + TypeScript Example'>
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href='/'>
        <a>Go home</a>
      </Link>
    </p>
    <p>
      <Link href='http://localhost:3000/jp/city/7613120'>
        <a>7613120</a>
      </Link>
    </p>
  </Layout>
)

export default AboutPage
