require('dotenv').config({path: '../../.env'});

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {graphqlHTTP} = require('express-graphql')

const app = express();
const db = require('../models');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const RootGrapQLSchema = require('../graphql');

app.use('/graphql',graphqlHTTP({
    schema:RootGrapQLSchema,
    graphiql:true
}));

db.sequelize.sync().then(()=>{
    app.listen(process.env.API_USERS_PORT, () => console.log(`PORT:` + process.env.API_USERS_PORT));
}).catch((err)=>console.error(err))