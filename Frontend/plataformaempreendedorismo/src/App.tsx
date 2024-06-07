import './App.css'
import { EvaluatorsUpload } from './components/uploadFiles/evaluetors'
import { StudentsUpload } from './components/uploadFiles/students'

const App = () => {
  console.log(import.meta.env.VITE_APP_VERSION);
  console.log(import.meta.env.VITE_API_URL);
  console.log(import.meta.env.VITE_BASE_URL);

  return (
    <div className=''>
      <div className="header">
        <h2>Plataforma Empreendedorismo</h2>
      </div>
      <div className="flex flex-col justify-center mt-20 items-center">
        <StudentsUpload />
        <div className='my-8'></div>
        <EvaluatorsUpload />
      </div>
    </div>
  )
}

export default App
