const express = require('express')
const router = express.Router()
const winston = require('winston');
const UAParser = require('ua-parser-js');
const config = require('../config.json');
const host_url = config.host_url;
const host_url_gv = host_url + "/ogc_api_geovolumes";
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

// GeoVolume - A function to replace the geovolumes_server_url
var replace_server_url = function (const_json, geovolumes_server_url) {
    var input_str = JSON.stringify(const_json)
    input_str = input_str.replace(/host_url/g, geovolumes_server_url);
    var input_output = JSON.parse(input_str)
    return input_output;
}
var correctUrl = function (const_json, collection_id) {
    var input_str = JSON.stringify(const_json)
    const regex = new RegExp(`collections/${collection_id}/${collection_id}`, 'g');
    const output_str = input_str.replace(regex, `collections/${collection_id}`);
    return JSON.parse(output_str);
  }

router.get('/', function (req, res) {
    try {
        const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        let landingpage_output = require('../ogc_api_geovolumes/landingpage.json');
        landingpage_output = replace_server_url(landingpage_output, host_url_gv);

        // Use UAParser instead of useragent
        const parser = new UAParser(req.headers['user-agent']);
        const result = parser.getResult();
        // Construct a string similar to useragent.toString() output;
        // Fallback to "Other" if browser info is not available.
        const agentInfo = result.browser && result.browser.name 
            ? `${result.browser.name} ${result.browser.version || ''}`.trim() 
            : "Other";

        if (req.query.f === "json" || req.query.format === "json" || agentInfo.includes("Other")) {
            res.json(landingpage_output);
        } else {
            // browser
            res.render('geovolumes/landing.ejs', {
                landingpage_output,
                host_url: host_url
            });
        }
    } catch (error) {
        logger.error(error);
    }
});

// GeoVolume - conformance
const conformance_json = require('../ogc_api_geovolumes/conformance.json')
router.get('/conformance', function (req, res) {
    res.json(conformance_json);
})

router.get('/collections', function (req, res) {
    try {
        const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        let collection_resource_updated_bbox = require('../ogc_api_geovolumes/collections/collections.json');
        collection_resource_updated_bbox = replace_server_url(collection_resource_updated_bbox, host_url_gv);

        // Use UAParser to parse the User-Agent header
        const parser = new UAParser(req.headers['user-agent']);
        const result = parser.getResult();
        const agentInfo = result.browser && result.browser.name 
            ? `${result.browser.name} ${result.browser.version || ''}`.trim() 
            : "Other";

        logger.info(`request agent: ${agentInfo}`);
        if (req.query.f === "json" || req.query.format === "json" || agentInfo.includes("Other")) {
            res.json(collection_resource_updated_bbox);
        } else {
            res.render('geovolumes/collections.ejs', {
                collection_resource_updated_bbox,
                host_url: host_url
            });
        }
    } catch (error) {
        logger.error(error);
    }
});

router.get('/collections/:collectionsId', function (req, res) {
    try {
        var collection_resource_updated = require('../ogc_api_geovolumes/collections/collections.json')
        var selected_collection_byID = []
        for (let index = 0; index < collection_resource_updated.collections.length; index++) {
            if (collection_resource_updated.collections[index]["id"] == req.params.collectionsId) {
                selected_collection_byID.push(collection_resource_updated.collections[index])
            }
        }
        const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
        selected_collection_byID  = replace_server_url(selected_collection_byID,host_url_gv)
        selected_collection_byID  = correctUrl(selected_collection_byID,req.params.collectionsId)
        var selected_collection = {
            "links": [
              {
                "rel": "self",
                "href": `${host_url_gv}/collections/${req.params.collectionsId}`,
                "type": "application/json",
                "title": `OGC API - 3D GeoVolumes collections of ${req.params.collectionsId}`
              }
            ],
            "collections": selected_collection_byID
        }
        res.json(selected_collection);
    } catch (error) {
        logger.info(error)
        res.send("internal error")
    }
})

module.exports = router
