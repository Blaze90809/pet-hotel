function appendOwners(array) {
    
    for (var i = 0; i < array.length; i++) {
        var owner = array[i];
        var $dropDown = $("#ownerDropDown").append('<option value="data-id= ">' + owner.firstname + " " + owner.lastname + '</option>');
    }
    console.log('owner');
    
};

function appendPets(array) {
    for (var i = 0; i < array.length; i++) {
        var pet = array[i];
        var $tr = $('<tr></tr>');
        $tr.data('pet', pet);
        $tr.append('<td>' + pet.firstname + " " + pet.lastname + '</td>');
        $tr.append('<td>' + pet.petname + '</td>');
        $tr.append('<td>' + pet.breed + '</td>');
    }
};