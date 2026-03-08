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
  //check if the length of the content is <= to the max length
  if (article.content.length <= MAX_LENGTH) {
    //set the content of p
    pElement.textContent = article.content;
    //append both the h3 element and the p element to the div with class 'article-body'
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
    //add class 'hidden' to the element, and set its content to the second substring
    const spanElementTwo = document.createElement("span");
    spanElementTwo.classList.add("hidden");
    spanElementTwo.textContent = articleSubTwo;

    //append span to p element
    pElement.appendChild(spanElement);
    pElement.appendChild(spanElementTwo);

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

//post an article
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  //stop the browser's default behavior so that the form data is not submitted to the server
  e.preventDefault();
  console.log("form click");

  //check if all form controls satisfy the validation constraints
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const content = document.querySelector("#content");

  const formControls = document.querySelectorAll("input, textarea");

  const date = new Date();

  //create new article object
  const formObject = {
    title: title.value,
    author: author.value,
    date: date,
    content: content.value,
  };

  //insert the article object to the articles array
  articles.push(formObject);

  //call the addEntry() method to add the entry to the DOM
  addEntry(formObject);

  //clear the content of all form control elements by
  // setting each of their value property to an empty string
  formControls.forEach((formControl) => {
    formControl.value = "";
  });
});

//delete an article
//add an event listener to the element with class 'articles-wrapper'
const deleteArticle = document.querySelector(".articles-wrapper");
deleteArticle.addEventListener("click", (e) => {
  // check if the event target is a delete button
  if (e.target.classList.contains("delete-btn")) {
    //grab the parent element of the event target, which is the article element
    const articleElement = e.target.parentElement;

    if (articleElement) {
      //remove the article from the DOM
      articleElement.remove();
      // check if there is an article in the array whose title matches that of the article element.
      // If there is, remove the article from the array
      const removeArticle = articles.filter((article) => {
        return (
          article.title !== articleElement.querySelector(".title").textContent
        );
      });

      return removeArticle;
    }
  }
});

//show less/more content
//Add an event listener to the element with class 'articles-wrapper'
const showArticle = document.querySelector(".articles-wrapper");
showArticle.addEventListener("click", (e) => {
  //check if the event target is a 'read more' button
  if (e.target.classList.contains("btn")) {
    // p element is the button's previous sibling element.
    const pElement = e.target.previousElementSibling;
    //grab all span elements that are children of the p element.
    const spans = pElement.querySelectorAll("span");

    //toggle the 'hidden' class on the span elements
    spans.forEach((span) => {
      span.classList.toggle("hidden");
    });

    //update the text content of the button
    //if it is 'Read More', set it to 'Read Less'
    if (e.target.textContent === "Read More") {
      e.target.textContent = "Read Less";
    } else {
      e.target.textContent = "Read More";
    }
  }
});
