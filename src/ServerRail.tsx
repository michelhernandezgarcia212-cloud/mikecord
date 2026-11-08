import { useServerStore } from '../../store/server.store';

export function ServerRail() {
  const { servers, activeServerId, setActiveServer } = useServerStore();

  return (
    <div className="flex w-[72px] flex-col items-center gap-2 overflow-y-auto bg-discord-rail py-3">
      {/* Botón de Inicio (DMs en el futuro) */}
      <div className="mb-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-[16px] bg-discord-accent text-white transition hover:rounded-[12px]">
        <span className="font-bold text-xl">M</span>
      </div>
      
      <div className="h-0.5 w-8 rounded bg-discord-divider my-1"></div>

      {/* Lista de servidores */}
      {servers.map((server) => (
        <div
          key={server.id}
          onClick={() => setActiveServer(server.id)}
          className={`flex h-12 w-12 cursor-pointer items-center justify-center text-white transition-all duration-200 relative group
            ${activeServerId === server.id ? 'rounded-[16px] bg-discord-accent' : 'rounded-full bg-discord-sidebar hover:rounded-[16px] hover:bg-discord-accent'}
          `}
        >
          {/* Barra blanca indicadora de servidor activo */}
          <div className={`absolute -left-3 h-2 w-1 rounded-r-md bg-white transition-all ${activeServerId === server.id ? 'h-10' : 'h-2 group-hover:h-5'}`}></div>
          
          <span className="text-lg font-semibold">{server.name.charAt(0).toUpperCase()}</span>
        </div>
      ))}
    </div>
  );
}