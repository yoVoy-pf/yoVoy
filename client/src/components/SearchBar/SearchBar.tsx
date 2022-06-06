import React, { useState } from "react";
import { AppDispatch } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import { getSearchEvent } from "../../redux/actions/actions-Create";

const SearchBar = ()=>{
    const dispatch : AppDispatch = useDispatch();
    const [input, setInput] = useState("");

    function onSubmit(e:any){
        e.preventDefault();
        input?dispatch(getSearchEvent(input)): alert("oops! empty field");
        setInput("");
    };

    function onInputChange(e:any){
        setInput(e.target.value)
    }

    return(
        <React.Fragment>
            <form onSubmit = {onSubmit}>
                <input type="text" onChange={onInputChange} value={input} placeholder="Search..." />
                <input type="submit" value ="🔍" />
            </form>

        </React.Fragment>
    )
}

export default SearchBar;
