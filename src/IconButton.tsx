import { ReactNode } from 'react';

export function IconButton({ children, onClick, title }: { children: ReactNode, onClick?: () => void, title?: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex h-10 w-10 items-center justify-center rounded-full text-discord-textMuted transition hover:bg-discord-hover hover:text-white"
    >
      {children}
    </button>
  );
}