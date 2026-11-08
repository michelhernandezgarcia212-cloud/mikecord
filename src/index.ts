export type UserStatus = 'online' | 'idle' | 'dnd' | 'invisible';

export interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  status: UserStatus;
}

export interface Server {
  id: string;
  name: string;
  icon_url: string | null;
}

export interface Channel {
  id: string;
  server_id: string;
  name: string;
}

export interface Message {
  id: string;
  channel_id: string;
  author_id: string;
  content: string;
  created_at: string;
  profiles?: Profile; // Para mostrar el avatar y nombre
}