import extenso from "extenso";
import { useEffect, useRef } from "react";
import { useGetTeamByIdQuery } from "../../../api/studentApi";
import lampLogo from '../../../assets/lamplogo.png';
import { formatDate, maskCPF } from "../../../utils/types";


interface TeamRegisterPrintComponentProps {
  id: number
}

export const TeamRegisterPrintComponent = ({ id }: TeamRegisterPrintComponentProps) => {
  const { data: teamRegister, isFetching } = useGetTeamByIdQuery(id)
  const printRef = useRef<HTMLDivElement>(null)

  const leader = teamRegister?.alunos?.find(aluno => aluno?.isLider)
  const viceLeader = teamRegister?.alunos?.find(aluno => aluno?.isViceLider)
  const members = teamRegister?.alunos?.filter(aluno => !aluno?.isLider && !aluno?.isViceLider)

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


  return (
    <div ref={printRef} className="w-full max-w-7xl mx-auto bg-white p-2 print:p-2 print:text-[12px]">
      <img src={lampLogo} alt="Trophy" className="w-16 h-16 absolute inset-6" />
      <div className="print:max-w-md print:mx-auto">
        <h1 className="text-start text-base font-bold text-[#2f5597]">DLEI 2025</h1>
        <div className="w-full"></div>
        <h2 className="text-start text-nowrap text-base font-bold mb-2 text-[#2f5597]">9º Desafio Lourdinas de Empreendedorismo e Inovação</h2>
      </div>
      <h2 className="text-center text-base font-semibold mb-2">FICHA DE INSCRIÇÃO / RECIBO</h2>
      <table className="w-full text-sm bg-[#fc56f4] border border-b-0 border-gray-700">
        <tbody>
          <tr>
            <td className="font-semibold border border-b-0 border-gray-700 align-top w-[130px] p-0.5">
              Nome do Time
            </td>
            <td className="p-0.5 font-bold border border-b-0 border-gray-700">
              {teamRegister?.nomeEquipe}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border border-b-0 border-gray-700 print:border-collapse text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-700 p-0.5">Nº Aluno</th>
            <th className="border border-gray-700 p-0.5">Nome do Aluno</th>
            <th className="border border-gray-700 p-0.5">E-mail</th>
            <th className="border border-gray-700 p-0.5">CPF</th>
            <th className="border border-gray-700 p-0.5">Data Nasc.</th>
            <th className="border border-gray-700 p-0.5">Nº Camisa</th>
          </tr>
        </thead>
        <tbody>
          {leader && (
            <tr>
              <td className="border border-gray-700 p-0.5 text-center font-semibold max-w-36">01 - LÍDER</td>
              <td className="border border-gray-700 p-0.5">{leader.nome}</td>
              <td className="border border-gray-700 p-0.5 text-wrap">{leader.email}</td>
              <td className="border border-gray-700 p-0.5 text-nowrap">{maskCPF(leader.cpf)}</td>
              <td className="border border-gray-700 p-0.5 text-center">{leader.dataNascimento && formatDate(leader.dataNascimento.toString())}</td>
              <td className="border border-gray-700 p-0.5 text-center">{leader.tamanhoCamisa}</td>
            </tr>
          )}

          {viceLeader && (
            <tr>
              <td className="border border-gray-700 p-0.5 text-center font-semibold">02 - VICE-LÍDER</td>
              <td className="border border-gray-700 p-0.5">{viceLeader.nome}</td>
              <td className="border border-gray-700 p-0.5">{viceLeader.email}</td>
              <td className="border border-gray-700 p-0.5">{maskCPF(viceLeader.cpf)}</td>
              <td className="border border-gray-700 p-0.5 text-center">{viceLeader.dataNascimento && formatDate(viceLeader.dataNascimento.toString())}</td>
              <td className="border border-gray-700 p-0.5 text-center">{viceLeader.tamanhoCamisa}</td>
            </tr>
          )}

          {members?.map((student, index) => (
            <tr key={student.id || index}>
              <td className="border border-gray-700 p-0.5 text-center font-semibold">{String(index + 3).padStart(2, "0")} - INTEGRANTE</td>
              <td className="border border-gray-700 p-0.5">{student.nome}</td>
              <td className="border border-gray-700 p-0.5">{student.email}</td>
              <td className="border border-gray-700 p-0.5">{maskCPF(student.cpf)}</td>
              <td className="border border-gray-700 p-0.5 text-center">{student.dataNascimento && formatDate(student.dataNascimento.toString())}</td>
              <td className="border border-gray-700 p-0.5 text-center">{student.tamanhoCamisa}</td>
            </tr>
          ))}

          {teamRegister?.professores.map((professor, index) => (
            <tr key={professor.id || `prof-${index}`}>
              <td className="border border-gray-700 p-0.5 text-center font-semibold w-[130px]">PROFESSOR ORIENTADOR</td>
              <td className="border border-gray-700 p-0.5">{professor.nome}</td>
              <td className="border border-gray-700 p-0.5">{professor.email}</td>
              <td className="border border-gray-700 p-0.5">{maskCPF(professor.cpf)}</td>
              <td className="border border-gray-700 p-0.5 text-center">{professor.dataNascimento && formatDate(professor.dataNascimento.toString())}</td>
              <td className="border border-gray-700 p-0.5 text-center">{professor.tamanhoCamisa}</td>
            </tr>
          ))}
        </tbody>

      </table>

      <table className="w-full border border-t-0 border-gray-700 text-sm">
        <tbody>
          <tr>
            <td className="border border-gray-700 font-semibold border-t-0 align-top w-[130px] p-0.5">
              Provável(eis) Objetivo(s) de Desenvolvimento Sustentável(eis)
            </td>
            <td className="border border-t-0 border-gray-700 p-0.5">
              {teamRegister?.odsList?.map((ods) => ods.descricao).join(". ")}
            </td>
          </tr>

          <tr>
            <td className="border border-gray-700 font-semibold align-top w-[130px] p-0.5">
              Provável(eis) Atividade(s) Empreendedora(s)
            </td>
            <td className="border border-gray-700 p-0.5">
              {teamRegister?.tipoAtividades?.map((atv) => atv.descricao).join(". ")}
            </td>
          </tr>

          <tr>
            <td className="border border-gray-700 font-semibold align-top w-[130px] p-0.5">
              Instituição de Impacto Social parceira do Time
            </td>
            <td className="border border-gray-700 p-0.5">
              {teamRegister?.instituicoes?.map((inst) => inst.descricao).join(". ")}
            </td>
          </tr>
        </tbody>
      </table>



      <div className="border border-gray-700 border-t-0 p-0.5">
        <div className="border-gray-700 text-sm">
          <div className="flex justify-between mb-4">
            <p>Para Uso da Tesouraria</p>
            <p className="font-bold">Inscrição Nº __ / DLEI 2025</p>
          </div>
          {(() => {
            const qtdStudents = teamRegister?.alunos?.length || 0;
            const studentRegistrationCost = qtdStudents * 100
            const formatValue = (valor: number) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const valorExtenso = studentRegistrationCost > 0 ? extenso(studentRegistrationCost, { locale: 'br' }) : '';
            
            return (
              <>
                <p className="font-semibold text-center mb-4">RECIBO: {formatValue(studentRegistrationCost)}</p>
                <div>
                  <p> Recebemos do time <strong>{teamRegister?.nomeEquipe}</strong> a quantia supra de <strong>{formatValue(studentRegistrationCost)}{valorExtenso && ` (${valorExtenso})`}</strong> referente à inscrição de <strong>{qtdStudents} ({extenso(Number(qtdStudents), { locale: 'br' })}) Alunos </strong>
                    no <span className="font-bold"> 9º Desafio Lourdinas de Empreendedorismo e Inovação - DLEI 2025.</span>
                  </p>
                </div>
              </>
            );
          })()}
          <p className="my-4">Pelo que damos plena e total quitação ao presente Recibo.</p>
          <p className="mt-4">Campina Grande, ____ de _______ de _____.</p>
          <div className="w-full flex justify-end mt-4">
            <div className="text-center">
              <p className="mb-2 border-gray-900 border-b-[1px]"></p>
              <p className="font-bold">Tesouraria do Colégio Nossa Senhora de Lourdes</p>
              <p className="font-bold text-sm">(Carimbo / Assinatura)</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
