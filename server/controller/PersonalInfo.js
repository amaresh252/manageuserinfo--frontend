const  {PersonalInfo} =require('../models/PersonalInfo')


exports.createUserInfo=async(req,res)=>{
    try{
      const personalinfo=await new PersonalInfo(req.body);
      const doc=await personalinfo.save();
      res.status(201).json(doc);
    }
    catch(error){
        res.status(400).json('error in insert personal info');
       
    }
}  
exports.fetchUserInfo=async(req,res)=>{
    try{
     
      const personalinfo=await PersonalInfo.find();
      res.status(200).json(personalinfo);
    }
    catch(error){
       
        res.status(400).json('error in fetch personal info');
    }
}  
exports.fetchsingleUserInfo=async(req,res)=>{
    try{
     const {_id}=req.params;
      const personalinfo=await PersonalInfo.findById(_id);
      res.status(200).json(personalinfo);
    }
    catch(error){
       
        res.status(400).json('error in fetch personal info');
    }
}  
exports.deleteUserInfo=async(req,res)=>{
  const {_id}=req.params ;
  try{
    const personalinf=await PersonalInfo.findByIdAndDelete(_id);
    
    if(personalinf){
        res.status(200).json({message:'deleted successfully'});
    }
    else {
        res.status(400).json({message:'not deleted'}) 
    }
}catch(err){
     res.status(400).json(err); 
}
 
}


exports.updateUserInfo=async(req,res)=>{
    const {_id}=req.params;
   
    try{ 
      const personalinfo=await PersonalInfo.findByIdAndUpdate(_id,req.body,{new:true});
      res.status(200).json(personalinfo);
    }
    catch(error){
        res.status(400).json('error in update personal info');
        
    }
}  
