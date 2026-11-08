import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Message } from '../types';

interface MessageState {
  messages: Message[];
  fetchMessages: (channelId: string) => Promise<void>;
  sendMessage: (channelId: string, content: string, userId: string) => Promise<void>;
  subscribeToMessages: (channelId: string) => void;
  unsubscribe: () => void;
}

let channelSubscription: any = null;

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],

  fetchMessages: async (channelId: string) => {
    const { data } = await supabase
      .from('messages')
      .select('*, profiles(*)')
      .eq('channel_id', channelId)
      .order('created_at', { ascending: true });
    if (data) set({ messages: data });
  },

  sendMessage: async (channelId, content, userId) => {
    await supabase.from('messages').insert({
      channel_id: channelId,
      author_id: userId,
      content,
    });
  },

  subscribeToMessages: (channelId: string) => {
    if (channelSubscription) supabase.removeChannel(channelSubscription);

    channelSubscription = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `channel_id=eq.${channelId}` },
        async (payload) => {
          // Cuando llega un mensaje, buscamos el perfil del autor para mostrarlo
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', payload.new.author_id)
            .single();
            
          set((state) => ({ 
            messages: [...state.messages, { ...payload.new, profiles: profile } as Message] 
          }));
        }
      )
      .subscribe();
  },

  unsubscribe: () => {
    if (channelSubscription) {
      supabase.removeChannel(channelSubscription);
      channelSubscription = null;
    }
  }
}));