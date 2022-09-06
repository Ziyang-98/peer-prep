import bcrypt from 'bcrypt'
import UserModel from '../model/user-model.js'
import jwt from "jsonwebtoken"
const secret_token = '123457';
export async function LoginAuth(req, res) {
    try {
        // Get user input
        const { username, password } = req.body;
    
        // Validate user input
        if (!(username && password)) {
          return res.status(400).send({ 
            message: "Missing Fields" 
          });
        }
        // Check if user exist in our database
        const user = await UserModel.findOne({ username: username });
        
        if (!user) {
            return res.status(400).json({ message: "User does not exist in database." });
        }
        // Authorisation success
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
              { user_id: user._id },
              secret_token,
              { expiresIn: "3d" }
          );
    
          // user
          return res.status(200).json({ token, user });
        } else {
            return res.status(400).send({ message: "Invalid credentials." });
        }
    } catch (err) {
        console.log(err);
        return res.status(500)
    }
}

export default LoginAuth
