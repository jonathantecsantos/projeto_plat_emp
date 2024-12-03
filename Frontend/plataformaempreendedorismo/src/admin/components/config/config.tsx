import { useState } from "react";
import { EventsConfig } from "./eventsConfig";

export const AdminConfig = () => {
  const [activeConfig, setActiveConfig] = useState<string | null>(null);

  const renderConfig = () => {
    //substituir por variavel global os cases
    switch (activeConfig) {
      case "events":
        return <EventsConfig />
      default:
        return <p className="text-gray-600">Selecione uma configuração para começar.</p>;
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 p-6 ">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveConfig("events")}
              className={`w-full text-left p-3 rounded-md ${activeConfig === "events" ? "bg-[#3C14A4] text-[#fefefe]" : "bg-[#9F8FD9] text-[#fefefe]"
                }`}
            >
              Configurar Eventos
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-3 rounded-md bg-[#9F8FD9] text-[#fefefe]"
              disabled
            >
              Configurar Visual
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-3 rounded-md bg-[#9F8FD9] text-[#fefefe]"
              disabled
            >
              Configurar Acessos
            </button>
          </li>
        </ul>
      </aside>
      <main className="flex-1 bg-white p-6">{renderConfig()}</main>
    </div>
  );
};

export default AdminConfig;
