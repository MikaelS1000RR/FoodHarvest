// Start an express server that serves all files in the folder frontend

import { TestHarvesting } from "./Harvesters/TestHarvesting.js";




TestHarvesting.test();
const express = require('express');

const app = express();
app.use(express.static('frontend')); // if doesn't work then try ../frontend 




app.listen(3000, () => console.log('Listening on port 3000'));


// Use firebase



