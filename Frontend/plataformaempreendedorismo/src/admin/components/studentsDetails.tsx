import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllStudentsQuery } from "../../api/studentApi";
import { RoutesNames } from "../../globals";
import { Student, StudentsResponse } from "../../model/student";
import { TableComponent } from "./table";
import { TableComponentClickRowProps, TableComponentSetCurrPageProps } from "./table/common";

export const StudentsDetails = () => {
  const { data: students, isLoading, error } = useGetAllStudentsQuery()
  const navigate = useNavigate()
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { });
  const tableComponentSetCurrPage = tableComponentSetCurrPageRef.current

  if (isLoading) return <p className="text-center">Loading...</p>
  if (error) return <p className="text-center">Error loading students.</p>

  if (tableComponentSetCurrPage)
    tableComponentSetCurrPage({
      page: 0
    })

  return (
    <div className="overflow-x-auto">
      <TableComponent
        colums={['ID', 'CPF', 'Nome', 'Email', 'Turma', 'Líder', 'Vice Líder', 'ID Equipe',
          'Nome Equipe', 'ID Obs']}
        wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
        setCurrPageRef={tableComponentSetCurrPageRef}
        bodyList={students!}
        bodyRowBuilder={(student: StudentsResponse) => <>
          <td className="px-4 py-2">{student.id}</td>
          <td className="px-4 py-2">{student.cpf}</td>
          <td className="px-4 py-2">{student.nome}</td>
          <td className="px-4 py-2">{student.email}</td>
          <td className="px-4 py-2 uppercase">{student.turma}</td>
          <td className="px-4 py-2">{student.isLider ? 'Sim' : 'Não'}</td>
          <td className="px-4 py-2">{student.isViceLider ? 'Sim' : 'Não'}</td>
          <td className="px-4 py-2">{student.idEquipe}</td>
          <td className="px-4 py-2">{student.nomeEquipe}</td>
          <td className="px-4 py-2">{student.idObs}</td>
        </>}
        // rowStyle={{}}
        onClickRow={(student: TableComponentClickRowProps<Student>) => {
          navigate(RoutesNames.student.replace(':id', student.item?.id.toString()));
        }} />
    </div >
  );
};
