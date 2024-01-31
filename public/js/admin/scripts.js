
function rubEdit(id)
{
    document.getElementById('rubName'+id).className='active';
    document.getElementById('rubName'+id).disabled=false;
    document.getElementById('editBtn'+id).style='display: none';
    document.getElementById('saveBtn'+id).style='display: block';
}

function saveChanges(id)
{
    document.getElementById('saveChanges'+id).click();
}

// ========================================================== //

function tagEdit(id)
{
    document.getElementById('tagName'+id).className='active';
    document.getElementById('tagName'+id).disabled=false;
    document.getElementById('editTagBtn'+id).style='display: none';
    document.getElementById('saveTagBtn'+id).style='display: block';
}

function saveTagChanges(id)
{
    document.getElementById('saveTagChanges'+id).click();
}

function changeRole(id)
{
    document.getElementById('roleChange'+id).click();
}
