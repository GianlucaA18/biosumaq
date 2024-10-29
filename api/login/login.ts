import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(correo: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ correo, password }),
  });

  const data = await response.json();

  if (response.ok && data.user && data.user.correo) {
    Cookies.set('usuario', JSON.stringify(data.user.correo));
    return { success: true, correo: data.user.correo };
  } else {
    return { success: false, message: data.message || 'Login failed' };
  }
}

export async function register(correo: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ correo, password }),
  });
  return response.json();
}

export function getUserFromCookie() {
  const userCookie = Cookies.get('usuario');
  return userCookie ? JSON.parse(userCookie) : null;
}

export function logout() {
  Cookies.remove('usuario');
}
