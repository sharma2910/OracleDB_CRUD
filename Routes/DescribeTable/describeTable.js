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
    dbDeatils, async (err, con) => {
      if (err) res.send(`Error Number : #${err.errorNum}\nError Message:${err.message}`)
      if (con) {
        console.log('Connected To DB..........')
        con.execute('SELECT * FROM TEST_EMPLOYEE', [], {
          extendedMetaData: true
        },
        async (err1, result) => {
          if (err1) res.send(`Error Number : #${err1.errorNum}\nError Message:${err1.message}`)
          res.send(await result.metaData)
        })
      }
    }
  )
})

module.exports = router
