
//searching the menu items on key up (calling from the search bar)
function searchForMenuList() {
    var Input_Key, ul, li, i;

    Input_Key = document.getElementById('menu-search').value.toLowerCase();
    ul = document.getElementById('menu-items');
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        var a = li[i].getElementsByTagName('h3')[0];
        var b = li[i].getElementsByTagName('h5')[0];

        if (a.innerHTML.toLowerCase().indexOf(Input_Key) > -1 ||
            b.innerHTML.toLowerCase().indexOf(Input_Key) > -1) {
            li[i].style.display = "";
        }
        else {
            li[i].style.display = "none";
        }
    }
}
