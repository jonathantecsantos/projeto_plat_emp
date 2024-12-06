import { useState } from "react";
import { EventConfig, EventsTypes } from "../../../model/config";
import { EventItem } from "./eventItem";

export const EventsConfig = () => {
  const [events] = useState<EventConfig[]>([
    { idEvento: EventsTypes.INSCRICAO, dataInicio: "", dataFim: "" },
    { idEvento: EventsTypes.PROTOTIPO, dataInicio: "", dataFim: "" },
    { idEvento: EventsTypes.BANNER, dataInicio: "", dataFim: "" },
    { idEvento: EventsTypes.PITCH, dataInicio: "", dataFim: "" },
  ]);

  return (
    <div className="p-6 shadow-lg rounded-lg text-[#3C14A4] border-t-2">
      <h2 className="text-xl font-bold mb-4 text-center">Configuração de Eventos</h2>
      <div className="grid grid-cols-1 gap-4">
        {events.map((event) => (
          <EventItem key={event.idEvento} idEvento={event.idEvento} initialData={event} />
        ))}
      </div>
    </div>
  );
};
