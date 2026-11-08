import { useAuthStore } from '../../store/auth.store';
import { LogOut } from 'lucide-react';

export function UserBar() {
  const { profile, signOut } = useAuthStore();

  if (!profile) return null;

  return (
    <div className="flex h-[52px] items-center justify-between bg-discord-rail px-2">
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="relative">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-discord-accent text-sm font-bold text-white">
            {profile.username.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-discord-rail bg-discord-success"></div>
        </div>
        <div className="flex flex-col overflow-hidden leading-tight">
          <span className="truncate text-sm font-semibold text-white">{profile.username}</span>
          <span className="text-xs text-discord-textMuted">En línea</span>
        </div>
      </div>
      <button 
        onClick={signOut}
        className="text-discord-textMuted hover:text-discord-danger transition p-2 rounded hover:bg-discord-hover"
        title="Cerrar Sesión"
      >
        <LogOut size={18} />
      </button>
    </div>
  );
}