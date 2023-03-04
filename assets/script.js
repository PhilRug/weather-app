var formEl = document.querySelector('#form');

var formSubmitHandler = function (event) {
    event.preventDefault();
    
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    repoContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a GitHub username');
  }
};