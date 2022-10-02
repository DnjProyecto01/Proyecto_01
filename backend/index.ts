import app from './app'
import './database'

app.listen(app.get('puerto'),()=>{
    console.log('server en el puerto', app.get('puerto'))
})