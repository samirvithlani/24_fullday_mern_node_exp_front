import React from 'react'
import { useForm } from 'react-hook-form'
import axios from '../api/axiosInstance'

export const AddCategory = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()

    const submitHanlder = async(data)=>{
        console.log("data...",data)
        if(data.type=="expense"){
            const res = await axios.post("/expCat/",data)
            console.log(res)
        }
        if(data.type == "income"){
            const res = await axios.post("/incomeCat/",data)
            console.log(res)
        }
        //api
        
        
        //status check -= -->201 --->navigate -->my-categories -->toster
    }
  return (
    <div>
        <h1>ADD CATEGORY</h1>
        <form onSubmit={handleSubmit(submitHanlder)}>
            <div>
                <label>CATEGORY TYPE:</label>
                <select {...register("type",{required:{value:true,message:"select type"}})}>
                    <option value="expense">EXPENSE</option>
                    <option value="income">INCOME</option>
                </select>
                {errors.type && errors.type.message}
            </div>
            <div>
                <label htmlFor="name">Category Name</label>
                <input type="text" id="name" {...register("catName")} />
            </div>
            <div>
                <lable>DESCRIPTION</lable>
                <input type="text" id="description" {...register("description")} />
            </div>
            <button type="submit">Add Category</button>
        </form>
    </div>
  )
}
