import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <H1>Hello Next.js 👋</H1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage

const H1 = styled.h1`
  font-size: 18px;
  color: #666;
`
