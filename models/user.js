const db = require('../db');

class User {
    constructor(name, password){
        this.name = name
        this.password = password
    }

    async save(){
        try{
            db.execute('INSERT INTO USERS(name, password) VALUES(?, ?)', [this.name, this.password])
            return true
        }
        catch(err){
            console.log(err)
            return false
        }
    }

    static async find(id){
        const query = id ? 'SELECT * FROM USERS WHERE id = ?' : 'SELECT * FROM USERS'
        try{
            const [data, _] = await db.execute(query, [id])
            return data
        }
        catch(err){
            console.log(err)
            return []
        }
    }

}






module.exports = User
