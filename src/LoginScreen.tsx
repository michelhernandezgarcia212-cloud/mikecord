import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export function LoginScreen({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-discord-chat p-4">
      <div className="w-full max-w-md rounded-lg bg-discord-sidebar p-8 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">¡Bienvenido de nuevo!</h2>
        
        {error && <div className="mb-4 rounded bg-discord-danger/20 p-2 text-sm text-discord-danger">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-discord-textMuted">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded bg-discord-rail p-2 text-white outline-none focus:ring-2 focus:ring-discord-accent"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-discord-textMuted">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded bg-discord-rail p-2 text-white outline-none focus:ring-2 focus:ring-discord-accent"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-discord-accent py-2 font-bold text-white transition hover:bg-discord-accentHover disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-discord-textMuted">
          ¿No tienes cuenta?{' '}
          <button onClick={onSwitch} className="text-discord-accent hover:underline">
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}