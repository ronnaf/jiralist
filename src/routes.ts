export const routes = {
  LOGIN: '/login',
  PROJECTS: '/projects',
  PROJECTS__VIEW: (id: string = ':id') => `/projects/${id}`,
  TODO__LIST: '/todos',
  TODO__ADD: '/todos/add',
};
