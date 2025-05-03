import { useEffect, useRef } from "react";
import { useGetTeamByIdQuery } from "../../../api/studentApi";
import { formatDate } from "../../../utils/types";

interface TeamRegisterPrintComponentProps {
  id: number
}

export const TeamRegisterPrintComponent = ({ id }: TeamRegisterPrintComponentProps) => {
  const { data: teamRegister, isFetching } = useGetTeamByIdQuery(id)

  const printRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleAfterPrint = () => {
      window.close();
    };

    window.onafterprint = handleAfterPrint;

    if (!isFetching && teamRegister) {
      window.print();
    }

    return () => {
      window.onafterprint = null;
    };
  }, [isFetching, teamRegister])

  useEffect(() => {
    if (!isFetching && teamRegister) {
      // Notifica a janela principal que os dados estão prontos
      window.opener?.postMessage("ready-to-print-register", window.location.origin)
    }
  }, [isFetching, teamRegister])


  console.log(`TeamRegisterPrintComponent - id: ${id}`)
  console.log(`TeamRegisterPrintComponent - teamRegister: ${JSON.stringify(teamRegister)}`)
  return (
    <div ref={printRef} className="w-full max-w-6xl mx-auto bg-white p-8 print:p-4 print:text-[12px]">
      <h1 className="text-center text-lg font-bold mb-8">DLEI 2025 - 9º Desafio Lourdinas de Empreendedorismo e Inovação</h1>
      <h2 className="text-center text-md font-semibold mb-4">FICHA DE INSCRIÇÃO / RECIBO</h2>

      <div className="mb-6">
        <p><span className="font-semibold">Nome do Time:</span> {teamRegister?.nomeEquipe}</p>
      </div>

      {/* Tabela de Alunos */}
      <table className="w-full border border-gray-700 print:border-collapse text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-700 p-1">Nº Aluno</th>
            <th className="border border-gray-700 p-1">Nome do Aluno</th>
            <th className="border border-gray-700 p-1">E-mail</th>
            <th className="border border-gray-700 p-1">CPF</th>
            <th className="border border-gray-700 p-1">Data Nasc.</th>
            <th className="border border-gray-700 p-1">Nº Camisa</th>
          </tr>
        </thead>
        <tbody>
          {teamRegister?.alunos.map((student, index) => (
            <tr key={index}>
              <td className="border border-gray-700 p-1 text-center">{student.isViceLider}</td>
              <td className="border border-gray-700 p-1">{student.nome}</td>
              <td className="border border-gray-700 p-1">{student.email}</td>
              <td className="border border-gray-700 p-1">{student.cpf}</td>
              <td className="border border-gray-700 p-1 text-center">{student.dataNascimento && formatDate(student.dataNascimento.toString())}</td>
              <td className="border border-gray-700 p-1 text-center">{student.tamanhoCamisa}</td>
            </tr>
          ))}
          {teamRegister?.professores.map((professor, index) => (
            <tr key={index}>
              <td className="border border-gray-700 p-1 text-center">Orientador(a)</td>
              <td className="border border-gray-700 p-1">{professor.nome}</td>
              <td className="border border-gray-700 p-1">{professor.email}</td>
              <td className="border border-gray-700 p-1">{professor.cpf}</td>
              <td className="border border-gray-700 p-1 text-center">{professor.dataNascimento && formatDate(professor.dataNascimento.toString())}</td>
              <td className="border border-gray-700 p-1 text-center">{professor.tamanhoCamisa}</td>
            </tr>
          ))}
        </tbody>
      </table>



      <div className="mt-8">

        {/* Área do Recibo */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-sm">
          <p><span className="font-semibold">RECIBO: R$ 800,00</span> Recebemos do time <span className="font-bold">{teamRegister?.nomeEquipe}</span> o valor de <span className="font-bold">R$ 800,00</span> referente à inscrição de {teamRegister?.alunos.length} student(s) no DLEI 2025.</p>
          <p className="mt-4">Campina Grande, ____ de junho de 2025.</p>
          <p className="mt-8">________________________________________</p>
          <p className="text-center">Tesouraria do Colégio Nossa Senhora de Lourdes</p>
        </div>
      </div>
    </div>
  )
}
