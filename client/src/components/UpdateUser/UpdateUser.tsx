import React from "react"

const Updateuser = () => {
    
    return (
        <div>
            <form>
                <fieldset>
                    <legend>Name:</legend>
                    <input 
                    type="text" 
                    />
                </fieldset> <br />
                <fieldset>
                    <legend>Email:</legend>
                    <input 
                    type="text" 
                    />
                </fieldset>
                <button>Actualizar User</button>
            </form>
        </div>
    )
}

export default Updateuser