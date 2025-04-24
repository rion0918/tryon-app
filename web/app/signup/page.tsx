"use client"

import type React from "react"

import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      accessToken
    }
  }
`

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.signup.accessToken)
      router.push("/tryon")
    },
  })

  const validateForm = () => {
    if (password !== confirmPassword) {
      setPasswordError("パスワードが一致しません")
      return false
    }

    if (password.length < 8) {
      setPasswordError("パスワードは8文字以上である必要があります")
      return false
    }

    setPasswordError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!agreeTerms) {
      return
    }

    await signup({ variables: { input: { email, password } } })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6] px-4">
      <div className="w-full max-w-md">
        {/* ロゴとブランド名 */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="font-serif text-3xl font-medium text-[#0f172a]">ELEGANCE</span>
          </Link>
        </div>

        {/* 新規登録カード */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e5e1d8] p-8 md:p-10">
          <h1 className="font-serif text-2xl md:text-3xl text-[#0f172a] mb-6 text-center">新規登録</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#64748b]">
                メールアドレス
              </label>
              <input
                id="email"
                className="w-full border border-[#e5e1d8] rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-200"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-[#64748b]">
                パスワード
              </label>
              <div className="relative">
                <input
                  id="password"
                  className="w-full border border-[#e5e1d8] rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-200"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748b] hover:text-[#0f172a] transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-[#64748b]">パスワードは8文字以上で設定してください</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-[#64748b]">
                パスワード（確認）
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  className="w-full border border-[#e5e1d8] rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-200"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {passwordError && <p className="text-xs text-[#b91c1c]">{passwordError}</p>}
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                className="h-4 w-4 text-[#d4af37] focus:ring-[#d4af37] border-[#e5e1d8] rounded"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-[#64748b]">
                <span>
                  <Link href="/terms" className="text-[#d4af37] hover:text-[#d4af37]/80 transition-colors duration-200">
                    利用規約
                  </Link>
                  と
                  <Link
                    href="/privacy"
                    className="text-[#d4af37] hover:text-[#d4af37]/80 transition-colors duration-200"
                  >
                    プライバシーポリシー
                  </Link>
                  に同意します
                </span>
              </label>
            </div>

            {error && (
              <div className="bg-[#fef2f2] border border-[#fee2e2] text-[#b91c1c] p-3 rounded-md text-sm">
                登録に失敗しました: {error.message}
              </div>
            )}

            <button
              className="w-full bg-[#0f172a] text-white p-3 rounded-md hover:bg-[#0f172a]/90 transition-colors duration-200 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading || !agreeTerms}
            >
              {loading ? "登録中..." : "アカウント作成"}
            </button>
          </form>
        </div>

        {/* ログインリンク */}
        <div className="text-center mt-6">
          <p className="text-[#64748b]">
            すでにアカウントをお持ちですか？{" "}
            <Link
              href="/login"
              className="font-medium text-[#d4af37] hover:text-[#d4af37]/80 transition-colors duration-200"
            >
              ログイン
            </Link>
          </p>
        </div>

        {/* フッター */}
        <div className="text-center mt-12">
          <p className="text-xs text-[#64748b]">&copy; {new Date().getFullYear()} ELEGANCE. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
