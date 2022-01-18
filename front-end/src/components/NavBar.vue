<template>
<!-- eslint-disable -->
<!-- Template publicly available on Tailwind CSS -->

<Disclosure as="nav" class="bg-green-800" v-slot="{ open }">

    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">

        <div class="relative flex items-center justify-between">

            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <!-- Mobile menu button-->
                <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span class="sr-only">Open main menu</span>
                    <img v-if="!open" class="block h-6 w-6" aria-hidden="true" src="https://img.icons8.com/material-outlined/24/ffffff/menu--v1.png" /> 
                    <img v-else class="block h-6 w-6" aria-hidden="true" src="https://img.icons8.com/material-outlined/24/ffffff/menu--v1.png" />
                </DisclosureButton>
            </div>

            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex-shrink-0 flex items-center">
                    <img class="ml-16 block lg:hidden w-28 " :src="foodful" alt="Foodful" />
                    <img class="ml-16 hidden lg:block w-32" :src="foodful" alt="Foodful" />
                </div>

                <div class="hidden sm:block sm:ml-6">
                    <div class="flex xl:mt-4 lg:mt-4 space-x-4">
                        <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'text-white' : 'text-white hover:bg-green-900 hover:text-white', 'px-3 py-2 rounded-md text-lg font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
                    </div>
                </div>
            </div>

            <div class="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                <!-- Profile dropdown -->
                <Menu as="div" class="relative ml-3">
                    <div>
                        <MenuButton class="relative flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span class="sr-only">Open user menu</span>
                            <img class="xl:h-14 xl:w-14 h-10 w-10 rounded-full" src='https://img.icons8.com/doodle/48/000000/test-account.png' alt="" />
                        </MenuButton>
                    </div>

                    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                        <MenuItems class="origin-top-right absolute z-auto right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <MenuItem v-slot="{ active }">
                                <a @click="handleSignOut()" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black cursor-pointer']">Sign out</a>
                            </MenuItem>
                        </MenuItems>
                    </transition>
                </Menu>

            </div>

        </div>

    </div>

    <DisclosurePanel class="sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
            <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'border text-white' : 'text-white borderhover:bg-green-700 hover:text-black', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}
            </DisclosureButton>
        </div>
    </DisclosurePanel>

</Disclosure>

</template>

<script>
import foodful from '../assets/foodful.png'
import user from '../assets/user.png'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import axios from "axios"

const navigation = [
    { name: 'Home', href: '/Home', current: true },
    { name: 'Browse Recipes', href: '/Recipes', current: false },
    { name: 'View Inventory', href: '/Inventory', current: false },
]

export default {
    name: "NavBar",
    components: {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
    },
    data(){
        return {
        foodful:foodful,
        navigation,
        user:user,
        }
    },

    methods: {

        handleSignOut() {
            axios.post("/api/logout")
            .then(res => {
                // alert(res.data);
                this.$router.push('/')
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
};
</script>