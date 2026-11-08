import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export function RegisterScreen({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // 1. Crear el usuario con email y contraseña
    const { data, error: authError } = await supabase.auth.signUp({ email, password });
    
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // 2. Guardar el nombre de usuario en la tabla profiles
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        username: username,
        status: 'online'
      });
      
      if (profileError) {
        setError("Error al crear el perfil, intenta de nuevo.");
      } else {
        setSuccess(true);
      }
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-discord-chat p-4 text-center">
        <div className="w-full max-w-md rounded-lg bg-discord-sidebar p-8 shadow-xl">
          <h2 className="mb-2 text-2xl font-bold text-discord-success">¡Revisa tu correo!</h2>
          <p className="text-discord-textMuted">Te enviamos un enlace de confirmación. Debes hacer clic en él antes de poder entrar.</p>
          <button onClick={onSwitch} className="mt-6 text-discord-accent hover:underline">Volver al inicio</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-discord-chat p-4">
      <div className="w-full max-w-md rounded-lg bg-discord-sidebar p-8 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">Crear una cuenta</h2>
        
        {error && <div className="mb-4 rounded bg-discord-danger/20 p-2 text-sm text-discord-danger">{error}</div>}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-discord-textMuted">Nombre de usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded bg-discord-rail p-2 text-white outline-none focus:ring-2 focus:ring-discord-accent"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-discord-textMuted">Correo real</label>
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
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-discord-accent py-2 font-bold text-white transition hover:bg-discord-accentHover disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Registrarse'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-discord-textMuted">
          ¿Ya tienes cuenta?{' '}
          <button onClick={onSwitch} className="text-discord-accent hover:underline">
            Entra aquí
          </button>
        </p>
      </div>
    </div>
  );
}