"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function UpdatePersonalInfo() {
  const router=useRouter();
  const {id}=useParams();
  const [personalInfo,setPersonalInfo]=useState({
    name:'',
    phone:'',
    email:'',
    hobbies:'',
  });
  const  [error,setError]=useState({});
  const handleChange=(e)=>{
    e.preventDefault();
    const{name,value}=e.target;
    setPersonalInfo({...personalInfo,[name]:value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = checkValidation();
    if (Object.keys(validation).length === 0) { 
      
        try {
          const response = await fetch(`https://manageuserinfo-4.onrender.com/api/updateinfo/${id}`,{
            method:'PUT',
            body:JSON.stringify(personalInfo),
            headers:{'content-type':'application/json'}
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            router.push('/')
          }
        } catch (err) {
          console.log(err);
        }
       
    } else {
      setError(validation);
      console.log(validation)
    }
    setPersonalInfo({
      name:'',
      phone:0,
      email:'',
      hobbies:'',
    })
    

   
  
  }
  useEffect(()=>{
    const updatedata=async()=>{
      try {
        console.log(personalInfo)
        const response = await fetch(`https://manageuserinfo-4.onrender.com/api/personalinfo/singluser/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setPersonalInfo(data);
        }
      }  catch (err) {
        console.log(err);
      }
    }
    updatedata();
},[_id])
  
  const  handleCancel=(e)=>{
    e.preventDefault();
    setPersonalInfo({
      name:'',
    phone:'',
    email:'',
    hobbies:'',
    })
    router.push('/')
  }
  const checkValidation=()=>{
    const errors={};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!personalInfo.name.trim()){
      errors.name='Name is required';
    }
    if(!personalInfo.phone){
      errors.phone='Phone Number is required';
    }
    if(!personalInfo.email.trim()){
      errors.email='Email is required';
    } else if (!emailRegex.test(personalInfo.email.trim())) {
      errors.email = 'Invalid email format';
    }

    if(!personalInfo.hobbies.trim()){
      errors.hobbies='Hobbies are required';
    }
    return errors;
  }
  return (
    <form>
      <div className="space-y-12 m-16 p-16 bg-white">
      
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Update User Information</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  value={personalInfo.name}
                  onChange={handleChange}
                  id="name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 {error.name && <p className="block text-sm font-medium leading-6 text-red-900">{error.name}</p>}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phone"
                  id="phone-number"
                  value={personalInfo.phone}
                  onChange={handleChange}
                  autoComplete="phone-number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {error.phone && <p className="block text-sm font-medium leading-6 text-red-900">{error.phone}</p>}
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={personalInfo.email}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 {error.email && <p className="block text-sm font-medium leading-6 text-red-900">{error.email}</p>}
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="hobbies" className="block text-sm font-medium leading-6 text-gray-900">
                Hobbies
              </label>
              <div className="mt-2">
                <textarea
                  id="hobbies"
                  name="hobbies"
                  onChange={handleChange}
                  value={personalInfo.hobbies}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
                 {error.hobbies && <p className="block text-sm font-medium leading-6 text-red-900">{error.hobbies}</p>}
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your hobbies.</p>
            </div>
            
          </div>
          
        </div>
        <div className="mt-6 bg-white flex items-center justify-end gap-x-6">
        <button type="button" onClick={handleCancel} className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update
        </button>
      </div>
      </div>
     
    </form>
  )
}
