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
router.get('/pet', function (req, res) {
    pool.connect(function (errorConnectingtoDB, db, done) {
        if (errorConnectingtoDB) {
            console.log('error connecting on GET route', errorConnectingtoDB);
            res.sendStatus(501);
        } else {
            var queryText = 'SELECT * FROM "pethotel_owners" JOIN "pethotel_pets" ON "pethotel_pets"."customer_id" = "pethotel_owners"."id" LEFT OUTER JOIN "pethotel_visits" ON "pethotel_visits"."petcheck" = "pethotel_pets"."id";';
            db.query(queryText, function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making DB query', errorMakingQuery)
                    res.sendStatus(501);
                } else {
                    res.send(result.rows);
                }

            });
        }
    });
}); //End GET route to get all of the pet names

//This GET route will get the owners' names
router.get('/owner', function (req, res) {
    pool.connect(function (errorConnectingtoDB, db, done) {
        if (errorConnectingtoDB) {
            console.log('error connecting on GET route', errorConnectingtoDB);
            res.sendStatus(501);
        } else {
            var queryText = 'SELECT * FROM "pethotel_owners";';
            db.query(queryText, function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('error making DB query', errorMakingQuery)
                    res.sendStatus(501);
                } else {
                    res.send(result.rows);
                }

            });
        }
    });
}); //End GET route to get all of the owners' names

// This POST route will post the owners' names to the site
router.post('/owner', function (req, res) {
    var ownerData = req.body;
    console.log(ownerData);

    pool.connect(function (errorConnectingtoDB, db, done) {
        if (errorConnectingtoDB) {
            console.log('error connecting to DB on owner POST', errorConnectingtoDB);
            res.sendStatus(501);
        } else {
            var queryText = 'INSERT INTO "pethotel_owners" ("firstname", "lastname") VALUES ($1, $2);';
            db.query(queryText, [ownerData.first, ownerData.last], function (errorMakingQuery, results) {
                done();
                if (errorMakingQuery) {
                    console.log('error sending owner POST', error)
                    res.sendStatus(501);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
}); //End owner POST route

// //This is the POST route that will POSt pets to the db
router.post('/pet', function (req, res) {
    var petInfo = req.body;
    console.log(petInfo);

    pool.connect(function (errorConnectingtoDB, db, done) {
        if (errorConnectingtoDB) {
            console.log('error connecting to DB', errorConnectingtoDB)
            res.sendStatus(501);
        } else {
            var queryText = 'INSERT INTO "pethotel_pets" ("petname", "breed", "color", "customer_id") VALUES ($1, $2, $3, $4);';
                db.query(queryText, [petInfo.petname, petInfo.breed, petInfo.color, petInfo.customer_id], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('error sending PET post', error)
                        res.sendStatus(501);
                    } else {
                        res.sendStatus(200);
                        
                    }
                })
        }
    })
});//End pet POST route;

// //This PUT route edits pets
router.put('/editItem/:id', function(req, res){
    var petID = req.params.id;
    var petEdit = req.body;
    console.log('Pet edits:', petEdit, petID);
    pool.connect(function(errorConnectingToDB, db, done){
        if(errorConnectingToDB){
            console.log('error PUT query', errorConnectingToDB);
            res.sendStatus(501);
        } else {
            var queryText = 'UPDATE "pethotel_pets" SET "petname"=$1, "breed"=$2, "color"=$3 WHERE "id" = $4;';
            db.query(queryText, [petEdit.petName, petEdit.breed, petEdit.color, petID], function(errorMakingQuery, result){
                if(errorMakingQuery){
                    console.log('error PUT query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            })
        }
    })
}); //End PUT route that edits pets

// //This PUT route edits whether the pets are in the hospital or not
router.put('/inOut/:id', function(req, res){
    var inOutID = req.params.id;
    var petEdit = req.body;
    console.log('In out PUT:', inOutId, petEdit);
    pool.connect(function(errorConnectingToDB, db, done){
        if(errorConnectingToDB){
            console.log('PUT error', errorConnectingToDB);
            res.sendStatus(501);
        } else {
            var queryText = 'UPDATE "pethotel_visits" SET “checkout” = $1 WHERE id = $2 VALUES ($1, $2);';
            db.query(queryText, [petEdit.checkout, inOutID], function(errorMakingQuery, result){
                if(errorMakingQuery){
                    console.log('error PUT query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            })
        }
    })
}); //End POST for in

// //This delete route deletes pets off the DB
router.delete('/deletePet/:id', function(req, res){
var petID = req.params.id;
console.log('DELETE pet id', petID);
pool.connect(function(errorConnectingToDB, db, done){
    if(errorConnectingToDB){
        console.log('error connecting to DB', errorConnectingToDB);
        res.sendStatus(500);
    } else {
        var queryText = 'DELETE * FROM "pethotel_pets" WHERE "id"= $1;';
        db.query(queryText, [petID], function(errorMakingQuery, result){
            done();
            if(errorMakingQuery){
                console.log('error making query', errorMakingQuery);
            } else {
                res.sendStatus(200);
            }
        })
    }
})
}); //end delete route

//This post route is checking in pets to the hotel.
router.post('/in', function (req, res) {
    var object = req.body;
    
        pool.connect(function (errorConnectingToDB, db, done) {
            if (errorConnectingToDB) {
                console.log('PUT error', errorConnectingToDB);
                res.sendStatus(501);
            } else {
                var queryText = 'INSERT INTO "pethotel_visits" ("checkin", "petcheck") VALUES($1, $2)'
                db.query(queryText, [object.checkin, object.petcheck], function (errorMakingQuery, result) {
                    if (errorMakingQuery) {
                        console.log('error PUT query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                })
            }
        })
    }); //End POST for in



module.exports = router;