document.addEventListener("DOMContentLoaded", () =>{
  let data;
  //declare variables
  let select = document.querySelector("select")
  //let info = document.querySelector("displayInfo")
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
  getAllTitles();
})