import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserQuery, useUpdateUserMutation } from "../../slices/app/usersApiSlice";
import styleUser from './update-user.module.css'

const Updateuser = () => {
    const [updateUser] = useUpdateUserMutation();
    const { id }: any = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, error } = useGetUserQuery(id);
    const [user, setUser] = useState({
        name: ''
    })
    
    useEffect(()=> {
        if(id) {
            if(data) {
                setUser({...data})
            }
        } else {
            console.log(error)
        }
    }, [id, data])
    
    const onChange = (e: any) => {
        e.preventDefault();
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            id && await updateUser({id: id, updateUser: user});
            setUser({
                name: ''
            });
            navigate('/userslist')
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className={styleUser.form_user}>
                    <fieldset>
                        <legend>Name:</legend>
                        <input 
                        type="text" 
                        name="name"
                        value={user.name}
                        onChange={onChange}
                        />
                    </fieldset> <br />
                    {/* <fieldset>
                        <legend>Email:</legend>
                        <input 
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={onChange} 
                        />
                    </fieldset> */}
                    <button type="submit">Actualizar User</button>
                </div>
            </form>
        </div>
    )
}

export default Updateuser