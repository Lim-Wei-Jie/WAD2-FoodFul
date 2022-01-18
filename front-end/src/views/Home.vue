<template>
<!-- eslint-disable -->

<NavBar/>

<div class="container mx-auto">
      
    <div class="md:flex md:flex-row border border-gray-100 bg-gray-100 xl:mt-10 lg:mt-10 xl:rounded-xl lg:rounded-xl xl:shadow-lg lg:shadow-lg">

        <div class="flex flex-col flex-1 w-full overflow-y-auto">

            <main class="w-full z-0 flex-1 pb-4 px-5">

                <div class="grid pb-10">
                    <!-- Start Dashboard-->
                    <div class="content-start">
                        <h2 class="text-2xl md:text-4xl font-bold mt-8">
                            Your Personal Dashboard
                        </h2>
                    </div>
                    
                    <div class="grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mt-8">

                        <div class="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out" :style="{backgroundImage: dashboard_bgImg}">

                            <div class="absolute inset-0 bg-pink-900 bg-opacity-75 transition duration-300 ease-in-out">
                            </div>

                            <div class="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">

                                <div>
                                    <h3 class="text-center text-white text-2xl">
                                        Total Food Collection
                                    </h3>
                                    <h3 class="text-center text-white text-3xl mt-2 font-bold">
                                        {{inventory.length}}
                                    </h3>
                                </div>

                            </div>
                        
                        </div>

                        <div class="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out" :style="{backgroundImage: dashboard_bgImg}">

                            <div class="absolute inset-0 bg-yellow-600 bg-opacity-75 transition duration-300 ease-in-out">
                            </div>

                            <div class="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">

                                <div>
                                    <h3 class="text-center text-white text-2xl">
                                        Food Within 7 Days Of Expiring
                                    </h3>
                                    <h3 class="text-center text-white text-3xl mt-2 font-bold">
                                        {{expiringItems.length}}
                                    </h3>
                                </div>

                            </div>

                        </div>

                        <div class="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out" :style="{backgroundImage: dashboard_bgImg}">

                            <div class="absolute inset-0 bg-blue-900 bg-opacity-75 transition duration-300 ease-in-out">
                            </div>

                            <div class="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">

                                <div>
                                    <h3 class="text-center text-white text-2xl">
                                        Food Good To Go
                                    </h3>
                                    <h3 class="text-center text-white text-3xl mt-2 font-bold">
                                        {{getGood}}
                                    </h3>
                                </div>

                            </div>

                        </div>

                    </div>
                    
                    <!-- End Dashboard-->

                </div>

            </main>

        </div>

    </div>


    <!-- Fridge section -->
    <div class="my-10" body="1">

        <div class="flex flex-wrap justify-between my-5 p-5">
            <h2 class="text-2xl font-bold">What is in my fridge?</h2>
            <a v-show="inventory.length >= 3" href="/Inventory" class="flex flex-row text-lg hover:text-purple-700 mt-2 text-green-800">
                View all items
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
        </div>

        <!-- Fridge section Card -->
        <div v-if='topThreeExpiringItems.length!=0' class="grid sm:grid-cols-3 w-120 xxs:grid-cols-1 lg:w-480">
            <!-- show max 3 -->
            <div v-for="item of topThreeExpiringItems">
                <FridgeCard :item='item'/>
            </div>
        </div>
        <div v-else class='flex flex-row justify-center'>
            <img class='xl:w-14 xl:h-14 w-10 h-10' src="https://img.icons8.com/emoji/48/000000/smiling-face-with-smiling-eyes.png"/>
            
            <h1 class='font-semibold xl:text-3xl text-md px-6 xl:py-2'>You have no expiring items in your inventory. Click <a href='/Inventory' class='font-bold text-green-700'>here</a> to view your inventory.</h1>
        </div>

    </div>

    <!-- Recipe section -->
    <div class="my-20" body="1">
        
        <div class="flex flex-wrap justify-between my-5 p-5">
            <h2 class="text-2xl font-bold">Healthy Recipes for you!</h2>
            <a href="/Recipes" class="flex flex-row text-lg hover:text-purple-700 text-green-800 mt-2">
                View Recipes just for you
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
        </div>

        <!-- Recipe Card -->
        <div class="grid sm:grid-cols-3 w-120 xxs:grid-cols-1 lg:w-480 pb-8">
            <div v-for=" recipe in filteredRecipes" :key="recipe_healthy[recipe]">
                <RecipeHome :recipe_selected_id="recipe.id" :ingredients="ingredients" :steps="steps" :recipe="recipe"/>
            </div>
        </div>

    </div>

</div>

</template>

<script>
import axios from 'axios'
import dashboard_bgImg from '../assets/dashboard.jpg'
import NavBar from '../components/NavBar.vue'
import FridgeCard from '../components/FridgeCard'
import RecipeHome from '../components/RecipeHome'

export default {
    name: "Home",
    components: {
        NavBar,
        FridgeCard,
        RecipeHome,
    },
    data() {
        return{
            dashboard_bgImg: `url(${dashboard_bgImg})`,
            search:'',
            inventory: [],
            recipe:"",
            readyRecipe:[],
            recipe_healthy:[],
            selected_recipe_id:"",
            ingredients:[],
            steps:[]
        }
    },

    created: function() {
        this.callRecipe()
        this.getAllItems()
    },

    computed: {

        filteredPosts() {
            return this.posts.filter(post => post.body.toLowerCase().includes(this.search.toLowerCase()))
        },

        filteredRecipes() {
            return this.recipe_healthy.filter(recipe => recipe.title.toLowerCase().includes(this.search.toLowerCase()))
        },

        getGood() {
            // total - expiring
            return (this.inventory).length - (this.expiringItems).length
        },

        expiringItems() {
            // items within 7 days of expiry from today
            return this.getExpiring(this.inventory)   
        },

        topThreeExpiringItems() {
            // return top 3 items in ascending order within 7 days of expiry from today
            let expiring = this.getExpiring(this.inventory)
            return expiring.sort(
                function(a, b){
                    var a = new Date(a.date)
                    var b = new Date(b.date)
                    return a-b
            }).slice(0, 3)
        },
    },

    methods: {

        callRecipe() {

            let base_url = "https://api.spoonacular.com/recipes/random?number=30&apiKey=5a931c0e96014d50b9090a30abcf59b5"

            axios.get(base_url)
            .then(response => {
                let recipe_list = response.data.recipes

                let i = 0

                for (this.recipe of recipe_list) {
                    if ((Number(this.recipe.healthScore) > 5) && (Number(this.recipe.title.length) < 25) && (Number(this.recipe.image.length) > 0) && ( i < 3)) {
                        this.recipe_healthy.push(this.recipe)
                        i++
                    }
                }
            })
            .catch(error => {
                console.log(error.message)
            })
        },

        getAllItems() {
            axios.post('/api/read')
            .then(res => {
                this.inventory = res.data.inventory
            })
            .catch(err => {
                // shouldnt have any error
                console.log(err.message);
            })
        },

        getExpiring(inventory) {
            // current date
            let date_today = new Date

            let expiring = []
            for (var item of inventory) {
                // expiry date
                let date_expiry = new Date(item.date)
                let daysLeft = this.getDaysLeft(date_today, date_expiry)
                // Food within 7 days of expiring
                if (daysLeft <= 7) {
                    expiring.push(item)
                }
            }

            return expiring
        },

        getDaysLeft(date_today, date_expiry) {
            // days remaining
            let diff_time = date_expiry.getTime() - date_today.getTime()
            return Math.round(diff_time/(1000 * 3600 * 24))
        }
    }
}


</script>