const res = require('express/lib/response')
const db = require('../utilities/db')

class User {
    constructor(fieldsData){
        this.name = fieldsData.name
        this.password = fieldsData.password
        this.email = fieldsData.email
        this.role = fieldsData.role
    }

    async save(){
        try{
            await db.execute('INSERT INTO USERS(email, password, name, role) VALUES(?, ?, ?, ?)',
             [this.email, this.password, this.name, this.role])
            return true
        }
        catch(err){
            return false
        }
    }

    static async find(params){
        // Prepare query and data binds
        let query = 'SELECT * FROM USERS WHERE '
        let binds = []

        if("id" in params){
            query += 'id = ?'
            binds = [params.id]
        }
        else if("email" in params){
            query += 'email = ?'
            binds = [params.email]
        }
        
        // Search database
        try{
            const [data, _] = await db.query(query, binds)
            return data.length > 0 ? new User(data[0]) : undefined
        }
        catch(err){
            console.log(err);
            return null
        }

        
    }

}




module.exports = User
