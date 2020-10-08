const express =require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();
const route = express.Router();

const capsuleController = require('./controllers/capsuleController');
const landingPadController = require('./controllers/landingPadController');

app.unsubscribe(helmet());
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

route.get('/capsule', capsuleController.capsule_list);
route.get('/landingpad/:id', landingPadController.getLandingPageById);

app.use(route);

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);