import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { create, doing, done, TodoType } from '@/state/modules/todo'
import { RootState } from '@/state/store'
import Layout from '@/components/Layout'

const TodoPage: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const dispatch = useDispatch()
  const todo = useSelector((state: RootState) => state.todo)

  const createAction = (name: string) => dispatch(create(name))
  const doingAction = (todo: TodoType) => dispatch(doing(todo))
  const doneAction = (todo: TodoType) => dispatch(done(todo))
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)
  const handleClick = () => {
    createAction(input)
    setInput('')
  }

  const list = todo.todos.map(row => (
    <Item key={row.id}>
      {row.id} | {row.name} | {row.status} |<button onClick={() => doingAction(row)}>着手</button> |
      <button onClick={() => doneAction(row)}>完了</button>
    </Item>
  ))

  return (
    <Layout title='Todo | Next.js + TypeScript Example'>
      <H1>Todo 📝</H1>
      <List>{list}</List>
      <p>
        <input type='text' onChange={handleChange} placeholder='タスク名' value={input} />
        <button onClick={handleClick}>追加</button>
      </p>
    </Layout>
  )
}

export default TodoPage

const H1 = styled.h1`
  font-size: 18px;
  color: #666;
`
const List = styled.ul``
const Item = styled.div`
  padding: 16px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 16px;
`
