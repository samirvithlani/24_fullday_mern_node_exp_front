
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'

export const AddExpense = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [categories, setcategories] = useState([])
    const navigate = useNavigate()
    const getMyCategories = async()=>{
        const res = await axiosInstance.get("/expCat/userCategory")
        console.log(res.data.data)
        setcategories(res.data.data)
    }

    useEffect(()=>{
        getMyCategories()
    },[])

    const submitHandler = async(data)=>{
     try{
        console.log(data)
        const res = await axiosInstance.post("/exp/",data)
        console.log(res)
        if(res.status==201){
            alert("expense added successfully")
            navigate("/my-expenses")
            
        }
     }catch(err){
        alert(err.response.data.message)
     }
    }

  return (
    <div>
        <h1>AddExpense</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
            
            <div className="flex flex-col space-y-3">
                <label htmlFor="title">title</label>
                <input type="text" id="title" {...register("title")}/>
            </div>
            <div className="flex flex-col space-y-3">
                <label htmlFor="description">description</label>
                <input type="text" id="description" {...register("description")}/>
            </div>
            <div className="flex flex-col space-y-3">
                <label htmlFor="amount">amount</label>
                <input type="number" id="amount" {...register("amount")}/>
            </div>
            <div className="flex flex-col space-y-3">
                <label htmlFor="expenseDate">expenseDate</label>
                <input type="date" id="expenseDate" {...register("expenseDate")}/>
            </div>
            <div className="flex flex-col space-y-3">
                <label htmlFor="expCat">expCat</label>
                <select {...register("expCat")}>
                    {
                        categories?.map((cat)=>{
                            return <option value={cat._id}>{cat.catName}</option>
                        })
                    }
                </select>
            </div>
            <div className="flex flex-col space-y-3">
                <label htmlFor="paymentMode">paymentMode</label>
                <select id="paymentMode" {...register("paymentMode")}>
                    <option value="CASH">Cash</option>
                    <option value="CARD">Card</option>
                    <option value="UPI">UPI</option>
                    <option value="CHEQUE">Cheque</option>
                </select>
            </div>
            <button type="submit">Add Expense</button>
        </form>
    </div>
  )
}
