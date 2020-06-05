const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );

const app = express();

const { Movies } = require( './models/movie-model');
const { Actors } = require( './models/actor-model');
const errorHandling = require( './middleware/errorHandler');

//app.use( errorHandling )

app.patch( '/api/delete-movie-actor/:movie_ID', jsonParser, errorHandling, ( req, res ) =>{

    //Get data
    let paramId = req.params.movie_ID;
    let id = req.body.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    //Validations passed to errorHandling middleware
    /*
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
    }*/

    //First we find the movie by id and then modify the author list

    Movies
    .findMovieById( id )
    .then( result => {

        //Get new actors
        var newActors = result.Actors.filter(function(actor) {
            if (actor.firstName != firstName && actor.lastName != lastName){
                return actor
            }
        })

        //Check if author exists
        Actors 
            .findActorbyFirstAndLastName( firstName, lastName)
            .then( actor =>{

                //Update author list
                    Movies
                .updateActors( id, newActors)
                .then( updatedMovie => {
                    return res.status( 201 ).json( updatedMovie );
                    
                })
                .catch( err => {
                    res.statusMessage = "The actor or movie do not exist"
                    return res.status(404).end();
                })

            })
            .catch( err => {
                res.statusMessage = "The actor or movie do not exist"
                return res.status(404).end();
            })

    })
    .catch( err => {
        res.statusMessage = "The actor or movie do not exist"
        return res.status(404).end();
    })
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});