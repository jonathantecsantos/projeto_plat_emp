export const RoutesNames = {
  home: '/',
  login: '/login',
  banner: '/teams/banner/:id',
  bannerPreview: '/banner-preview/:id',
  companyDetails: '/company-details',
  repository: 'repository',
  contact: 'contact',
  uploadFiles: '/upload-files',
  adminHome: '/admin-home',

  students: '/students',
  student: '/students/:id',

  teachers: '/teachers',
  teacher: '/teachers/:id',

  evaluators: '/evaluators',
  evaluator: '/evaluators/:id',

  coordinators: '/coordinators',
  coordinator: '/coordinators/:id',

  teams: '/teams',
  team: '/teams/:id',

  dljTeams: '/dlj',
  dljTeam: '/dlj/:id',

  pitchTeams: '/pitch',
  pitchTeam: '/pitch/:id',

  sharkTankTeams: '/sharkTank',
  sharkTankTeam: '/sharkTank/:id',

  expoDleiTeams: '/expoDlei',
  expoDleiTeam: '/expoDlei/:id',

  prototyping: '/teams/prototyping/:id',

  classification: '/classification',
  generalReport: '/general-report',
  classificationDljTeams: '/dlj-classification',
  classificationPitch: '/pitch-classification',
  classificationSharkTank: '/sharTank-classification',
  classificationExpoDlei: '/expoDlei-classification',

  teamsNotes: '/notes',
  teamNotes: '/notes/:id',


  settings: '/settings',

}

export const inputClasses = `rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset placeholder:text-gray-600 
text-sm sm:leading-6 text-black p-2 w-full text-black`

export const defaultMB = `md:mb-4 mb-2`

export const DEFAULTGAP = 20