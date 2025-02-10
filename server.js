const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser');
const winston = require('winston');
const {
    exec
} = require('child_process');
const {
    combine,
    timestamp,
    printf,
    colorize,
    align
} = winston.format;
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        colorize({
            all: true
        }),
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [new winston.transports.Console()]
});
app.disable('x-powered-by');
// app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, token');
    next();
});
app.use(express.static('static'));
app.get('/', function (req, res, next) {
    // res.send("Hello World, 🌍")
    res.render('ogc_api/landing.ejs', {
    })
})
require("./start/routes")(app);

app.listen(port, () => {
    logger.info(`OGC API - Landing at http://localhost:${port}`)
    logger.info(`OGC API 3D GeoVolumes - Landing at http://localhost:${port}/ogc_api_geovolumes`)
    logger.info(`OGC API 3D GeoVolumes - Collections at http://localhost:${port}/ogc_api_geovolumes/collections`)
})