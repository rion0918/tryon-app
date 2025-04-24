## 🧱 技術スタック一覧（2025年4月時点）

### 🚀 フロントエンド

- **Framework**: [Next.js](https://nextjs.org/) (v15.3.1)
- **UIライブラリ**: [shadcn/ui](https://ui.shadcn.com/) ✅導入済
  - 利用コンポーネント: `Button`（初期化済）
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **テーマ管理**: `next-themes`（ダークモード対応）
- **GraphQLクライアント**: [`@apollo/client`](https://www.apollographql.com/docs/react/), [`graphql`](https://graphql.org/)
- **共有機能**: Web Share API（例：LINE共有対応）

---

### 🧩 バックエンド

- **Framework**: [NestJS](https://nestjs.com/)
- **API設計**: GraphQL（コードファースト方式）
- **認証**: JWT（発行・検証）
- **パスワードハッシュ化**: `bcrypt`
- **設計パターン**: レイヤードアーキテクチャ（Controller → Service → Repository）

---

### 🔌 通信方式

- **GraphQL**
  - クエリ／ミューテーションを通じてデータ取得・操作
  - DTO／Resolver ベースでスキーマを構築（NestJS側）

---

### 🛢 データベース

- **DBエンジン**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
  - 型安全なデータ操作
  - `schema.prisma` によるスキーマ定義
  - `Prisma Studio` によるGUI管理対応

---

### 🧠 外部API

- **仮装試着API**: [FASHN AI](https://fashn.ai/)
  - 入力: `personUrl`, `garmentUrl`
  - 出力: 合成画像URL（最大3パターン）

---

### ☁️ デプロイ・ホスティング

| サービス | 役割 |
|----------|------|
| **Vercel** | フロントエンド（Next.js） |
| **Render** | バックエンド（NestJS）+ データベース（PostgreSQL） |

---

### 🔐 セキュリティ・運用

- 通信: HTTPS
- 認証: JWT（有効期限 1時間）
- ハッシュ: Bcrypt
- DBバックアップ: 1日1回／7日間保持
- ログ保持: 30日間

---

### 🛠 開発補助ツール

- [Prisma Studio](https://www.prisma.io/studio)
- [Postman](https://www.postman.com/)
- [Apollo DevTools](https://www.apollographql.com/docs/devtools/)
- Git / GitHub