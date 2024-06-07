import './App.css'
import { EvaluatorsUpload } from './components/uploadFiles/evaluetors'
import { StudentsUpload } from './components/uploadFiles/students'

const App = () => {

  return (
    <div>
      <div className="header">
        <h2>Plataforma Empreendedorismo</h2>
      </div>
      <div className="container">
        <StudentsUpload />
        <div className='my-8'></div>
        <EvaluatorsUpload />
      </div>
    </div>
  )
}

export default App
