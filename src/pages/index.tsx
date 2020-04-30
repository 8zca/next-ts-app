import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { increment, decrement } from '@/state/modules/counter'
import { RootState } from '@/state/store'
import Layout from '@/components/Layout'

const IndexPage: React.FC = () => {
  const dispatch = useDispatch()
  const counter = useSelector((state: RootState) => state.counter)

  const plus = () => dispatch(increment())
  const minus = () => dispatch(decrement())

  return (
    <Layout title='Home | Next.js + TypeScript Example'>
      <H1>Hello Next.js 👋</H1>
      <Box>
        <p>count Test</p>
        <p>current: {counter}</p>
        <p>
          <button onClick={plus}>PLUS</button> <button onClick={minus}>MINUS</button>
        </p>
      </Box>
    </Layout>
  )
}

export default IndexPage

const H1 = styled.h1`
  font-size: 18px;
  color: #666;
`
const Box = styled.div`
  padding: 32px;
  border: 1px solid #ccc;
  margin-bottom: 32px;
`
