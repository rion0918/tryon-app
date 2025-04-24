'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

const TRY_ON_CLOTHES = gql`
  mutation TryOnClothes($input: TryOnInput!) {
    tryOnClothes(input: $input)
  }
`;

const GET_TRYONS = gql`
  query GetTryOns {
    getTryOns {
      id
      imageUrl
      createdAt
    }
  }
`;

export default function TryOnPage() {
  const [personUrl, setPersonUrl] = useState('');
  const [garmentUrl, setGarmentUrl] = useState('');
  const [tryOnClothes, { loading: tryOnLoading, error: tryOnError }] = useMutation(TRY_ON_CLOTHES, {
    onCompleted: () => {
      refetch(); // 更新された履歴を取得
      setPersonUrl('');
      setGarmentUrl('');
    },
  });

  const { data, loading: queryLoading, error: queryError, refetch } = useQuery(GET_TRYONS);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await tryOnClothes({ variables: { input: { personUrl, garmentUrl } } });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">仮装試着ページ</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          type="text"
          placeholder="Person Image URL"
          value={personUrl}
          onChange={(e) => setPersonUrl(e.target.value)}
          required
        />
        <input
          className="w-full border p-2"
          type="text"
          placeholder="Garment Image URL"
          value={garmentUrl}
          onChange={(e) => setGarmentUrl(e.target.value)}
          required
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
          disabled={tryOnLoading}
        >
          {tryOnLoading ? '試着中...' : '試着する'}
        </button>
        {tryOnError && <p className="text-red-500">エラー: {tryOnError.message}</p>}
      </form>

      <hr />

      <h2 className="text-xl font-semibold">履歴一覧</h2>
      {queryLoading && <p>読み込み中...</p>}
      {queryError && <p className="text-red-500">読み込み失敗: {queryError.message}</p>}
      <div className="grid grid-cols-2 gap-4">
        {data?.getTryOns?.map((item: any) => (
          <div key={item.id} className="border p-2">
            <img src={item.imageUrl} alt="TryOn Result" className="w-full h-auto" />
            <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}