import { ChangeEvent, FormEvent, useState } from "react"
import { z } from "zod"
import { useCreateBannerMutation } from "../../../api/studentApi"
import { Banner } from "../../../model/banner"

const fieldLabels: Record<string, string> = {
  atividadeChaveQ1: "Atividade Chave",
  recursosQ1: "Recursos",
  custosQ1: "Custos",
  equipeQ1: "Equipe",
  parceiroQ1: "Parceiro",
  contextoProblemaQ3: "Contexto e Problema",
  publicoFocoImpactoQ3: "Público Foco Impacto",
  intervencoesQ3: "Intervenções",
  saidasQ3: "Saídas",
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
    .min(1, "É necessário enviar pelo menos um arquivo.")
    .nullable(),
  fileLogotipo: z
    .instanceof(File)
    .nullable(),
  // .refine((file) => file !== null, "O arquivo de logotipo é obrigatório."),
  // file: z.instanceof(File).nullable(),
  textoDescricaoQ0: z.string().max(900, "Máximo de 900 caracteres permitidos"),

  //Capacidade organizazional
  equipeQ1: z.string().max(240, "Máximo de 240 caracteres permitidos"),
  parceiroQ1: z.string().max(92, "Máximo de 92 caracteres permitidos"),
  atividadeChaveQ1: z.string().max(61, "Máximo de 61 caracteres permitidos"),
  recursosQ1: z.string().max(61, "Máximo de 61 caracteres permitidos"),
  custosQ1: z.string().max(130, "Máximo de 130 caracteres permitidos"),

  //Fluxo de negocio
  oportunidadeNegQ2: z.string().max(80, "Máximo de 80 caracteres permitidos"),
  custoQ2: z.string().max(118, "Máximo de 118 caracteres permitidos"),
  propostaValorQ2: z.string().max(300, "Máximo de 300 caracteres permitidos"),
  fonteReceitaQ2: z.string().max(130, "Máximo de 130 caracteres permitidos"),
  resultadoFinanceiroQ2: z.string().max(900, "Máximo de 900 caracteres permitidos"),

  //Teoria de mudança
  contextoProblemaQ3: z.string().max(120, "Máximo de 120 caracteres permitidos"),
  publicoFocoImpactoQ3: z.string().max(140, "Máximo de 140 caracteres permitidos"),
  intervencoesQ3: z.string().max(360, "Máximo de 360 caracteres permitidos"),
  saidasQ3: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  resultadosCurtoPrazoQ3: z.string().max(135, "Máximo de 135 caracteres permitidos"),
  resultadosMedioPrazoQ3: z.string().max(135, "Máximo de 135 caracteres permitidos"),
  visaoImpactoQ3: z.string().max(200, "Máximo de 200 caracteres permitidos"),
})

export interface BannerFormData {
  [key: string]: string | number | File | null | File[]
}

export const BannerComponent = ({ id }: Pick<Banner, "id">) => {
  const [createBanner, { isLoading }] = useCreateBannerMutation()
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

  const [errors, setErrors] = useState<Partial<Record<keyof BannerFormData, string>>>({})

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
      const validatedData = bannerValidationSchema.parse({
        ...formData,
        files: formData.files,
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
        [JSON.stringify({ ...validatedData, files: undefined, fileLogotipo: undefined })],
        { type: "application/json" }
      )
      formDataToSend.append("cadastroBannerRecord", jsonBlob)

      await createBanner(formDataToSend).unwrap()
      alert("Banner cadastrado com sucesso!")
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof BannerFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0] in formData) {
            newErrors[err.path[0] as keyof BannerFormData] = err.message
          }
        })
        setErrors(newErrors)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Cadastrar Banner</h2>

      {/* Upload de Arquivo */}
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-blue-600 mb-4">Seção Inicial</h3>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Imagens
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
        </div>

        <div className="mt-4">
          <label htmlFor="fileLogotipo" className="block  text-sm font-medium text-gray-700">
            Logotipo
          </label>
          <input
            type="file"
            id="fileLogotipo"
            name="fileLogotipo"
            onChange={handleFileLogotipoChange}
            className="w-full border border-blue-500 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.fileLogotipo && <p className="text-red-500 text-sm">{errors.fileLogotipo}</p>}
        </div>

        <label htmlFor={formData.textoDescricaoQ0 as string} className="block text-sm font-medium text-gray-700 mt-4">
          Texto
        </label>
        <textarea
          name="textoDescricaoQ0"
          value={formData.textoDescricaoQ0 as string}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md w-full"
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
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field] as string}
                onChange={handleChange}
                className="w-full border border-orange-500 p-2 rounded-md focus:ring-2 focus:ring-orange-500"
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
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={formData[field] as string}
                  onChange={handleChange}
                  className="w-full border border-pink-500 p-2 rounded-md focus:ring-2 focus:ring-pink-500"
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
                className="w-full border border-purple-500 p-2 rounded-md focus:ring-2 focus:ring-purple-500 resize-none"
                style={{ height: "4rem" }}
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
