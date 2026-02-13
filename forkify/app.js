console.log("javascript is working properly")

const foodItmeArea = document.querySelector("#foodItemArea")

const receipeSearchInput = document.querySelector("input")
const receipeBtn = document.querySelector("button")

const html = `<div id="receipeName">
                <div id="receipeImg">
                    <img src="https://images.food52.com/VOfOuvcQe7fBeSqixNe1L-LhUBY=/d815e816-4664-472e-990b-d880be41499f--chicken-biryani-recipe.jpg" alt="img">
                </div>
                <div>
                    <h2>Tittle of Recipe</h2>
                    <p>Description</p>
                </div>
            </div>`

function myRecipesApiCall (foodName) {
    const forkifyLoading = fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${foodName}`)
foodItmeArea.innerHTML = `  <div class="spinner">
    <div></div>
  </div>
`

forkifyLoading
.then( (res)=>{
    return res.json()
})
.then( (res)=>{
    const {data} = res
    const {recipes} = data
    console.log(recipes)

    const recipesData = recipes.map((recipe) => {
        return `<div class="receipeName" id="${recipe.id}" onclick= "singleReceipeApi(this)">
                <div id="receipeImg">
                    <img src= ${recipe.image_url} 
                    alt="">
                </div>
                <div>
                    <h2>${recipe.title}</h2>
                    <p>${recipe.publisher}</p>
                </div>
            </div>`
    })

    console.log(recipesData)

    foodItmeArea.innerHTML = recipesData.join('')
})
.catch(function (err) {
    console.log(err)
})

}
receipeBtn.addEventListener("click", () => {
        myRecipesApiCall(receipeSearchInput.value)
})


function singleReceipeApi(element) {
     const receiDetail = document.querySelector("#recipeDetail");

    receiDetail.innerHTML = `
      <div class="spinner">
        <div></div>
      </div>
    `;

    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${element.id}`)
    .then( (result) => {
        return result.json()
    })
    .then( (result) => {
        const {recipe} = result.data
        const {image_url, title, ingredients} = recipe

        receiDetail.innerHTML = `
    <div class="imgDetails">
                <img src=${image_url} alt="">
            </div>
            <h1>${title}</h1>
            <ul>
                ${
                    ingredients.map((ingredient) => {
                        return `<li>${ingredient.description}</li>`
                    }).join('')
                }
            </ul>
        </div>
            `
    })
    .catch( (error) => {
        console.log(error)
    })
}