import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation } from "../../slices/app/categoriesApiSlice";
import styleCreateCategory from './create-category.module.css'

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
                <div className={styleCreateCategory.form_create_category}>
                <fieldset>
                    {/* <label>Nombre de la Categoria</label> <br /> */}
                    <legend className={styleCreateCategory.legend_create_category}>Nombre de la Categoria:</legend>
                    <input 
                        type="text" 
                        placeholder="Nombre"
                        name='name'
                        required
                        className={styleCreateCategory.input_create_categoty}
                        onChange={onInputChange}
                        value={category.name}
                    /> 
                </fieldset> <br />
                <button className={styleCreateCategory.buttom_create_category} type="submit">¡Crear Categoria!</button>
                </div>
            </form>
        </div>
    )
}

export default CreateCategory