export default function Sales() {
    return (
        <p>Ventas</p>
    )
}


Sales.auth = {
    role: "admin",
    loading: <p>Cargando</p>,
    unauthorized: "/login", // redirect to this url
  }