import React from 'react'
import { useDispatch } from 'react-redux'
import { getFilterUsers } from '../../redux/actions/actions-Create'
import { AppDispatch } from '../../redux/store/store'
import { useGetOrderUserMutation } from '../../slices/app/usersApiSlice'

const FilterUser = () => {

   const distpatch: AppDispatch = useDispatch()
   const [getOrderUser]: any = useGetOrderUserMutation()
   const onChange = async (e: any) => {
    getOrderUser({order: e.target.value}).then((result: any) => distpatch(getFilterUsers(result)))
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