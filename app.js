const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const blogRouter = require('./src/routers/blog_router');

const app = express();

app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));

app.use(express.urlencoded({ extended: true }));

app.use('/', blogRouter);
app.use('/blog', blogRouter);

app.listen(3000, () => {
    console.log('3000 portundan ayaklandı');
});
