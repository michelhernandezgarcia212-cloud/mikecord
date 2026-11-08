import { Hash, ChevronDown } from 'lucide-react';
import { useServerStore } from '../../store/server.store';
import { UserBar } from './UserBar';

export function ChannelPanel() {
  const { servers, activeServerId, channels, activeChannelId, setActiveChannel } = useServerStore();
  
  const activeServer = servers.find((s) => s.id === activeServerId);

  return (
    <div className="flex h-full w-full flex-col bg-discord-sidebar md:w-60">
      {/* Header del servidor */}
      <div className="flex h-12 cursor-pointer items-center justify-between border-b border-discord-divider px-4 shadow-sm transition hover:bg-discord-hover">
        <span className="truncate font-bold text-white">{activeServer?.name || 'Selecciona un servidor'}</span>
        <ChevronDown size={18} className="text-discord-textMuted" />
      </div>

      {/* Lista de canales */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        <div className="mb-1 flex items-center gap-1 px-1 py-1 text-xs font-bold uppercase text-discord-textMuted hover:text-white">
          <ChevronDown size={12} />
          Canales de texto
        </div>
        
        {channels.map((channel) => (
          <div
            key={channel.id}
            onClick={() => setActiveChannel(channel.id)}
            className={`group mb-0.5 flex cursor-pointer items-center gap-1.5 rounded px-2 py-1.5 text-discord-textMuted transition
              ${activeChannelId === channel.id ? 'bg-discord-active text-white' : 'hover:bg-discord-hover hover:text-discord-text'}
            `}
          >
            <Hash size={18} className="opacity-70" />
            <span className="truncate text-[15px] font-medium">{channel.name}</span>
          </div>
        ))}
        
        {channels.length === 0 && (
          <p className="px-2 text-sm text-discord-textMuted">No hay canales aún.</p>
        )}
      </div>

      {/* Tu perfil abajo */}
      <UserBar />
    </div>
  );
}