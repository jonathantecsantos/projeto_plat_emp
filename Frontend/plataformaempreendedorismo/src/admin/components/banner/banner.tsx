import { useState } from "react";
import { Banner } from "../../../model/banner"
import { useCreateBannerMutation } from "../../../api/studentApi";

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
  const [createBanner, { isLoading}] = useCreateBannerMutation()
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      file: e.target.files ? e.target.files[0] : null,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

    try {
      await createBanner(formDataToSend).unwrap();
      alert('Banner cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar o banner:', error);
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

        <input
          type="text"
          name="contextoProblemaQ3"
          placeholder="Contexto do Problema"
          value={formData.contextoProblemaQ3}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <textarea
          name="textoDescricaoQ0"
          placeholder="Texto Descrição"
          value={formData.textoDescricaoQ0}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="text"
          name="resultadosMedioPrazoQ3"
          placeholder="Resultados a Médio Prazo"
          value={formData.resultadosMedioPrazoQ3}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="text"
          name="recursosQ1"
          placeholder="Recursos"
          value={formData.recursosQ1}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="text"
          name="fonteReceitaQ2"
          placeholder="Fonte de Receita"
          value={formData.fonteReceitaQ2}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        {/* <input
          type="number"
          name="idEquipeQ0"
          placeholder="ID da Equipe"
          value={formData.idEquipeQ0}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        /> */}

        <input
          type="text"
          name="publicoFocoImpactoQ3"
          placeholder="Público Foco Impacto"
          value={formData.publicoFocoImpactoQ3}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="text"
          name="propostaValorQ2"
          placeholder="Proposta de Valor"
          value={formData.propostaValorQ2}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="text"
          name="oportunidadeNegQ2"
          placeholder="Oportunidade de Negócio"
          value={formData.oportunidadeNegQ2}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="text"
          name="equipeQ1"
          placeholder="Equipe"
          value={formData.equipeQ1}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="text"
          name="custosQ1"
          placeholder="Custos"
          value={formData.custosQ1}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="text"
          name="resultadoFinanceiroQ2"
          placeholder="Resultado Financeiro"
          value={formData.resultadoFinanceiroQ2}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="text"
          name="saidasQ3"
          placeholder="Saídas"
          value={formData.saidasQ3}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="text"
          name="visaoImpactoQ3"
          placeholder="Visão de Impacto"
          value={formData.visaoImpactoQ3}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="text"
          name="custoQ2"
          placeholder="Custo"
          value={formData.custoQ2}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="text"
          name="parceiroQ1"
          placeholder="Parceiros"
          value={formData.parceiroQ1}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="text"
          name="intervencoesQ3"
          placeholder="Intervenções"
          value={formData.intervencoesQ3}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="text"
          name="resultadosCurtoPrazoQ3"
          placeholder="Resultados a Curto Prazo"
          value={formData.resultadosCurtoPrazoQ3}
          onChange={handleChange}
          className="border border-primary p-2 rounded-md"
        />

        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="border border-primary p-2 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full  bg-black text-white p-2 rounded-md"
        disabled={isLoading}
      >
        {isLoading ? 'Enviando...' : 'Cadastrar Banner'}
      </button>
    </form>
  );

}
