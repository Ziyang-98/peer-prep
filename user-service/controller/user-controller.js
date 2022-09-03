import { ormCreateUser as _createUser, ormUserExists as _userExists } from '../model/user-orm.js'

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        const userExists = await _userExists(username)

        if (username && password && !userExists) {
            
            const resp = await _createUser(username, password);
            console.log(resp);
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

