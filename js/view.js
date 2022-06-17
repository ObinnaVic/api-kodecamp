function getStoredItem() {
    let newItems = localStorage.getItem('savedPost');
    let items = JSON.parse(newItems);

    let viewId = document.querySelector('.view-id');
    let viewTitle = document.querySelector('.view-head');
    let viewBody = document.querySelector('.view-body');

    viewId.innerHTML = items.id;
    viewTitle.innerHTML = items.title;
    viewBody.innerHTML = items.body;
}

getStoredItem();