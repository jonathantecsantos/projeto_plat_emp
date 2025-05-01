import { AppBarOptions } from './components/common/appBar';

const App = () => {

  return (
    <div>
      <AppBarOptions />
      <div className="flex flex-col justify-center mt-6 items-center">
        <p>Common User Home Page</p>
      </div>
    </div>
  );
};
//TODO-WINNICIUS: add text-nowrap all tables and persistors table info
export default App;
