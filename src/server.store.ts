import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Server, Channel } from '../types';

interface ServerState {
  servers: Server[];
  channels: Channel[];
  activeServerId: string | null;
  activeChannelId: string | null;
  
  fetchServers: () => Promise<void>;
  fetchChannels: (serverId: string) => Promise<void>;
  setActiveServer: (id: string) => void;
  setActiveChannel: (id: string | null) => void;
}

export const useServerStore = create<ServerState>((set, get) => ({
  servers: [],
  channels: [],
  activeServerId: null,
  activeChannelId: null,

  fetchServers: async () => {
    const { data } = await supabase.from('servers').select('*');
    if (data && data.length > 0) {
      set({ servers: data });
      // Selecciona el primero por defecto
      if (!get().activeServerId) {
        set({ activeServerId: data[0].id });
        get().fetchChannels(data[0].id);
      }
    }
  },

  fetchChannels: async (serverId: string) => {
    const { data } = await supabase.from('channels').select('*').eq('server_id', serverId);
    if (data) set({ channels: data, activeChannelId: null });
  },

  setActiveServer: (id) => {
    set({ activeServerId: id, activeChannelId: null });
    get().fetchChannels(id);
  },

  setActiveChannel: (id) => set({ activeChannelId: id }),
}));