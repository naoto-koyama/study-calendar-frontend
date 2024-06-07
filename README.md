# 利用用途

本リポジトリをforkしていつも行う初期設定を省略できます

# 環境

- Next.js
  - App Router
- GraphQL
  - Apollo Client
  - Codegen
- TypeScript
- ESLint
- Prettier
- husky(lint-staged)

# 使い方
## forkする場合

- このリポジトリをfork
- forkしたリポジトリをローカルにクローン
```bash
git clone
```
- リモートリポジトリを設定
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

- 共通設定へ進む

## forkしない場合

forkした形跡を残したくない場合は以下の手順で進める

1. このリポジトリをクローン
```bash
git clone https://github.com/naoto-koyama/graphql-nextjs-template.git
```

- リモートリポジトリを削除
```bash
git remote remove origin
```

- 新しいリポジトリを作成
```bash
git remote add origin <新しいリポジトリのURL>
```

- リモートリポジトリへpush
```bash
git push -u origin main
```

- 共通設定へ進む

## 共有設定

- package.jsonのnameを変更
```json
  "name": "<新しいリポジトリの名前>"
```

## 必要に応じて設定の変更
- Next.jsのバージョン
- ESLintの設定
- Prettierの設定
- yarnおよびnodeのバージョン
    - package.json
- キャッシュの設定
  - フロント側のGraphQLはキャッシュしないように設定
    - lib/apolloWrapper.ts
  - revalidateは5秒に設定
    - app/layout.tsx

# 立ち上げ方法
## 共通

- yarn install
```bash
yarn install
```

- 環境の立ち上げ
```bash
yarn dev
```

# ディレクトリ構成
```bash
.
├── src
│   ├── app
│   │   ├── page.tsx
│   │   ├── posts
│   │   │   ├── [id]
│   │   │   │   ├── edit
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── ...
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components
│   │   ├── features
│   │   │   ├── HogeCard
│   │   │   │   └── index.client.tsx
│   │   │   └ ...
│   │   ├── parts
│   │   │   ├── Button
│   │   │   │   └── index.client.tsx
│   │   │   ├── Footer
│   │   │   │   └── index.server.tsx
│   │   │   ├── Header
│   │   │   │   └── index.server.tsx
│   │   │   └ ...
│   ├── config
│   │   ├── const.ts
│   │   └── ...
│   ├── generates
│   │   ├── fragment-masking.ts
│   │   ├── gql.ts
│   │   ├── graphql.ts
│   │   └── index.ts
│   ├── graphql
│   │   ├── mutations
│   │   │   ├── createPost.graphql
│   │   │   ├── updatePost.graphql
│   │   │   └── ...
│   │   └── queries
│   │       ├── getPost.graphql
│   │       ├── getPosts.graphql
│   │       └── ...
│   ├── lib
│   │   ├── ApolloClient.ts
│   │   ├── ApolloWrapper.client.tsx
│   │   └── ...
│   ├── utils
│   │   ├── array.ts
│   │   ├── error.ts
│   │   └── ...
│   ├── hooks
│   │   ├── useAuth.ts
│   │   └── ...
│   ├── Templates
│   │   ├── PostEditTemplate
│   │   │   └── index.client.tsx
│   │   ├── PostIndexTemplate
│   │   │   ├── PostList
│   │   │   │   └── index.server.tsx
│   │   │   └── index.server.tsx
│   │   ├── PostShowTemplate
│   │   │   └── index.client.tsx
│   │   ├── ...
├── .env.local
├── .eslintrc.js
├── .gitignore
├── codegen
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── ...
```

## ディレクトリ概要
### app
アプリケーションのエントリーポイントおよびルーティングロジックを含みます。<br />
基本的にはpage.tsxのみを配置し、Templateを読み出すのみです。

- [Private Folders](https://nextjs.org/docs/app/building-your-application/routing/colocation#private-folders)
  - 基本的には使わず、Templateを呼び出すようにする
  - 使わない理由は、ディレクトリが多くなりすぎて読みにくくなるため
- [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
  - 基本的には利用しないが、例えばPCとSPを分けることがあれば(pc)と(sp)のように分けることも考える

### components
再利用可能なUIコンポーネントが含まれています。これらのコンポーネントは、アプリケーション全体で使用される小さな部品です。

クライアントコンポーネント(以降CC): index.client.tsxとして命名されたファイル。
サーバーコンポーネント(以降SC): index.server.tsxとして命名されたファイル。

- parts
  - Figmaでコンポーネントとして定義されたものを基本的には配置していきます。
  - ファイル名はFigmaのコンポーネントと合わせるようにします。
- features
  - Figmaでコンポーネントとして定義されていませんが、実装上コンポーネントとして定義した方が開発効率が上がるものを配置していきます。
    - Modal, Toast, Loadingなど。

### config
アプリケーションの設定や定数が含まれています。環境設定やアプリケーションの基本設定がここで行われます。

### generates
GraphQLのスキーマから自動生成されたコードが含まれています。Apollo Clientと連携して使用されます。
GraphQLのスキーマを新規作成した場合には以下でコードを生成してください。

```bash
# Railsを起動した状態で
yarn codegen
```

### graphql
GraphQLのクエリとミューテーションが整理されています。データ取得と操作のロジックがここに集約されています。

mutations/: データの変更（作成、更新、削除）を行うGraphQLのミューテーション。
queries/: データの取得を行うGraphQLのクエリ。

### lib
アプリケーションで使用するライブラリやヘルパー関数が含まれています。<br>
プロジェクト内で使用される主要なモジュールやサービスを格納するためのディレクトリです。<br>
アプリケーション全体で利用される、比較的大規模で重要な機能が含まれます。

- utilとの違い
  - 主要なライブラリやサービス: 外部サービスとの連携や、アプリケーションのコアロジックに関わる部分。
    - amplify, apollo, axios, firebase, react-query, redux, router, styled-componentsなど。
  - 設定ファイル: 特定のライブラリやフレームワークの設定や初期化コード。
  - 大規模なユーティリティ: 単純なヘルパー関数ではなく、複数の機能を持つクラスやモジュール。
    - ロギング、認証、データベース接続、ファイル操作など。

### utils
プロジェクト内で再利用可能な小規模なヘルパー関数や、共通して使われる簡単なロジックを格納するためのディレクトリです。<br>
このディレクトリには、特定の機能やモジュールに依存しない汎用的な関数が含まれます。

- libとの違い
  - 小規模なヘルパー関数: どの部分でも使えるシンプルな機能を提供。
    - 文字列操作、配列操作、日付操作、数値操作など。
  - 汎用性の高い関数: 特定のモジュールに依存せず、広範囲にわたって利用される関数。
    - バリデーション、フォーマット、変換、計算など。

### hooks
カスタムReactフックが含まれています。これらのフックは、コンポーネント間でロジックを共有するために使用されます。<br>
認証状態の管理、データフェッチング、フォームのハンドリングなど。

### Templates

appsディレクトリよりはじめに呼び出されるファイルが置かれています。<br>
ここに実際の本処理を書きます。汎用コンポーネントからcomponentsディレクトリから呼び出しますが、<br>
Templates内でのみ利用するコンポーネントはここにディレクトリを作成して置きます。

## SC（Server Components）とCC（Client Components）の使い分け

Next.jsでは、コンポーネントをサーバー側でレンダリングするServer Components（SC）と、クライアント側でレンダリングするClient Components（CC）に分けることができます。<br>
この使い分けにより、パフォーマンスの最適化やユーザー体験の向上が可能です。

### Server Components（SC）
#### 概念
Server Components（SC）は、サーバーサイドでレンダリングされるコンポーネントです。これらのコンポーネントは、クライアントにHTMLとして送信され、初期ロードが高速であることが特徴です。また、SEO（検索エンジン最適化）に優れています。

#### 特徴
- サーバーサイドでレンダリングされるため、初期表示が高速。
- クライアントに送信されるJavaScriptの量が少ないため、パフォーマンスが向上。
- 状態管理（useState）や副作用（useEffect）を扱えない。
SEOに有利。
#### 使用例
- 静的なコンテンツ（例：ヘッダー、フッター、ナビゲーションバー）。
- 初期ロードが重要な部分。
- SEOが重要なページ。

### Client Components（CC）
#### 概念
Client Components（CC）は、クライアントサイド（ブラウザ）でレンダリングされるコンポーネントです。これらのコンポーネントは、ユーザーインタラクションが必要な部分や、状態管理や副作用を扱う場合に使用されます。

#### 特徴
- クライアントサイドでレンダリングされるため、ユーザーインタラクションが可能。
- 状態管理（useState）や副作用（useEffect）を扱える。
- ユーザー体験を向上させるためのインタラクティブな要素に適している。

### 使用例
- フォームや入力フィールド。 
- インタラクティブなUI要素（例：モーダル、ドロップダウン）。 
- クライアントサイドでデータをフェッチする部分。

### 使い分けのガイドライン
- 静的コンテンツやSEOが重要な部分にはSCを使用する 
  - サーバーサイドでレンダリングされるため、初期表示が高速でSEOに有利です。
- ユーザーインタラクションが必要な部分にはCCを使用する 
  - クライアントサイドでの状態管理や副作用の処理が必要な場合に適しています。
- パフォーマンスの最適化 
  - SCはクライアントに送信されるJavaScriptの量を減らすため、初期ロードのパフォーマンスが向上します。 
  - 必要に応じてCCを使用することで、リッチなユーザーインターフェースを実現します。
