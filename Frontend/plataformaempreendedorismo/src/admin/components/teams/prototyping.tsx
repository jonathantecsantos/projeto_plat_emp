import { useState } from "react"
import { Institutions } from "../../../utils/types"

export const TeamPrototyping = ({ id }: { id: number }) => {
  const [institution, setInstitution] = useState<string | null>(null)
  const [visibleItems, setVisibleItems] = useState(5) // Inicia com 5 itens visíveis

  const handleInstitutionChange = (inst: string) => {
    setInstitution(inst === institution ? null : inst)
  }

  // {
  //   "idEquipe": 0,
  //   "instituicaoImpactoSocial": "string",
  //   "problemaPrincipal": "string",
  //   "propostaValor": "string",
  //   "vantagemCompetitiva": "string",
  //   "principaisNecessidades": "string",
  //   "parcerias": "string",
  //    "tipoApoio": "string"
  // }

  const handleSubmit = () => {
    const payload = {
      idEquipe: id,
      instituicaoImpactoSocial: institution,
    }
    console.log("Payload:", payload)
  }

  const handleShowMoreToggle = () => {
    // Mostra mais 15 itens a cada clique
    setVisibleItems((prev) => prev + 15)
  }

  return (
    <div className="text-center p-8 bg-gradient-to-b from-[#3B1E86] to-[#4319AF] text-white rounded-lg">
      <h1 className="font-bold text-2xl max-w-4xl mx-auto mb-6">
        DLEI 2024 - Formulário p/ Cadastramento da Proposta do Protótipo da Solução do Problema da Instituição de Impacto Social - Protótipo Versão Física ou Digital
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
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
            onClick={handleShowMoreToggle}
            className="mt-4 text-[#4319AF] font-semibold transition-all hover:text-[#5741A6] hover:underline"
          >
            Ver Mais
          </button>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 p-3 bg-[#5741A6] hover:bg-white hover:text-green-600 transition-all text-white rounded-lg shadow-lg"
      >
        Cadastrar
      </button>
    </div>
  )
}
