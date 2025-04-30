import { useEffect, useRef, useState } from "react";

interface Aluno {
  funcao: string;
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  numeroCamisa: string;
}

interface Professor {
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
}

interface Inscricao {
  nomeTime: string;
  alunos: Aluno[];
  professor: Professor;
  ods: string[];
  atividadesEmpreendedoras: string[];
  instituicaoImpactoSocial: string;
  valorPago: number;
}

interface FichaInscricaoPreviewComponentProps {
  id: string;
}

export const FichaInscricaoPreviewComponent = ({ id }: FichaInscricaoPreviewComponentProps) => {
  const [inscricao, setInscricao] = useState<Inscricao | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mockInscricao: Inscricao = {
      nomeTime: "Ballrack",
      alunos: [
        { funcao: "LÍDER", nome: "FELIPE HERMENEGILDO CARDOSO ALMEIDA TRIGUEIRO", email: "felipe-hermenegildo-cardoso@evl.com.br", cpf: "099.670.984-30", dataNascimento: "M", numeroCamisa: "01" },
        { funcao: "VICELÍDER", nome: "MARIA ALICE BARROS DE ALBUQUERQUE", email: "maria-alice-barros@evl.com.br", cpf: "101.694.844-16", dataNascimento: "PP", numeroCamisa: "02" },
        { funcao: "INTEGRANTE", nome: "JOÃO PEDRO RAPOSO SOARES RODRIGUES", email: "joao-pedro-raposo@evl.com.br", cpf: "154.233.094-76", dataNascimento: "M", numeroCamisa: "03" },
        { funcao: "INTEGRANTE", nome: "GUSTAVO CURVÊLO UCHÔA", email: "gustavo-curvelo-uchoa@evl.com.br", cpf: "094.321.664-81", dataNascimento: "G", numeroCamisa: "04" },
        { funcao: "INTEGRANTE", nome: "THIAGO BORBOREMA CABRAL FILHO", email: "thiago-borborema-filho@evl.com.br", cpf: "120.497.844-14", dataNascimento: "G", numeroCamisa: "05" },
        { funcao: "INTEGRANTE", nome: "YASMIN SANTOS ARAÚJO", email: "yasmin-santos-araujo@evl.com.br", cpf: "706.423.734-26", dataNascimento: "M", numeroCamisa: "06" },
        { funcao: "INTEGRANTE", nome: "GUILHERME ALEXANDRINO DE MELO", email: "guilherme-2023148-@evl.com.br", cpf: "706.235.102-43", dataNascimento: "G", numeroCamisa: "07" },
        { funcao: "INTEGRANTE", nome: "RAFAEL SANTOS PEREIRA DO NASCIMENTO", email: "rafael-santos-pereira@evl.com.br", cpf: "097.847.364-70", dataNascimento: "M", numeroCamisa: "08" },
      ],
      professor: {
        nome: "VICENTE DE PAULO ALBUQUERQUE ARAÚJO",
        email: "vicente@evl.com.br",
        cpf: "354.494.704-87",
        dataNascimento: "25/09/1960",
      },
      ods: [
        "01 – Erradicação da pobreza",
        "02 – Fome zero e agricultura sustentável",
        "10 – Redução das desigualdades",
      ],
      atividadesEmpreendedoras: [
        "Produtos inovadores",
        "Serviços inovadores",
        "Atividades para o desenvolvimento sustentável",
        "Plataformas, Blogs, Podcasts",
      ],
      instituicaoImpactoSocial: "Organização Psicossocial Casa da Lili",
      valorPago: 800.00,
    };

    setInscricao(mockInscricao);
  }, [id]);

  if (!inscricao) return <p>Carregando...</p>;

  return (
    <div ref={printRef} className="w-full max-w-6xl mx-auto bg-white p-8 print:p-4 print:text-[12px]">
      <h1 className="text-center text-lg font-bold mb-8">DLEI 2025 - 9º Desafio Lourdinas de Empreendedorismo e Inovação</h1>
      <h2 className="text-center text-md font-semibold mb-4">FICHA DE INSCRIÇÃO / RECIBO</h2>

      <div className="mb-6">
        <p><span className="font-semibold">Nome do Time:</span> {inscricao.nomeTime}</p>
      </div>

      {/* Tabela de Alunos */}
      <table className="w-full border border-gray-700 print:border-collapse text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-700 p-1">Nº</th>
            <th className="border border-gray-700 p-1">Função</th>
            <th className="border border-gray-700 p-1">Nome do Aluno</th>
            <th className="border border-gray-700 p-1">E-mail</th>
            <th className="border border-gray-700 p-1">CPF</th>
            <th className="border border-gray-700 p-1">Data Nasc.</th>
            <th className="border border-gray-700 p-1">Nº Camisa</th>
          </tr>
        </thead>
        <tbody>
          {inscricao.alunos.map((aluno, index) => (
            <tr key={index}>
              <td className="border border-gray-700 p-1 text-center">{String(index + 1).padStart(2, '0')}</td>
              <td className="border border-gray-700 p-1 text-center">{aluno.funcao}</td>
              <td className="border border-gray-700 p-1">{aluno.nome}</td>
              <td className="border border-gray-700 p-1">{aluno.email}</td>
              <td className="border border-gray-700 p-1">{aluno.cpf}</td>
              <td className="border border-gray-700 p-1 text-center">{aluno.dataNascimento}</td>
              <td className="border border-gray-700 p-1 text-center">{aluno.numeroCamisa}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Professor Orientador */}
      <div className="mt-8">
        <p><span className="font-semibold">Professor Orientador:</span> {inscricao.professor.nome}</p>
        <p><span className="font-semibold">E-mail:</span> {inscricao.professor.email}</p>
        <p><span className="font-semibold">CPF:</span> {inscricao.professor.cpf}</p>
        <p><span className="font-semibold">Data de Nascimento:</span> {inscricao.professor.dataNascimento}</p>
      </div>

      {/* ODS, Atividades e Instituição */}
      <div className="mt-8">
        <p><span className="font-semibold">Objetivo(s) de Desenvolvimento Sustentável:</span> {inscricao.ods.join(", ")}</p>
        <p><span className="font-semibold">Atividade(s) Empreendedora(s):</span> {inscricao.atividadesEmpreendedoras.join(", ")}</p>
        <p><span className="font-semibold">Instituição de Impacto Social:</span> {inscricao.instituicaoImpactoSocial}</p>
      </div>

      {/* Área do Recibo */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-sm">
        <p><span className="font-semibold">RECIBO:</span> Recebemos do time <span className="font-bold">{inscricao.nomeTime}</span> o valor de <span className="font-bold">R$ {inscricao.valorPago.toFixed(2)}</span> referente à inscrição de {inscricao.alunos.length} aluno(s) no DLEI 2025.</p>
        <p className="mt-4">Campina Grande, ____ de junho de 2025.</p>
        <p className="mt-8">________________________________________</p>
        <p className="text-center">Tesouraria do Colégio Nossa Senhora de Lourdes</p>
      </div>
    </div>
  );
};
