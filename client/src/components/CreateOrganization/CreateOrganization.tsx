import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrganizationMutation } from "../../slices/app/organizationApiSlice";
import { selectCurrentUser } from "../../slices/authentication/authSlice";
import styleCreateOrganization from './create-organization.module.css'

const CreateOrganization = () => {
    const navigate = useNavigate()
    const currentUser = useSelector(selectCurrentUser)
    const [createOrganization] = useCreateOrganizationMutation();
    const [organization, setOrganization] = useState({
        name: ''
    });
    
    const onInputChange = (e:any) => {
        e.preventDefault();
        setOrganization({
          ...organization,
          [e.target.name]: e.target.value,
        });
    }

    const onSubmit = async (e:any) => {
        e.preventDefault();
        console.log(organization.name)
        if (organization) await createOrganization({organization: organization.name})
        setOrganization({
            name: ''
        })
        navigate('/')
    }
    return(
        <div>
            {   
                currentUser && 
                <form onSubmit={onSubmit}>
                <div className={styleCreateOrganization.form_create_organization}>
                <fieldset>
                    <legend className={styleCreateOrganization.legend_create_organization}>Nombre de la Organizacion:</legend>
                    <input 
                        type="text" 
                        placeholder="Nombre"
                        name='name'
                        required
                        className={styleCreateOrganization.input_create_organization}
                        onChange={onInputChange}
                        value={organization.name}
                    /> 
                </fieldset> <br />
                <button className={styleCreateOrganization.buttom_create_organization} type="submit">¡Crear Organizacion!</button>
                </div>
            </form>
            }
            
        </div>
    )
}

export default CreateOrganization