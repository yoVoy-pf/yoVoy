import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation } from "../../slices/app/categoriesApiSlice";

const CreateCategory = () => {
    const navigate = useNavigate()

    const [createCategory] = useCreateCategoryMutation();
    const [category, setCategory] = useState({
        name: ''
    });
    
    const onInputChange = (e:any) => {
        e.preventDefault();
        setCategory({
          ...category,
          [e.target.name]: e.target.value,
        });
    }

    const onSubmit = async (e:any) => {
        e.preventDefault();
        console.log(category.name)
        if (category) await createCategory({category: category.name})
        setCategory({
            name: ''
        })
        navigate('/')
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <label>Nombre de la Categoria</label> <br />
                <input 
                    type="text" 
                    placeholder="Nombre"
                    value={category.name}
                    name='name'
                    required
                    onChange={onInputChange}
                /> <br />
                <button type="submit">¡Crear Categoria!</button>
            </form>
        </div>
    )
}

export default CreateCategory