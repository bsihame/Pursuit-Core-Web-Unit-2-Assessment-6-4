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
  let ul = document.querySelector("ul");
  let input = document.querySelector("input");
  // create a function to get all the titles  we gonna use axios we need async to get promise
  const getAllTitles = async()=> {

    try{
      // grab data we want
      let res = await axios.get("https://ghibliapi.herokuapp.com/films");
      data = res.data
      console.log(data)
      // debugger
      //data is in array so we need to loop
      data.forEach(film => {
        let option = document.createElement('option')
        option.innerText = film.title;
        option.value = film.id;
        // titleMovie.innerText = film.title
        // option.value = film.title
        //debugger
        select.appendChild(option)
      });
      
    }catch(err){
      console.log(err)
    }
  }
  const displayFilmDetails = async (id) => {
    if (!id) {
     titleMovie.innerText = "";
     year.innerText= "";
    description.innerText = "";
    } else {
      try {
        let res = await axios.get(`https://ghibliapi.herokuapp.com/films/${id}`)
        titleMovie.innerText = res.data.title;
        year.innerText= res.data.release_date;
        description.innerText = res.data.description;
      } catch (err) {
        console.log(err)
      }
    }

  }
  const addReviewDom = (review) => {
    let titleMovie = document.querySelector("#title").innerText
    
    if (titleMovie) {
      let li = document.createElement("li");

      let title = document.createElement('strong')
      title.innerText = titleMovie + ': '
      li.appendChild(title)

      let rev = document.createElement('span')
      rev.innerText = review
      li.appendChild(rev)
      
      ul.appendChild(li);
    }
  }
  select.addEventListener("change", (e) => {
    displayFilmDetails(e.target.value)
  });


  let form = document.querySelector("form");
  form.addEventListener("submit", (e) =>{
    e.preventDefault();

    addReviewDom(input.value)
    input.value = "";
  })

  getAllTitles();

})

