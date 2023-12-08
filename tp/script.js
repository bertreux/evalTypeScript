"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let users = [];
let posts = [];
function generateHTML(user, userPosts) {
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
    }
    else {
        return '';
    }
}
function displayResults(users, posts) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    users.forEach((user) => {
        const userPosts = posts.filter((post) => post.userId === user.id);
        const userHTML = generateHTML(user, userPosts);
        resultsDiv.innerHTML += userHTML;
    });
}
function getValue() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            users = yield fetch("https://jsonplaceholder.typicode.com/users")
                .then(function (reponse) { return reponse.json(); })
                .then((data) => { return data; });
            posts = yield fetch("https://jsonplaceholder.typicode.com/posts")
                .then(function (reponse) { return reponse.json(); })
                .then((data) => { return data; });
            displayResults(users, posts);
        }
        catch (error) {
            console.error('Error merging and displaying data:', error);
        }
    });
}
function search() {
    const filterTitle = document.getElementById('searchTitleInput');
    const filterUser = document.getElementById('searchUserInput');
    let filteredArrayPost = posts;
    let filteredArrayUser = users;
    if (filterTitle.value !== '') {
        filteredArrayPost = filteredArrayPost.filter((post) => post.title.toLowerCase().includes(filterTitle.value.toLowerCase()));
    }
    if (filterUser.value !== '') {
        filteredArrayUser = filteredArrayUser.filter((user) => user.name.toLowerCase().includes(filterUser.value.toLowerCase()));
    }
    displayResults(filteredArrayUser, filteredArrayPost);
}
getValue();
