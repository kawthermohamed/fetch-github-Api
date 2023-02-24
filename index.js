//main variables
let mainInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-repos .get-button");
let ReposData = document.querySelector(".show-data");

//button onclick
getButton.onclick = function () {
  getRepos();
};

//get Repos Function
function getRepos() {
  if (mainInput.value == "") {
    console.log("Please enter the Repo's Name ");
    ReposData.innerHTML = `<span>please write Github Repos's UserName</span>`;
  } else {
    let needRepoName = mainInput.value;
    fetch(`https://api.github.com/users/${needRepoName}/repos`)
      .then(
        (resValue) => {
          let data = resValue.json();
          return data;
        },
        (rejValue) => {
          console.log(rejValue);
        }
      )
      .then((reposdata) => {
        console.log(reposdata);
        ReposData.innerHTML = "";
        reposdata.forEach((repo) => {
          // Create The Main Div Element
          let mainDiv = document.createElement("div");

          // Create Repo Name Text
          let repoName = document.createTextNode(repo.name);

          // Append The Text To Main Div
          mainDiv.appendChild(repoName);

          // Create Repo URL Anchor
          let theUrl = document.createElement("a");

          // Create Repo Url Text
          let theUrlText = document.createTextNode("Visit");

          // Append The Repo Url Text To Anchor Tag
          theUrl.appendChild(theUrlText);

          // Add Thje Hypertext Reference "href"
          theUrl.href = `https://github.com/${needRepoName}/${repo.name}`;

          // Set Attribute Blank
          theUrl.setAttribute("target", "_blank");

          // Append Url Anchor To Main Div
          mainDiv.appendChild(theUrl);

          // Create Stars Count Span
          let starsSpan = document.createElement("span");

          // Create The Stars Count Text
          let starsText = document.createTextNode(
            `Stars ${repo.stargazers_count}`
          );

          // Add Stars Count Text To Stars Span
          starsSpan.appendChild(starsText);

          // Append Stars Count Span To Main Div
          mainDiv.appendChild(starsSpan);

          // Add Class On Main Div
          mainDiv.className = "repo-box";

          // Append The Main Div To Container
          ReposData.appendChild(mainDiv);
        });
      });

    // let repoName=do
    mainInput.value = "";
  }
}
