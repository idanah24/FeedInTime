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
            const res = await db.execute('INSERT INTO USERS(email, password, name, role) VALUES(?, ?, ?, ?)',
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

    static async update(changeId, values){

        // Preparing column parameters
        let columns = ''
        for (const property in values) {
            columns = columns + property + " = ?, "
        }
        columns = columns.substring(0, columns.length - 2)

        // Preparing query
        const query = 'UPDATE USERS SET ' + columns + ' WHERE email = ?'

        // Preparing bind paramteters
        const binds = Object.values(values)
        binds.push(changeId)

        // Attempt update
        try{
            const res = await db.execute(query, binds)
            return true
        }
        catch(err){
            return false
        }

    }


    static async delete(email){
        try{
            const res = await db.execute('DELETE FROM USERS WHERE email = ?', [email])
            return true
        }
        catch(err){
            return false
        }

    }

}




module.exports = User
