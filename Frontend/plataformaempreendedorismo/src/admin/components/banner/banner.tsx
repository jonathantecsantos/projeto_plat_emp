import { Avatar, CircularProgress } from "@mui/material"
import { useSnackbar } from "notistack"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { useCreateBannerMutation, useGetBannerByIdQuery, useUpdateBannerMutation } from "../../../api/studentApi"
import { toggleLoading } from "../../../redux/reducers/loadingBar.slice"
import { avatarImage, placeholderImages } from "../../../utils/types"

const fieldLabels: Record<string, string> = {
  atividadeChaveQ1: "Atividade Chave",
  recursosQ1: "Recursos",
  custosQ1: "Custos",
  equipeQ1: "Equipe",
  parceiroQ1: "Parceiro",
  contextoProblemaQ3: "Contexto e Problema",
  publicoFocoImpactoQ3: "Público Foco / Impacto",
  intervencoesQ3: "Intervenções (estratégias)",
  saidasQ3: "Saídas / Outputs",
  resultadosCurtoPrazoQ3: "Resultados Curto Prazo",
  resultadosMedioPrazoQ3: "Resultados Médio Prazo",
  visaoImpactoQ3: "Visão de Impacto",
  textoDescricaoQ0: "Descrição do Texto",
  oportunidadeNegQ2: "Oportunidade de Mercado",
  custoQ2: "Custos",
  propostaValorQ2: "Proposta de Valor",
  fonteReceitaQ2: "Fonte de Receita",
  resultadoFinanceiroQ2: "Resultado Financeiro",
}

const bannerValidationSchema = z.object({
  idEquipeQ0: z.number(),
  //Team
  files: z
    .array(z.instanceof(File))
    // .min(1, "É necessário enviar pelo menos um arquivo.")
    .nullable(),
  fileLogotipo: z
    .instanceof(File)
    .nullable(),
  // .refine((file) => file !== null, "O arquivo de logotipo é obrigatório."),
  // file: z.instanceof(File).nullable(),
  textoDescricaoQ0: z.string().max(900, "Máximo de 900 caracteres permitidos"),

  //Capacidade organizazional
  equipeQ1: z.string().max(300, "Máximo de 300  caracteres permitidos"),
  parceiroQ1: z.string().max(300, "Máximo de 300 caracteres permitidos"),
  atividadeChaveQ1: z.string().max(300, "Máximo de 300 caracteres permitidos"),
  recursosQ1: z.string().max(300, "Máximo de 300 caracteres permitidos"),
  custosQ1: z.string().max(300, "Máximo de 300  caracteres permitidos"),

  //Fluxo de negocio
  oportunidadeNegQ2: z.string().max(300, "Máximo de 300 caracteres permitidos"),
  custoQ2: z.string().max(300, "Máximo de 300  caracteres permitidos"),
  propostaValorQ2: z.string().max(300, "Máximo de 300  caracteres permitidos"),
  fonteReceitaQ2: z.string().max(300, "Máximo de 300  caracteres permitidos"),
  resultadoFinanceiroQ2: z.string().max(300, "Máximo de 300  caracteres permitidos"),

  //Teoria de mudança
  contextoProblemaQ3: z.string().max(300, "Máximo de 300  caracteres permitidos"),
  publicoFocoImpactoQ3: z.string().max(300, "Máximo de 300  caracteres permitidos"),
  intervencoesQ3: z.string().max(300, "Máximo de 300  caracteres permitidos"),
  saidasQ3: z.string().max(300, "Máximo de 300  caracteres permitidos"),
  resultadosCurtoPrazoQ3: z.string().max(300, "Máximo de 300  caracteres permitidos"),
  resultadosMedioPrazoQ3: z.string().max(300, "Máximo de 300  caracteres permitidos"),
  visaoImpactoQ3: z.string().max(300, "Máximo de 300  caracteres permitidos"),
})

export interface BannerFormData {
  [key: string]: string | number | File | null | File[]
}

interface BannerComponentProps {
  id: number
  teamName: string
}

export const BannerComponent = ({ id, teamName }: BannerComponentProps) => {
  const { data, isLoading: bannerInfoLoading } = useGetBannerByIdQuery(id)
  const [createBanner, { isLoading }] = useCreateBannerMutation()
  const [updateBanner,] = useUpdateBannerMutation()
  const [formData, setFormData] = useState<BannerFormData>({
    atividadeChaveQ1: "",
    contextoProblemaQ3: "",
    textoDescricaoQ0: "",
    resultadosMedioPrazoQ3: "",
    recursosQ1: "",
    fonteReceitaQ2: "",
    idEquipeQ0: id,
    publicoFocoImpactoQ3: "",
    propostaValorQ2: "",
    oportunidadeNegQ2: "",
    equipeQ1: "",
    custosQ1: "",
    resultadoFinanceiroQ2: "",
    saidasQ3: "",
    visaoImpactoQ3: "",
    custoQ2: "",
    parceiroQ1: "",
    intervencoesQ3: "",
    resultadosCurtoPrazoQ3: "",
    files: [],
    fileLogotipo: null,
  })

  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Partial<Record<keyof BannerFormData, string>>>({})

  const imageUrls = data?.anexos
    ?.filter((anexo) => anexo.tipoAnexo !== "LOGOTIPO") // Remove o logotipo
    ?.map((anexo) => anexo.caminhoAnexo.replace("C:\\Users\\wnn-dev\\Pictures\\uploads\\", "http://localhost:8080/uploads/"))

  const avatar = data?.anexos?.find((anexo) => anexo.tipoAnexo === "LOGOTIPO")?.caminhoAnexo.replace(
    "C:\\Users\\wnn-dev\\Pictures\\uploads\\",
    "http://localhost:8080/uploads/")

  useEffect(() => {
    if (data) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        atividadeChaveQ1: data.atividadeChaveQ1,
        contextoProblemaQ3: data.contextoProblemaQ3,
        textoDescricaoQ0: data.textoDescricaoQ0,
        resultadosMedioPrazoQ3: data.resultadosMedioPrazoQ3,
        recursosQ1: data.recursosQ1,
        fonteReceitaQ2: data.fonteReceitaQ2,
        publicoFocoImpactoQ3: data.publicoFocoImpactoQ3,
        propostaValorQ2: data.propostaValorQ2,
        oportunidadeNegQ2: data.oportunidadeNegQ2,
        equipeQ1: data.equipeQ1,
        custosQ1: data.custosQ1,
        resultadoFinanceiroQ2: data.resultadoFinanceiroQ2,
        saidasQ3: data.saidasQ3,
        visaoImpactoQ3: data.visaoImpactoQ3,
        custoQ2: data.custoQ2,
        parceiroQ1: data.parceiroQ1,
        intervencoesQ3: data.intervencoesQ3,
        resultadosCurtoPrazoQ3: data.resultadosCurtoPrazoQ3, 
      }))
    }
  }, [data])


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    try {
      bannerValidationSchema.parse({
        ...formData,
        [e.target.name]: e.target.value,
      })
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [e.target.name]: error.errors[0].message }))
      }
    }
  }

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      files: Array.from(e.target.files || [])
    })
  }

  const handleFileLogotipoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      fileLogotipo: e.target.files ? e.target.files[0] : null,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      dispatch(toggleLoading())
      const validatedData = bannerValidationSchema.parse({
        ...formData,
        files: formData.files,
        fileLogotipo: formData.fileLogotipo
      })
      const formDataToSend = new FormData()

      if (Array.isArray(formData.files) && formData.files.length > 0) {
        formData.files.forEach((file) => {
          formDataToSend.append("files", file)
        })
      }

      if (validatedData.fileLogotipo) {
        formDataToSend.append("fileLogotipo", validatedData.fileLogotipo)
      }

      const jsonBlob = new Blob(
        [JSON.stringify({ ...validatedData, files: undefined, fileLogotipo: undefined, ...(data ? { id: data.id } : {}) })],
        { type: "application/json" }
      )
      formDataToSend.append("cadastroBannerRecord", jsonBlob)

      if (data) {
        await updateBanner({ id: id, data: formDataToSend }).unwrap()
        enqueueSnackbar("Banner editado com sucesso!", { variant: 'success' })
        navigate(-1)
      } else {
        await createBanner(formDataToSend).unwrap()
        enqueueSnackbar("Banner cadastrado com sucesso!", { variant: 'success' })
        navigate(-1)
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof BannerFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0] in formData) {
            newErrors[err.path[0] as keyof BannerFormData] = err.message
          }
        })
        setErrors(newErrors)
      } else {
        enqueueSnackbar("Erro ao registrar banner!", { variant: 'error' })
      }
    } finally {
      dispatch(toggleLoading())
    }
  }



  if (bannerInfoLoading) return <div className='text-center'><CircularProgress /></div>

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-20">Cadastrar Banner - Time: {teamName}</h2>
      {/* Upload de Arquivo */}
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-blue-600 mb-8">Imagens e Descrição do Projeto</h3>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Imagens (Selecione até 04 imagens de até 10MB cada).
          </label>
          <input
            type="file"
            id="files"
            name="files"
            multiple
            onChange={handleFilesChange}
            className="w-full border border-blue-500 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.files && <p className="text-red-500 text-sm">{errors.files}</p>}
          <div className="p-2 flex w-full">
            {imageUrls && imageUrls.length > 0 && <div className="grid grid-cols-2 gap-1 w-full">
              {(imageUrls && imageUrls.length > 0 ? imageUrls : placeholderImages).map((image, index) => (
                <div
                  key={index}
                  className="w-full h-full bg-green-500 flex items-center justify-center overflow-hidden rounded-md"
                >
                  <img
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>}
          </div>
        </div>

        <div className="mb-10">
          <label htmlFor="fileLogotipo" className="block  text-sm font-medium text-gray-700">
            Logotipo (Selecione uma imagem de até 10MB).
          </label>
          <input
            type="file"
            id="fileLogotipo"
            name="fileLogotipo"
            onChange={handleFileLogotipoChange}
            className="w-full border border-blue-500 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.fileLogotipo && <p className="text-red-500 text-sm">{errors.fileLogotipo}</p>}
          {avatar && avatar.length > 0 && <div className="flex justify-start items-center my-2">
            <Avatar
              className="mr-2 w-20 h-20 print:h-14 print:w-14"
              src={avatar ? avatar : avatarImage}
              alt="Avatar"
            />
          </div>}
        </div>


        <label htmlFor={formData.textoDescricaoQ0 as string} className="block text-sm font-medium text-gray-700 mt-4">
          Texto (Breve descrição do time, projeto e produto).
        </label>
        <textarea
          name="textoDescricaoQ0"
          value={formData.textoDescricaoQ0 as string}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md w-full h-60"
        />
        {errors.textoDescricaoQ0 && (
          <p className="text-red-500 text-sm">{errors.textoDescricaoQ0}</p>
        )}
      </div>

      {/* Capacidade Organizacional */}
      <div className="bg-orange-100 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-orange-600 mb-4">Capacidade Organizacional</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["equipeQ1", "parceiroQ1", "atividadeChaveQ1", "recursosQ1", "custosQ1"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {fieldLabels[field]}
              </label>
              <textarea
                id={field}
                name={field}
                value={formData[field] as string}
                onChange={handleChange}
                className="w-full h-20 border border-orange-500 p-2 rounded-md focus:ring-2 focus:ring-orange-500"
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Fluxo de Negócio */}
      <div className="bg-pink-100 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-pink-600 mb-4">Fluxo de Negócio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["oportunidadeNegQ2", "custoQ2", "propostaValorQ2", "fonteReceitaQ2", "resultadoFinanceiroQ2"].map(
            (field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {fieldLabels[field]}
                </label>
                <textarea
                  id={field}
                  name={field}
                  value={formData[field] as string}
                  onChange={handleChange}
                  className="w-full h-20 border border-pink-500 p-2 rounded-md focus:ring-2 focus:ring-pink-500"
                />
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            )
          )}
        </div>
      </div>

      {/* Teoria de Mudança */}
      <div className="bg-purple-100 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-purple-600 mb-4">Teoria de Mudança</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "contextoProblemaQ3",
            "publicoFocoImpactoQ3",
            "intervencoesQ3",
            "saidasQ3",
            "resultadosCurtoPrazoQ3",
            "resultadosMedioPrazoQ3",
            "visaoImpactoQ3",
          ].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {fieldLabels[field]}
              </label>
              <textarea
                id={field}
                name={field}
                value={formData[field] as string}
                onChange={handleChange}
                className="w-full h-20 border border-purple-500 p-2 rounded-md focus:ring-2 focus:ring-purple-500"
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}
        </div>

      </div>

      <div className="text-center">
        <button
          type="submit"
          className={`px-6 py-2 font-semibold rounded-md text-white ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Cadastrar Banner"}
        </button>
      </div>
    </form>
  )
}
