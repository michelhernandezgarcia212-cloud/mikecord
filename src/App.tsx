import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/auth.store';
import { useServerStore } from './store/server.store';
import { LoginScreen } from './components/auth/LoginScreen';
import { RegisterScreen } from './components/auth/RegisterScreen';
import { AppShell } from './components/layout/AppShell';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const { session, setSession, fetchProfile, loading } = useAuthStore();
  const fetchServers = useServerStore((state) => state.fetchServers);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, [setSession, fetchProfile]);

  // Si ya hay sesión, traemos los servidores
  useEffect(() => {
    if (session) fetchServers();
  }, [session, fetchServers]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-discord-chat text-white">Cargando Mikecord... ⚡</div>;
  }

  if (!session) {
    return showLogin 
      ? <LoginScreen onSwitch={() => setShowLogin(false)} />
      : <RegisterScreen onSwitch={() => setShowLogin(true)} />;
  }

  return <AppShell />;
}

export default App;