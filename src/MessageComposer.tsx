import { useState } from 'react';
import { Send } from 'lucide-react';
import { useMessageStore } from '../../store/message.store';
import { useAuthStore } from '../../store/auth.store';

export function MessageComposer({ channelId }: { channelId: string }) {
  const [content, setContent] = useState('');
  const { sendMessage } = useMessageStore();
  const profile = useAuthStore((state) => state.profile);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !profile) return;
    
    const text = content;
    setContent(''); // Limpiar input rápido
    
    await sendMessage(channelId, text, profile.id);
  };

  return (
    <div className="px-4 pb-6 pt-2">
      <form onSubmit={handleSend} className="flex items-center gap-3 rounded-lg bg-discord-sidebar px-4 py-3">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Enviar mensaje a #canal`}
          className="flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-discord-textMuted"
        />
        <button type="submit" disabled={!content.trim()} className="text-discord-textMuted transition hover:text-white disabled:opacity-50">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}