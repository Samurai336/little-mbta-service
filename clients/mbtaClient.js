const axios = require("axios");
const querystring = require('querystring');

// Class for handling and abstracting the MBTA's rest APIs 
class mbtaClient {
    /**
     * 
     * @param {*} mbtaApiEndpointUrl in the URL for the MBTAs APIS 
     */
    constructor({mbtaApiEndpointUrl}){
        // create a client endpoint to call the MBTA with. 
        this.mbtaEndpoint = axios.create({ 
            baseURL: mbtaApiEndpointUrl
        }); 
    }

    // function that takes in a constructed configuration of how it 
    // should be using the MBTA API. 
    //
    // using underscore to indicate this is internal, though in javascript its
    // available to anyone anyway. 
    async _callMbtaApi({config}){
        // call MBTA API
        const { status, data:{
            data
        } } = await this.mbtaEndpoint.get(config.url); 

        // check for successes  
        // though I should be checking for a range of status codes 
        // so shame on me. 
        if(status !== 200){
            // if there were problems bubble them up. 
            throw { 
                status, 
                data 
            }
        }
        
        return data; 
    }

    /**
     * Returns MBTAs current subway lines
     */
    async getSubwayLines(){
        // The MBTA uses integers to indicate types of transport 
        // 0 indicates light rail (Trollies like the Green line) and 1 for heavy rail (Red line) and 2 for commuter rail. 
        // We only want subways so we construct a query string of just the subway type of operations. 
        const subwayLinesOnlyFilter = querystring.stringify({"filter[type]": "0,1"}); 
        const config = { 
            url: `/routes?${subwayLinesOnlyFilter}`,
        }; 

        //Make the call to get the data. 
        return await this._callMbtaApi({config})
    }

    async getSubwayStops({lineId = null}){
        // create a query param to only return stops for the line id provided
        // if no line ID was provided return every subway stop in the system. 
        const stopsQueryParam = lineId ? querystring.stringify({ 'filter[route]': `${lineId}` }) : 
            querystring.stringify({"filter[route_type]": "0,1"}); 
        const config = { 
            url: `/stops?${stopsQueryParam}`,
        }; 

         //Make the call to get the data. 
        return await this._callMbtaApi({config});
    }
}

module.exports = mbtaClient; 