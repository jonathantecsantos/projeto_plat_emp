import { useGetEvaluationByIdQuery } from "../../api/studentApi"

export const DLJComponent = () => {
  //carregar times e depois no clique do bottao chamar o componente de avaliacao do dlj passando os valores do componente pai DLJ component com os dados do time para o avaliacao do dlj
  
  const { data: evaluations } = useGetEvaluationByIdQuery(1) //id 1 = DLJ
  console.log(evaluations)
  return <p>DLJ COMPONENT</p>
}

