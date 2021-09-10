import express from 'express';
import { sequelize } from './db/database.js';
// import 'express-async-errors';
import authRouter from './router/auth.js';
import letterRouter from './router/letter.js';
import mailBoxRouter from './router/mailbox.js'
const app = express();

// request body parser
app.use(express.json());

app.use('/auth', authRouter);
app.use('/letter', letterRouter);
app.use('/mailbox', mailBoxRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
})




sequelize.sync().then(() => {
    const server = app.listen(3000, function () {
        const host = server.address().address;
        const port = server.address().port;
    
        console.log(`http://localhost:${port}`);
    });

})
