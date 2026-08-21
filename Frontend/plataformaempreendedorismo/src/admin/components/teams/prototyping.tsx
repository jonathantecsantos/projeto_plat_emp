import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LoadingButton } from "@mui/lab"
import { CircularProgress } from "@mui/material"
import { useSnackbar } from "notistack"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateTeamPrototypingMutation, useGetTeamPrototypingByIdQuery, useUpdateTeamPrototypingMutation } from "../../../api/studentApi"
import { inputClasses } from "../../../globals"
import { AnexoTypes, Prototype } from "../../../model/prototyping"
import { TextAreaComponent } from "../common/textarea"
import { FileDownload } from "./fileDownload"

//TODO-Winnícius: Adicionar nome do time como parametro
export const TeamPrototyping = ({ id, teamName }: { id: number, teamName: string }) => {
  const [createTeamPrototype, { isLoading: creating, isSuccess: created }] = useCreateTeamPrototypingMutation()
  const { data: teamPrototyping, isLoading } = useGetTeamPrototypingByIdQuery(id)
  const [updateTeamPrototype, { isLoading: updating, isSuccess: updated }] = useUpdateTeamPrototypingMutation()
  const navigate = useNavigate()
  const [success, setSucess] = useState(created || updated)
  const { enqueueSnackbar } = useSnackbar()
  const [formValues, setFormValues] = useState<Prototype>({
    idEquipe: id,
    problemaPrincipal: "",
    propostaValor: "",
    vantagemCompetitiva: "",
    principaisNecessidades: "",
    parcerias: "",
    tipoApoio: "",
  })

  useEffect(() => {
    if (teamPrototyping) {
      setFormValues({
        idEquipe: id,
        problemaPrincipal: teamPrototyping.problemaPrincipal || '',
        propostaValor: teamPrototyping.propostaValor || '',
        vantagemCompetitiva: teamPrototyping.vantagemCompetitiva || '',
        principaisNecessidades: teamPrototyping.principaisNecessidades || '',
        parcerias: teamPrototyping.parcerias || '',
        tipoApoio: teamPrototyping.tipoApoio || '',
      })
    }
  }, [teamPrototyping, id])

  // Estados para gerenciar os arquivos
  const [cronogramaFile, setCronogramaFile] = useState<File | null>(null)
  const [memorialFile, setMemorialFile] = useState<File | null>(null)
  const [esquemaFiles, setEsquemaFiles] = useState<File[]>([])
  const [memorialCompletoPdf, setMemorialCompletoPdf] = useState<File | null>(null)

  // Função genérica para atualizar os valores dos inputs de texto
  const handleValueChange = (newValue: string, field: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: newValue,
    }))
  }

  // Funções de onChange para os inputs de arquivos com validações
  const handleCronogramaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file && !file.type.startsWith('image/')) {
      enqueueSnackbar('O arquivo do Cronograma deve ser uma imagem!', { variant: 'warning' })
      e.target.value = ''
      setCronogramaFile(null)
      return
    }
    setCronogramaFile(file)
  }

  const handleMemorialChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file && !file.type.startsWith('image/')) {
      enqueueSnackbar('O Memorial Descritivo Simplificado deve ser uma imagem!', { variant: 'warning' })
      e.target.value = ''
      setMemorialFile(null)
      return
    }
    setMemorialFile(file)
  }

  const handleEsquemaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 4) {
      enqueueSnackbar('Você pode selecionar no máximo 4 imagens nos Anexos Adicionais!', { variant: 'warning' })
      e.target.value = ''
      setEsquemaFiles([])
      return
    }
    const nonImages = files.filter((f) => !f.type.startsWith('image/'))
    if (nonImages.length > 0) {
      enqueueSnackbar('Todos os Anexos Adicionais devem ser imagens!', { variant: 'warning' })
      e.target.value = ''
      setEsquemaFiles([])
      return
    }
    setEsquemaFiles(files)
  }

  const handleMemorialCompletoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file && file.type !== 'application/pdf') {
      enqueueSnackbar('O Memorial Descritivo Completo deve ser obrigatoriamente um arquivo PDF!', { variant: 'error' })
      e.target.value = ''
      setMemorialCompletoPdf(null)
      return
    }
    setMemorialCompletoPdf(file)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (esquemaFiles.length > 4) {
      enqueueSnackbar('Você pode enviar no máximo 4 imagens nos Anexos Adicionais!', { variant: 'error' })
      return
    }

    try {
      const formDataToSend = new FormData()

      const filesToSend: Array<{ file: File, tipoAnexoId: number }> = []
      if (cronogramaFile) {
        filesToSend.push({ file: cronogramaFile, tipoAnexoId: AnexoTypes.CRONOGRAMA_CONSTRUCAO.id })
      }
      if (memorialFile) {
        filesToSend.push({ file: memorialFile, tipoAnexoId: AnexoTypes.MEMORIAL_DESCRITIVO.id })
      }
      if (esquemaFiles.length > 0) {
        esquemaFiles.forEach((file) => {
          filesToSend.push({ file, tipoAnexoId: AnexoTypes.ANEXO.id })
        })
      }
      if (memorialCompletoPdf) {
        filesToSend.push({ file: memorialCompletoPdf, tipoAnexoId: AnexoTypes.ESQUEMA.id })
      }

      filesToSend.forEach(({ file, tipoAnexoId }) => {
        formDataToSend.append('files', file)
        formDataToSend.append('tipoAnexoIds', tipoAnexoId.toString())
      })

      let cadastroPrototipoRecord = {
        idEquipe: formValues.idEquipe,
        problemaPrincipal: formValues.problemaPrincipal,
        propostaValor: formValues.propostaValor,
        vantagemCompetitiva: formValues.vantagemCompetitiva,
        principaisNecessidades: formValues.principaisNecessidades,
        parcerias: formValues.parcerias,
        tipoApoio: formValues.tipoApoio,
      }

      const cadastroPrototipoRecordWithIdPrototipo = teamPrototyping
        ? { ...cadastroPrototipoRecord, idPrototipo: teamPrototyping?.id }
        : cadastroPrototipoRecord


      // Adiciona o CadastroPrototipoRecord como um JSON Blob ao FormData
      const jsonBlob = new Blob([JSON.stringify(cadastroPrototipoRecordWithIdPrototipo)], {
        type: 'application/json',
      })

      if (teamPrototyping) {
        formDataToSend.append('dtoPrototipo', jsonBlob)

      } else {
        formDataToSend.append('cadastroPrototipoRecord ', jsonBlob)
      }


      if (teamPrototyping) {
        try {
          await updateTeamPrototype({ id, data: formDataToSend }).unwrap()
          enqueueSnackbar('Prototipo atualizado com sucesso!', { variant: 'success' })
          setSucess(true)
        } catch (error: any) {
          enqueueSnackbar(`${error?.data || 'Erro ao editar protótipo.'}`, { variant: 'error' })
          console.error(error)
        }
      } else {
        try {
          await createTeamPrototype(formDataToSend).unwrap()
          enqueueSnackbar('Prototipo cadastrado com sucesso!', { variant: 'success' })
          setSucess(true)
        } catch (error: any) {
          enqueueSnackbar(`${error?.data || 'Erro ao cadastrar protótipo.'}`, { variant: 'error' })
          console.error(error)
        }
      }

    } catch (error: any) {
      enqueueSnackbar(`${error?.data || 'Ocorreu um erro no processamento.'}`, { variant: 'error' })
    }

  }

  if (isLoading) return <div className='text-center'><CircularProgress /></div>


  return (
    <form onSubmit={handleSubmit}
      className="text-center p-8 max-w-7xl mx-auto text-pretty text-[#3C14A4] bg-gray-50 shadow-md rounded-lg">
      <div className="text-center flex justify-between max-w-2xl mx-auto mb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-2 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-600 text-sm">
          <ArrowBackIcon />
        </button>
        <h2 className="text-2xl font-bold text-center">Prototipação - Time: {teamName}</h2>

      </div>
      <h1 className="font-bold text-2xl max-w-4xl mx-auto mb-12">
        DLEI - Formulário p/ Cadastramento da Proposta do Protótipo da Solução do Problema da Instituição de Impacto Social - Protótipo Versão Física ou Digital
      </h1>

      <div className="bg-[#075e95] text-white p-6 rounded-xl shadow-lg max-w-7xl mx-auto mb-8 text-left grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs flex flex-col justify-between h-full">
          <p className="font-semibold text-base mb-3 text-white">
            TEXTO (BREVE DESCRIÇÃO DO TIME, PROJETO E PRODUTO).
          </p>
          <div className="mt-auto">
            <TextAreaComponent
              placeholder="Digite sua resposta para o tipo de apoio"
              value={formValues?.tipoApoio}
              onChange={(e) => handleValueChange(e.target.value, "tipoApoio")}
              maxLength={500}
            />
          </div>
        </div>

        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs flex flex-col justify-between h-full">
          <p className="font-semibold text-base mb-3 text-white">
            ANEXE ADICIONALMENTE ESQUEMAS, IMAGENS, FIGURAS, FOTOS, VÍDEOS, SE ACHAR NECESSÁRIO
          </p>
          <div className="mt-auto">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleEsquemaChange}
              id={AnexoTypes.ANEXO.descricao}
              className={inputClasses}
            />
            {teamPrototyping?.anexos && (
              <FileDownload anexos={teamPrototyping.anexos}
                type={AnexoTypes.ANEXO.descricao} />
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#628e48] opacity-80 text-white p-6 rounded-xl shadow-lg max-w-7xl mx-auto mb-8 text-left space-y-6">
        <h3 className="text-xl font-bold border-b border-white/30 pb-2 text-white text-center uppercase tracking-wide">
          Detalhamento da Solução e Parcerias
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs flex flex-col justify-between h-full">
            <p className="font-semibold text-base mb-3">
              DEPOIS DA VISITA ÀS INSTITUIÇÕES DE IMPACTO SOCIAL (IIS) E DO QUE VIVENCIAMOS NO HACKATHON DAY, QUAL O PROBLEMA PRINCIPAL E DEFINITIVO DA IIS QUE VOCÊS ESCOLHERAM, QUE ESTÁ ASSOCIADO AOS ODS's, PARA O QUAL FOI CONCEBIDA UM PROTÓTIPO / SOLUÇÃO INICIAL?
            </p>
            <div className="mt-auto">
              <TextAreaComponent
                placeholder="Digite sua resposta para o problema principal"
                value={formValues.problemaPrincipal}
                onChange={(e) => handleValueChange(e.target.value, "problemaPrincipal")}
                label="Problema Principal"
                maxLength={500}
              />
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs flex flex-col justify-between h-full">
            <p className="font-semibold text-base mb-3 text-white">
              QUAL A PROPOSTA DE VALOR DO PROTÓTIPO DA SOLUÇÃO, ISTO É, COMO O PRODUTO OU SERVIÇO IDEALIZADO RESOLVE O PROBLEMA DA IIS ESCOLHIDA PELO SEU TIME?
            </p>
            <div className="mt-auto">
              <TextAreaComponent
                placeholder="Digite sua resposta para a proposta de valor"
                value={formValues.propostaValor}
                onChange={(e) => handleValueChange(e.target.value, "propostaValor")}
                label="Proposta de Valor"
                maxLength={500}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs flex flex-col justify-between h-full">
            <p className="font-semibold text-base mb-3 text-white">
              QUANDO COMPARADA COM OUTRAS SOLUÇÕES JÁ EXISTENTES NO MERCADO, QUAIS AS VANTAGENS COMPETITIVAS DO PROTÓTIPO DA SOLUÇÃO IDEALIZADA PELO TIME P/ RESOLVER O PROBLEMA DA IIS?
            </p>
            <div className="mt-auto">
              <TextAreaComponent
                placeholder="Digite sua resposta para as vantagens competitivas"
                value={formValues.vantagemCompetitiva}
                onChange={(e) => handleValueChange(e.target.value, "vantagemCompetitiva")}
                maxLength={500}
              />
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs flex flex-col justify-between h-full">
            <p className="font-semibold text-base mb-3 text-white">
              QUAIS AS PRINCIPAIS NECESSIDADES DO SEU TIME P/ DESENVOLVIMENTO COMPLETO DO PROTÓTIPO DA SOLUÇÃO?
            </p>
            <div className="mt-auto">
              <TextAreaComponent
                placeholder="Digite sua resposta para as principais necessidades"
                value={formValues.principaisNecessidades}
                onChange={(e) => handleValueChange(e.target.value, "principaisNecessidades")}
                maxLength={500}
              />
            </div>
          </div>
        </div>

        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs flex flex-col justify-between h-full">
          <p className="font-semibold text-base mb-3 text-white">
            QUAIS PARCERIAS SERIAM BEM-VINDAS PARA O APRIMORAMENTO DO PROTÓTIPO DA SOLUÇÃO, TAIS COMO: EMPRESAS ESTABELECIDAS, LABORATÓRIOS DE UNIVERSIDADES, ENTIDADES DO SISTEMA S, PARQUE TECNOLÓGICO, INCUBADORA DE EMPRESA?
          </p>
          <div className="mt-auto">
            <TextAreaComponent
              placeholder="Digite sua resposta para as parcerias"
              value={formValues.parcerias}
              onChange={(e) => handleValueChange(e.target.value, "parcerias")}
              maxLength={500}
            />
          </div>
        </div>
      </div>

      {/* Sessão 2: Cronograma e Memorial Descritivo (Fundo #628e48) */}
      <div className="bg-[#d56928]  text-white p-6 rounded-xl shadow-lg max-w-7xl mx-auto mb-8 text-left space-y-6">
        <h3 className="text-xl font-bold border-b border-white/30 pb-2 text-white text-center uppercase tracking-wide">
          Cronograma, Memoriais e Anexos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs flex flex-col justify-between h-full">
            <p className="font-semibold text-base mb-3 text-white">
              QUAL O CRONOGRAMA DE CONSTRUÇÃO DO PROTÓTIPO DA SOLUÇÃO DEFINITIVA ATÉ SUA VERSÃO FINAL (NOS PRÓXIMOS DOIS MESES - 12/08 A 12/10)?
            </p>
            <div className="mt-auto">
              <input
                type="file"
                accept="image/*"
                onChange={handleCronogramaChange}
                id={AnexoTypes.CRONOGRAMA_CONSTRUCAO.descricao}
                className={inputClasses}
              />
            </div>
            {teamPrototyping?.anexos && (
              <FileDownload anexos={teamPrototyping.anexos}
                type={AnexoTypes.CRONOGRAMA_CONSTRUCAO.descricao} />
            )}
          </div>

          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs flex flex-col justify-between h-full">
            <p className="font-semibold text-base mb-3 text-white">
              MEMORIAL DESCRITIVO SIMPLIFICADO (DESCRIÇÃO RESUMIDA DAS PRINCIPAIS FUNCIONALIDADES DO PROTÓTIPO DA SOLUÇÃO)
            </p>
            <div className="mt-auto">
              <input
                type="file"
                accept="image/*"
                onChange={handleMemorialChange}
                id={AnexoTypes.MEMORIAL_DESCRITIVO.descricao}
                className={inputClasses}
              />
            </div>
            {teamPrototyping?.anexos && (
              <FileDownload anexos={teamPrototyping.anexos}
                type={AnexoTypes.MEMORIAL_DESCRITIVO.descricao} />
            )}
          </div>
        </div>
      </div>


      <div className="bg-[#9d9b9b]  text-white p-6 rounded-xl shadow-lg max-w-7xl mx-auto mb-8 text-left space-y-6">
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs">
          <p className="font-semibold text-base mb-3 text-white">
            MEMORIAL DESCRITIVO COMPLETO (DESCRIÇÃO DETALHADA DAS FUNCIONALIDADES DO PROTÓTIPO DA SOLUÇÃO)
          </p>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleMemorialCompletoChange}
            id={AnexoTypes.ESQUEMA.descricao}
            className={inputClasses}
          />
          {teamPrototyping?.anexos && (
            <FileDownload anexos={teamPrototyping.anexos}
              type={AnexoTypes.ESQUEMA.descricao} />
          )}
        </div>
      </div>

      <div className='text-center flex justify-between max-w-7xl mx-auto'>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-2 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-600 mt-8 text-sm">
          <ArrowBackIcon />
        </button>

        <LoadingButton
          loading={creating || updating}
          disabled={creating || updating}
          variant="contained"
          type="submit"
          className="mt-6 px-2 py-1 normal-case bg-[#5741A6]
        hover:bg-white hover:text-green-600 transition-all text-white rounded-lg shadow-lg">
          {success && <CheckCircleIcon style={{ color: 'lightgreen' }} className=' mr-1' />}

          <span>
            {teamPrototyping ? updating ? '' : updated ? 'Editado' : 'Editar' :
              creating ? '' : created ? 'Cadastrado' : 'Cadastrar'}
          </span>
        </LoadingButton>
      </div>

    </form>
  )
}
