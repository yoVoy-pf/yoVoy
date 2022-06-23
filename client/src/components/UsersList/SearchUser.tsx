import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { useGetSearchUserMutation } from "../../slices/app/usersApiSlice"
import { getSearchUser } from '../../redux/actions/actions-Create'

type FormElement = React.FormEvent<HTMLFormElement>;
type Input = React.ChangeEvent<HTMLInputElement>


const SearchUser = () => {

    const [input, setInput] = useState("");
    const [getUser]: any = useGetSearchUserMutation();
    const dispatch: AppDispatch = useDispatch();


    const onSubmit = async (e: FormElement) => {
        e.preventDefault();
        if(input){
            const data = getUser({email: input}).then((result:any) => {dispatch(getSearchUser(result))});
        }
        // input && getUser({email: input});
        setInput("");
    };
    function onInputChange(e: Input) {
        setInput(e.target.value)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                    <input className="searchBar-bg-input1"  type="text" onChange={onInputChange} value={input} placeholder="Buscar por email..." />
                    <input className="searchBar-bg-input2" type="submit" value="🔍" />
                </form>
        </div>
    )
}

export default SearchUser;