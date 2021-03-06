const express = require('express')
const oracledb = require('oracledb')
const router = express.Router()
const logger = require('../../logger')
const { ValidateInsert, ValidateUpdate } = require('./employee.validate')

const dbDeatils = {
  user: 'test_demo',
  password: 'test_demo',
  connectString: '192.168.1.33:1521/mfxweb'
}

router.get('/', async (req, res) => {
  logger.info('GET /employee called.')
  oracledb.getConnection(
    dbDeatils, async (err, con) => {
      if (err) {
        logger.error(`Error Number : #${err.errorNum}\nError Message:${err.message}`)
        res.status(400).send(`Error Number : #${err.errorNum}\nError Message:${err.message}`)
      }
      if (con) {
        logger.info('Connected To DB..........')
        con.execute('SELECT * FROM EMPLOYEE_TEST', [], {
          outFormat: oracledb.OBJECT
        },
        async (err1, result) => {
          if (err1) {
            logger.error(`Error Number : #${err1.errorNum}\nError Message:${err1.message}`)
            res.send(`Error Number : #${err1.errorNum}\nError Message:${err1.message}`)
          }
          res.send(await result.rows)
        })
      }
    }
  )
})

router.get('/:id', async (req, res) => {
  logger.info('GET /employee/:id called.')
  oracledb.getConnection(
    dbDeatils, async (err, con) => {
      if (err) {
        logger.error(`Error Number : #${err.errorNum}\nError Message:${err.message}`)
        res.status(400).send(`Error Number : #${err.errorNum}\nError Message:${err.message}`)
      }
      if (con) {
        logger.info('Connected To DB..........')
        con.execute('SELECT * FROM EMPLOYEE_TEST WHERE ID = :id', [req.params.id], {
          outFormat: oracledb.OBJECT
        },
        async (err1, result) => {
          if (err1) res.send(`Error Number : #${err1.errorNum}\nError Message:${err1.message}`)
          res.send(await result.rows)
        })
      }
    }
  )
})

router.post('/', async (req, res) => {
  logger.info('POST /employee called.')
  oracledb.getConnection(
    dbDeatils, async (err, con) => {
      if (err) {
        logger.error(`Error Number : #${err.errorNum}\nError Message:${err.message}`)
        return res.send(`Error Number : #${err.errorNum}\nError Message:${err.message}`)
      }
      if (con) {
        const { error } = ValidateInsert(req.body)
        if (error) {
          logger.error(error.message)
          return res.send(error.message)
        }
        logger.info('Connected To DB..........')
        const id = req.body.id
        const name = req.body.name
        const age = req.body.age
        const dept = req.body.department
        const phone = req.body.phone

        const result = await con
          .execute(`INSERT INTO EMPLOYEE_TEST
          (id,name,department,age,phone) 
          VALUES(:1,:2,:3,:4,:5)`,
          [id, name, dept, age, phone],
          {
            autoCommit: true
          })
        res.send(`Number of Rows Affected : ${result.rowsAffected.toString()}`)
      }
    }
  )
})

router.put('/:id', async (req, res) => {
  logger.info('PUT /employee/:id called.')
  oracledb.getConnection(
    dbDeatils, async (err, con) => {
      if (err) {
        logger.error(`Error Number : #${err.errorNum}\nError Message:${err.message}`)
        return res.send(`Error Number : #${err.errorNum}\nError Message:${err.message}`)
      }
      if (con) {
        const { error } = ValidateUpdate(req.body)
        if (error) {
          logger.error(error.message)
          return res.send(error.message)
        }

        logger.info('Connected To DB..........')
        const id = req.params.id
        const name = req.body.name
        const age = req.body.age
        const dept = req.body.department
        const phone = req.body.phone
        const result = await con.execute(`UPDATE EMPLOYEE_TEST
        SET name = :1,
        department = :2,
        age = :3,
        phone = :4
        WHERE id = :5`,
        [name, dept, age, phone, id],
        {
          autoCommit: true
        })
        res.send(`Number of Rows Affected : ${result.rowsAffected.toString()}`)
      }
    }
  )
})

router.delete('/:id', (req, res) => {
  logger.info('DELETE /employee/:id called.')
  oracledb.getConnection(
    dbDeatils, async (err, con) => {
      if (err) {
        logger.error(`Error Number : #${err.errorNum}\nError Message:${err.message}`)
        return res.send(`Error Number : #${err.errorNum}\nError Message:${err.message}`)
      }
      if (con) {
        logger.info('Connected To DB..........')
        const id = req.params.id
        const result = await con.execute('DELETE FROM EMPLOYEE_TEST where ID = :1', [id], {
          autoCommit: true
        })
        res.send(`Number of rows affected : ${result.rowsAffected.toString()}`)
      }
    }
  )
})

module.exports = router
