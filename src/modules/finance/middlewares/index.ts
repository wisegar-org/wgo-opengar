import { Express } from 'express'
import fileupload from 'express-fileupload'

export function InitializeMiddlewares(App: Express) {
  const bodyParser = require('body-parser')
  App.use(fileupload())

  App.use(bodyParser.json())
  App.use(bodyParser.urlencoded({ extended: true }))
}
