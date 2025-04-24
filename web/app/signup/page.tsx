'use client';

import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      accessToken
    }
  }
`;

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signup.accessToken);
      router.push('/tryon');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup({ variables: { input: { email, password } } });
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
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
          className="w-full bg-blue-500 text-white p-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {error && <p className="text-red-500">Signup failed: {error.message}</p>}
      </form>
    </div>
  );
}