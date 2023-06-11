// This variable holds the list of leads
let myleads = [];

// This variable holds the old list of leads, used for comparison
let oldleads = [];

// This is the button that saves the URL to the local storage
const inputBtn = document.getElementById("input-btn");

// This is the input field where the user can enter a URL
const inputEl = document.getElementById("input-el");

// This is the unordered list that will display the saved URLs
const ulEl = document.getElementById("ul-el");

// This is the button that deletes all the URLs from the local storage
const deleteBtn = document.getElementById("delete-btn");

// This is the button that saves the current tab to the local storage
const tabBtn = document.getElementById("tab-btn");

// This function gets the leads from the local storage
// If there are no leads, an empty array is returned
let leadsstore = JSON.parse(localStorage.getItem("myleads"));

// This logs the leads to the console
console.log(leadsstore);

// If there are leads in the local storage,
// assign them to the myleads variable
if (leadsstore) {
  myleads = leadsstore;

  // Render the leads
  renderleads(myleads);
}

// This function is called when the user clicks the "Save" button
inputBtn.addEventListener("click", function() {

  // Get the URL from the input field
  let url = inputEl.value;

  // Add the URL to the myleads array
  myleads.push(url);

  // Clear the input field
  inputEl.value = "";

  // Save the myleads array to the local storage
  localStorage.setItem("myleads", JSON.stringify(myleads));

  // Render the leads
  renderleads(myleads);
});

// This function is called when the user clicks the "Save Tab" button
tabBtn.addEventListener("click", function() {

  // Get the active tab from Chrome
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    // Since only one tab should be active and in the current window at once,
    // the return variable should only have one entry

    // Add the URL of the active tab to the myleads array
    myleads.push(tabs[0].url);

    // Save the myleads array to the local storage
    localStorage.setItem("myleads", JSON.stringify(myleads));

    // Render the leads
    renderleads(myleads);

    // Get the active tab ID
    let activeTabId = tabs[0].id;

    // Do whatever you need with the active tab ID
  });
});

// This function is called when the user clicks the "Delete All" button
deleteBtn.addEventListener("click", function() {

  // Clear the local storage
  localStorage.clear();

  // Clear the myleads array
  myleads = [];

  // Render the leads
  renderleads(myleads);
});

// This function renders the leads
function renderleads(leads) {

  // Create a new empty string
  let listitem = "";

  // Loop through the leads array
  for (let i = 0; i < leads.length; i++) {

    // Create a new HTML list item
    listitem += `
      <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>
    `;
  }

  // Set the innerHTML of the ulEl element to the listitem string
  ulEl.innerHTML = listitem;
}
