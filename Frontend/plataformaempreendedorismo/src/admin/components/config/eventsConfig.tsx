import { useState } from "react"
import { useCreateEventMutation } from "../../../api/studentApi"
import { EventConfig, EventsTypes } from "../../../model/config"
import { useSnackbar } from "notistack"

export const EventsConfig = () => {
  const [createEvent, { isLoading, isSuccess }] = useCreateEventMutation()
  const [events, setEvents] = useState<EventConfig[]>([
    { dataInicio: "", dataFim: "", idEvento: EventsTypes.INSCRICAO },
    { dataInicio: "", dataFim: "", idEvento: EventsTypes.PROTOTIPO },
    { dataInicio: "", dataFim: "", idEvento: EventsTypes.BANNER },
    { dataInicio: "", dataFim: "", idEvento: EventsTypes.PITCH },
  ])

  const { enqueueSnackbar } = useSnackbar()

  const handleChange = <K extends keyof EventConfig>(
    index: number,
    field: K,
    value: EventConfig[K]
  ) => {
    const updatedEvents = [...events]
    updatedEvents[index][field] = value
    setEvents(updatedEvents)
  }

  const handleSave = async () => {
    try {
      //endpoint n aceita array
      for (const event of events) {
        if (!event.dataInicio || !event.dataFim) {
          console.warn(`Evento com ID ${event.idEvento} está com datas inválidas.`)
          continue // Pule para o próximo evento
        }

        const formattedEvent = {
          dataInicio: new Date(event.dataInicio).toISOString(),
          dataFim: new Date(event.dataFim).toISOString(),
          idEvento: event.idEvento,
        }

        await createEvent(formattedEvent).unwrap()
      }
      enqueueSnackbar("Configuração realizada com sucesso!", { variant: "success" })
    } catch (error: any) {
      console.error("Erro ao salvar eventos:", error)
      enqueueSnackbar("Falha ao salvar eventos.", { variant: "error" })
    }
  }

  return (
    <div className="p-6 shadow-lg rounded-lg text-[#3C14A4] border-t-2">
      <h2 className="text-xl font-bold mb-4">Configuração de Eventos</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {events.map((event, index) => (
          <div key={event.idEvento} className="flex flex-col">
            <label className="font-bold">{EventsTypes[event.idEvento]}</label>
            <div className="flex items-center space-x-2">
              <div>
                <label className="text-sm">Início</label>
                <input
                  type="date"
                  value={event.dataInicio}
                  onChange={(e) => handleChange(index, "dataInicio", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <span className="mt-5">à</span>
              <div>
                <label className="text-sm">Fim</label>
                <input
                  type="date"
                  value={event.dataFim}
                  onChange={(e) => handleChange(index, "dataFim", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSave}
        className={`mt-6 p-3 rounded-md text-white ${isLoading ? "bg-[#8668FFCC]" : "bg-[#3C14A4]"
          }`}
        disabled={isLoading}
      >
        {isLoading ? "Salvando..." : "Salvar"}
      </button>
      {isSuccess && <p className="text-green-500 mt-2">Configuração salva com sucesso!</p>}
    </div>
  )
}