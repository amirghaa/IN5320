// ---------------------------------------------------------
// En enkel demo for Add / Delete / Search med ren JavaScript
// ---------------------------------------------------------

//  Referanser til HTML-elementer
const listEl        = document.getElementById("currency-list");
const addForm       = document.getElementById("add-form");
const currencyInput = document.getElementById("currency-input");
const searchInput   = document.getElementById("search-input");

// ADD – håndterer skjema-submit (Enter fungerer også)

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = currencyInput.value.trim();
  if (!name) return;

  currencies.push(name);
  currencyInput.value = "";
  renderList();
});


// DELETE – event-delegation på <ul> for å fange klikk på knapper

listEl.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete")) return;
  const name = e.target.closest("li").dataset.name;
  currencies = currencies.filter(n => n !== name);
  renderList();
});

//  "Datakilden" vår – en array vi oppdaterer underveis
let currencies = ["Euro", "Norwegian Kroner", "Canadian Dollar"];

// ---------------------------------------------------------
// DEL A: startsWithWord(element, searchWord)
// - returnerer true hvis element starter med søkeordet
// - case-insensitive (For == for == FOR)
// - tomt søk => vis alt (true)
// ---------------------------------------------------------
function startsWithWord(element, searchWord) {
  if (!searchWord) return true;
  return element.toLowerCase().startsWith(searchWord.toLowerCase());
}

// ---------------------------------------------------------
// DEL B: filterList(list, searchWord)
// - filtrerer array basert på funksjonen over
// ---------------------------------------------------------
function filterList(list, searchWord) {
  return list.filter(item => startsWithWord(item, searchWord));
}

// ---------------------------------------------------------
// renderList(items, searchWord)
// - tegner (eller oppdaterer) <ul> basert på data + søk
// ---------------------------------------------------------
function renderList(items = currencies, searchWord = searchInput.value) {
  const filtered = filterList(items, searchWord);

  listEl.innerHTML = filtered.length
    ? filtered
        .map(
          name => `
        <li data-name="${name}">
          <span>${name}</span>
          <button class="delete" aria-label="Delete ${name}">×</button>
        </li>`
        )
        .join("")
    : `<li class="muted">No matches</li>`;
}


// LIVE SEARCH – oppdaterer listen når brukeren skriver

searchInput.addEventListener("input", () => renderList());

// Første render
renderList();
