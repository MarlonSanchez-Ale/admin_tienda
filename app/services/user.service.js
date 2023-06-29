import { BehaviorSubject } from "rxjs";
import Router from "next/router";
import { fetchWrapper } from '../helpers/fetch-wrapper'

const userSubject = new BehaviorSubject(
  process.browser && (JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user")))
);

const baseUrl = `/api/users`;

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  getUsers,
  register,
  getProfiles,
  getUserById,
  resetPassword,
  editUser,
  DisableUser,
  hasPermissionTo,
  getUserProfileById,
  EditProfile
};

function login(credentialsSession) {
  return fetchWrapper.post(`${baseUrl}/auth/authenticate`, credentialsSession)
    .then((user) => {
      /* Publicar el usuario para los suscriptores y 
            almacenarlo en el almacenamiento localstorage o sessionstorage 
            para permanecer conectado entre actualizaciones de la página 
            */
      userSubject.next(user);
      if (credentialsSession.sessionActive) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
}

function logout() {
  /* Eliminar al usuario del almacenamiento local y storage, 
    publicar nulo para los suscriptores del usuario y 
    redirigir a la página de inicio de sesión
     */
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
  }
  else {
    sessionStorage.removeItem("user");
  }
  userSubject.next(null);
  Router.push("/login");
}

function getUsers(filters = {}) {
  return fetchWrapper.get(
    `${baseUrl}?filters=${encodeURIComponent(JSON.stringify(filters))}`
  );
}

function getUserById(id_user) {
  return fetchWrapper.get(`${baseUrl}/details/${id_user}`);
}

function getUserProfileById(user_name) {
  return fetchWrapper.get(`${baseUrl}/details_profile/${user_name}`);
}

function register(user) {
  return fetchWrapper.post(`${baseUrl}/register`, user);
}

function getProfiles() {
  return fetchWrapper.get(`${baseUrl}/profile`);
}

function resetPassword(data) {
  return fetchWrapper.put(`${baseUrl}/edit/ResetPassword`, data);
}

function editUser(data) {
  return fetchWrapper.put(`${baseUrl}/edit/EditUser`, data);
}

function EditProfile(data) {
  return fetchWrapper.put(`${baseUrl}/edit/EditProfile`, data);
}

function DisableUser(id_user) {
  return fetchWrapper.put(`${baseUrl}/disable/${id_user}`);
}

function hasPermissionTo(permission) {
  /* 
    Determina si el usuario acualmente autenticado
    tiene permiso para lo que indique el parametro
    */
  if (!userSubject.value) return false;

  return fetchWrapper.get(`${baseUrl}/has-permission-to/${permission}`)
    .then((per) => {
      if (per.has_permission) {
        return true;
      }
      return false;
    });
}