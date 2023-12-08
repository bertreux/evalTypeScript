type GeoType = {
    lat : string,
    lng : string,
}

type AdressType = {
    street : string,
    suite : string,
    city : string,
    zipcode : string,
    geo : GeoType,
}

type CompanyType = {
    name : string,
    catchPhrase : string,
    bs : string,
}

type UserType = {
    id : number,
    name : string,
    username : string,
    email : string,
    address : AdressType,
    phone : string,
    website : string,
    company : CompanyType,

}

type PostType = {
    userId : number,
    id : number,
    title : string,
    body : string,
}

let users : Array<UserType> = []
let posts : Array<PostType> = []

function generateHTML(user: UserType, userPosts: Array<PostType>): string {
    const userHTML = `
        <div class="my-3 col-4"">
            <h3 class="text-primary">${user.name}</h3>
            <p>${user.email}</p>
        `;

    if (userPosts.length > 0) {
        const postsHTML = `
            <h4 class="text-warning">Titres des articles rédigés :</h4>
            <ul>
                ${userPosts.map((post) => `<li>${post.title}</li>`).join('')}
            </ul>
        `;

        return userHTML + postsHTML + '</div>';
    } else {
        return '';
    }
}

function displayResults(users : Array<UserType>, posts : Array<PostType>) {
    const resultsDiv = document.getElementById('results') as HTMLDivElement;
    resultsDiv.innerHTML = '';

    users.forEach((user) => {
        const userPosts = posts.filter((post) => post.userId === user.id);

        const userHTML = generateHTML(user, userPosts);
        resultsDiv.innerHTML += userHTML;
    });
}

async function getValue(){
    try {
        users = await fetch("https://jsonplaceholder.typicode.com/users")
            .then( function(reponse){ return reponse.json()})
            .then((data : Array<UserType>  ) => {return data})
        posts = await fetch("https://jsonplaceholder.typicode.com/posts")
            .then( function(reponse){ return reponse.json()})
            .then((data : Array<PostType>  ) => {return data})
        displayResults(users, posts)
    } catch (error) {
        console.error('Error merging and displaying data:', error);
    }
}

function search(){
    const filterTitle : HTMLInputElement = document.getElementById('searchTitleInput') as HTMLInputElement
    const filterUser : HTMLInputElement = document.getElementById('searchUserInput') as HTMLInputElement
    
    let filteredArrayPost : Array<PostType> = posts
    let filteredArrayUser : Array<UserType> = users

    if(filterTitle.value !== ''){
        filteredArrayPost = filteredArrayPost.filter((post) =>
            post.title.toLowerCase().includes(filterTitle.value.toLowerCase())
        );
    }
    if(filterUser.value !== ''){
        filteredArrayUser = filteredArrayUser.filter(
            (user) =>
                user.name.toLowerCase().includes(filterUser.value.toLowerCase())
        );
    }
    displayResults(filteredArrayUser, filteredArrayPost)
}

getValue()