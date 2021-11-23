// Pg connection
const { Pool } = require('pg');

// Bcrypt
const bcrypt = require('bcrypt');

const pool = new Pool({
    host: 'localhost',
    user: 'monitomonito',
    password: 'password',
    database: 'firstapinode',
    port: '5432'
});

const getUsers = async(req, res) => {
    try {
        const response = await pool.query('SELECT * from users');
        res.status(200).json(response.rows);
    } catch (err) {
        console.log(err);
    }
}

const createUsers = async(req, res) => {
    const { name, email, password } = req.body;

    const user = {
        name: name,
        email: email,
        password: password
    }

    const salt = await bcrypt.genSalt(10);
    
    user.password = await bcrypt.hash(user.password, salt);

    try {
        const response = await pool.query('INSERT INTO users (name, email, password) values ($1, $2, $3)', [user.name, user.email, user.password]);
        res.json({
            message: "User added succesfully",
            body: {
                user
            }
        });
    } catch (err) {
        res.json({
            error: err
        });
    }

}

const getUsersById = async(req, res) => {
    const response = await pool.query('SELECT name, email FROM USERS WHERE id = $1', [req.params.id]);
    res.json({
        message: "User found tu poto",
        body: {
            user: response.rows[0]
        }
    });
}

const updateUserById = async(req, res) => {
    const { name, email } = req.body;
    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, req.params.id]);
    res.json({
        message: "User updated succesfully",
        body: {
            user: {
                name,
                email
            }
        }
    });
}

const deleteUserById = async(req, res) => {
    const { id } = req.body;
    const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({
        message: "User deleted succesfully"
    });
}

module.exports = {
    getUsers,
    createUsers,
    getUsersById,
    updateUserById,
    deleteUserById
}; 