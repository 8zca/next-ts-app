import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
      <nav>
        <Link href='/'>
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href='/todo'>
          <a>Todo</a>
        </Link>
        |{' '}
        <Link href='/about'>
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href='/quill'>
          <a>Quill Editor</a>
        </Link>{' '}
        |{' '}
        <Link href='/draftjs'>
          <a>Draftjs Editor</a>
        </Link>{' '}
        |{' '}
        <Link href='/draftail'>
          <a>Draftail Editor</a>
        </Link>{' '}
        |{' '}
        <Link href='/medium'>
          <a>Medium editor</a>
        </Link>{' '}
        |{' '}
        <Link href='/slate'>
          <a>Slate editor</a>
        </Link>{' '}
        |{' '}
        <Link href='/tiptap'>
          <a>Tiptap editor</a>
        </Link>{' '}
        |{' '}
        <Link href='/users'>
          <a>Users List</a>
        </Link>{' '}
        |{' '}<Link href='/users/list'>
          <a>Users List2</a>
        </Link>{' '}
        | <a href='/api/users'>Users API</a>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I&apos;m here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout
