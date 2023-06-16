export default function Users() {
    return (
        <p>Usuarios</p>
    )
}

Users.auth = {
    role: "admin",
    loading: <p>Cargando</p>,
    unauthorized: "/login", // redirect to this url
  }