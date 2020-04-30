export type UserType = {
  id: number
  name: string
}

export type State = {
  count: number
  list: UserType[]
  error: boolean
  loading: boolean
}
