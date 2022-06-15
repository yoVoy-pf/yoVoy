import { useGetOrganizationsQuery } from "../../slices/app/organizationApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";

const OrganizationList = () => {
  const navigate = useNavigate();
  const{
    data: organizations,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetOrganizationsQuery({_:''}, {refetchOnMountOrArgChange: true,})

  let content = <span></span>;
  if (isLoading){
    content = <p>Cargando...</p>
  } else if (isSuccess){
    content = (
      <div style={{ marginTop: "100px" }}>
      <table>
          <tbody>
          <tr>
            <th></th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
          <div>
          </div>

          {organizations?.map((organization: any, index: any) => {
            return (
              <tr key={organization.id}>
                <th scope="row">{index + 1}</th>
                <td>{organization.name}</td>
                <td>
                  <Link to={`/update-organization/${organization.id}`}>
                    <button>Editar</button>
                  </Link>
                  <button>
                    Eliminar
                  </button>
                </td>
              </tr>
              );
            })}
            </tbody>
        </table>
      </div>
    )
  } else if (isError){
    content = <p>{JSON.stringify(error)}</p>
  }
  return content
}

export default OrganizationList