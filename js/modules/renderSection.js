function renderSection(title, type) {
  const section = document.createElement("section");
  section.classList.add("section");
  section.innerHTML = `
  <div class="section-wrap">
    <div class="section__title">
    <h2>${title}</h2>
    <span>${type}</span>
    </div>
    <a class="section__see-more" href="#">See more</a>
  </div>`;

  document.querySelector(".container").appendChild(section);
  return section;
}

export default renderSection;
