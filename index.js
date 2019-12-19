let data;
let titles;
document.addEventListener("DOMContentLoaded", () =>{
  //declare variables
  let select = document.querySelector("select")
  let info = document.querySelector("displayInfo")
  let infoDiv = document.querySelector("displayInfo")
  let titleMovie = document.querySelector("#title");
  let year = document.querySelector("#year");
  let description = document.querySelector("#description");
  // create a function to get all the titles  we gonna use axios we need async to get promise
  const getAllTitles = async()=> {
   
    try{
      // grab data we want
      let data = await axios.get("https://ghibliapi.herokuapp.com/films");
      // debugger
      data = data.data
      titles = data
      //data is in array so we need to loop
      data.forEach(film => {
        let option = document.createElement('option')
        option.innerText = film.title;
        // titleMovie.innerText = film.title
        option.value = film.title
   
        select.appendChild(option)
      });
      
    }catch(err){
      console.log(err)
    }
  }
  const displayFilmDetails = (title) => {
    if (title === "" && !title) {
      titleMovie.innerText = "";
      year.innerText= "";
      description.innerText = "";
    } else {
      for (let i=0; i< titles.length; i++){
        if (tittle){
          year.innerText = titles[i].release_date;
          description.innerText = titles[i].description;
          titleMovie.innerText = titles[i].title;
          
        }
      }
     
    }
  }
  const addReviewDom = (review) => {
    let titleMovie = document.querySelector("#title").innerText
    if (titleMovie) {
      let ul = document.querySelector("ul");
      let li = document.createElement("li");
      let boldText = document.createElement("strong");
      let span = document.creatElement("span");
      boldText.innerText = title + ": ";
      li.appendChild(boldText);
      span.innerText = review;
      li.appendChild(li);
      ul.appendChild(li);
    }
  }
  select.addEventListener("change", (e) => {
    displayFilmDetails(e.target.value)
  });
  let form = document.querySelector("form");
  form.addEventListener("submit", (e) =>{
    e.preventDefault();
    let li = document.creatElement("li");
    let input = document.querySelector("input");
    li.innerText = input.value;
    let ul = document.querySelector("ul");
    ul.appendChild(li);
    input.value = "";
  })

  getAllTitles();
})