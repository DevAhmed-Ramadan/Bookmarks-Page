var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var tableBody = document.getElementById("tableContent");
add_btn = document.getElementById("sumbit-btn");
update_btn = document.getElementById("update-btn");


// ====================================================================================
websiteArr = [];

var updatedIindex;

// REGEX ==============================================

var siteNameRegex = /\w{2,}\s?\w{1,}$/; // [A-Za-z0-9_]
var siteUrlRegex = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

//=====================================================================================

if (localStorage.getItem("ourSites") != null) {
    websiteArr = JSON.parse(localStorage.getItem("ourSites"));
    display();
}

// creat ==============
function addSite() {
    if (validSite(siteNameRegex, siteNameInput) & validSite(siteUrlRegex, siteUrlInput)) {
        var site =
        {
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value
        }
        websiteArr.push(site);
        localStorage.setItem("ourSites", JSON.stringify(websiteArr));
        display();
        resetInputs();
    }
}
// end create ============

// reset===============
function resetInputs() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");
}
// end reset ===========

// display===============
function display() {
    var containerWebsites = ``;
    for (i = 0; i < websiteArr.length; i++) {
        containerWebsites += `<tr>
                                <td>${i + 1}</td>
                                <td>${websiteArr[i].siteName}</td>
                                <td>
                                    <a href="http://${websiteArr[i].siteUrl}" target="_blank">
                                    <button class="btn btn-success visit">
                                    <i class="fa-solid fa-eye"></i>
                                    Visit
                                </button>
                                </a>
                                </td>
                                <td>
                                    <button onclick="moveInfoUp(${i})" class="btn btn-primary edit">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button onclick= "Delete(${i})" class="btn btn-danger del">
                                        <i class="fa-solid fa-trash-can"></i>
                                        Delete
                                    </button>
                                </td>
                            </tr>`
    }
    tableBody.innerHTML = containerWebsites;
}
// end display===============

// delete================
function Delete(deletedIndex) {
    websiteArr.splice(deletedIndex, 1);
    localStorage.setItem("ourSites", JSON.stringify(websiteArr));
    display();
}
// end delete=============

// update or edit ===============

function moveInfoUp(index) {
    siteNameInput.value = websiteArr[index].siteName;
    siteUrlInput.value = websiteArr[index].siteUrl;
    add_btn.classList.replace("d-block", "d-none");
    update_btn.classList.replace("d-none", "d-block");
    updatedIindex = index;
}

function update() {
    websiteArr[updatedIindex].siteName = siteNameInput.value;
    websiteArr[updatedIindex].siteUrl = siteUrlInput.value;
    display();
    localStorage.setItem("ourSites", JSON.stringify(websiteArr));
    resetInputs();
    add_btn.classList.replace("d-none", "d-block");
    update_btn.classList.replace("d-block", "d-none");
}

// end update or edit ===============

function validSite(regex, element) {
    if (regex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.replace("d-none", "d-block");
        return false;
    }
}