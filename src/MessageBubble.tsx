import type { Message } from '../../types';

export function MessageBubble({ message, isMine }: { message: Message; isMine: boolean }) {
  return (
    <div className={`flex w-full mt-4 ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] gap-3 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-discord-accent text-sm font-bold text-white">
          {message.profiles?.username?.charAt(0).toUpperCase() || '?'}
        </div>

        {/* Contenido */}
        <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-white hover:underline cursor-pointer">
              {message.profiles?.username || 'Usuario'}
            </span>
            <span className="text-xs text-discord-textMuted">
              {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className={`mt-1 rounded-lg px-3 py-2 text-[15px] ${isMine ? 'bg-discord-accent text-white rounded-tr-none' : 'bg-discord-sidebar text-discord-text rounded-tl-none'}`}>
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
}