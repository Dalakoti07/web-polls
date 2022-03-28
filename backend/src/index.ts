import express, {Application, Request, Response} from 'express';

const bodyParser = require('body-parser')
const app: Application = express();
// const router = require('./routers')
const cors = require('cors')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(cors())

// simulate delay
// app.use((req, res, next) => {
//     setTimeout(() => next(), 1000);
// });

// app.use(router)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello boy!')
});

app.listen(3000, () => {
    console.log('Server running')
})