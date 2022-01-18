<template>
<!-- eslint-disable -->

<Popover v-slot="{ open }" class="z--50">

    <PopoverButton :class="open ? '' : 'text-opacity-90'" class="justify-end px-3 py-1 text-base font-medium rounded-md" @click="callTrivia()">
        <span class="px-2 py-6 xl:mt-4 ">
            <img class="z--50 xl:mt-7 mt-6 xl:w-12 xl:h-12 lg:w-12 lg:h-12 w-8 h-8 xl:ml-4 mx-auto" :src="recipeicon" alt="recipeicon"/>
            <span class="z--50 text-xs xl:text-lg lg:text-lg text-green-800 font-medium">
            Click Me!
            </span>
        </span>
    </PopoverButton>

    <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-1 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-1 opacity-0"
    >

        <PopoverPanel
            class="absolute transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl xl:w-screen"
        >

            <div class="rounded-lg border-green-700 border-2 shadow-lg ring-1 ring-black ring-opacity-5">
        
                <div class="relative bg-white p-7 ">
                    
                    <a class="flex items-center p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                        <div class="mx-auto">
                            <p class="text-3xl mb-4 font-semibold text-gray-900 xl:text-4xl text-center">
                            Did you know?
                            </p>
                            <p class="text-2xl text-gray-700 xl:text-3xl text-center">
                            {{ trivia.text }}
                            </p>
                        </div>
                    </a>

                </div>

            </div>

        </PopoverPanel>

    </transition>

</Popover>

</template>

<script>
import recipeicon from '../assets/recipeicon.png';
import axios from 'axios'
import {
    Popover,
    PopoverButton,
    PopoverPanel,
} from "@headlessui/vue";

export default {
    name: 'Trivia',
    components: {
        Popover,
        PopoverButton,
        PopoverPanel,
    },
    data() {
        return {
            recipeicon: recipeicon,
            trivia: ''
        };
    },
    methods: {

        callTrivia() {

            const urlEndPoint = 'https://api.spoonacular.com/food/trivia/random?apiKey=480b31de77524517842c79311adf97be'

            axios.get(urlEndPoint)
            .then(response => {
                this.trivia = response.data
                // this.loading = false
            })
        }
    }
}
</script>