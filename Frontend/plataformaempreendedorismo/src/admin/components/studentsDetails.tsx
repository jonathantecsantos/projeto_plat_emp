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
  // const tableComponentSetCurrPage = tableComponentSetCurrPageRef.current

  if (isLoading) return <p className="text-center">Loading...</p>
  if (error) return <p className="text-center">Error loading students.</p>

  // if (tableComponentSetCurrPage)
  //   tableComponentSetCurrPage({
  //     page: 0
  //   })

  return (
    <div className="overflow-x-auto">
      <TableComponent
        colums={['id', 'cpf', 'nome', 'email', 'turma', 'isLider', 'isViceLider', 'idEquipe', 'nomeEquipe', 'idObs']}
        wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
        setCurrPageRef={tableComponentSetCurrPageRef}
        bodyList={students!}
        bodyRowBuilder={(student: StudentsResponse) => <>
          <td className="p-4">{student.id}</td>
          <td className="p-4">{student.cpf}</td>
          <td className="p-4">{student.nome}</td>
          <td className="p-4">{student.email}</td>
          <td className="p-4 uppercase">{student.turma}</td>
          <td className="p-4">{student.isLider ? 'Sim' : 'Não'}</td>
          <td className="p-4">{student.isViceLider ? 'Sim' : 'Não'}</td>
          <td className="p-4">{student.idEquipe}</td>
          <td className="p-4">{student.nomeEquipe}</td>
          <td className="p-4">{student.idObs}</td>
        </>}
        // rowStyle={{}}
        onClickRow={(student: TableComponentClickRowProps<Student>) => {
          navigate(RoutesNames.student.replace(':id', student.item?.id.toString()));
        }} />
    </div >
  );
};
