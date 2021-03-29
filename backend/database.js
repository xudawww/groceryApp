var mysql = require('mysql');
var util = require('util')
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'xuda',
    password : 'xuda',
    database : 'groceryapp'
});
pool.query = util.promisify(pool.query)
exports.pool = pool;