import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import { useCreateBannerMutation } from "../../../api/studentApi";
import { Banner } from "../../../model/banner";

const bannerSchema = z.object({
  atividadeChaveQ1: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  contextoProblemaQ3: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  textoDescricaoQ0: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  resultadosMedioPrazoQ3: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  recursosQ1: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  fonteReceitaQ2: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  idEquipeQ0: z.number(),
  publicoFocoImpactoQ3: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  propostaValorQ2: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  oportunidadeNegQ2: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  equipeQ1: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  custosQ1: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  resultadoFinanceiroQ2: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  saidasQ3: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  visaoImpactoQ3: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  custoQ2: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  parceiroQ1: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  intervencoesQ3: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  resultadosCurtoPrazoQ3: z.string().max(200, "Máximo de 200 caracteres permitidos"),
  file: z.instanceof(File).nullable(),
});

export interface BannerFormData {
  atividadeChaveQ1: string;
  contextoProblemaQ3: string;
  textoDescricaoQ0: string;
  resultadosMedioPrazoQ3: string;
  recursosQ1: string;
  fonteReceitaQ2: string;
  idEquipeQ0: number;
  publicoFocoImpactoQ3: string;
  propostaValorQ2: string;
  oportunidadeNegQ2: string;
  equipeQ1: string;
  custosQ1: string;
  resultadoFinanceiroQ2: string;
  saidasQ3: string;
  visaoImpactoQ3: string;
  custoQ2: string;
  parceiroQ1: string;
  intervencoesQ3: string;
  resultadosCurtoPrazoQ3: string;
  file: File | null;
}

export const BannerComponent = ({ id }: Pick<Banner, 'id'>) => {
  const [createBanner, { isLoading }] = useCreateBannerMutation();
  const [formData, setFormData] = useState<BannerFormData>({
    atividadeChaveQ1: '',
    contextoProblemaQ3: '',
    textoDescricaoQ0: '',
    resultadosMedioPrazoQ3: '',
    recursosQ1: '',
    fonteReceitaQ2: '',
    idEquipeQ0: id,
    publicoFocoImpactoQ3: '',
    propostaValorQ2: '',
    oportunidadeNegQ2: '',
    equipeQ1: '',
    custosQ1: '',
    resultadoFinanceiroQ2: '',
    saidasQ3: '',
    visaoImpactoQ3: '',
    custoQ2: '',
    parceiroQ1: '',
    intervencoesQ3: '',
    resultadosCurtoPrazoQ3: '',
    file: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BannerFormData, string>>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    try {
      bannerSchema.parse({
        ...formData,
        [e.target.name]: e.target.value,
      });
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [e.target.name]: error.errors[0].message }));
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      file: e.target.files ? e.target.files[0] : null,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      bannerSchema.parse(formData);
      setErrors({});
      const formDataToSend = new FormData();
      formDataToSend.append('files', formData.file as File);

      const jsonBlob = new Blob(
        [JSON.stringify({
          atividadeChaveQ1: formData.atividadeChaveQ1,
          contextoProblemaQ3: formData.contextoProblemaQ3,
          textoDescricaoQ0: formData.textoDescricaoQ0,
          resultadosMedioPrazoQ3: formData.resultadosMedioPrazoQ3,
          recursosQ1: formData.recursosQ1,
          fonteReceitaQ2: formData.fonteReceitaQ2,
          idEquipeQ0: formData.idEquipeQ0,
          publicoFocoImpactoQ3: formData.publicoFocoImpactoQ3,
          propostaValorQ2: formData.propostaValorQ2,
          oportunidadeNegQ2: formData.oportunidadeNegQ2,
          equipeQ1: formData.equipeQ1,
          custosQ1: formData.custosQ1,
          resultadoFinanceiroQ2: formData.resultadoFinanceiroQ2,
          saidasQ3: formData.saidasQ3,
          visaoImpactoQ3: formData.visaoImpactoQ3,
          custoQ2: formData.custoQ2,
          parceiroQ1: formData.parceiroQ1,
          intervencoesQ3: formData.intervencoesQ3,
          resultadosCurtoPrazoQ3: formData.resultadosCurtoPrazoQ3,
        })],
        { type: 'application/json' }
      );

      formDataToSend.append('cadastroBannerRecord', jsonBlob);

      await createBanner(formDataToSend).unwrap();
      alert('Banner cadastrado com sucesso!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof BannerFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0] in formData) {
            newErrors[err.path[0] as keyof BannerFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary mb-4">Cadastrar Banner</h2>

      <div className="grid grid-cols-1 gap-6">
        <input
          type="text"
          name="atividadeChaveQ1"
          placeholder="Atividade Chave"
          value={formData.atividadeChaveQ1}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.atividadeChaveQ1 && (
          <p className="text-red-500 text-sm">{errors.atividadeChaveQ1}</p>
        )}

        <input
          type="text"
          name="contextoProblemaQ3"
          placeholder="Contexto do Problema"
          value={formData.contextoProblemaQ3}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.contextoProblemaQ3 && (
          <p className="text-red-500 text-sm">{errors.contextoProblemaQ3}</p>
        )}

        <textarea
          name="textoDescricaoQ0"
          placeholder="Texto Descrição"
          value={formData.textoDescricaoQ0}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.textoDescricaoQ0 && (
          <p className="text-red-500 text-sm">{errors.textoDescricaoQ0}</p>
        )}

        <input
          type="text"
          name="resultadosMedioPrazoQ3"
          placeholder="Resultados a Médio Prazo"
          value={formData.resultadosMedioPrazoQ3}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.resultadosMedioPrazoQ3 && (
          <p className="text-red-500 text-sm">{errors.resultadosMedioPrazoQ3}</p>
        )}

        <input
          type="text"
          name="recursosQ1"
          placeholder="Recursos"
          value={formData.recursosQ1}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.recursosQ1 && (
          <p className="text-red-500 text-sm">{errors.recursosQ1}</p>
        )}

        <input
          type="text"
          name="fonteReceitaQ2"
          placeholder="Fonte de Receita"
          value={formData.fonteReceitaQ2}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.fonteReceitaQ2 && (
          <p className="text-red-500 text-sm">{errors.fonteReceitaQ2}</p>
        )}

        <input
          type="text"
          name="publicoFocoImpactoQ3"
          placeholder="Público Foco Impacto"
          value={formData.publicoFocoImpactoQ3}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.publicoFocoImpactoQ3 && (
          <p className="text-red-500 text-sm">{errors.publicoFocoImpactoQ3}</p>
        )}

        <input
          type="text"
          name="propostaValorQ2"
          placeholder="Proposta de Valor"
          value={formData.propostaValorQ2}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.propostaValorQ2 && (
          <p className="text-red-500 text-sm">{errors.propostaValorQ2}</p>
        )}

        <input
          type="text"
          name="oportunidadeNegQ2"
          placeholder="Oportunidade de Negócio"
          value={formData.oportunidadeNegQ2}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.oportunidadeNegQ2 && (
          <p className="text-red-500 text-sm">{errors.oportunidadeNegQ2}</p>
        )}

        <input
          type="text"
          name="equipeQ1"
          placeholder="Equipe"
          value={formData.equipeQ1}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.equipeQ1 && (
          <p className="text-red-500 text-sm">{errors.equipeQ1}</p>
        )}

        <input
          type="text"
          name="custosQ1"
          placeholder="Custos"
          value={formData.custosQ1}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.custosQ1 && (
          <p className="text-red-500 text-sm">{errors.custosQ1}</p>
        )}

        <input
          type="text"
          name="resultadoFinanceiroQ2"
          placeholder="Resultado Financeiro"
          value={formData.resultadoFinanceiroQ2}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.resultadoFinanceiroQ2 && (
          <p className="text-red-500 text-sm">{errors.resultadoFinanceiroQ2}</p>
        )}

        <input
          type="text"
          name="saidasQ3"
          placeholder="Saídas"
          value={formData.saidasQ3}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.saidasQ3 && (
          <p className="text-red-500 text-sm">{errors.saidasQ3}</p>
        )}

        <input
          type="text"
          name="visaoImpactoQ3"
          placeholder="Visão de Impacto"
          value={formData.visaoImpactoQ3}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.visaoImpactoQ3 && (
          <p className="text-red-500 text-sm">{errors.visaoImpactoQ3}</p>
        )}

        <input
          type="text"
          name="custoQ2"
          placeholder="Custo"
          value={formData.custoQ2}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.custoQ2 && (
          <p className="text-red-500 text-sm">{errors.custoQ2}</p>
        )}

        <input
          type="text"
          name="parceiroQ1"
          placeholder="Parceiros"
          value={formData.parceiroQ1}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.parceiroQ1 && (
          <p className="text-red-500 text-sm">{errors.parceiroQ1}</p>
        )}

        <input
          type="text"
          name="intervencoesQ3"
          placeholder="Intervenções"
          value={formData.intervencoesQ3}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.intervencoesQ3 && (
          <p className="text-red-500 text-sm">{errors.intervencoesQ3}</p>
        )}

        <input
          type="text"
          name="resultadosCurtoPrazoQ3"
          placeholder="Resultados a Curto Prazo"
          value={formData.resultadosCurtoPrazoQ3}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />
        {errors.resultadosCurtoPrazoQ3 && (
          <p className="text-red-500 text-sm">{errors.resultadosCurtoPrazoQ3}</p>
        )}

        <input
          type="file"
          name="file"
          multiple
          onChange={handleFileChange}
          className="border border-primary p-2 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-black text-white p-2 rounded-md"
        disabled={isLoading}
      >
        {isLoading ? 'Enviando...' : 'Cadastrar Banner'}
      </button>
    </form>
  );
};
