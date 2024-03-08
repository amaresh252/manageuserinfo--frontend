"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData,setUserData]=useState([]);
  const [selectedData,setSelectedData]=useState([]);
  const [mail,setMail]=useState(false)
  const  router=useRouter();
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const response = await fetch('https://userinfomanage.onrender.com/api/personalinfo');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  },[])

  const handleEdit=async(e,_id)=>{
    e.preventDefault();
    
    router.push(`/updatepersonalinfo/${_id}`)
    
  }
  const handleDelete=async(e,_id)=>{
    e.preventDefault();
    console.log(_id)
    try {
      const response = await fetch(`https://userinfomanage.onrender.com/api/deleteinfo/${_id}`,{
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setUserData(prevUserData => prevUserData.filter(data => data._id !== _id));
      }
    } catch (err) {
      console.log(err);
    }
  }


 const  handleAddPersonalInfo=(e)=>{
  e.preventDefault();
  router.push('/addpersonalinfo')

 }
 const handleSendEmail=async(e)=>{
  e.preventDefault();
  if(!selectedData) return ;
  try {
    const response = await fetch('https://userinfomanage.onrender.com/api/send-email', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(selectedData),
    });
    if(response.ok){
      const data = await response.json();
      console.log(data); 
      setMail(true);
    }
    
  } catch (error) {
    console.log( error);
  }
 }
  
  const handleSelect = (e, data) => {
    if (selectedData.includes(data)) {
      setSelectedData(selectedData.filter(item => item._id !== data._id));
      
    } else {
      setSelectedData([...selectedData, data]);
      
    }
  };
  
  return (
   
  <div className="p-5 h-screen bg-gray-100">
    <h1 className="text-xl mb-2">User Information List</h1>

    <div className="overflow-auto rounded-lg shadow hidden md:block">
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
        <tr>
          <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Select</th>
          <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">ID</th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">Phone Number</th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">Hobbies</th>
          <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
  {
    Array.isArray(userData) && userData.length > 0 &&
    userData.map((data, index) => (
      <tr key={data._id} className="bg-white">
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <input 
            type="checkbox" 
            className="font-bold text-blue-500 hover:underline" 
            onChange={e => {handleSelect(e, data)}}
            
          />
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <div className="font-bold text-blue-500 hover:underline">{index + 1}</div>
        </td>
        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          {data.name}
        </td>
        <td  className="p-3 text-sm text-gray-700 whitespace-nowrap">
          {data.phone}
        </td>
        <td  className="p-3 text-sm text-gray-700 whitespace-nowrap">
          {data.email}
        </td>
        <td  className="p-3 text-sm text-gray-700 whitespace-nowrap">
          {data.hobbies}
        </td>
        <td  className="p-3 text-sm text-gray-700 whitespace-nowrap"><button type="button" onClick={e=>handleEdit(e,data._id)}  className="text-sm font-semibold leading-6 text-blue-500">
          Edit
        </button> / <button type="button" onClick={e=>handleDelete(e,data._id)} className="text-sm font-semibold leading-6 text-red-500">
          Delete
        </button></td>
      </tr>
    ))
  }
</tbody>

      </table>
     
     
    </div>
   
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
    {
         Array.isArray(userData) && userData.length>0 &&
          (userData.map((data,index)=>(
            <div key={data._id} className="bg-white space-y-3 p-4 rounded-lg shadow">
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div >
              <input 
            type="checkbox" 
            className="font-bold text-blue-500 hover:underline" 
            onChange={e => {handleSelect(e, data)}}
            
          />
              </div>
              <div className="text-gray-500">{index+1}</div>
            </div>
            <div className="text-sm text-gray-700">
              {data.name}
            </div>
            <div className="text-sm text-gray-700">
            {data.phone}
            </div>
            <div className="text-sm text-gray-700">
            {data.email}
            </div>
            <div className="text-sm text-gray-700">
            {data.hobbies}
            </div>
            <div className="text-sm font-medium text-black">
            <button type="button" onClick={e=>handleEdit(e,data._id)}  className="text-sm font-semibold leading-6 text-blue-500">
          Edit
        </button> / <button type="button"  onClick={e=>handleDelete(e,data._id)}  className="text-sm font-semibold leading-6 text-red-500">
          Delete
        </button>
            </div>
          </div>
          )
          ))}
    </div>
    <div className="mt-6 p-2 bg-white flex items-center justify-end gap-x-6">
    <button
          type="submit"
          onClick={handleSendEmail}
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Share to Email
        </button>
        {mail && <p className="block text-sm font-medium leading-6 text-red-900">email successfully sent</p>}
        <button
          type="submit"
           onClick={handleAddPersonalInfo}
          className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          +Add
        </button>
      </div>
  </div>

  );
}
