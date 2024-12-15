const fs = require('node:fs/promises');
const path = require('node:path');

const pathToFile = path.join(__dirname, 'db', 'users.json')

module.exports = {
    read: async () => {
        try {
            const users = await fs.readFile(pathToFile, 'utf-8');
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.log(error.message)
        }
    },
    write: async (users) => {
        try {
            await fs.writeFile(pathToFile, JSON.stringify(users))
        } catch (error) {
            console.log(error.message)
        }
    }
}
