import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, CheckCircle, Sparkles, Zap, Users } from "lucide-react"
import { LOGIN_MUTATION } from "@/graphql/mutations/login" // LOGIN 用
import { SIGNUP_MUTATION } from '@/graphql/mutations/signup';// SIGNUP 用

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      {/* ナビゲーションヘッダー */}
      <header className="fixed w-full bg-[#faf9f6]/80 backdrop-blur-sm z-50 border-b border-[#e5e1d8]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl font-medium text-[#0f172a]">ELEGANCE</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="#how-it-works"
              className="text-[#0f172a] hover:text-[#d4af37] transition-colors duration-300 font-medium"
            >
              使い方
            </Link>
            <Link
              href="#features"
              className="text-[#0f172a] hover:text-[#d4af37] transition-colors duration-300 font-medium"
            >
              特徴
            </Link>
            <Link
              href="#gallery"
              className="text-[#0f172a] hover:text-[#d4af37] transition-colors duration-300 font-medium"
            >
              ギャラリー
            </Link>
          </nav>
          <div className="flex space-x-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="border-[#0f172a] text-[#0f172a] hover:bg-[#0f172a] hover:text-white transition-colors duration-300"
              >
                ログイン
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#0f172a] text-white hover:bg-[#0f172a]/90 transition-colors duration-300">
                新規登録
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* ヒーローセクション */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="高級ファッションの背景"
              fill
              priority
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/30 via-[#faf9f6]/60 to-[#faf9f6]"></div>
          </div>

          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0f172a] leading-tight mb-6 max-w-4xl mx-auto">
              あなたのスタイルを、<span className="text-[#d4af37]">バーチャルで</span>体験する新しい方法
            </h1>
            <p className="text-lg md:text-xl text-[#64748b] mb-10 max-w-2xl mx-auto">
              最先端のAI技術を活用した当社のバーチャル試着アプリで、購入前に完璧なフィット感を体験してください。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button className="bg-[#0f172a] text-white hover:bg-[#0f172a]/90 transition-colors duration-300 px-8 py-6 text-lg w-full sm:w-auto">
                  新規登録
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="border-[#0f172a] text-[#0f172a] hover:bg-[#0f172a] hover:text-white transition-colors duration-300 px-8 py-6 text-lg w-full sm:w-auto"
                >
                  ログイン
                </Button>
              </Link>
            </div>

            <div className="mt-16">
              <Link
                href="#how-it-works"
                className="inline-flex items-center text-[#0f172a] hover:text-[#d4af37] transition-colors duration-300"
              >
                <span className="mr-2">詳細を見る</span>
                <ChevronDown className="animate-bounce" />
              </Link>
            </div>
          </div>
        </section>

        {/* 使い方セクション */}
        <section id="how-it-works" className="py-24 bg-[#f5f5dc]/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-[#0f172a] mb-4">使い方</h2>
              <p className="text-[#64748b] max-w-2xl mx-auto">
                シンプルな3ステップで、あなたの理想のスタイルを見つけましょう
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-[#e5e1d8] transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="w-12 h-12 bg-[#f5f5dc] rounded-full flex items-center justify-center mb-6">
                  <span className="font-serif text-xl text-[#0f172a]">1</span>
                </div>
                <h3 className="font-serif text-xl text-[#0f172a] mb-4">アカウント作成</h3>
                <p className="text-[#64748b]">簡単な登録プロセスで、パーソナライズされた体験を始めましょう。</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-[#e5e1d8] transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="w-12 h-12 bg-[#f5f5dc] rounded-full flex items-center justify-center mb-6">
                  <span className="font-serif text-xl text-[#0f172a]">2</span>
                </div>
                <h3 className="font-serif text-xl text-[#0f172a] mb-4">写真をアップロード</h3>
                <p className="text-[#64748b]">
                  あなたの写真をアップロードして、パーソナライズされた試着体験を始めましょう。
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-[#e5e1d8] transition-transform duration-300 hover:translate-y-[-5px]">
                <div className="w-12 h-12 bg-[#f5f5dc] rounded-full flex items-center justify-center mb-6">
                  <span className="font-serif text-xl text-[#0f172a]">3</span>
                </div>
                <h3 className="font-serif text-xl text-[#0f172a] mb-4">バーチャル試着</h3>
                <p className="text-[#64748b]">
                  数千のアイテムをバーチャルで試着して、あなたに最適なスタイルを見つけましょう。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 特徴セクション */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-[#0f172a] mb-4">特徴</h2>
              <p className="text-[#64748b] max-w-2xl mx-auto">
                最先端のテクノロジーを活用した、他にはない機能をご体験ください
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <CheckCircle className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#0f172a] mb-2">高精度なフィッティング</h3>
                  <p className="text-[#64748b]">
                    AIを活用した高精度な測定技術により、あなたの体型に合わせた完璧なフィット感をバーチャルで体験できます。
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Sparkles className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#0f172a] mb-2">リアルタイムのスタイル提案</h3>
                  <p className="text-[#64748b]">
                    あなたの好みや体型に基づいて、パーソナライズされたスタイル提案をリアルタイムで受け取れます。
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Zap className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#0f172a] mb-2">瞬時に切り替え可能</h3>
                  <p className="text-[#64748b]">
                    数千のアイテムを瞬時に切り替えて試着できるため、効率的にショッピングを楽しめます。
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Users className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#0f172a] mb-2">友達と共有</h3>
                  <p className="text-[#64748b]">
                    あなたのバーチャル試着結果を友達と共有して、意見をもらうことができます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ギャラリーセクション */}
        <section id="gallery" className="py-24 bg-[#f5f5dc]/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-[#0f172a] mb-4">ギャラリー</h2>
              <p className="text-[#64748b] max-w-2xl mx-auto">実際のユーザーによるバーチャル試着の例をご覧ください</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-lg shadow-sm border border-[#e5e1d8] bg-white transition-transform duration-300 hover:translate-y-[-5px]"
                >
                  <div className="relative h-80">
                    <Image
                      src={`/placeholder.svg?height=400&width=300&text=Gallery+Image+${item}`}
                      alt={`バーチャル試着例 ${item}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg text-[#0f172a] mb-1">スタイル例 {item}</h3>
                    <p className="text-sm text-[#64748b]">ユーザーが作成したバーチャル試着コーディネート</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="py-24 bg-[#0f172a] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-6">あなたのスタイルを見つける旅を始めましょう</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              今すぐ登録して、バーチャル試着の新しい体験を始めましょう。
            </p>
            <Button className="bg-[#d4af37] text-[#0f172a] hover:bg-[#d4af37]/90 transition-colors duration-300 px-8 py-6 text-lg">
              無料で始める
            </Button>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-[#f5f5dc]/50 border-t border-[#e5e1d8] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-xl text-[#0f172a] mb-4">ELEGANCE</h3>
              <p className="text-[#64748b]">最先端のバーチャル試着技術で、ファッションの未来を創造します。</p>
            </div>

            <div>
              <h4 className="font-medium text-[#0f172a] mb-4">リンク</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-[#64748b] hover:text-[#d4af37] transition-colors duration-300">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="text-[#64748b] hover:text-[#d4af37] transition-colors duration-300"
                  >
                    使い方
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-[#64748b] hover:text-[#d4af37] transition-colors duration-300">
                    特徴
                  </Link>
                </li>
                <li>
                  <Link href="#gallery" className="text-[#64748b] hover:text-[#d4af37] transition-colors duration-300">
                    ギャラリー
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-[#0f172a] mb-4">法的情報</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-[#64748b] hover:text-[#d4af37] transition-colors duration-300">
                    利用規約
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#64748b] hover:text-[#d4af37] transition-colors duration-300">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#64748b] hover:text-[#d4af37] transition-colors duration-300">
                    クッキーポリシー
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-[#0f172a] mb-4">お問い合わせ</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-[#64748b] hover:text-[#d4af37] transition-colors duration-300">
                    サポート
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#64748b] hover:text-[#d4af37] transition-colors duration-300">
                    お問い合わせ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#64748b] hover:text-[#d4af37] transition-colors duration-300">
                    パートナーシップ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#e5e1d8] mt-12 pt-8 text-center text-[#64748b]">
            <p>&copy; {new Date().getFullYear()} ELEGANCE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
