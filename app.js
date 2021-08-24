import express from 'express';
import { sequelize } from './db/database.js';
// import 'express-async-errors';
import authRouter from './router/auth.js';
import letterRouter from './router/letter.js';
const app = express();

app.use('/auth', authRouter);
app.use('/letter', letterRouter)

app.use((req, res, next) => {
    res.sendStatus(404);
})




sequelize.sync().then(() => {
    const server = app.listen(8080, function () {
        const host = server.address().address;
        const port = server.address().port;
    
        console.log(`http://localhost:${port}`);
    });

})
