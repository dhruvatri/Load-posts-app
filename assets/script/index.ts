let postArray: any ;
let posts: any=[];
let postId: number=0;

function setItems() {
    localStorage.setItem('posts', JSON.stringify(posts));
    localStorage.setItem('postId', postId.toString());
}

function getItems(){
    posts = JSON.parse(localStorage.getItem('posts') || '[]');
    postId = parseInt(localStorage.getItem('postId') || '0');
}


function displayPost(){
    const postElement = document.createElement('div');
    postElement.className = 'post';
    var uniqueIdentity: string = "post" + postId;
    postElement.innerHTML = `
   <h1 class="post-title">${posts[postId].title}</h1><button id=${uniqueIdentity} class="close">X</button>
    <p class="post-body">${(posts[postId].body.replace(/\n/g, '<br>'))}</p>`;
    document.querySelector("#postArea")?.appendChild(postElement);
    document.getElementById(uniqueIdentity)?.addEventListener('click',()=>SurePage(postElement,uniqueIdentity));
}

function SurePage(postElement: any, uniqueIdentity: string){

    var modal : HTMLElement | null = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn : HTMLElement | null = document.getElementById(uniqueIdentity);

    // Get the <span> element that closes the modal
    var span : any = document.getElementsByClassName("closeBtn")[0];

    var clsBtn : HTMLElement | null = document.getElementById("yesButton");
    console.log(clsBtn);
    console.log(postElement);
    if (clsBtn) clsBtn.addEventListener('click',()=>deletePost(postElement));

    // When the user clicks on the button, open the modal
    if (btn) btn.onclick = function() {
    if (modal) modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    if(modal) modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        if(modal) modal.style.display = "none";
    }
    }
}

function deletePost(postElement: any){
    document.querySelector("#postArea")?.removeChild(postElement);
}


async function fetchPosts() : Promise<void> { 

    if (postId===0)
    {
        postArray = await fetch('https://jsonplaceholder.typicode.com/posts');
        posts = await postArray.json();
        setItems();
    }

    if(postId<posts.length){
        displayPost();
        postId++;
        setItems();
    }
    else{
        alert("No more posts to display");
    }

}

window.onload = function(){
    getItems();
    var tempId :number = postId;
    postId=0;
    for(let i=0;i<tempId;i++){
        displayPost();
        postId++;
    }
}

document.querySelector("#addButton")?.addEventListener('click',fetchPosts);

document.querySelector("#refreshButton")?.addEventListener('click',function(){
const postArea = document.querySelector("#postArea");
if (postArea) {
    postArea.innerHTML = ""; // Clear the inner HTML only if postArea exists
}

    posts=[];
    postId=0;
    localStorage.clear();
    location.reload();
    
});
