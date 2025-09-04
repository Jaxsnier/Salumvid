const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log(port);
    res.send('Hello World! funcionando');
});

app.listen(port, () => {
    console.log('Server is running on ${port}');
});
