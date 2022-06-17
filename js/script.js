const input = document.querySelector('.input');
const text = document.querySelector('.textarea');
const submit = document.querySelector('.submit');
const reviewItems = document.querySelector('.reviews');

//a global variable to store the post that is being updated
let reviewArray = [];

//global function to render the UI
function detail() {
    let postItem = '';
        reviewArray.forEach(function (items) {
            postItem += `<div class="col-lg-4 col-md-6 m-0 d-flex justify-content-center">
                            <div class="card">
                                <div class="card-body info m-2">
                                    <p>${items.id}</p>
                                    <h6 class="title">${items.title}</h6>
                                    <p class="details">${items.body}</p>
                                    <div class="d-flex justify-content-between">
                                        <div class="delete px-2 border border-2 border-success rounded bg-warning" onclick="postDelete(${items.id})">delete</div>
                                        <div id="btn" class="btn p-0 border border-2 border-success rounded-start bg-warning" onclick="viewPost(${items.id})">view more</div>
                                        <div class="update px-2 border border-2 border-success rounded bg-warning" onclick="update(${items.id})">update</div>
                                    </div>
                                </div>
                            </div>
                        </div>`
        });
    reviewItems.innerHTML = postItem;
}

//function to add post
submit.addEventListener('click', function(event){
    //prevent the default action of the form
    event.preventDefault();
    //fetch the data from the form
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: input.value,
        body: text.value,
        userId: Math.floor(Math.random()),
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => {
        if (json.title.length !== 0 && json.body.length !== 0) {
            reviewArray.unshift(json);
            detail();
        }
        input.value = '';
        text.value = '';
    });
})

//function to get all posts
function getReviews() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
        reviewArray = json
        detail();
    });
}
getReviews();

//function to view post
function viewPost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((json) => {
        localStorage.setItem('savedPost', JSON.stringify(json))
        window.location.href = 'view.html'
    });
}


let updateInput = document.querySelector('.input-two');
let updateText = document.querySelector('.textarea-two');

//function to update post
function update(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        id: id,
        title: updateInput.value,
        body: updateText.value,
        userId: Math.floor(Math.random()),
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => {
        const infoTitle = document.querySelectorAll('.title');
        const details = document.querySelectorAll('.details');
        infoTitle.forEach(function(titleUpdating, index) {
            if (index + 1 === id && json.title !== "") {
                titleUpdating.innerHTML = json.title;
            }
        })

        details.forEach(function(bodyUpdate, index) {
            if (index + 1 === id && json.body !== "") {
                bodyUpdate.innerHTML = json.body;
            }
        })
        updateInput = '';
        updateText = '';
    });
}

//function to delete post
function postDelete(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
    })
        .then((response) => response.json())
        .then((json) => {
            reviewArray = reviewArray.filter(post => post.id !== id)//watch a video on .filter later
            detail(reviewArray);
            
})
}