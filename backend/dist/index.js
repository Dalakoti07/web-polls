"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
// const router = require('./routers')
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use(cors());
// simulate delay
// app.use((req, res, next) => {
//     setTimeout(() => next(), 1000);
// });
// app.use(router)
app.get('/', (req, res) => {
    res.send('Hello boy!');
});
app.listen(3000, () => {
    console.log('Server running');
});
