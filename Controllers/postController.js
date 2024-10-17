export const createPost= async(req, res, next)=>{
    try {
        const {userId} = req.body.user;
        
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
}