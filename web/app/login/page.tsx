'use client';

import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.accessToken);
      router.push('/tryon');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ variables: { input: { email, password } } });
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full bg-gray-700 text-white p-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
        {error && <p className="text-red-500">Login failed: {error.message}</p>}
      </form>
    </div>
  );
}