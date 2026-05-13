import React, { useEffect,useState } from 'react'
import axios from '../api/axiosInstance'

export const GetMyCategories = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setselectedCategory] = useState("income")

    const getAllCategories = async () => {
        const res = await axios.get("/expCat/userCategory") //token
        if (res.data && Array.isArray(res.data.data)) {
            setCategories(res.data.data)
        } else {
            setCategories([])
        }
    }
    const getAllIncomeCategories = async()=>{
      const res = await axios.get("/incomeCat/incomeCategory") //token
        if (res.data && Array.isArray(res.data.data)) {
            setCategories(res.data.data)
        } else {
            setCategories([])
        }
    }
    useEffect(()=>{
        if(selectedCategory == "expense"){
            getAllCategories()
        }else{
            getAllIncomeCategories()
        }
    },[selectedCategory])
    const deleteCategory = async(id)=>{

      try{
      const res = await axios.delete(`/expCat/deletemycat/${id}`) //token auto intercpetor..
      if(res.status==200){
        //toastr
        getAllCategories()
      }
      }catch(err){
        alert("error while delete cat..")
      }
    }
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Categories</h1>
       <div className="flex">
          <label>SELECT CATEGORY TYPE</label>
          <select onChange={(e)=>setselectedCategory(e.target.value)}>
            <option value="expense">EXPENSE</option>
            <option value="income">INCOME</option>
          </select>
       </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {categories.map((category) => (
            <tr key={category._id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category._id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.catName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button onClick={() => deleteCategory(category._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
