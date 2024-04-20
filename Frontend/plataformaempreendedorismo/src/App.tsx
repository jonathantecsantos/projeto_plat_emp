import { useEffect, useState } from 'react'
import './App.css'
import { Group } from './model/group'
import { Student } from './model/student'
import { UploadAlunos, UploadGrupos } from './components/importFiles'


const displayGroup = (group: Group, visitedGroups: Set<number> = new Set()) => {
  if (visitedGroups.has(group.id)) {
    return []
  }

  visitedGroups.add(group.id)

  const groupInfo: JSX.Element[] = [
    <div key={group.id}>
      <p>Grupo: {group.name}</p>
      <ul>
        {group.students.map(student => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  ]

  group.students.forEach(student => {
    if (student.group) {
      groupInfo.push(...displayGroup(student.group, visitedGroups))
    }
  })

  return [...groupInfo, <p key={`end-${group.id}`}>Nota: {group.id}</p>]
}


const App: React.FC = () => {
  const [displayedInfo, setDisplayedInfo] = useState<JSX.Element[]>([])
  const [showGroup, setShowGroup] = useState(false)

  useEffect(() => {
    const student1: Student = { id: 1, name: "João", group: null }
    const student2: Student = { id: 2, name: "Maria", group: null }
    const student3: Student = { id: 3, name: "Pedro", group: null }


    const group1: Group = { id: 1, name: "Grupo A", students: [student1, student2] }
    const group2: Group = { id: 2, name: "Grupo B", students: [student3] }

    student1.group = group1
    student2.group = group1
    student3.group = group2


    const allInfo = [...displayGroup(group1), ...displayGroup(group2)]
    setDisplayedInfo(allInfo)
  }, [])


  const handleDisplayList = () => {
    setShowGroup(!showGroup)
  }

  return (
    <div>
      <div className="header">
        <h2>Plataforma Empreendedorismo</h2>
      </div>
      <div className="container">
        <UploadAlunos />
        <UploadGrupos />
        <div style={{ marginTop: 30 }}>
          <button onClick={handleDisplayList}>{!showGroup ? "Exibir" : "Ocultar"} Lista de Alunos</button>
        </div>
        {showGroup && (
          <div className="content">
            {displayedInfo}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
