import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import indexRoutes from './routes/index'

const app = express()

//settings
app.set('port', 4000)

//Ver en consola
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//Rutas
app.use('/', indexRoutes)

export default app