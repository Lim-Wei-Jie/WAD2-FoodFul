<template>
<!-- eslint-disable -->

<NavBar/>

<div class="pt-2 mx-3 mt-5 text-left xl:pt-6 xl:mx-24 xl:text-left">
    <a href="/Recipes">
        <span class="bg-green-700  text-white py-3 px-4 rounded hover:bg-green-500">
            {{ ' < Back to all recipes '}}
        </span>
    </a>
</div>

<!-- recipe name and description -->
<div class="mx-4 mt-6 xl:pb-12 xl:mx-24 xl:my-12 rounded-md flex flex-wrap justify-center card bg-white shadow-lg border-gray-300 border-2 xl:mt-5">

    <img class="my-auto w-full lg:w-1/2 xl:my-auto xl:mt-8 xl:w-4/12" :src="image_url">
    <div class="w-full flex flex-col">
        <div class="p-4 flex-1">
            <h1 class="text-xl text-center mt-2 xl:text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {{ recipeName }}
            </h1>

            <p class="text-md text-center mt-4 xl:text-xl text-gray-500 xl:px-8 lg:mx-auto">
                <p v-html="description"></p>
                <!-- {{ description }} -->
            </p>
        </div>
    </div>

</div>


<!--Card 1-->
<div class="lg:mt-6 lg:grid lg:gap-3 xl:grid grid-cols-3 xl:gap-1 pb-12"> 

    <div class="ml-4 mt-3 w-auto mr-4 border-gray-300 border-2 max-w-sm rounded overflow-hidden shadow-lg xl:ml-24 ">

        <div class="px-6 py-4">

            <h1 class="font-bold text-2xl xl:text-3xl mb-5 uppercase text-green-700">
                Ingredients
            </h1>
            <!-- replace this with all ingredients -->
            <ul class='list-disc ml-8'>
            <div v-for="ingredient in ingredients">
                <li>
                <p class="text-gray-700 ml-5 mb-5 text-md xl:text-xl text-left">
                    {{ ingredient[0].toUpperCase() + ingredient.substr(1) }}
                </p>
                </li>
            </div>
            </ul>

        </div>

    </div>

    <div class=" mt-10 xl:mt-0 ml-3 py-2 px-2 lg:col-span-2 xl:col-span-2 ">

        <h1 class="xl:px-2 xl:py-4 text-left font-bold uppercase text-2xl xl:text-3xl text-green-700">
            Steps
        </h1>

        <div v-for="(step, index) in steps" class="w-full mb-5 border-gray-300 border-b-2 mr-24 rounded overflow-hidden xl:px-4 xl:py-4">
            <h1 class="px-6 py-2 lg:px-6 lg:py-4 font-semibold text-lg xl:text-2xl text-left mt-2 mb-2">
                Step {{ index + 1 }}
            </h1>

            <!-- replace this with v-for steps -->
            <p class="px-2 text-black text-md xl:text-xl ml-5 mb-5 text-left">
                {{ step }}
            </p>
        </div>

    </div>

</div>

</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";

export default {
    name: 'RecipeSteps',
    components: { NavBar },
    props: ['id', 'steps', 'currentRecipeName', 'ingredients', 'image_url'],
    data(){
        return{
            recipeName: '',
            list_of_sentences: [],
            description: ``
        }
    },

    created: function() {
        this.getDescription()
    },

    methods: {

        getDescription(id){
            let count = 0
            var id = this.id
            let api_endpoint = `https://api.spoonacular.com/recipes/${id}/summary?apiKey=a81ab2c7f9a542a3b443c28b99a6e9e9`

            axios.get(api_endpoint)
            .then(response => {
                let recipeSummary = response.data
                let shortdesc = recipeSummary.summary
                this.list_of_sentences = shortdesc.split('.')

                if (this.list_of_sentences.length < 3){
                    this.description += recipeSummary.summary
                } else {
                    for (var sentence of this.list_of_sentences) {
                        if (count < 4){
                            this.description += sentence
                            this.description += '.'
                        }
                        count ++                
                    }
                }

                this.recipeName = recipeSummary.title
            })
            .catch(error => {
                console.log( error.message )
            })
        },
    }
}
</script>