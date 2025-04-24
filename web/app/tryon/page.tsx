"use client"

import type React from "react"

import { gql, useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, History, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

const TRY_ON_CLOTHES = gql`
  mutation TryOnClothes($input: TryOnInput!) {
    tryOnClothes(input: $input)
  }
`

const GET_TRYONS = gql`
  query GetTryOns {
    getTryOns {
      id
      imageUrl
      createdAt
    }
  }
`

export default function TryOnPage() {
  const [personUrl, setPersonUrl] = useState("")
  const [garmentUrl, setGarmentUrl] = useState("")
  const [tryOnClothes, { loading: tryOnLoading, error: tryOnError }] = useMutation(TRY_ON_CLOTHES, {
    onCompleted: () => {
      refetch() // 更新された履歴を取得
      setPersonUrl("")
      setGarmentUrl("")
    },
  })

  const { data, loading: queryLoading, error: queryError, refetch } = useQuery(GET_TRYONS)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await tryOnClothes({ variables: { input: { personUrl, garmentUrl } } })
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] py-12 px-4">
      {/* ヘッダー */}
      <header className="container mx-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-y-4 sm:gap-y-0">
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl font-medium text-[#0f172a]">AiSty</span>
          </Link>
          <nav className="flex space-x-4">
            <Button variant="ghost" className="text-[#0f172a] hover:text-[#d4af37]">
              マイページ
            </Button>
            <Button variant="outline" className="border-[#0f172a] text-[#0f172a] hover:bg-[#0f172a] hover:text-white">
              ログアウト
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto w-full max-w-4xl px-4">
        <h1 className="font-serif text-3xl md:text-4xl text-[#0f172a] text-center mb-8">バーチャル試着</h1>

        {/* 試着フォーム */}
        <Card className="mb-12 border-[#e5e1d8] shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-[#0f172a]">新しい試着</CardTitle>
            <CardDescription>画像URLを入力して、バーチャル試着を体験しましょう</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="personUrl" className="text-[#64748b]">
                  あなたの画像URL
                </Label>
                <Input
                  id="personUrl"
                  className="border-[#e5e1d8] focus:ring-[#d4af37] focus:border-[#d4af37]"
                  type="text"
                  placeholder="https://example.com/your-image.jpg"
                  value={personUrl}
                  onChange={(e) => setPersonUrl(e.target.value)}
                  required
                />
                <p className="text-xs text-[#64748b]">あなたの全身が写っている画像のURLを入力してください</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="garmentUrl" className="text-[#64748b]">
                  試着したい衣服の画像URL
                </Label>
                <Input
                  id="garmentUrl"
                  className="border-[#e5e1d8] focus:ring-[#d4af37] focus:border-[#d4af37]"
                  type="text"
                  placeholder="https://example.com/garment-image.jpg"
                  value={garmentUrl}
                  onChange={(e) => setGarmentUrl(e.target.value)}
                  required
                />
                <p className="text-xs text-[#64748b]">試着したい衣服の画像URLを入力してください</p>
              </div>

              {tryOnError && (
                <Alert variant="destructive" className="bg-[#fef2f2] border-[#fee2e2] text-[#b91c1c]">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>エラー: {tryOnError.message}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={tryOnLoading}
                className="w-full bg-[#0f172a] text-white hover:bg-[#0f172a]/90 transition-colors duration-200"
              >
                {tryOnLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    試着中...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    試着する
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 履歴一覧 */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl text-[#0f172a] mb-6 flex items-center">
            <History className="mr-2 h-5 w-5 text-[#d4af37]" />
            履歴一覧
          </h2>

          {queryLoading && (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#d4af37] mb-4" />
              <p className="text-[#64748b]">読み込み中...</p>
            </div>
          )}

          {queryError && (
            <Alert variant="destructive" className="bg-[#fef2f2] border-[#fee2e2] text-[#b91c1c]">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>読み込み失敗: {queryError.message}</AlertDescription>
            </Alert>
          )}

          {!queryLoading && !queryError && data?.getTryOns?.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-[#e5e1d8]">
              <p className="text-[#64748b]">まだ試着履歴がありません。新しい試着を始めましょう。</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.getTryOns?.map((item: any) => (
              <div key={item.id} className="w-full">
                <Card
                  className="overflow-hidden border-[#e5e1d8] shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="aspect-[3/4] relative">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt="試着結果"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardFooter className="bg-white p-4">
                    <p className="text-sm text-[#64748b] w-full text-right">
                      {new Date(item.createdAt).toLocaleString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
