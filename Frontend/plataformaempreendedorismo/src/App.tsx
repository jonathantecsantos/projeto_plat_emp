import './App.css'
import { UploadAlunos, UploadGrupos } from './components/importFiles'



const App = () => {

  return (
    <div>
      <div className="header">
        <h2>Plataforma Empreendedorismo</h2>
      </div>
      <div className="container">
        <UploadAlunos />
        <UploadGrupos />
      </div>
    </div>
  )
}

export default App
