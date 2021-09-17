const express = require('express');
const app = expess();
app.use(express.static('www')); 
app.listen(3000, () => console.log('Listening on port 3000'))