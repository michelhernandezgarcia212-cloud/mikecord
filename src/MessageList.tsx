import { useEffect, useRef } from 'react';
import { useMessageStore } from '../../store/message.store';
import { useAuthStore } from '../../store/auth.store';
import { MessageBubble } from './MessageBubble';

export function MessageList({ channelId }: { channelId: string }) {
  const { messages, fetchMessages, subscribeToMessages, unsubscribe } = useMessageStore();
  const currentUser = useAuthStore((state) => state.profile);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages(channelId);
    subscribeToMessages(channelId);
    return () => unsubscribe();
  }, [channelId, fetchMessages, subscribeToMessages, unsubscribe]);

  // Auto-scroll al fondo cuando llega un mensaje nuevo
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col">
      <div className="flex-1" />
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} isMine={msg.author_id === currentUser?.id} />
      ))}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}