<template>
<!-- eslint-disable -->

<div class="rounded overflow-hidden shadow-lg mr-3 xl:h-full">
    <img class="w-full" :src="post.image" alt="Recipe Cover Photo" />

    <div class="px-6 py-4">
        <div class="font-medium text-xl mb-2">{{ post.title }}</div>
    </div>

    <!-- green and red ingredients -->
    <div class="px-6 pt-4 pb-2">
        <!-- green ingredients -->
        <span v-for="item in post.usedIngredients" :key="item.name" class="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {{ item.name[0].toUpperCase() + item.name.substr(1) }}
        </span>
        <!-- red ingredients -->
        <span v-for="item in post.missedIngredients" :key="item.name" class="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {{ item.name[0].toUpperCase() + item.name.substr(1) }}
        </span>
        
        <div class="mt-4 mb-4 flex flex-wrap align-center justify-center">
            <a @click="getRecipe(post.id, post.title); showModal = true;" data-toggle="modal" data-target="#exampleModal" class=" xl:text-lg text-md border bg-white border-green-500 text-green-700 hover:bg-green-900 hover:text-white rounded-full px-6 xl:py-2 py-1 cursor-pointer">
                Let's try it!
            </a>
        </div>
    </div>
</div>

<div v-show="showModal" class="inset-0 z-10 overflow-y-auto" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <RecipeModal :id='id' :image_url='image_url' :steps='steps' :currentRecipe='currentRecipe' :currentRecipeName='getRecipeName' :ingredients='ingredients' :showModal='showModal' @closeModal='closeModal'/>
</div>

</template>

<script>
import RecipeModal from '@/components/RecipeModal.vue'
import axios from "axios";

export default {
    name: 'RecipeCard',
    props: ["post"],
    components: {
        RecipeModal,
    },
    data() {
        return {
            showModal: false,
            image_url: this.post.image,
            id: this.post.id,
            currentRecipe: '',
            currentRecipeName: '',
            ingredients: [],
            steps: [],
            recipeInfo: [],
        }
    },

    computed: {

        getRecipeName() {
            return this.post.title
        },

    },

    methods: {

        closeModal(value){
            this.showModal = value
        },

        getRecipe(id) {
            let list_of_ingredients = []
            let api_endpoint = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=480b31de77524517842c79311adf97be`

            axios.get(api_endpoint)
            .then(response => {
                let recipeInfo = response.data
                this.currentRecipe = recipeInfo

                if (recipeInfo != []){

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
    },
}
</script>