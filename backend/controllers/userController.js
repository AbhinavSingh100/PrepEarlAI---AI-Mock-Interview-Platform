const User = require("../models/User");

exports.updateProfile = async (req, res) => {
    try{
        const { role, experience, stack, resumeLink } = res.body;
        const userId = req.user.id;
        const updatedUser = await User.findByIdAndUpdate(userId, 
            {role, experience, stack, resumeLink}, 
            {new: true});
        if(!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Profile updated successfully', user: updatedUser });
    }
    catch(error){
        res.status(500).json({ message: 'Server error' , error });
    }
}

exports.getUserHistory = async (req, res) => {
    try{
        const userId = req.user.id;
        const user = await User.find({ user: userId }).sort({ startedAt: -1});
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    }
    catch(error){
        res.status(500).json({ message: 'Server error! Could not get user history.' , error });
    }
}