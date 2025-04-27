import CheckIcon from '@mui/icons-material/Check'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { useCreateEventMutation, useGetEventByIdQuery, useUpdateEventMutation } from "../../../api/studentApi"
import { EventConfig, EventsTypes } from "../../../model/config"
import { toggleLoading } from '../../../redux/reducers/loadingBar.slice'
import { formatDateToInput } from '../../../utils/types'


interface EventItemProps {
  idEvento: number
}

export const EventItem = ({ idEvento, }: EventItemProps) => {
  const { data } = useGetEventByIdQuery(idEvento)
  const [createEvent, { isSuccess: created }] = useCreateEventMutation()
  const [updateEvent, { isSuccess: updated }] = useUpdateEventMutation()
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const [localEvent, setLocalEvent] = useState<EventConfig>({
    idEvento,
    dataInicio: "",
    dataFim: "",
    tipoEvento: undefined,
  });

  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    if (data) {
      setLocalEvent({
        idEvento: data.idEvento,
        dataInicio: formatDateToInput(data.dataInicio),
        dataFim: formatDateToInput(data.dataFim),
        tipoEvento: data.tipoEvento,
      });
      setIsNew(false);
    }
  }, [data]);

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
        enqueueSnackbar(`Evento ${data ? data?.tipoEvento?.descricao : EventsTypes[idEvento]} atualizado com sucesso!`, { variant: "success" })
      }
    } catch (error: any) {
      console.error("Erro ao salvar evento:", error)
      enqueueSnackbar(`Erro ao salvar evento ${data ? data?.tipoEvento?.descricao : EventsTypes[idEvento]}.`, { variant: "error" })
    } finally {
      dispatch(toggleLoading())
    }
  }


  return (
    <div className="w-full border rounded-lg p-2 relative">
      <div className='w-full bg-[#3C14A4] absolute  top-0 left-0 right-0 rounded-t-lg first-letter:uppercase'>
        <label className="font-bold w-full px-2 text-[#fefefe]">
          {data ? data?.tipoEvento?.descricao : EventsTypes[idEvento]}
        </label>
      </div>
      <div className='w-full sm:flex justify-around'>
        <div className="sm:flex items-center sm:space-x-2">
          <div className='sm:mt-2 mt-6'>
            <label className="text-sm">Início</label>
            <input
              type="date"
              value={localEvent.dataInicio}
              onChange={(e) => handleInputChange("dataInicio", e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="sm:mt-7 hidden sm:block">à</div>
          <div className='mt-2'>
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
          disabled={updated}
          onClick={handleSave}
          className="sm:mt-12 mt-6 ml-2 mb-4 p-2 text-nowrap bg-[#3C14A4] text-white rounded-lg flex justify-center w-fit px-3"
        >
          {created || updated ? <CheckCircleIcon style={{ color: 'lightgreen' }} className=' mr-2' /> : <CheckIcon className=' mr-2' />}
          Salvar
        </button>
      </div>
    </div>
  )
}
