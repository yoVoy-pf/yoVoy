import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { postCreateCategory } from "../../redux/actions/actions-Create";
import { AppDispatch } from "../../redux/store/store"
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()

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

    const onSubmit = (e:any) => {
        e.preventDefault();
        dispatch(postCreateCategory(category))
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