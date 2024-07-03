import { useState } from 'react';
import { useGetTeamByIdQuery } from './api/teamId.slice';
import { AppBarOptions } from './components/common/appBar';

const App = () => {
  const [number, setNumber] = useState<number>()
  const { data } = useGetTeamByIdQuery(number)

  const handleInputChange = (e: any) => {
    const newTeamId = e.target.value;
    console.log(newTeamId)
    setNumber(newTeamId);
  }

  return (
    <div>
      <AppBarOptions />
      <div className="flex flex-col justify-center mt-6 items-center">
        <p>Common User Home Page</p>
        <input
          type="text"
          value={number || ''}
          onChange={handleInputChange}
          placeholder="Enter team ID"
          className="border p-2 mb-4"
        />
        {data && (
          <div>
            <h1>{data.nomeEquipe}</h1>
            <h2>Professor: {data.professor ? data.professor.nome : 'N/A'}</h2>
            <h2>Alunos:</h2>
            <ul>
              {data.alunos.map((student) => (
                <li key={student.id}>
                  <p>ID: {student.id}</p>
                  <p>Nome: {student.nome}</p>
                  <p>Email: {student.email}</p>
                  <p>Turma: {student.turma}</p>
                  <p>Líder: {student.isLider ? 'Sim' : 'Não'}</p>
                  <p>Vice-Líder: {student.isViceLider ? 'Sim' : 'Não'}</p>
                  <p>ODS: {student.ods.descricao} ({student.ods.codigo})</p>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
