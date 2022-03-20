'use strict';

const { createIngredient, createSteps, createRecipe , uploadImage} = require('./helper');
const fs = require("fs");  
const path = require("path")

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{strapi}*/) {
    
    importRecipeData().then((res)=>{
      console.log(res) 
    })
   

  
    function getRecipeData () {
        const jsonString = fs.readFileSync(path.join(__dirname,  './', 'recipe.json'), "utf8");
        const recipeData = JSON.parse(jsonString)
        return recipeData
    }
    
    async function importRecipeData (){   
    return new Promise((resolve, reject) => {
        const recipeData = getRecipeData()
    
        let promises= [] 
        for( let i=0;i< recipeData.length;i++){
            let recipe = recipeData[i]

            promises.push(createContent(recipe))
        }
        Promise.all(promises).then((results)=>{
        resolve(results)
        })
    })   
    
    } 
 
    async function createContent(recipe) { 

        try {
        let queryInfo = { "Title": recipe.name}
        const isRecipeExist = await isDataExist('recipe', queryInfo)
        if(!isRecipeExist) {
        const dataModel = ProcessJson(recipe)
        

            const { recipeModel,ingredientModel,StepsModel} = dataModel   
            
            createIngredient(ingredientModel).then((ingredientModelResponse)=>{
            
                recipeModel.Recipe_Ingredients.push(ingredientModelResponse.id)
                createSteps(StepsModel).then((stepsModelResponse)=>{
                    const DownloadsPath = path.join(__dirname,  './', 'oreo-stuffed-cupcakes-step-2 .webp')
                    uploadRecipeImages(DownloadsPath).then((UploadImage)=> {
                        recipeModel.Image.push(UploadImage[0].id)
                        recipeModel.Recipe_steps.push(stepsModelResponse.id)
                        createRecipe(recipeModel).then((res)=>{ 
                            console.log("recipe created") 
                        })
                    })
                    })
                    
                }) 
        }else {
            // console.log("Data already Exist")
        }
        }catch(err) {
            console.log(err.message)
        }
    } 

    function ProcessJson (recipe) {
            const { ingredients, steps } = recipe
            let ingredientModel = {
                Product_Title: recipe.name,
                Ingredient:[]
            }
            let StepsModel = {
                Product_Title: recipe.name,
                StepsComponent:[]
            }

            let recipeModel = {
                Title: recipe.name,
                Difficulty:recipe.difficulty,
                Time:`${parseInt(recipe.duration)/60} hours`,
                Serves:parseInt(recipe.serves),
                Recipe_Ingredients:[], 
                Recipe_steps:[],
                Image:[],
                Recipe_Video_Url:recipe.video.src,
                Recipe_Servers_List:recipe.servings,
                related_recipes:[]
            }
            
            ingredients.forEach((currentingredient) => {       
                let currentIngredient =  {
                    Ingredient_Title: currentingredient.ingredientTitle,
                    Ingredient_List:[]
                }
                if(currentingredient.items && currentingredient.items.length > 0) {
                    currentingredient.items.forEach((ingredientItem) => {
                        let items = {
                            Ingredient_Label: ingredientItem.label,
                            Metric_Value: ingredientItem.metricValue || "123",
                            Metric_Unit: ingredientItem.metricUnitLabel || "g",
                            Imperial_Value: ingredientItem.imperialValue || "1",
                            Imperial_Unit: ingredientItem.imperialUnitLabel || "tsp"
                        }
                        currentIngredient.Ingredient_List.push(items)
                    })
                }
                
                ingredientModel.Ingredient.push(currentIngredient)
            })
            
            steps.forEach((CurrentSteps, index)=>{
                StepsModel.StepsComponent.push({
                    description: CurrentSteps.instructions,
                    order: index
                })

            });
            
        return ({
            recipeModel,
            ingredientModel,
            StepsModel
        })
    }

    async function isDataExist (model, query1) {
    try {
        let check = await  strapi.query('api::recipe.recipe').findOne(query1)
        return check
    }catch(err) {
        console.log("err")
        console.log(err)
    } 
    
    }

    async function uploadRecipeImages(imagePath) {
       return await uploadImage(imagePath) 
    }



  } 

};


