<template>
<!-- eslint-disable -->
<NavBar />

<div class="flex justify-center">
    <div class="justify-center text-4xl mt-12 tracking-tight font-extrabold text-black sm:text-5xl md:text-6xl">
        Recipes
    </div>

    <Trivia/>
</div>

<div class="text-center text-2xl mt-12 tracking-tight font-extrabold text-black md:text-3xl">
    Welcome to your recipe page!
</div>

<p class="mt-8 mx-4 text-xl text-center xl:px-40 lg:px-40 ">
    This is where you can view recipes that are enjoyed by many, search for other recipes, view recommended recipes according to some ingredients in your inventory, as well as view trending food videos!
</p>

<div class="w-full mx-auto px-2 py-8 sm:px-0">

    <TabGroup>

        <TabList class="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
            <Tab v-slot="{ selected }" as="template">
                <button
                :class="[
                    'w-full py-2.5 font-bold text-xl mb-2 text-green-700 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-900 ring-white ring-opacity-60',
                    selected
                    ? 'bg-white shadow'
                    : 'text-green-100 hover:bg-white/[0.12] hover:text-green-600',
                ]"
                >
                Must Try
                </button>
            </Tab>

            <Tab v-slot="{ selected }" as="template">
                <button
                :class="[
                    'w-full py-2.5 font-bold text-xl mb-2 text-green-700 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-900 ring-white ring-opacity-60',
                    selected
                    ? 'bg-white shadow'
                    : 'text-green-100 hover:bg-white/[0.12] hover:text-green-600',
                ]"
                >
                Recommended
                </button>
            </Tab>

            <Tab v-slot="{ selected }" as="template">
                <button
                :class="[
                    'w-full py-2.5 font-bold text-xl mb-2 text-green-700 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-900 ring-white ring-opacity-60',
                    selected
                    ? 'bg-white shadow'
                    : 'text-green-100 hover:bg-white/[0.12] hover:text-green-600',
                ]"
                >
                Trending Videos
                </button>
            </Tab>
        </TabList>

        <TabPanels class="mt-2">
            <!-- Popular panel  -->
            <TabPanel>
                <!-- search bar -->
                <div class="p-6 h-6 border-black-800">
                    <div class="flex items-center rounded-full shadow-xl border-black-800">
                        <input class="rounded-l-full w-full py-4 px-6 text-gray-700 border-gray-800 leading-tight focus:outline-none bg-blue" id="search" type="text" placeholder="Search for one or more ingredients" v-model="recipeSearch">
                    
                        <div class="p-4 border-gray-800">
                            <button class="bg-green-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center" @click="handleSearchItem(recipeSearch)">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- end search bar -->

                <div class="p-10 my-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5"  v-show='popular.length!=0'>
                    <div v-for="post in popular" :key="post.id"> 
                        <RecipeCard :post='post'/>
                    </div>
                </div>
                    
                <div v-show='popular.length==0' class='flex flex-row justify-center mt-28 mb-32'>

                    <img class='xl:w-14 xl:h-14 w-8 h-8' src="https://img.icons8.com/color/48/000000/sad--v1.png"/>
                    <h1 class='font-semibold xl:text-3xl text-md px-6 xl:py-2 pt-1'>
                        There are no search results.
                    </h1>
                </div>

            </TabPanel>

            <!-- Recommended panel  -->
            <TabPanel>
                {{getRecommendedRecipes}}
                <div class="p-10 my-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 " v-if='recommended.length!=0'>
                    <div v-for="post in recommended" :key="post.id">
                        <RecipeCard :post='post'/>
                    </div>
                </div>

                <div v-else-if="recommended.length==0"  class='flex flex-row xl:ml-28 xl:mt-16 ml-4'>
                    <img class='xl:w-14 xl:h-14 w-10 h-10' src="https://img.icons8.com/color/48/000000/sad--v1.png"/>
                    <h1 class='font-semibold xl:text-3xl text-md px-6 xl:py-2'>
                        You have no ingredients in your inventory. Click <a href='/Inventory' class='font-bold text-green-700'>here</a> to add ingredients.
                    </h1>
                </div>
            </TabPanel>

            <!-- YouTube videos Panel -->
            <TabPanel>
                <VideosModal/>
            </TabPanel>

        </TabPanels>

    </TabGroup>

</div>

</template>

<script>
import axios from "axios";
import {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@headlessui/vue";
import NavBar from "@/components/NavBar.vue";
import Trivia from "@/components/Trivia.vue";
import RecipeCard from "@/components/RecipeCard.vue";
import VideosModal from "@/components/VideosModal.vue";

export default {
    name: "Recipes",
    components: {
        TabGroup,
        TabList,
        Tab,
        TabPanels,
        TabPanel,
        NavBar,
        Trivia,
        RecipeCard,
        VideosModal,
    },
    data() {
        return {
            inventory: [],
            popular: [],
            recommended: [],
            recipeSearch: '',
        };
    },
    
    created: function() {
        this.getAllItems()
        this.getPopularRecipes()
    },

    computed: {
        getRecommendedRecipes() {
            let itemArrOfObj = this.inventory
            let ingredientArr = []

            if (itemArrOfObj.length <= 5) { // if inventory = 1 - 5, get 1 - 5
                for (var item of itemArrOfObj) {
                    ingredientArr.push(item.name)
                }
            } else { // if inventory > 5, get any 5
                const shuffled = itemArrOfObj.sort(() => 0.5 - Math.random())
                let randomFiveItems = shuffled.slice(0, 5)
                for (var item of randomFiveItems) {
                    ingredientArr.push(item.name)
                }
            }

            let query = ingredientArr.join(',+')
            const urlEndPoint = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=9&apiKey=d62c8f5ad11b4870b3848c4e2b8aee5a`
            
            axios.get(urlEndPoint)
            .then(response => {
                this.recommended = response.data
            })
            .catch(err => {
                console.log(err);
            })
        }
    },

    methods: {

        getAllItems() {
            axios.post('/api/read')
            .then(res => {
                this.inventory = res.data.inventory
            })
            .catch(err => {
                // shouldnt have any error
                console.log(err);
            })
        },

        getPopularRecipes() {
            let food = ['rice', 'flour', 'chicken', 'beancurd', 'egg', 'salt']
            let random_number = Math.floor(Math.random()*(food.length)+0)
            let ingredient = food[random_number]

            const urlEndPoint = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=9&apiKey=c43bcc40dc4e4c5992aa32d998f9d564`

            axios.get(urlEndPoint)
            .then(response => {
                this.popular = response.data
            })
            .catch(err => {
                console.log(err);
            })

        },

        handleSearchItem(searchedItem) {

            const urlEndPoint = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchedItem}&number=9&apiKey=ae83a586b1ef4d0fb746c26122e8f72d`

            axios.get(urlEndPoint)
            .then(response => {
                this.popular = response.data
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
};
</script>
