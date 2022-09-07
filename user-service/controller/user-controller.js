import { ormCreateUser as _createUser, ormUserExists as _userExists, ormUpdatePassword as _updatePassword, ormDeleteUser as _deleteUser } from '../model/user-orm.js'
import { SALT_ROUNDS } from "../common/constants.js";
import bcrypt from 'bcrypt';

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        const userExists = await _userExists(username);

        if (username && password && !userExists) {

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const resp = await _createUser(username, hashedPassword);

            if (resp.err) {
                return res.status(400).json({message: 'Could not create a new user!'});
            } else {
                console.log(`Created new user ${username} successfully!`)
                return res.status(201).json({message: `Created new user ${username} successfully!`});
            }
        } else if (!username || !password) {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        } else if (userExists) {
            return res.status(400).json({message: 'Username is already used!'})
        } else {
            return res.status(400).json({message: 'System failed to create new user!'})
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

export async function changePassword(req, res) {
    try {
        //TODO: get username from jwt token
        //const { token } = req.body;
        //const user = jwt.verify(token);

        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const resp = await _updatePassword(username, hashedPassword);

        if (resp.err) {
            return res.status(400).json({message: 'Could not update password!'});
        } else {
            console.log(`Changed ${username}'s password successfully!`)
            return res.status(201).json({message: 'Password changed successfully!'});
        }

    } catch (err) {
        return res.status(500).json({message: 'Server errror, failed to change password!'});
    }
}