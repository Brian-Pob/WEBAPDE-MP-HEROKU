var tags = ['ded', 'dunny', 'gaming', 'technology'];

function checkIfTag() {

    if (!tags.includes(document.getElementById('searchbar').value.toLowerCase())) {
        alert("This is not a tag");
    } else {
        alert("This is a tag");
    }
    return false;
}

function changeVisibilityPrivate() {
    // console.log('Changed visibility')

    document.getElementById('inputVisibility').value = 'Private'
    document.getElementById('btnPublic').setAttribute('class', 'btn btn-secondary')
    document.getElementById('btnPrivate').setAttribute('class', 'btn btn-primary')
    // document.getElementById('sharedUserDiv').style.visibility = visible
    $('#sharedUserDiv').show()
    return false
}

function changeVisibilityPublic() {
    // console.log('Changed visibility')

    document.getElementById('inputVisibility').value = 'Public'
    // document.getElementById('sharedUserDiv').style.visibility = hidden
    // document.getElementById('inputSharedUser').value = ''
    document.getElementById('btnPrivate').setAttribute('class', 'btn btn-secondary')
    document.getElementById('btnPublic').setAttribute('class', 'btn btn-primary')
    $('#inputSharedUser').val('')
    $('#sharedUserDiv').hide()
    // document.getElementById('inputVisibility'). = 'Public'
    return false
}

