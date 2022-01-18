<template>
<!-- eslint-disable -->

<div class="flex justify-center mt-10"> 

  <a href="/"> <img class="w-48" :src="foodful" href="">

</a>
</div>



    <div class="mx-auto mt-10 px-12 sm:px-24 md:px-24 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2 class="text-4xl tracking-tight font-extrabold text-black sm:text-5xl md:text-6xl text-center">Register</h2>

        <div v-show='displayError' class='mt-10'>
        <div class="bg-red-100 border border-red-300 text-red-700 p-2 xl:p-5 rounded-xl relative" role="alert">
        <strong class="font-black">Oh No!</strong>
        <span class="block sm:inline font-semibold"> A user with the given email is already registered!</span>
        <!-- <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span> -->
        </div>
        </div>
        <div class="mt-12">
            <form @submit="register" method="post">
                
            <div class="mt-8">
                <div class="text-left text-md font-bold text-gray-700 tracking-wide">First Name</div>
                    <input class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="text" name="firstName" placeholder="Your first name" v-model="form.firstName" required>
                </div>
                
            <div class="mt-8">
                <div class="text-left text-md font-bold text-gray-700 tracking-wide">Last Name</div>
                    <input class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="text" name="lastName" placeholder="Your last name" v-model="form.lastName" required>
                </div>

            <div class="mt-8">
                <div class="text-left text-md font-bold text-gray-700 tracking-wide">Email Address</div>
                    <input class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="email" name="email" placeholder="Your email address" v-model="form.email" required>
                </div>
                <div class="mt-8">
                    <div class="flex justify-between items-center">
                        <div class="text-left text-md font-bold text-gray-700 tracking-wide">Password</div>

                        </div>
                        <input class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="password" name="password" placeholder="Enter a secure password" v-model="form.password" required>
                                            <p class="text-left text-grey text-xs mt-1 text-green-700">At least 6 characters</p>

                    </div>
                    <div class="mt-10">
                        <button class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10" type="submit">Register
                        </button>
                    </div>
                    </form>
                    <div class="mt-12 mb-12 text-sm font-display font-semibold text-gray-700 text-center"><a href="/login" class="cursor-pointer text-green-600 hover:text-green-800">I already have an account</a></div>
                </div>
            </div>
            

</template>

<script>
import axios from "axios"
import router from "../router"
import foodful from '../assets/foodful.png'


export default {
    name: 'Register',
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            },
            foodful:foodful,
            displayError:false
        }
    },
    methods: {
        register: function(e) {
            e.preventDefault()

            const config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            axios.post("/api/register", this.form, config)
            .then(res => {
                // success
                console.log(res);
                router.push("/Login")
            })
            .catch(err => {
                // failure
                this.displayError = true
                router.push("/Register")
            })
        }
    }
}

</script>