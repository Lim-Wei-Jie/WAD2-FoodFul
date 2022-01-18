<template>
<!-- eslint-disable -->

<div class="max-w-sm rounded overflow-hidden shadow-lg">

    <div class="container mt-10" >
        <img class="w-full object-scale-down h-52 mt-1.5" :src="recipe.image" alt="Sunset in the mountains" >
    </div>
    
    <div class="p-5 mt-10 mx-auto">

        <div class="font-bold text-xl mb-2  text-left">
            {{recipe.title}}
        </div>
        
        <div class="mt-4 mb-4 flex flex-wrap align-center justify-center">
            <a @click="getRecipe(recipe.id, recipe.title); showModal = true;" data-toggle="modal" data-target="#exampleModal" class=" xl:text-lg text-md border bg-white border-green-500 text-green-700 hover:bg-green-900 hover:text-white rounded-full px-6 xl:py-2 py-1 cursor-pointer">
                Let's try it!
            </a>  

        </div>    

    </div>

    <div v-show="showModal" class="inset-0 z-10 overflow-y-auto" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <RecipeModal :id="recipe.id"  :image_url='image_url' :steps='steps' :currentRecipe='currentRecipe' :currentRecipeName='getRecipeName' :ingredients='ingredients' :showModal='showModal' @closeModal='closeModal'/>
    </div>

</div>

</template>

<script>
import RecipeModal from '@/components/RecipeModal.vue'
import axios from "axios";

export default {
    name: "RecipeHome",
    props: ["recipe", "recipe_selected_id"],
    components: {
        RecipeModal,
    },
    data() {
        return {
            showModal: false,
            image_url: this.recipe.image,
            currentRecipe: '',
            currentRecipeName: '',
            ingredients: [],
            steps: []
        }
    },

    computed: {

        getRecipeName() {
            return this.recipe.title
        },

    },

    methods: {

        closeModal(value){
            this.showModal = value
        },

        getRecipe(id) {
            let list_of_ingredients = []

            const api_endpoint = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=cdb9ba22732748cdaf92a64ddeb8c0e3`
            axios.get(api_endpoint)
            .then(response => {
                let recipeInfo = response.data
                this.currentRecipe = recipeInfo
                
                if (recipeInfo != []) {

                    for (var step of recipeInfo[0].steps) {
                    
                        let ingredients = step.ingredients
                        this.steps.push(step.step)
                        
                        for (var ingredient of ingredients) {
                            if (!list_of_ingredients.includes(ingredient.name)) {
                                list_of_ingredients.push(ingredient.name)
                            }
                        }
                    }

                    this.ingredients = list_of_ingredients
                    this.loading = false
                }
            })
            .catch(error => {
                this.currentRecipe = "no recipe to be found :("
                this.ingredients = []
                this.loading = false
                console.log( error.message )
            })
        },
    }
};

</script>