const bcrypt = require('bcrypt')

const hashPassword = async (password, saltRounds = 10) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash password
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    } catch (error) {
        console.log(error);
    }

    // Return null if error
    return null;
};

hashPassword('asdfgh').then(hash => console.log(hash))