import { createUser, userExists } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const newUser = await createUser({username, password});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

export async function ormUserExists(username) {
    try {
        const exists = await userExists({username});
        return exists;
    } catch (err) {
        console.log('ERROR: Could not check if user exists');
        return { err };
    }
}
