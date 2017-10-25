var express = require('express');
var pg = require('pg');

var router = express.Router();
var config = {
    database: 'deneb',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeOutMillis: 30000
}
var pool = new pg.Pool(config);

//This GET route will get the pet names
router.get('/pet', function(req, res){
    pool.connect(function(errorConnectingtoDB, db, done){
        if(errorConnectingtoDB){
            conosle.log('error connecting on GET route', errorConnectingtoDB);
            res.sendStatus(501);
        } else{
            var queryText = 'SELECT * FROM "pethotel_owners" JOIN "pethotel_pets" ON "pethotel_pets"."customer_id" = "pethotel_owners"."id" JOIN "pethotel_visits" ON "pethotel_visits"."petcheck" = "pethotel_pets"."id";';
            db.query(queryText, function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    conosle.log('error making DB query', errorMakingQuery)
                    res.sendStatus(501);
                } else {
                    res.send(result.rows);
                }

            });
        }
    });
}); //End GET route to get all of the pet names

//This GET route will get the owners' names
router.get('/owner', function(req, res){
    pool.connect(function(errorConnectingtoDB, db, done){
        if(errorConnectingtoDB){
            conosle.log('error connecting on GET route', errorConnectingtoDB);
            res.sendStatus(501);
        } else{
            var queryText = //need Query text;
            db.query(queryText, function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    conosle.log('error making DB query', errorMakingQuery)
                    res.sendStatus(501);
                } else {
                    res.send(result.rows);
                }

            });
        }
    });
}); //End GET route to get all of the owners' names

//This POST route will post the owners' names to the site
router.post('/owner', function(req, res){
    var ownerData = req.body;
    console.log(ownerData);

    pool.connect(function(errorConnectingtoDB, db, done){
        if(errorConnectingtoDB){
            conosle.log('error connecting to DB on owner POST', errorConnectingtoDB);
            res.sendStatus(501);
        } else {
            var queryText = 'INSERT INTO "pethotel_owners" ("firstname", "lastname") VALUES ($1, $2);';
        db.query(queryText, [ownerData.first, ownerData.last], function(errorMakingQuery, results){
            done();
            if(errorMakingQuery){
            conosle.log('error sending owner POST', error)
            res.sendStatus(501);
            } else{
                res.send(result.rows);
            }
        });
        }
    });
}); //End owner POST route

//This is the POST route that will POSt pets to the db
router.post('/pet', function(req, res){
    var petInfo = req.body;
    console.log(petInfo);

    pool.connect(function(errorConnectingtoDB, db, done){
        if(errorConnectingtoDB){
            console.log('error connecting to DB', errorConnectingtoDB)
            res.sendStatus(501);
        } else {
            var queryText = //Pet POST route info;
           db.query(queryText, [], function(errorMakingQuery, result){
               done();
               if(errorMakingQuery){
                   conosle.log('error sending PET post', error)
                   res.sendStatus(501);
               } else {
                   res.send(result.rows);
               }
           }
        }
    })
});//End pet POST route;

router.put('/editItem/:id', function(req, res){
    var petID = req.params.id;
    var petEdit = req.body;
    console.log('Pet edits:', petEdit, petID);
    pool.connect(function(errorConnectingToDB, db, done){
        if(errorConnectingToDB){
            conosle.log('error PUT query', errorConnectingToDB);
            res.sendStatus(501);
        } else {

        }
    })
})

// router.delete('/deletePet/:id')



module.exports = router;