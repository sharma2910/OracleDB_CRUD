/* eslint-disable handle-callback-err */
/* eslint-disable quotes */
const express = require('express')
const oracledb = require('oracledb')
// const validate = require('./employee.model')
const router = express.Router()

const dbDeatils = {
  user: 'test_demo',
  password: 'test_demo',
  connectString: '192.168.1.33:1521/mfxweb'
}

router.get('/', async (req, res) => {
  oracledb.getConnection(
    dbDeatils, async (err, con) => {
      if (err) throw err.message
      if (con) {
        console.log('Connected To DB..........')
        let ro = []
        con.execute(`SELECT * FROM TEST_EMPLOYEE`, [], { outFormat: oracledb.OBJECT, resultSet: true }).then((result) => { result.resultSet.getRow().then(row => { ro.push(row) }) })
        res.send(ro)// const result = await con.execute(`select * from employees`, [], {
        //   resultSet: true
        // })
        // console.log(result.resultSet)
        // let row
        // let i = 1
        // const rs = result.resultSet
        // while ((row = await rs.getRow())) {
        //   console.log("getRow(): row " + i++)
        //   res.send(row)
        // }
      }
    }
  )
})

router.post('/', async (req, res) => {
  oracledb.getConnection(
    dbDeatils, async (err, con) => {
      if (err) throw err
      if (con) {
        const result = con.execute(`INSERT INTO TEST_EMPLOYEE(id,name,department) VALUES(1,'Anshul','Anshul@gmail.com')`, [], {
        })
        result.then((resu) => {
          res.send(resu.rowsAffected.toString())
        }).catch((err) => {
          res.send(err.message)
        })
      }
    }
  )
})
module.exports = router
