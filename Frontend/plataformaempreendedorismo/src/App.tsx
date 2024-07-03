import { useEffect, useState } from 'react';
import { AppBarOptions } from './components/common/appBar';
import { Team } from './model/team';
import { TeamApiService } from './services/teams';


const TeamComponent = ({ id }: Pick<Team, 'id'>) => {
  const { team } = TeamApiService().getTeamById(id);
  const [teamData, setTeamData] = useState<Team | undefined>()

  useEffect(() => {
    setTeamData(team)
  }, [])


  return (
    <div>
      {/* {JSON.stringify(team, null, 2)} */}
      <h2>{teamData?.name}</h2>
      <h3>Alunos:</h3>
      <ul>
        {teamData?.students?.map(aluno => (
          <li key={aluno.id}>
            <p>ID: {aluno.id}</p>
            <p>CPF: {aluno.cpf}</p>
            <p>Nome: {aluno.name}</p>
            <p>Email: {aluno.email}</p>
            <p>Turma: {aluno.class}</p>
            <p>É líder: {aluno.isLeader ? 'Sim' : 'Não'}</p>
            <p>É vice-líder: {aluno.isViceLeader ? 'Sim' : 'Não'}</p>
            <p>ODS: {aluno.ods?.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  console.log(import.meta.env.VITE_APP_VERSION);
  console.log(import.meta.env.VITE_API_URL);
  console.log(import.meta.env.VITE_BASE_URL);

  return (
    <div>
      <AppBarOptions />
      <div className="flex flex-col justify-center mt-6 items-center">
        <p>Commom User Home Page</p>
        <TeamComponent id={1} />
      </div>
    </div>
  )
}

export default App
