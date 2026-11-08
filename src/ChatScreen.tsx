import { Hash, ArrowLeft, Users } from 'lucide-react';
import { useServerStore } from '../../store/server.store';
import { MessageList } from './MessageList';
import { MessageComposer } from './MessageComposer';

export function ChatScreen() {
  const { channels, activeChannelId, setActiveChannel } = useServerStore();
  const activeChannel = channels.find((c) => c.id === activeChannelId);

  if (!activeChannelId || !activeChannel) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-discord-chat">
        <Hash size={48} className="text-discord-textMuted mb-4 opacity-50" />
        <h2 className="text-xl font-bold text-white">Selecciona un canal</h2>
        <p className="text-discord-textMuted mt-2">Elige un canal de la lista para empezar a chatear.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-discord-chat">
      {/* Header del chat */}
      <div className="flex h-12 items-center justify-between border-b border-discord-divider px-4 shadow-sm z-10">
        <div className="flex items-center gap-2">
          <button 
            className="md:hidden mr-2 text-discord-textMuted hover:text-white transition"
            onClick={() => setActiveChannel(null)}
          >
            <ArrowLeft size={20} />
          </button>
          <Hash size={20} className="text-discord-textMuted" />
          <span className="font-bold text-white">{activeChannel.name}</span>
        </div>
        <Users size={20} className="text-discord-textMuted cursor-pointer hover:text-white" />
      </div>

      {/* Mensajes */}
      <MessageList channelId={activeChannelId} />

      {/* Input para escribir */}
      <MessageComposer channelId={activeChannelId} />
    </div>
  );
}