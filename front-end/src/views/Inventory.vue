<template>
<!-- eslint-disable -->

<NavBar/>

<div class="container w-full m-auto mt-10 text-center">
    <h2 class="text-4xl tracking-tight font-extrabold text-black xl:text-7xl lg:text-7xl">Inventory</h2>
</div>

<div class="flex flex-wrap justify-center my-2">

    <div id="Show All" class="rounded-xl group hover:bg-green-900 p-1.5 mt-5 mr-5 xl:mt-12 xl:mr-10 max-w-sm rounded overflow-hidden text-center cursor-pointer" @click='getAllItems()'>
        <img class="object-cover mx-auto xl:h-24 xl:w-24 lg:h-24 lg:w-24 w-12 h-12" :src="all" alt="Fruits & Vegetables">
        <button class="xl:text-xl lg:text-xl text-sm group-hover:text-white group-hover:font-bold">Show <br> All</button>
    </div>

    <div id="Fruits & Vegetables" class="rounded-xl group hover:bg-green-900 p-1.5 mt-5 mr-5 xl:mt-12 xl:mr-10 max-w-sm rounded overflow-hidden text-center cursor-pointer" @click='filterCategory("Fruits & Vegetables")'> 
        <img class="object-cover mx-auto xl:h-24 xl:w-24 lg:h-24 lg:w-24 w-12 h-12" :src="fruitvege" alt="Fruits & Vegetables">
        <button class="xl:text-xl lg:text-xl text-sm group-hover:text-white group-hover:font-bold">Fruits & <br> Vegetables</button>
    </div>

    <div id='Rice & Noodles' class="rounded-xl group hover:bg-green-900 p-1.5 mt-5 mr-5 xl:mt-12 xl:mr-10 max-w-sm rounded overflow-hidden text-center cursor-pointer" @click="filterCategory('Rice & Noodles')">
        <img class="object-cover mx-auto xl:h-24 xl:w-24 lg:h-24 lg:w-24 w-12 h-12" :src="ricenoodle" alt="Rice & Noodles">
        <button class="xl:text-xl lg:text-xl text-sm group-hover:text-white group-hover:font-bold">Rice & <br> Noodles</button>
    </div>

    <div id='Dairy, Chilled & Eggs' class="rounded-xl group hover:bg-green-900 p-1.5 mt-5 mr-5 xl:mt-12 xl:mr-10 max-w-sm rounded overflow-hidden text-center cursor-pointer" @click='filterCategory("Dairy, Chilled & Eggs")'>
        <img class="object-cover mx-auto xl:h-24 xl:w-24 lg:h-24 lg:w-24 w-12 h-12" :src="dairy" alt="Dairy, Chilled & Eggs">
        <button class="xl:text-xl lg:text-xl text-sm group-hover:text-white group-hover:font-bold">Dairy, Chilled <br> & Eggs</button>
    </div>

    <div id='Meat & Seafood' class=" rounded-xl group hover:bg-green-900 p-1.5 mt-5 mr-5 xl:mt-12 xl:mr-10 max-w-sm rounded overflow-hidden text-center cursor-pointer" @click='filterCategory("Meat & Seafood")'>
        <img class="object-cover mx-auto xl:h-24 xl:w-24 lg:h-24 lg:w-24 w-12 h-12" :src="meatseafood" alt="Meat & Seafood">
        <button class="xl:text-xl lg:text-xl text-sm group-hover:text-white group-hover:font-bold">Meat & <br> Seafood</button>
    </div>
        
    <div id='Frozen Food' class=" rounded-xl group hover:bg-green-900 p-1.5 mt-5 mr-5 xl:mt-12 xl:mr-10 max-w-sm rounded overflow-hidden text-center cursor-pointer" @click='filterCategory("Frozen Food")'>
        <img class="object-cover mx-auto xl:h-24 xl:w-24 lg:h-24 lg:w-24 w-12 h-12" :src="frozen" alt="Frozen Food">
        <button class="xl:text-xl lg:text-xl text-sm group-hover:text-white group-hover:font-bold">Frozen <br> Food</button>
    </div>
        
    <div id='Food Cupboard' class="rounded-xl group hover:bg-green-900 p-1.5 mt-5 mr-5 xl:mt-12 xl:mr-10 max-w-sm rounded overflow-hidden text-center cursor-pointer" @click='filterCategory("Food Cupboard")'>
        <img class="object-cover mx-auto xl:h-24 xl:w-24 lg:h-24 lg:w-24 w-12 h-12" :src="cupboard" alt="Food Cupboard">
        <button class="xl:text-xl lg:text-xl text-sm group-hover:text-white group-hover:font-bold">Food <br> Cupboard</button>
    </div>

</div>

<div class="mt-10 xl:mr-36 xl:ml-36 xl:p-12 p-6 mr-3 ml-3 mb-10 bg-gray-50 rounded-lg shadow-lg" style="min-height:48rem;">

    <div class="flex flex-wrap mb-4">

        <div class='flex flex-grow '>

            <input type="text" placeholder='Search for item ... ' class="w-2/3 xl:w-1/2 h-10 xl:h-14 p-2  text-md xl:text-xl rounded-lg shadow-lg border border-gray-300 focus:border-green-500 " v-model='searchItem' />

            <div class="w-8 flex items-center justify-center">

                <!-- sort function needs to be done -->
                <div class=' xl:ml-28 ml-24' href=''>

                    <Menu as="div" class="relative inline-block text-left">
                        
                        <div>
                            <MenuButton class="font-bold inline-flex justify-center w-full rounded-lg border border-gray-300 shadow-lg xl:px-6 px-4 xl:py-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500">
                                <span class='xl:text-lg text-sm'>SORT</span>
                                <img class="-mr-1 ml-2 xl:h-5 xl:w-5 h-4 w-4" :src="SortIcon" alt="sort" id='sort'>
                            </MenuButton>
                        </div>

                        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">

                            <MenuItems class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div class="py-1">
                                    <MenuItem v-slot="{ active }">
                                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']" @click='sortExpiryEarliestToLatest()'>Expiring Earliest to Latest</a>
                                    </MenuItem>

                                    <MenuItem v-slot="{ active }">
                                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']" @click='sortExpiryLatestToEarliest()'>Expiring Latest to Earliest</a>
                                    </MenuItem>
                                </div>
                            </MenuItems>

                        </transition>

                    </Menu>

                </div>

            </div>

        </div>
    
        <div class=" xl:m-auto  mt-3 rounded-md flex flex-2 xl:h-12 h-8">
            <a href="/Upload" class=" xl:text-lg text-md border bg-green-600 border-green-500 text-white hover:bg-green-800 rounded-full px-6 xl:py-2 py-1">
                Add an item +
            </a>      
        </div>
        
    </div>

    <div v-if='filterInventory.length!=0' class='grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-y-5 gap-x-8 '>
        <div v-for="item of filterInventory">
            <InventoryCard :item="item"/>
        </div>
    </div>

    <div v-else class='justify-center flex flex-row xl:ml-10 xl:mt-16 ml-4 mt-16'>
        <img class='xl:w-14 xl:h-14 w-10 h-10' src="https://img.icons8.com/color/48/000000/sad--v1.png"/>
        <h1 class='font-semibold xl:text-3xl text-md px-6 xl:py-2'>
            No ingredients here. Add an item.
        </h1>
    </div>

</div>

</template>

<script>
import InventoryCard from "@/components/InventoryCard"
import NavBar from "@/components/NavBar.vue" 
import fruitvege from '../assets/fruitvege.png'
import wheat from '../assets/wheat.png'
import dairy from '../assets/dairy.png'
import meatseafood from '../assets/meatseafood.png'
import frozen from '../assets/frozen.png'
import cupboard from '../assets/cupboard.png'
import sort from '../assets/sort.png'
import filter from '../assets/filter.png'
import all from '../assets/all.png'
import axios from "axios"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import SortIcon from '../assets/sort.png'

export default {
    name: 'Inventory',
    components: {
        InventoryCard,
        NavBar,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
    },
    data(){
        return{
            all:all,
            fruitvege: fruitvege,
            ricenoodle:wheat,
            dairy:dairy,
            meatseafood:meatseafood,
            frozen:frozen,
            cupboard:cupboard,
            sort:sort,
            filter:filter,
            category:'',
            inventory: [],
            searchItem:'',
            filterCat: '',
            showCat:false,
            resultCategory:[],
            SortIcon:SortIcon,
            EarliestToLatest:false,
            LatestToEarliest:false
        }
    },

    created: function() {
        this.getAllItems()
    },

    methods: {

        getAllItems() {
            axios.post('/api/read')
            .then(res => {
                this.filterCat = ''
                this.inventory = res.data.inventory
            })
            .catch(err => {
                // shouldnt have any error
                console.log(err.message);
            })
        },

        filterCategory(id) {
            this.filterCat = id
        },

        sortExpiryEarliestToLatest() {
            this.EarliestToLatest = true
            this.LatestToEarliest = false
        },

        sortExpiryLatestToEarliest() {
            this.LatestToEarliest = true
        }

    },

    computed:{

        filterInventory() {
            let result = this.inventory.filter(item => item.name.toLowerCase().includes(this.searchItem.toLowerCase()))

            if (this.LatestToEarliest) {

                if (this.filterCat.length!=0) {
                    result = result.filter(item => {return item.category == this.filterCat})
                }

                return result.sort(function(a,b) {
                    var a = new Date(a.date)     
                    var b = new Date(b.date)
                    return b-a
                })
            }
            
            if (this.filterCat.length != 0) {
                result = result.filter(item => {return item.category == this.filterCat})
            }

            return result.sort(function(a, b) {
                var a = new Date(a.date)
                var b = new Date(b.date)
                return a-b
            })
        }
    }
}

</script>