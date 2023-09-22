const express = require('express');
const app = express();
const morgan = require('morgan');

// function logger(req,res,next){
//     //obtener ruta a la que intenta acceder el usuario por URL
//     console.log(`Ruta recived: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();
// }

app.set('appName', 'Prueba de express');
app.set('port',3000);
app.set('view engine', 'ejs');

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req,res) => {
   const data = [{name:'Berni'},{name:'Eva'},{name:'Jorge'}];
    res.render('index.ejs', {usuarios: data});
})
app.get('/user',(req,res)=>{
    res.json({
        username: 'Bernardo',
        lastname: 'Dieta'
    })
})
app.all('/user',(req,res, next) => {
  console.log('Por Aqui paso');
  next();
})


app.post('/user/:id',(req,res)=>{
    console.log(req.body);
    console.log(req.params);
    res.send('Post request Received');
})
app.put('/contact',(req,res) => {
    res.send('Update request Received.');
})

app.delete('/user/:userId',(req,res) => {
    res.send(`User ${req.params.userId} deleted`);
})

app.use(express.static('public'));

app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log("Escuchando puerto", app.get('port'));
})


