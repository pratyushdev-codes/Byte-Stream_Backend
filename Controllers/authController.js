import Users from "../models/userModel";


export const register = async(req, res, next)=>{
    const {firstName , lastName , email , password}= req.body;



    //validate fields
    if(!firstName || lastName || email || password){
        next("Provide Required Fields!")
        return ;
    }try{
        const userExist = await Users.findOne({email});

        if(userExist){
            next("User already Exists");
            return;
        }

        const hashedPassword = await hashedPassword(password);

    }catch(error){
     console.log(error);
     res.status(404).json({message:error.message});   
    }
    
}