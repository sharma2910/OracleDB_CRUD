/* eslint-disable quotes */
/* eslint-disable handle-callback-err */
const express = require('express')
const router = express.Router()
const oracledb = require('oracledb')

const dbDeatils = {
  user: 'test_demo',
  password: 'test_demo',
  connectString: '192.168.1.33:1521/mfxweb'
}

router.get('/', async (req, res) => {
  oracledb.getConnection(
    dbDeatils, async (error, connection) => {
      if (error) throw error
      if (connection) {
        console.log('connected to DB........')
        connection.execute(`CREATE TABLE TEST_EMPLOYEE(id INT,name VARCHAR(50),department VARCHAR(50))`, [],
          (err, resu) => {
            if (err) return res.send(`Error Number : #${err.errorNum}\nError Message:${err.message}`)
            if (resu) {
              res.send(resu.rowsAffected.toString())
            }
          })
      }
    }
  )
})

module.exports = router
