<template>
<!-- eslint-disable -->

<div class="flex justify-center my-5"> 
    <img class="w-56" :src="foodful">
</div>

<div class="relative bg-white overflow-hidden mb-10">

    <div class="max-w-7xl mx-auto">

        <div class="relative  pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        
            <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">

                <div class="sm:text-center lg:text-left">
                    <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-5xl">
                        <span class="block xl:inline">One step closer to</span>
                        {{ ' ' }}
                        <span class="block text-green-600 xl:inline">saving food</span>
                    </h1>

                    <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-md lg:mx-0">
                        Food-Ful is a Web Application developed by a group of students from SMU who wishes to do something about the prevalent food wastage issue faced in Singapore. Join us in helping to create a more sustainable future!
                    </p>

                    <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        <div class="rounded-md shadow">
                            <a href="/Login" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-700 md:py-4 md:text-lg md:px-10">
                                Get started
                            </a>
                        </div>
                        <div class="mt-3 sm:mt-0 sm:ml-3">
                            <a href="/LearnMore" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10"> 
                                Learn More <!-- maybe go to another page or bring the thing down-->
                            </a>
                        </div>
                    </div>
                </div>

            </main>

        </div>

    </div>

    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" />
    </div>

</div>

</template>

<script>
import foodful from '../assets/foodful.png'

export default {
name: 'Welcome' ,
  data(){
    return {
      foodful:foodful
    }
  }

}
</script>