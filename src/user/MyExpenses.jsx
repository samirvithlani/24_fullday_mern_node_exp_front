import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { ArrowBigUp, ArrowDown, ArrowUp } from 'lucide-react'

export const MyExpenses = () => {
    const [expenses, setExpenses] = useState([])
    const [loading, setLoading] = useState(true)
    const [sort, setsort] = useState(1)
    const [dateSort, setdateSort] = useState(1)

    const getMyExpenses = async () => {
        try {
            //const res = await axiosInstance.get("/exp/expbyuserid?sort="+sort)
            const res = await axiosInstance.get(`/exp/expbyuserid?sort=${sort}&date=${dateSort}`)
            setExpenses(res.data.data)
            console.log(res.data.data)
        } catch (err) {
            console.error("Error fetching expenses", err)
        } finally {
            setLoading(false)
        }
    }
    const searchHanlder=async(e)=>{
        console.log(e.target.value)
        const res = await axiosInstance.get("/exp/search?expName="+e.target.value)
        console.log(res.data.data) //sa -->[]
        setExpenses(res.data.data) //replace with search data [1]
 
        
    }

   
    useEffect(() => {
        alert("use effect...")
        getMyExpenses()
    }, [sort,dateSort])

    
    return (
        <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">My Expenses</h1>
                    <span className="px-4 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm font-medium border border-indigo-500/20">
                        Total Records: {expenses.length}
                    </span>
                </div>
                <div>
                    <label>Search</label>
                    <input type="text" onChange={(e)=>{searchHanlder(e)}}></input>
                    </div>

                <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800/50 border-b border-slate-700">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Title</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Description</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Amount
                                    <button onClick={()=>{setsort(1)}}><ArrowUp /></button>
                                    <button onClick={()=>{setsort(-1)}}><ArrowDown /></button>
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Date
                                        <button onClick={()=>{setdateSort(1)}}><ArrowUp /></button>
                                        <button onClick={()=>{setdateSort(-1)}}><ArrowDown /></button>
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Category</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Mode</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-slate-500 italic">
                                            Loading your expenses...
                                        </td>
                                    </tr>
                                ) : expenses.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-slate-500 italic">
                                            No expenses found.
                                        </td>
                                    </tr>
                                ) : (
                                    expenses.map((ex) => (
                                        <tr key={ex._id} className="hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-white">{ex.title}</td>
                                            <td className="px-6 py-4 max-w-xs truncate text-slate-400" title={ex.description}>
                                                {ex.description || '---'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-emerald-400">
                                                ${parseFloat(ex.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                                                {new Date(ex.expenseDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-3 py-1 bg-slate-800 text-indigo-300 rounded-lg text-sm border border-slate-700">
                                                    {ex.expCat?.catName?.toUpperCase() || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                                                    ex.paymentMode === 'CASH' ? 'text-amber-400 bg-amber-400/10' :
                                                    ex.paymentMode === 'CARD' ? 'text-blue-400 bg-blue-400/10' :
                                                    ex.paymentMode === 'UPI' ? 'text-purple-400 bg-purple-400/10' :
                                                    'text-slate-400 bg-slate-400/10'
                                                }`}>
                                                    {ex.paymentMode}
                                                </span>
                                            </td>
                                            
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

