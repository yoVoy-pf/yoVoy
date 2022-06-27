const FilterUser = ({userOrder, setUserOrder} : any) => {

   const onChange = async (e: any) => {
    setUserOrder(e.target.value)
   } 
  return (
    <div>
        <select onChange={(e)=> onChange(e)}>
            <option value="">Ordenar usuario</option>
            <option value="AZ">Ascendente</option>
            <option value="ZA">Descendente</option>
        </select>
    </div>
  )
}

export default FilterUser