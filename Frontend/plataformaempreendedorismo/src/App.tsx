import './App.css';
import { AppBarOptions } from './components/common/appBar';

const App = () => {
  console.log(import.meta.env.VITE_APP_VERSION);
  console.log(import.meta.env.VITE_API_URL);
  console.log(import.meta.env.VITE_BASE_URL);

  return (
    <div>
      <AppBarOptions />
      <div className="flex flex-col justify-center mt-6 items-center">
       <p>Commom User Home Page</p>
      </div>
    </div>
  )
}

export default App
