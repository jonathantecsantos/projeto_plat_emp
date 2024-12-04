import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useCreateEventMutation, useGetEventByIdQuery, useUpdateEventMutation } from "../../../api/studentApi"
import { EventConfig, EventsTypes } from "../../../model/config"
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../../redux/reducers/loadingBar.slice'


interface EventItemProps {
  idEvento: number
  initialData: EventConfig
}

const formatDateToInput = (isoDate: string): string => {
  if (!isoDate) return ""
  return new Date(isoDate).toISOString().split("T")[0]
}

export const EventItem = ({ idEvento, initialData }: EventItemProps) => {
  const { data, isSuccess } = useGetEventByIdQuery(idEvento)
  const [createEvent, {isSuccess: created}] = useCreateEventMutation()
  const [updateEvent, {isSuccess: updated}] = useUpdateEventMutation()
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const [localEvent, setLocalEvent] = useState<EventConfig>(initialData)
  const [isNew, setIsNew] = useState(true) // Determina se é um novo evento ou existente

  useEffect(() => {
    if (isSuccess && data) {
      setLocalEvent({
        idEvento,
        dataInicio: formatDateToInput(data.dataInicio),
        dataFim: formatDateToInput(data.dataFim),
      })
      setIsNew(false) // Evento já existe no backend
    }
  }, [data, isSuccess, idEvento])

  const handleInputChange = (field: keyof EventConfig, value: string) => {
    setLocalEvent((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    dispatch(toggleLoading())
    try {
      const formattedEvent = {
        dataInicio: new Date(localEvent.dataInicio).toISOString(),
        dataFim: new Date(localEvent.dataFim).toISOString(),
        idEvento: localEvent.idEvento,
      }
      if (isNew) {
        await createEvent(formattedEvent).unwrap()
        enqueueSnackbar(`Evento ${EventsTypes[idEvento]} criado com sucesso!`, { variant: "success" })
        setIsNew(false)
      } else {
        await updateEvent({ id: idEvento, data: formattedEvent }).unwrap()
        enqueueSnackbar(`Evento ${EventsTypes[idEvento]} atualizado com sucesso!`, { variant: "success" })
      }
    } catch (error: any) {
      console.error("Erro ao salvar evento:", error)
      enqueueSnackbar(`Erro ao salvar evento ${EventsTypes[idEvento]}.`, { variant: "error" })
    } finally{
      dispatch(toggleLoading())
    }
  }

  return (
    <div className="flex flex-col">
      <label className="font-bold">{EventsTypes[idEvento]}</label>
      <div className="flex items-center space-x-2">
        <div>
          <label className="text-sm">Início</label>
          <input
            type="date"
            value={localEvent.dataInicio}
            onChange={(e) => handleInputChange("dataInicio", e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <span className="mt-5">à</span>
        <div>
          <label className="text-sm">Fim</label>
          <input
            type="date"
            value={localEvent.dataFim}
            onChange={(e) => handleInputChange("dataFim", e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        className="mt-4 p-2 bg-[#3C14A4] text-white rounded-md first-letter:capitalize w-1/3"
      >
        {created || updated && <CheckCircleIcon style={{ color: 'lightgreen' }} className=' mr-1' />}
        {EventsTypes[idEvento].toLowerCase()}
      </button>
    </div>
  )
}
