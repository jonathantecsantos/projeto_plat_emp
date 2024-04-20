import { Group } from "../model/group"
import { Student } from "../model/student"

const student1: Student = { id: 1, name: "João", group: null }
const student2: Student = { id: 2, name: "Maria", group: null }
const student3: Student = { id: 3, name: "Pedro", group: null }

const group1: Group = { id: 1, name: "Grupo A", students: [student1, student2] }
const group2: Group = { id: 2, name: "Grupo B", students: [student3] }

student1.group = group1
student2.group = group1
student3.group = group2

console.log("Alunos do Grupo A:")
group1.students.forEach(student => console.log(student.name))

console.log("Alunos do Grupo B:")
group2.students.forEach(student => console.log(student.name))

export const newStudent: Student = { id: 4, name: "Ana", group: null }
group2.students.push(newStudent)
newStudent.group = group2

console.log("Alunos do Grupo B após adição de Ana:")
group2.students.forEach(student => console.log(student.name))
