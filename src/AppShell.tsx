import { useServerStore } from '../../store/server.store';
import { ServerRail } from './ServerRail';
import { ChannelPanel } from './ChannelPanel';
import { ChatScreen } from '../chat/ChatScreen';

export function AppShell() {
  const { activeChannelId } = useServerStore();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-discord-chat">
      {/* 1. Barra de servidores (Siempre visible) */}
      <ServerRail />

      {/* 2. Panel de canales (En móvil se oculta si hay un chat abierto) */}
      <div className={`h-full flex-shrink-0 ${activeChannelId ? 'hidden md:flex' : 'flex w-full md:w-60'}`}>
        <ChannelPanel />
      </div>

      {/* 3. Pantalla de Chat (En móvil ocupa el 100% si hay un canal abierto) */}
      <div className={`h-full flex-1 ${!activeChannelId ? 'hidden md:flex' : 'flex'}`}>
        <ChatScreen />
      </div>
    </div>
  );
}