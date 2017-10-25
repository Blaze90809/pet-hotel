$(document).ready(readyNow);

// var owner = {
//     first: jerry ,
//     last: berry
// }
//     var pet = {
//         name:terry
// }
function readyNow(){
    console.log('js and jq sourced');
    getPets()

    //click handlers.
    $("#maintable").on('click', "#checkInBtn" ,inClicked());
}

//GET ROUTES
function getOwners(){ //getting List data append in done
        console.log('in getOwners');
        // ajax call to server to get List
        $.ajax({
            method: 'GET',
            url: '/hotel/owner',
        }).done(function (response) {
            console.log(response);
            var list = response;
            // appendToDom(list);
        }).fail(function (error) {
            alert('something went wrong in getOwners', error);
        });//end of fail
    } //end of getTables

function getPets(){
    console.log('in getPets');
    $.ajax({
        method:'GET',
        url: '/hotel/pet'
    }).done(function(response){
        console.log(response);
        var completeList = response
        //append here
    }).fail(function(error){
        alert('something went wront in getPets', error)
    });//end of fail
}//end of getPets

//POST ROUTES
    function sendOwner(){
        console.log('in sendOwner');
        $.ajax({
            method: 'POST',
            url: '/hotel/owner',
            data: owner,
        }).done(function(response){
            console.log(response);
        }).fail(function (error){//end of done
            alert('something went wrong in sendOwner', error)
        })//end of fail
    }//end of send owner

    function sendPet(){
        console.log('In sendPet');
        $.ajax({
            method: 'POST',
            url: '/hotel/pet',
            Data: pet
        }).done(function (response){
            console.log(response);
        }).fail(function(error){
            alert('somethign went wrong in sendPet', error)
        })
    }

//PUT ROUTES

function inOut(){
    console.log('in inOut');
    $.ajax({
        method: 'PUT',
        url:'hotel/inOut/:id',
        data: check
    }).done(function(response){
        console.log(response);  
    }).fail(function (response){
        alert('something wrong in inOut')
    })
}

function editItem(){
    console.log('in edit item');
    $.ajax({
        method: 'PUT',
        url: 'hotel/editItem/:id',
        data: changePet
    }).done(function(response){
        console.log(response);
    }).fail(function(error){
        alert('something wrong in editItem');
    })//end of fail
}// end of editingItem

// DELETE ROUTES

function deletePet(){
    console.log('in deletePet');
    $.ajax({
        method:'DELETE',
        url: 'hotel/deletePet/:id'
    }).done(function(response){
        console.log(response);
    }).fail(function(error){
        alert('something wrong in deletePet');
    })//end of fail
}//end deletePet

function inClicked();
    console.log('clicked in');
    function sendPet() {
        console.log('In sendPet');
        $.ajax({
            method: 'POST',
            url: '/hotel/in' + petcheck,
            Data: visitin
        }).done(function (response) {
            console.log(response);
        }).fail(function (error) {
            alert('something went wrong in sendPet', error)
        })
    }
