'use strict';
//set pexels client

// const createClient = require('pexels');
// const apiKey = '563492ad6f91700001000001a89943f095bd48ae9c3d531c9ad10a8c';
// const client = createClient(apiKey);
// console.log(client);
// import { createClient } from 'pexels';

const apiKey = '563492ad6f91700001000001a89943f095bd48ae9c3d531c9ad10a8c';

// gloabls variabls

// const selectTabs = document.querySelectorAll('.tabs');
const selectSearchInputs = document.querySelectorAll('.search__input');
const selectSearchBtns = document.querySelectorAll('.search__btn');
const selectShowMoreBtn = document.querySelector('.show__more');
const showMoreBtn = document.querySelector('.showmore');
let pageNum = Math.floor(Math.random() * 10 + 1);
let searchValue = '';
let searchResult = false;

// function to switch get the value from inputs search

selectSearchInputs.forEach(input => {
  input.addEventListener('input', event => {
    event.preventDefault();
    searchValue = event.target.value;
  });
});

// functions to get the default photo that shown on screen

async function getDefaultPhotos(pageNumber) {
  const data = await fetch(
    `https://api.pexels.com/v1/curated?page=${pageNumber}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: apiKey,
      },
    }
  );
  const response = await data.json();
  console.log(response);

  displayPhotos(response);
}

getDefaultPhotos(pageNum);
// functions to display the photos on the Dom
function displayPhotos(res) {
  res.photos.forEach(photo => {
    const pic = document.createElement('div');
    pic.classList.add(
      'col-md-3',
      'me-5',
      'ms-sm-3',
      'shwon__photos',
      'align-baseline'
    );
    pic.innerHTML = `<img  src=${photo.src.large}>
    <figcaption class="photographer_name row align-items-top"> <a class= "col-8  text-white">${photo.photographer}</a> <div class="col-4 g-1"> <i class="fa-solid fa-download"></i> <i class="fa-solid fa-plus"></i> <i class="fa-regular fa-heart"></i> </div></figcaption>`;
    document.querySelector('.display__photos').appendChild(pic);
  });
}

// function to confirm the search input
selectSearchBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    if (selectSearchInputs.value === '') {
      alert('please enter something to search on');
      return;
    }
    clearGallery();
    searchResult = true;
    pageNum = 1;
    searchPhoto(searchValue, pageNum);
  });
});
// function to take the input value to get the result of the search input

async function searchPhoto(query, pageNumber) {
  const data = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&page=${pageNumber}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: apiKey,
      },
    }
  );
  const response = await data.json();

  displayPhotos(response);
}

// function to clear the gallery before the search

function clearGallery() {
  document.querySelector('.display__photos').innerHTML = '';
  pageNum = 1;
}

showMoreBtn.addEventListener('click', () => {
  if (!selectSearchInputs.value) {
    pageNum++;
    getDefaultPhotos(pageNum);
  } else {
    if (selectSearchInputs.value === '') return;
    pageNum++;

    searchPhoto(searchValue, pageNum);
  }
});

// window.addEventListener('scroll', () => {
//   if (window.outerHeight) {
//     if (!selectSearchInputs.value) {
//       pageNum++;
//       getDefaultPhotos(pageNum);
//     } else {
//       if (selectSearchInputs.value === '') return;
//       pageNum++;

//       searchPhoto(searchValue, pageNum);
//     }
//   } else {
//     console.log('That was wrong');
//   }
// });
// selectTabs.forEach(tab =>
//   tab.addEventListener('click', () =>
//     tab.classList.contains('active')
//       ? tab.classList.remove('active')
//       : tab.classList.add('active')
//   )
// );
