<template>
<!-- eslint-disable -->

<div class="flex justify-center mt-10"> 
    <a href="/"> <img class="w-48" :src="foodful"> </a>
</div>

<div class="mx-auto mt-10 px-12 sm:px-24 md:px-24 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl ">
    
    <h2 class="text-4xl tracking-tight font-extrabold text-black sm:text-5xl md:text-6xl text-center">Log In</h2>

    <div v-show='displayError' class='mt-10'>
        <div class="bg-red-100 border border-red-300 text-red-700 p-2 xl:p-5 rounded-xl relative text-sm xl:text-lg" role="alert">
            <strong class="font-black">Oh No!</strong>
            <span class="block sm:inline font-semibold"> Failed to login. Please check your email address and password again!</span>
        </div>
    </div>

    <div class="mt-12">

        <form @submit="login" method="post">

            <div class="text-left text-md font-bold text-gray-700">
                Email Address
            </div>

            <input class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="email" name="email" placeholder="example@gmail.com" v-model="form.email" required>

            <div class="flex justify-between items-center mt-8">
                <p class="text-md font-bold text-gray-700">Password</p>
                
            </div>

            <input class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="password" name="password" placeholder="Enter your password" v-model="form.password" required>

            <button class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 mt-10" type="submit">
                Log In
            </button>

        </form>

        <p class="mt-12 mb-12 text-sm font-display font-semibold text-gray-700 text-center">
            Don't have an account ? <a href="/register" class="cursor-pointer text-green-600 hover:text-green-800">Sign up</a>
        </p>

    </div>

</div>

</template>

<script>
import axios from "axios"
import router from "../router"
import foodful from '../assets/foodful.png'

export default {
    name: "Login",
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            foodful: foodful,
            displayError: false
        }
    },
    methods: {
        login: function(e) {
            e.preventDefault()
            
            const config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            axios.post("/api/login", this.form, config)
            .then(res => {
                // success
                router.push("/Home")
            })
            .catch(err => {
                // failure
                this.displayError = true
                router.push("/Login")
            })
        }
    }
}

</script>