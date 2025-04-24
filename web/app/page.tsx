'use client';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-6 text-center">
      <h1 className="text-4xl font-bold">仮装試着アプリ - TryOn</h1>
      <p className="text-lg text-gray-600">あなたの写真に服を合成して、購入前にバーチャル試着！</p>
      <div className="flex gap-4 mt-6">
        <a href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
          新規登録
        </a>
        <a href="/login" className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded">
          ログイン
        </a>
      </div>
    </div>
  );
}