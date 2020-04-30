export type TodoType = {
  id: number
  name: string
  status: 'todo' | 'doing' | 'done'
}

export type State = {
  count: number
  todos: TodoType[]
}
