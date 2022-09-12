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
            console.log("Usernmae exists. Cannot create account")
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
        const { password } = req.body;
        const userId = req.userId;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const resp = await _updatePassword(userId, hashedPassword);

        if (resp.err) {
            return res.status(400).json({message: 'Could not update password!'});
        } else {
            console.log(`Changed ${userId}'s password successfully!`);
            return res.status(201).json({message: 'Password changed successfully!'});
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Server errror, failed to change password!'});
    }
}

export async function deleteUser(req, res) {
    try {
        const userId  = req.userId;
        const user = await _deleteUser(userId);
        console.log(`${userId} has been deleted`);
        return res.status(201).json({message: 'User deleted successfully!'});

    } catch (err) {
        return res.status(500).json({message: 'Database failure when deleting user!'});
    }
}
