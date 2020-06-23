# TypeScript Next.js + styled-components example

## 実行
```
$ yarn
$ yarn dev
```

## コンポーネントについて
- helpersとstandalonesから作ります
- helpers
  - 共通コンポーネントとして利用
  - atomsはもちろんmoleculesやorganismsであっても使い回せるものはhelpersとして定義する
- standalones
  - 固有のコンポーネントとして利用
  - 特定のページや機能でしか利用しないものはここに置く
  - サンプルではページ単位にコンポーネントを置いています
  - 複数のコンポーネントから構成される場合はディレクトリを切る
