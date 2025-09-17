export const RoutesNames = {
  home: '/',
  login: '/login',
  banner: '/teams/banner/:id',
  bannerPreview: '/banner-preview/:id',
  teamRegisterPrint: '/register-print/:id',
  privacyPolicy: '/politica-de-privacidade',
  termsOfUse: '/termos-de-uso',
  cookiePolicy: '/politica-de-cookies',
  repository: '/repository',
  contact: '/contact',
  register: '/inscricoes',
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
  teamSelection: '/team-selection',

  dljTeams: '/dlj',
  dljTeam: '/dlj/:id',

  pitchTeams: '/pitch',
  pitchTeam: '/pitch/:id',

  canvasTeams: '/canvas',
  canvasTeam: '/canvas/:id',

  sharkTankTeams: '/sharkTank',
  sharkTankTeam: '/sharkTank/:id',

  expoDleiTeams: '/expoDlei',
  expoDleiTeam: '/expoDlei/:id',

  prototyping: '/teams/prototyping/:id',

  classification: '/classification',
  generalReport: '/general-report',
  classificationTop5: '/top5-classification',
  classificationDljTeams: '/dlj-classification',
  classificationPitch: '/pitch-classification',
  classificationCanvas: '/canvas-classification',
  classificationSharkTank: '/sharTank-classification',
  classificationExpoDlei: '/expoDlei-classification',

  teamsNotes: '/notes',
  teamNotes: '/notes/:id',


  settings: '/settings',
  adminConfig: '/admin-settings',

}

//utilizado no controle de rotas do menu
export const evaluatorsRoutes: Record<string, { insideName: string; routeName: string }> = {
  PITCH: { insideName: "Pitch", routeName: RoutesNames.pitchTeams },
  CANVAS: { insideName: "Canvas", routeName: RoutesNames.canvasTeams },
  DLJ: { insideName: "DLJ", routeName: RoutesNames.dljTeams },
  "SHARK TANK": { insideName: "Shark Tank", routeName: RoutesNames.sharkTankTeams },
  "EXPO DLEI": { insideName: "Expo Dlei", routeName: RoutesNames.expoDleiTeams },
}


export const inputClasses = `rounded-md border-0 py-1.5 shadow-md ring-1 ring-inset placeholder:text-gray-600 
text-sm sm:leading-6 text-black p-2 w-full text-black`

export const defaultMB = `md:mb-4 mb-2`

export const DEFAULTGAP = 20