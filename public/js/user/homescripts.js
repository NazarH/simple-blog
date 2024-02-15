let drop = false;
function showDropdown()
{
    if(drop) {
        document.getElementById('dropdown').style="display: none";
        document.getElementById('bar').style="display: inline";
        drop = false;
    } else {
        document.getElementById('dropdown').style="display: flex";
        document.getElementById('bar').style="display: none;";
        drop = true;
    }
}

function closeNav()
{
    if(drop) {
        document.getElementById('dropdown').style="display: none";
        document.getElementById('bar').style="display: inline";
        drop = false;
    } else {
        document.getElementById('dropdown').style="display: flex";
        document.getElementById('bar').style="display: none;";
        drop = true;
    }
}

let search = false;
function showSearch()
{
    if(search) {
        document.getElementById('search').style="display: none";
        search = false;
    } else {
        document.getElementById('search').style="display: flex";
        search = true;
    }
}

