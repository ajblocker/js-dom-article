"use strict";
console.log("Test");
const MAX_LENGTH = 200;

const authors = [
  "Tyrone",
  "Ava",
  "Elijah",
  "Lucas",
  "Ebony",
  "Keisha",
  "Jemila",
  "Daniel",
];

const articles = [
  {
    title: "CSS Selectors",
    author: "Tyrone",
    date: new Date(2023, 1, 20),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, dolore? Eveniet numquam quam qui quae laboriosam maxime deleniti aperiam quasi culpa veniam, voluptatibus molestias soluta error ratione assumenda sunt. Sapiente doloribus, nulla a tempora assumenda nostrum est enim corporis fugit quasi ipsam eveniet distinctio impedit dolorum eum dolor. Distinctio, reiciendis!",
  },

  {
    title: "Cascading",
    author: "Jemila",
    date: new Date(2023, 2, 1),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptatum iste? Nisi exercitationem, consectetur unde ab placeat nemo deserunt consequuntur.",
  },

  {
    title: "CSS Grid",
    author: "Keisha",
    date: new Date(2023, 2, 12),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur laboriosam aliquam debitis dolores dolorem corporis ipsum itaque culpa, et eaque? Aliquam, est eveniet voluptatem nemo doloremque esse odit dolorum dicta consectetur ipsam corrupti perspiciatis voluptas cupiditate et sapiente. Eligendi modi fugiat pariatur facere, molestiae nihil accusamus animi a impedit laboriosam tempora, eum in iure tenetur fugit praesentium consectetur mollitia ut obcaecati delectus ipsa dolores commodi? Rerum, temporibus velit eum iste praesentium modi amet molestiae illum enim quos pariatur quasi vero quidem, minus placeat assumenda recusandae fugit sunt voluptatem est neque qui! Ut optio quis accusamus placeat ipsa laboriosam laborum debitis.",
  },
];

articles.forEach((article) => {
  addEntry(article);
});

/**
 * This function creates a DOM elment with information from the article object, and adds the element into the DOM.
 * @param {object} article - an article
 */
function addEntry(article) {
  //create article element
  const createArticle = document.createElement("article");
  createArticle.classList.add("article-container");
  const articleWrapper = document.querySelector(".articles-wrapper");
  articleWrapper.appendChild(createArticle);
  //delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.classList.add("delete-btn");
  createArticle.appendChild(deleteBtn);
  //add header for article
  const headerDivElement = document.createElement("div");
  headerDivElement.classList.add("article-header");
  const imgElement = document.createElement("img");
  imgElement.classList.add("avatar");
  //find index of author
  const authorId = authors.findIndex((author) => {
    return article.author === author;
  });
  if (authorId > -1) {
    //article author propery can be found
    imgElement.src = `images/avatar${authorId}.png`;
  } else {
    //article author property cannot be found
    imgElement.src = `images/default.jpeg`;
  }
  imgElement.alt = `avatar picture`;
  //create a div element
  const createDiv = document.createElement("div");
  createDiv.textContent = article.author + " · " + article.date.toDateString();

  createArticle.appendChild(headerDivElement);
  headerDivElement.appendChild(imgElement);
  //append new div to article header div element
  headerDivElement.appendChild(imgElement);
  headerDivElement.appendChild(createDiv);

  //add body for the article
  const bodyDivElement = document.createElement("div");
  bodyDivElement.classList.add("article-body");
  const h3Element = document.createElement("h3");
  h3Element.textContent = article.title;

  const pElement = document.createElement("p");
  if (article.content.length <= MAX_LENGTH) {
    pElement.textContent = article.content;
    createArticle.appendChild(bodyDivElement);

    bodyDivElement.appendChild(h3Element);
    bodyDivElement.appendChild(pElement);
  } else {
    //split the article's content to two substrings,
    // the first substring contains letters from the beginning to MAX_LENGTH
    let articleSubOne = article.content.substring(0, MAX_LENGTH);
    //substring contains the rest
    let articleSubTwo = article.content.substring(MAX_LENGTH);

    //set the content of the p element to the first substring
    pElement.textContent = articleSubOne;
    //create span elements
    const spanElement = document.createElement("span");
    spanElement.textContent = "...";
    const spanElementTwo = document.createElement("span");
    spanElementTwo.classList.add("hidden");
    spanElementTwo.textContent = articleSubTwo;

    //create button element
    const buttonElement = document.createElement("button");
    buttonElement.classList.add("btn");
    buttonElement.textContent = "Read More";

    //append h3,p, and btn to div with class article-body
    createArticle.appendChild(bodyDivElement);

    bodyDivElement.appendChild(h3Element);
    bodyDivElement.appendChild(pElement);
    bodyDivElement.appendChild(buttonElement);
  }
}
