$(document).ready(readyNow);
//     var pet = {
//         name:terry
// }
function readyNow() {
    console.log('js and jq sourced');
    getOwners();
    getPets();
    $('#ownerReg').on('click', addOwner);
    $("#petReg").on("click", sendPet);
    $("maintable").on("click", "#deleteBtn", deletePet);
    $('.table').on('click', '#checkOutBtn', checkOutFunction);
    $(".table").on('click', "#checkInBtn" , inClicked);



}

function addOwner(e) {
    e.preventDefault(); 
    var firstIn = $('#ownerFirstNameIn').val();
    var lastIn = $('#ownerLastName').val();
    var owner = {
        first: firstIn,
        last: lastIn
    }
    sendOwner(owner)    
}


//GET ROUTES -- get owners for DOM
function getOwners() { //getting List data append in done
    console.log('in getOwners');
    // ajax call to server to get List
    $.ajax({
        method: 'GET',
        url: '/hotel/owner',
    }).done(function (response) {
        console.log('response', response);
        var ownerList = response;
        appendOwners(ownerList);
    }).fail(function (error) {
        alert('something went wrong in getOwners', error);
    });//end of fail
} //end of getTables


//get pets for DOM
function getPets() {
    console.log('in getPets');
    $.ajax({
        method: 'GET',
        url: '/hotel/pet'
    }).done(function (response) {
        console.log(response);
        var completeList = response
        appendPets(completeList);
        }).fail(function (error) {
        alert('something went wront in getPets', error)
    });//end of fail
}//end of getPets

//POST ROUTES
function sendOwner(owner) {

    console.log('in sendOwner');
    $.ajax({
        method: "POST",
        url: '/hotel/owner',
        data: owner
    }).done(function (response) {
        console.log(response);
        getOwners();
    }).fail(function (error) {//end of done
        alert('something went wrong in sendOwner', error)
    })//end of fail
}//end of send owner

function sendPet(e) {
    e.preventDefault(); 
    var petName = $('#petName').val();
    var petColor = $('#petColor').val();
    var petBreed = $('#petBreed').val();
    var newPet = { 
        //owner: $('#owner').data('id'),
        petname: petName,
        color: petColor,
        breed: petBreed
    }
    console.log('newPet', newPet);
    
    console.log('send pet clicked');
    $.ajax({
        method: 'POST',
        url: '/hotel/pet',
        Data: newPet
    }).done(function (response) {
        console.log(response);
    }).fail(function (error) {
        alert('something went wrong in sendPet', error)
    })
}

//PUT ROUTES

function out(outObject, id){
    console.log('in inOut');
    $.ajax({
        method: 'PUT',
        url:'hotel/inOut/' + id,
        data: outObject
    }).done(function (response) {
        console.log(response);
    }).fail(function (response) {
        alert('something wrong in inOut', response)
    })
};

function editItem() {
    console.log('in edit item');
    $.ajax({
        method: 'PUT',
        url: 'hotel/editItem/:id',
        data: changePet
    }).done(function (response) {
        console.log(response);
    }).fail(function (error) {
        alert('something wrong in editItem');
    })//end of fail
}// end of editingItem

// DELETE ROUTES

function deletePet() {
    console.log('delete clicked');
    $.ajax({
        method: 'DELETE',
        url: 'hotel/deletePet/:id'
    }).done(function (response) {
        console.log(response);
    }).fail(function (error) {
        alert('something wrong in deletePet');
    })//end of fail
}//end deletePet

function checkOutFunction(){
  var checkDate = new Date($.now());
  var id = $(this).closest('button').data(); // Need to figure out what this data will be called.
  var outObject = {checkout: checkDate}
  console.log(checkDate);
  out(outObject, id);
}

//This is the function when you check in a pet.
function inClicked(){
console.log('clicked in');
var petcheck = $(this).closest('button').data();
var date = new Date($.now());
var visitin = {
    checkin: date,
    petcheck: petcheck
}   
    petVisit(visitin);
console.log(visitin)
};

function petVisit(visitin) {
    console.log('In sendPet');
    $.ajax({
        method: 'POST',
        url: '/hotel/in',
        Data: visitin
    }).done(function (response) {
        console.log(response);
    }).fail(function (error) {
        alert('something went wrong in sendPet', error)
    })
}
