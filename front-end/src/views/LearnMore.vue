<template>
<!-- eslint-disable -->

<div class="flex justify-center my-5"> 
    <img class="w-56" :src="foodful">
</div>

<div class="max-w-7xl mx-auto mt-10">
    <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-5xl text-center">
        <span class="block xl:inline lg:inline">Our Mission: 
            <span class=" block xl:inline lg:inline text-green-600">Saving food</span>
        </span>
    </h1>
    <p class="text-center xl:text-lg text-md xl:mx-32 px-8 py-3 mt-5">
        We are a group of students from Singapore Management University who developed an application with the mindset of giving people a way to keep track of their food inventory and the expiry dates of each food items. The website will recommended recipes based on your inventory, and hopefully you will be able to discover your love for cooking while joining us in our endeavour to stop food wastage.
    </p>
</div>

<div class="pt-2 mx-3 mt-5 text-center xl:pt-6 xl:mx-24 ">
    <a href="/">
        <span class=" w-1/5  px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10">
            Get started
        </span>
    </a>
</div>

<!-- Features -->
<div class="text-center bg-green-700 mt-10 xl:p-10 lg:p-10 p-5">
    <p class="mt-2 xl:text-5xl leading-8 font-extrabold tracking-tight text-white text-2xl">
        Features
    </p>
</div>

<div class="xl:py-12 lg:py-12 py-4 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mt-10">
            <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div v-for="feature in features" :key="feature.name" class="relative">
                    <dt>
                        <div class="absolute flex items-center justify-center h-12 w-12 rounded-md text-white">
                        <!-- image here -->
                        <img :src='feature.image'>
                        </div>
                        <p class="ml-16 text-lg leading-6 text-green-800 font-bold xl:text-lg text-md ">{{ feature.name }} </p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-gray-900  xl:text-lg text-md ">
                        {{ feature.description }}
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</div>

<div class='text-center mt-10 mb-5 bg-green-700 xl:p-10 lg:p-10 p-5'>
    <h1 class='font-extrabold text-2xl xl:text-5xl lg:text-5xl text-white'>Meet The Team Behind Food-Ful</h1>
</div>

<div class=''>

    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">

        <!--Ricky-->
        <div class="rounded overflow-hidden shadow-lg text-center">
            <img class="rounded-full h-56 w-56 mx-auto mt-5" src="../assets/ourImg/ricky.jpg" alt="Ricky">
            <div class="px-6 pt-4 text-center">
                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="https://cli.vuejs.org/" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" alt="VueJS">
                    </a>
                </span>

                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="https://tailwindcss.com/docs" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="TailwindCSS">
                    </a>
                </span>

                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2"> 
                    <a href="https://spoonacular.com/food-api/docs" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="../assets/spoonacular.svg" alt="Spoontacular">
                    </a>
                </span>

                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="https://www.figma.com/ui-design-tool/" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma">
                    </a>
                </span>
            </div>
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">Ricky Goh <br> ∘ Front-End Developer ∘</div>
                <p class="font-medium xl:text-lg text-md text-green-700 mb-2">
                    Meet Ricky! He is in charge of creating the homepage in Food-Ful, as well as the Figma.
                </p>
            </div>
        </div>

        <!--Amanda-->
        <div class="rounded overflow-hidden shadow-lg">
            <img class="rounded-full h-56 w-56 mx-auto mt-5" src="../assets/ourImg/amanda.jpg" alt="Amanda">
            <div class="px-6 pt-4 text-center">
                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="https://cli.vuejs.org/" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" alt="VueJS">
                    </a>
                </span>

                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="https://tailwindcss.com/docs" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="TailwindCSS">
                    </a>
                </span>

                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2"> 
                    <a href="https://spoonacular.com/food-api/docs" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="../assets/spoonacular.svg" alt="Spoontacular">
                    </a>
                </span>

                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="https://www.figma.com/ui-design-tool/" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma">
                    </a>
                </span>
            </div>

            <div class="px-6 py-4 text-center">
                <div class="font-bold xl:text-xl text-lg mb-2">Amanda Cheng <br> ∘ Front and Back-End Developer ∘</div>
                <p class="font-medium xl:text-lg text-md text-green-700 mb-2">
                    Food-Ful is Amanda's first project that involves creating an entire new web application. She is the one who helps to make all the recipe-related information appear.
                </p>
            </div>
        </div>

        <!--Syafinaz-->
        <div class="rounded overflow-hidden shadow-lg">
            <img class="rounded-full h-56 w-56 mx-auto mt-5" src="../assets/ourImg/syafinaz.jpg" alt="Syafinaz">
            <div class="px-6 pt-4 text-center">
                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="https://cli.vuejs.org/" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" alt="VueJS">
                    </a>
                </span>

                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="https://tailwindcss.com/docs" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="TailwindCSS">
                    </a>
                </span>

                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="https://vcalendar.io/" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="../assets/vcalendar.png" alt="V-Calendar">
                    </a>
                </span>
                
                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2"> 
                    <a href="https://spoonacular.com/food-api/docs" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="../assets/spoonacular.svg" alt="Spoontacular">
                    </a>
                </span>
            </div>
            
            <div class="px-6 text-center">
                <div class="font-bold xl:text-xl text-lg mb-2">Nur Syafinaz <br> ∘ Front-End Developer ∘</div>
                <p class=" font-medium xl:text-lg text-md text-green-700 mb-4">
                    Meet Syafinaz! She is in charge of creating the Inventory Function in Food-Ful, including incorporating the auto-complete form and sorts and filter function to make lives easier for the users.
                </p>
            </div>
        </div>

        <!--Wei Jie-->
        <div class="rounded overflow-hidden shadow-lg text-center">

            <img class="rounded-full h-56 w-56 mx-auto mt-5" src="../assets/ourImg/weijie.jpg" alt="Wei Jie">
            
            <div class="px-6 pt-4">
                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="https://cli.vuejs.org/" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" alt="VueJS">
                    </a>
                </span>

                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="https://nodejs.org/en/docs/" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="NodeJS">
                    </a>
                </span>

                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="http://expressjs.com/en/api.html" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" alt="ExpressJS">
                    </a>
                </span>

                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="https://docs.mongodb.com/drivers/node/current/" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg" alt="MongoDB">
                    </a>
                </span>
            </div>

            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">Lim Wei Jie <br> ∘ Back-End Developer ∘</div>
                <p class="font-medium xl:text-lg text-md text-green-700 mb-2">
                    Wei Jie is in charge of creating the backend API with NodeJS and its framework - ExpressJS, connecting the backend to a cloud database - MongoDB Atlas. He ensure that data is retrieved and used to render our web pages dynamically.
                </p>
            </div>

        </div>

        <!--Syafahani-->
        <div class="rounded overflow-hidden shadow-lg text-center">

            <img class="rounded-full h-56 w-56 mx-auto mt-5" src="../assets/ourImg/siti.jpg" alt="Siti Syafahani">

            <div class="px-6 pt-4 text-center">
                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="https://cli.vuejs.org/" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" alt="VueJS">
                    </a>
                </span>
                
                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="https://tailwindcss.com/docs" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="TailwindCSS">
                    </a>
                </span>
                
                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="https://img.stackshare.io/service/21223/default_35e005510911711d35edae2841151dfb76f2b3f5.png" alt="Headless.ui">
                    </a>
                </span>

                <span class="inline-block px-3 py-1 font-semibold mr-2 mb-2">
                    <a href="" target="_blank">
                        <img class="w-6 h-6 xl:w-10 xl:h-10" src="../assets/spoonacular.svg" alt="Spoontacular">
                    </a>
                </span>
            </div>

            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">Siti Syafahani <br> ∘ Front-End Developer ∘</div>
                <p class="font-medium xl:text-lg text-md text-green-700 mb-2">
                    With an interest in UI/UX design, Siti is in charge of creating the design for the recipes page and coordinating with the backend developers to ensure the information displays nicely. 
                </p>
            </div>

        </div>

    </div>

</div>

</template>



<script>
import foodful from '../assets/foodful.png'
import recipeicon from '../assets/recipeicon.png'
import fruitvege from '../assets/fruitvege.png'

const features =[
    {
        name: 'Manage Inventory',
        description: 'Keep track of food items in your household with our inventory feature. You can easily track dates, categorise your food items and update them.',
        image: fruitvege ,
    },
    {
        name: 'Browse Recipes',
        description: "Don't know what to do with your leftover ingredients? View a wide array of recipes catered specially to your food available in inventory. You can also keep up with latest food trends and follow our step by step guide when attempting the recipes out.",
        image: recipeicon
    },
]

export default {
    name: 'LearnMore',
    data(){
        return {
            foodful:foodful,
            recipeicon: recipeicon, 
            fruitvege: fruitvege,
        }
    },

    setup(){
        return{
            features,
        }
    },
}

</script>