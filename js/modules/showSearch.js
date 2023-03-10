function showSearch() {
  const form = document.createElement("form");
  form.classList.add("search");
  form.innerHTML = `
  <input type="search" name="search" id="search" placeholder="Search for movies or TV series" />
  <input type="submit" value="Search" />
  `;

  document.querySelector(".container").appendChild(form);
}

export default showSearch;
