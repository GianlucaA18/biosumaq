"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/api/login/login';

const PageLogin = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await login(correo, password);

      if (response.success && response.correo) {
        router.push('/dashboard');
      } else {
        setError(response.message || 'Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4  bg-center  " style={{ backgroundImage: 'url(/img/HamburgesaFishfood.jpg)' }}>
      <Card className="w-full max-w-md shadow-md rounded-lg bg-[rgba(255,255,255,0.6)] bg-opacity-80 ">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-800">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              placeholder="Usuario"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none  focus:border-blue-300 dark:bg-transparent text-black placeholder:text-black   "
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none  focus:border-blue-300 dark:bg-transparent text-black placeholder:text-black  "
            />
            <Button type="submit" className="w-full py-2 bg-primary text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageLogin;