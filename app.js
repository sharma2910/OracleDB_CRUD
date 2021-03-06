const express = require('express')
const app = express()
const employee = require('./Routes/Employee/employee.route')
const createTable = require('./Routes/CreateEmployee/createEmployee')
const describeTable = require('./Routes/DescribeTable/describeTable')
const PORT = process.env.PORT || 3000
const logger = require('./logger')

app.use(express.json())

app.use('/employee', employee)
app.use('/createTable', createTable)
app.use('/desc', describeTable)
app.get('/', (req, res) => {
  res.send('Home Page')
})

app.listen(PORT, (error) => {
  if (error) throw error
  logger.info('Listening on port 3000..')
})
