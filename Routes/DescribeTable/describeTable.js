const express = require('express')
const router = express.Router()
const oracledb = require('oracledb')
const logger = require('winston')

const dbDeatils = {
  user: 'test_demo',
  password: 'test_demo',
  connectString: '192.168.1.33:1521/mfxweb'
}

router.get('/', async (req, res) => {
  oracledb.getConnection(
    dbDeatils, async (err, con) => {
      if (err) {
        logger.error(`Error Number : #${err.errorNum}\nError Message:${err.message}`)
        return res.send(`Error Number : #${err.errorNum}\nError Message:${err.message}`)
      }
      if (con) {
        logger.info('Connected To DB..........')
        con.execute('SELECT * FROM EMPLOYEE_TEST', [], {
          extendedMetaData: true
        },
        async (err1, result) => {
          if (err1) {
            logger.error(`Error Number : #${err1.errorNum}\nError Message:${err1.message}`)
            res.send(`Error Number : #${err1.errorNum}\nError Message:${err1.message}`)
          }
          res.send(await result.metaData)
        })
      }
    }
  )
})

module.exports = router
