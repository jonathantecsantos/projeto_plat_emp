import { LoadingButton } from "@mui/lab"
import { CircularProgress } from "@mui/material"
import { useSnackbar } from "notistack"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useCreateTeamPrototypingMutation, useGetTeamPrototypingByIdQuery, useUpdateTeamPrototypingMutation } from "../../../api/studentApi"
import { inputClasses } from "../../../globals"
import { AnexoTypes, Prototype } from "../../../model/prototyping"
import { Institutions } from "../../../utils/types"
import { InputComponent } from "../common/input"
import { FileDownload } from "./fileDownload"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'


export const TeamPrototyping = ({ id }: { id: number }) => {
  const [createTeamPrototype, { isLoading: creating, isSuccess: created }] = useCreateTeamPrototypingMutation()
  const { data: teamPrototyping, isLoading } = useGetTeamPrototypingByIdQuery(id)
  const [updateTeamPrototype, { isLoading: updating, isSuccess: updated }] = useUpdateTeamPrototypingMutation()
  const [institution, setInstitution] = useState<string | null>(null)
  const [success, setSucess] = useState(created || updated)
  const { enqueueSnackbar } = useSnackbar()
  const [visibleItems, setVisibleItems] = useState(5) // Inicia com 5 itens visíveis
  const [formValues, setFormValues] = useState<Prototype>({
    idEquipe: id,
    instituicaoImpactoSocial: institution || '',
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
        instituicaoImpactoSocial: teamPrototyping.instituicaoImpactoSocial || '',
        problemaPrincipal: teamPrototyping.problemaPrincipal || '',
        propostaValor: teamPrototyping.propostaValor || '',
        vantagemCompetitiva: teamPrototyping.vantagemCompetitiva || '',
        principaisNecessidades: teamPrototyping.principaisNecessidades || '',
        parcerias: teamPrototyping.parcerias || '',
        tipoApoio: teamPrototyping.tipoApoio || '',
      })
      setInstitution(teamPrototyping.instituicaoImpactoSocial || null) // Para o campo de Instituições
    }
  }, [teamPrototyping, id])

  // Estados para gerenciar os arquivos
  const [cronogramaFile, setCronogramaFile] = useState<File | null>(null)
  const [anexosFile, setAnexoFile] = useState<File[]>([])
  const [memorialFile, setMemorialFile] = useState<File | null>(null)
  const [esquemaFiles, setEsquemaFiles] = useState<File[]>([])

  const handleInstitutionChange = (inst: string) => {
    setInstitution(inst === institution ? null : inst)
    setFormValues((prev) => ({ ...prev, instituicaoImpactoSocial: inst }))
  }

  // Função genérica para atualizar os valores dos inputs de texto
  const handleValueChange = (newValue: string, field: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: newValue,
    }))
  }

  // Funções de onChange para os inputs de arquivos
  const handleCronogramaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCronogramaFile(e.target.files?.[0] || null)
  }

  const handleAnexoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnexoFile(Array.from(e.target.files || []))
  }

  const handleMemorialChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMemorialFile(e.target.files?.[0] || null)
  }

  const handleEsquemaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEsquemaFiles(Array.from(e.target.files || []))
  }



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (anexosFile.length > 3) {
      enqueueSnackbar('Você pode enviar no máximo 3 arquivos no campo Anexos!', { variant: 'error' })
      return
    }

    if (esquemaFiles.length > 3) {
      enqueueSnackbar('Você pode enviar no máximo 3 arquivos no campo Esquemas!', { variant: 'error' })
      return
    }
    
    try {
      const formDataToSend = new FormData()

      const filesToSend: Array<{ file: File, tipoAnexoId: number }> = []
      if (cronogramaFile) {
        filesToSend.push({ file: cronogramaFile, tipoAnexoId: AnexoTypes.CRONOGRAMA_CONSTRUCAO.id })
      }
      if (anexosFile) {
        anexosFile.forEach((file) => {
          filesToSend.push({ file, tipoAnexoId: AnexoTypes.ANEXO.id })
        })
      }
      if (memorialFile) {
        filesToSend.push({ file: memorialFile, tipoAnexoId: AnexoTypes.MEMORIAL_DESCRITIVO.id })
      }
      if (esquemaFiles.length > 0) {
        esquemaFiles.forEach((file) => {
          filesToSend.push({ file, tipoAnexoId: AnexoTypes.ESQUEMA.id })
        })
      }

      filesToSend.forEach(({ file, tipoAnexoId }) => {
        formDataToSend.append('files', file)
        formDataToSend.append('tipoAnexoIds', tipoAnexoId.toString())
      })

      //criar maneira de validar os campos de inputs esquemaFiles e anexosFile para nao deixar enviar mais de 3 itens

      let cadastroPrototipoRecord = {
        idEquipe: formValues.idEquipe,
        instituicaoImpactoSocial: formValues.instituicaoImpactoSocial,
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

      //debug
      const blobText = await jsonBlob.text()
      console.log('Conteúdo do Blob:', blobText)
      formDataToSend.forEach((value, key) => {
        console.log(`${key}:`, value)
      })


      if (teamPrototyping) {
        try {
          await updateTeamPrototype({ id, data: formDataToSend }).unwrap()
          enqueueSnackbar('Prototipo atualizado com sucesso!', { variant: 'success' })
          setSucess(true)
        } catch (error: any) {
          enqueueSnackbar(`${error?.data}`, { variant: 'error' })
          console.error(error)
        }
      } else {
        try {
          await createTeamPrototype(formDataToSend).unwrap()
          enqueueSnackbar('Prototipo cadastrado com sucesso!', { variant: 'success' })
          setSucess(true)
        } catch (error: any) {
          enqueueSnackbar(`${error?.data}`, { variant: 'error' })
          console.error(error)
        }
      }

    } catch (error: any) {
      enqueueSnackbar(`${error?.data}`, { variant: 'error' })
      console.log(error?.data)
    }


  }

  const handleShowMoreToggle = () => {
    // Mostra mais 15 itens a cada clique
    setVisibleItems((prev) => prev + 15)
  }

  if (isLoading) return <div className='text-center'><CircularProgress /></div>


  return (
    <form onSubmit={handleSubmit}
      className="text-center p-8 bg-gradient-to-b from-[#3B1E86] to-[#4319AF] text-white rounded-lg">
      <h1 className="font-bold text-2xl max-w-4xl mx-auto mb-6">
        DLEI 2024 - Formulário p/ Cadastramento da Proposta do Protótipo da Solução do Problema da Instituição de Impacto Social - Protótipo Versão Física ou Digital
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8">
        <p className="text-[#3C14A4] font-semibold text-lg mb-4">
          QUAL A INSTITUIÇÃO DE IMPACTO SOCIAL (IIS) NA QUAL FOI IDENTIFICADO O PROBLEMA E PARA A QUAL FOI CONCEBIDO O PROTÓTIPO DA SOLUÇÃO E QUE SERÁ BENEFICIÁRIA DO SEU TIME / EMPRESA?
        </p>

        {Institutions.slice(0, visibleItems).map((inst, index) => (
          <div
            key={index}
            className="flex items-center justify-start my-2 transition-all duration-300 hover:bg-[#9F8FD9] hover:bg-opacity-20 rounded p-2"
          >
            <input
              type="checkbox"
              id={`inst-${index}`}
              checked={institution === inst}
              onChange={() => handleInstitutionChange(inst)}
              className="mr-3 h-5 w-5 text-[#4319AF] border-gray-300 focus:ring-[#5741A6]"
            />
            <label htmlFor={`inst-${index}`} className="cursor-pointer text-gray-800">
              {inst}
            </label>
          </div>
        ))}

        {/* Ver mais botão */}
        {visibleItems < Institutions.length && (
          <button
            type="button"
            onClick={handleShowMoreToggle}
            className="mt-4 text-[#4319AF] font-semibold transition-all hover:text-[#5741A6] hover:underline"
          >
            Ver Mais
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8">
        <p className="text-[#3C14A4] font-semibold text-lg mb-4">
          DEPOIS DA VISITA ÀS INSTITUIÇÕES DE IMPACTO SOCIAL (IIS) E DO QUE VIVENCIAMOS NO HACKATHON DAY, QUAL O PROBLEMA PRINCIPAL E DEFINITIVO DA IIS QUE VOCÊS ESCOLHERAM, QUE ESTÁ ASSOCIADO AOS ODS's, PARA O QUAL FOI CONCEBIDA UM PROTÓTIPO / SOLUÇÃO INICIAL?
        </p>
        <InputComponent
          placeholder="Digite sua resposta para o problema principal"
          id="problemaPrincipal"
          type="text"
          value={formValues.problemaPrincipal}
          onChange={(e) => handleValueChange(e.target.value, "problemaPrincipal")}
          label="Problema Principal"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8">
        <p className="text-[#3C14A4] font-semibold text-lg mb-4">
          QUAL A PROPOSTA DE VALOR DO PROTÓTIPO DA SOLUÇÃO, ISTO É, COMO O PRODUTO OU SERVIÇO IDEALIZADO RESOLVE O PROBLEMA DA IIS ESCOLHIDA PELO SEU TIME?
        </p>
        <InputComponent
          placeholder="Digite sua resposta para a proposta de valor"
          id="propostaValor"
          type="text"
          value={formValues.propostaValor}
          onChange={(e) => handleValueChange(e.target.value, "propostaValor")}
        />
      </div>


      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8">
        <p className="text-[#3C14A4] font-semibold text-lg mb-4">
          QUANDO COMPARADA COM OUTRAS SOLUÇÕES JÁ EXISTENTES NO MERCADO,  QUAIS AS VANTAGENS COMPETITIVAS DO PROTÓTIPO DA SOLUÇÃO IDEALIZADA PELO TIME P/ RESOLVER O PROBLEMA DA IIS?
        </p>
        <InputComponent
          placeholder="Digite sua resposta para as vantagens competitivas"
          id="vantagemCompetitiva"
          type="text"
          value={formValues.vantagemCompetitiva}
          onChange={(e) => handleValueChange(e.target.value, "vantagemCompetitiva")}

        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8">
        <p className="text-[#3C14A4] font-semibold text-lg mb-4">
          QUAIS AS PRINCIPAIS NECESSIDADES DO SEU TIME P/ DESENVOLVIMENTO COMPLETO DO PROTÓTIPO DA SOLUÇÃO?
        </p>
        <InputComponent
          placeholder="Digite sua resposta para as principais necessidades"
          id="principaisNecessidades"
          value={formValues.principaisNecessidades}
          onChange={(e) => handleValueChange(e.target.value, "principaisNecessidades")}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8">
        <p className="text-[#3C14A4] font-semibold text-lg mb-4">
          QUAIS PARCERIAS SERIAM BEM-VINDAS PARA O APRIMORAMENTO DO PROTÓTIPO DA SOLUÇÃO, TAIS COMO: EMPRESAS ESTABELECIDAS, LABORATÓRIOS DE UNIVERSIDADES, ENTIDADES DO SISTEMA S, PARQUE TECNOLÓGICO, INCUBADORA DE EMPRESA?
        </p>
        <InputComponent
          placeholder="Digite sua resposta para as parcerias"
          id="parcerias"
          value={formValues.parcerias}
          onChange={(e) => handleValueChange(e.target.value, "parcerias")}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8">
        <p className="text-[#3C14A4] font-semibold text-lg mb-4">
          QUE TIPO DE APOIO SERIA NECESSÁRIO DESSAS ENTIDADES / EMPRESAS / ICTs PARCEIRAS?
        </p>
        <InputComponent
          placeholder="Digite sua resposta para o tipo de apoio"
          id="tipoApoio"
          value={formValues.tipoApoio}
          onChange={(e) => handleValueChange(e.target.value, "tipoApoio")}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8">
        <p className="text-[#3C14A4] font-semibold text-lg mb-4">
          QUAL O CRONOGRAMA DE CONSTRUÇÃO DO PROTÓTIPO DA SOLUÇÃO DEFINITIVA ATÉ SUA VERSÃO FINAL (NOS PRÓXIMOS DOIS MESES - 12/08 A 12/10)?
        </p>
        <input
          type="file"
          onChange={handleCronogramaChange}
          id={AnexoTypes.CRONOGRAMA_CONSTRUCAO.descricao}
          className={inputClasses}
        />
        {teamPrototyping?.anexos && (
          <FileDownload anexos={teamPrototyping.anexos}
            type={AnexoTypes.CRONOGRAMA_CONSTRUCAO.descricao} />
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8">
        <p className="text-[#3C14A4] font-semibold text-lg mb-4">
          ANEXOS (NÃO OBRIGATÓRIOS, MAS QUE PODEM AJUDAR MUITO NO DESENVOLVIMENTO DO SEU PROTÓTIPO DA SOLUÇÃO)
        </p>
        <input
          type="file"
          multiple
          onChange={handleAnexoChange}
          id={AnexoTypes.ANEXO.descricao}
          className={inputClasses}
        />

        {teamPrototyping?.anexos && (
          <FileDownload anexos={teamPrototyping.anexos}
            type={AnexoTypes.ANEXO.descricao} />
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8">
        <p className="text-[#3C14A4] font-semibold text-lg mb-4">
          MEMORIAL DESCRITIVO (DESCRIÇÃO DAS PRINCIPAIS FUNCIONALIDADES DO PROTÓTIPO DA SOLUÇÃO):
        </p>
        <input
          type="file"
          onChange={handleMemorialChange}
          id={AnexoTypes.MEMORIAL_DESCRITIVO.descricao}
          className={inputClasses}
        />
        {teamPrototyping?.anexos && (
          <FileDownload anexos={teamPrototyping.anexos}
            type={AnexoTypes.MEMORIAL_DESCRITIVO.descricao} />
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-8">
        <p className="text-[#3C14A4] font-semibold text-lg mb-4">
          ANEXE ADICIONALMENTE ESQUEMAS, IMAGENS, FIGURAS, FOTOS, VÍDEOS, SE ACHAR NECESSÁRIO:
        </p>
        <input
          type="file"
          multiple
          onChange={handleEsquemaChange}
          id={AnexoTypes.ESQUEMA.descricao}
          className={inputClasses}
        />
        {teamPrototyping?.anexos && (
          <FileDownload anexos={teamPrototyping.anexos}
            type={AnexoTypes.ESQUEMA.descricao} />
        )}
      </div>


      <LoadingButton
        loading={creating || updating}
        disabled={creating || updating}
        variant="contained"
        type="submit"
        className="mt-6 p-3 normal-case bg-[#5741A6]
        hover:bg-white hover:text-green-600 transition-all text-white rounded-lg shadow-lg">
        {success && <CheckCircleIcon style={{ color: 'lightgreen' }} className=' mr-1' />}

        <span>
          {teamPrototyping ? updating ? 'Editando...' : updated ? 'Editado' : 'Editar' :
            creating ? 'Cadastrando...' : created ? 'Cadastrado' : 'Cadastrar'}
        </span>
      </LoadingButton>
    </form>
  )
}
