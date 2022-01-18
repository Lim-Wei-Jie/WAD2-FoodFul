<template>
<!-- eslint-disable -->

<!-- access and display data in currentRecipe -->
<div class="xl:min-h-screen px-4 text-center">

    <div class="relative">

        <div class="xl:fixed inset-28 bg-white rounded shadow-2xl flex flex-col">
            
            <div class="flex justify-end">
                <!-- close button is here -->
                <!-- @click="showModal = false" -->
                <button class="w-8 h-8 mr-12 mt-8" @click="onClose()">
                    <img :src="closebutton">
                </button>
            </div>

            <div class="py-12">

                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div class="lg:text-center">
                        <p class="mt-2 text-xl leading-8 font-extrabold tracking-tight text-gray-900 lg:text-4xl xl:text-4xl">
                            {{ currentRecipeName }}
                        </p>

                        <p v-if="ingredients != []" class="mt-4 max-w-2xl text-md lg:text-xl xl:text-xl text-gray-700 lg:mx-auto">
                            Here's what you need:
                        </p>
                    </div>

                    <div class="w-9/12 rounded-lg mx-auto mt-6 sm:grid grid-cols-2 gap-2 xl:grid grid-cols-4 gap-5 ">
                        <div v-for="ingredient in ingredients" :key="ingredient.id"> 
                            <p class="text-md mb-2  text-gray-900 rounded shadow-md border-green-500 border-2 xl:p-2 xl:text-lg ">
                                {{ ingredient[0].toUpperCase() + ingredient.substr(1) }}
                            </p>
                        </div>
                    </div>

                    <div class="mt-10 rounded-md">
                        <a @click="showNewModal=true" class="inline-flex items-center justify-center px-5 py-3 border border-transparent lg:text-3xl xl:text-3xl text-md font-extrabold rounded-md text-white bg-green-600 hover:bg-green-500 cursor-pointer">
                            Click here to start
                        </a>
                    </div>

                    <div>
                        <a @click="viewFullRecipe()" class="underline inline-flex items-center justify-center px-5 py-3 lg:text-3xl xl:text-2xl text-md font-semibold text-black cursor-pointer">
                            Want to view the full recipe? Click here
                        </a>
                    </div>

                </div>

            </div>

            <!-- click here to start (new carousel modal for step by step recipe) --> 
            <div v-if="showNewModal" class="fixed inset-0 z-10 overflow-y-auto" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div class="min-h-screen px-4 text-center">

                    <div class="relative">

                        <div class="xl:fixed inset-28 bg-white rounded shadow-2xl flex flex-col">
                            
                            <div class="flex justify-end">
                                <button class="w-8 h-8 mr-12 mt-8" @click="showNewModal = false">
                                    <img :src="closebutton"/>
                                </button>
                            </div>
                
                            <Carousel class="pb-12 px-2 xl:px-20 m-auto"  v-slot="{currentSlide}">
                                <!-- {{steps}} -->
                                <Slide v-for="(step, index) in steps" :key="index">

                                    <div v-show="currentSlide === index +1"  class=""> 

                                        <div class=" xl:text-4xl text-lg leading-8 font-extrabold tracking-tight text-gray-900"> 
                                            Step 
                                            <span class="ml-2 xl:text-5xl text-lg text-green-700">
                                                {{ index+1 }} of {{ currentRecipe[0].steps.length }}
                                            </span>
                                            <div class=" font-semibold text-lg py-8 mx-4 xl:mb-12 xl:mx-12 xl:text-3xl">
                                                {{ step }}
                                            </div>
                                        </div>

                                    </div>

                                </Slide>

                            </Carousel>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

</template>

<script>
import Carousel from '@/components/Carousel.vue'
import Slide from '@/components/Slide.vue'
import closebutton from '../assets/closebutton.png'
import router from '../router'

export default {
    name: 'RecipeModal',
    props: ['currentRecipe', 'currentRecipeName', 'ingredients', 'showModal', 'steps', 'image_url', 'id'],
    components: {
        Carousel,
        Slide,
    },
    data(){
        return {
            closebutton: closebutton,
            closeModal: true,
            showNewModal: false,
        }
    },

    methods: {

        viewFullRecipe() {
            router.push({
                name: 'RecipeSteps',
                params: {
                    id: this.id,
                    steps: this.steps,
                    image_url: this.image_url,
                    currentRecipeName: this.currentRecipeName,
                    ingredients: this.ingredients
                }
            })
        },

        onClose() {
            this.$emit('closeModal', false)
        }
    },
}
</script>