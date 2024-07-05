import { AppBarOptions } from './components/common/appBar';

const App = () => {
  // const { data:team } = useGetTeamByIdQuery(id)
  // const { data: students } = useGetAllStudentsQuery()
  // const [createStudent] = useCreateStudentMutation()


  return (
    <div>
      <AppBarOptions />
      <div className="flex flex-col justify-center mt-6 items-center">
        <p>Common User Home Page</p>
      </div>
    </div>
  );
};

export default App;
