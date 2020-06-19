module.exports = ({app}) => {
    // Returns the name and ids of all the subway lines operating on the MBTA.
    app.get('/MBTA/Lines', async ({originalUrl},res) => {
        try{
            // get all the subway lines in the mbta 
            const mbtaSubwaysData = await res.locals.mbtaClient.getSubwayLines(); 

            // Abstract the information and format it nicely 
            const availableSubwayLines = mbtaSubwaysData.map( ({id, attributes:{long_name}}) => ({
                _links: {
                    stops:{
                        href: `${app.selfUrl}/MBTA/stops?lineId=${id}`
                    }
                },
                ID: id,
                NAME: long_name
            })); 

            // return the subways and a success status code 
            return res.status(200).json({
                _links:{
                    self: {
                        href: `${app.selfUrl}${originalUrl}`
                    }
                },
                _embedded:{availableSubwayLines}
            }); 
        } catch(e){
            // If we ran into a problem let the user know something has gone wrong 
            // and try to show what that was. In real production a choice would be 
            // made about how to do general error handling for a service 
            // sometime exposing the error to the user can be a security hazard 
            // and provide useful information to bad actors.
            return res.status(500).json({
                message: "Something has gone wrong.",
                error: e
            })
        }
    }); 
    app.get('/MBTA/stops', async ({originalUrl, query: {
        lineId
    }},res) => {
        try{
            // Pass the line id along to the client that we want to know more about stops on 
            const lineStopData = await res.locals.mbtaClient.getSubwayStops({lineId});
            
            // Format the available stops by name 
            const availableStops = lineStopData.map(({attributes:{name}}) => ({NAME:name}))

            // return the requested data nicely formatted 
            return res.status(200).json({
                _links:{
                    self: {
                        href: `${app.selfUrl}${originalUrl}`
                    }
                },
                _embedded:{ availableStops}}); 
        }catch(e){
            // If we ran into a problem let the user know something has gone wrong 
            // and try to show what that was. In real production a choice would be 
            // made about how to do general error handling for a service 
            // sometime exposing the error to the user can be a security hazard 
            // and provide useful information to bad actors.
            //
            // Note: this is very much like the above error handler and could be abstracted 
            // I usually follow the rule of three that is if I am doing or copy/pasting code 3 or 
            // more times that could should be abstracted into a reusable function, class etc. 
            return res.status(500).json({
                message: "Something has gone wrong.",
                error: e
            })
        }


    }); 
}