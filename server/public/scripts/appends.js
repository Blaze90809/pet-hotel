//appends owners to drop down menu
function appendOwners(array) {
    
    for (var i = 0; i < array.length; i++) {
        var owner = array[i];
        var $dropDown = $("#ownerDropDown").append('<option id="owner" value=data-id"' + owner.id + '">' + owner.firstname + " " + owner.lastname + "</option>");
        $dropDown.data('owner', owner)
    }

    console.log('owner');
};

function appendPets(array) {
    for (var i = 0; i < array.length; i++) {
        var rowData = array[i];
        var $tr = $('<tr></tr>');
        $tr.data('rowData', rowData);
        $tr.append('<td>' + rowData.firstname + " " + rowData.lastname + '</td>');
        $tr.append('<td><input class="petEdit" type="text" id="updatePetName">' + rowData.petname + '</td>');
        $tr.append('<td><input class="petEdit" type="text" id="updatePetBreed">' + rowData.breed + "</td>");
        $tr.append('<td><input class="petEdit" type="text" id="updatePetColor">' + rowData.color + "</td>");
        $tr.append('<button class="btn" id="updateBtn" data-id"' + rowData.id + '">Update Pet</button><button class="btn hideButton" id="saveUpdate" data-id"' + rowData.id + '">Save</button></td>');
        $tr.append('<td><button class="btn" id="deleteBtn" data-id"' + rowData.id + '">Delete</button></td>');
        $tr.append('<td><button class="btn" id="checkInBtn" data-id"' + rowData.id + '">Check In</button><button class="btn checkInOut" id="checkOutBtn" data-id"' + rowData.id + '">Check Out</button></td>');
        $('#maintable').append($tr);        
    }
};
