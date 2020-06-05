function errorHandler(req, res, next) {
    
    //Get data
    let paramId = req.params.movie_ID;
    let id = req.body.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    //Validations

    if ( !id ){
        res.statusMessage = "ID missing in the body of the request";
        return res.status(406).end();
    }

    if (paramId != id){
        res.statusMessage = "id and movie_ID do not match";
        return res.status(409).end();
    }

    if (!firstName || !lastName){
        res.statusMessage = "You need to send both firstName and lastName of the actor to remove from the movie list";
        return res.status(403).end();
    }
    next();
}

module.exports = errorHandler;