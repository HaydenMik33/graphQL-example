const express = require('express');
const expressGraphQL = require('express-graphql')
const schema = require('./schema')
const app = express();
const port = 3001;

app.use('/graphiql', expressGraphQL({
    schema : schema,
    graphiql : true
}))
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})