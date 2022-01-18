<template>
<!-- eslint-disable -->

<NavBar/>

<div class="flex flex-col justify-center items-center">

    <h1 class="mt-12 text-center font-extrabold text-4xl sm:text-5xl md:text-6xl">
        Add new item to Inventory
    </h1>

    <div class="w-full md:w-3/4 mx-12 mt-12 mb-12 p-12 sm:p-12 lg:p-16 bg-green-50 rounded-lg shadow-lg" style="min-height:30rem;">
        
        <form @submit="handleSubmitForm" method="post">
            
            <div class="flex flex-wrap -mx-3 mb-6">

                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                    <div class="block uppercase tracking-wide text-gray-700 font-bold mb-5 text-left" for="grid-first-name">
                        Item Name
                    </div>

                    <input class="appearance-none bg-transparent w-full border-b border-gray-700 text-lg py-2 focus:outline-none focus:border-green-500" id="grid-first-name" type='text' autocomplete="off" @input="find_ingredient" v-model="uploadForm.name" @focus='modalIG=true' required>
                    <div v-if='filteredIngredients.length>0 && modalIG' class='overflow-scroll h-32 rounded-xl drop-shadow-md'>
                        <ul class='rounded-lg'>
                            <li class='item-start cursor-pointer bg-white border-b border-gray-100' v-for='filteredIngredient in filteredIngredients' @click='setIngredient(filteredIngredient)'>
                                {{filteredIngredient[0]}}
                            </li>
                        </ul>
                    </div>

                </div>
                
                <div class="w-full md:w-1/2 px-3">

                    <div class="block uppercase tracking-wide text-gray-700 font-bold mb-5 text-left" for="grid-first-name">
                        Food Category
                    </div>

                    <div class="relative">

                        <select v-model="uploadForm.category" class="block appearance-none bg-transparent w-full border-b border-gray-700 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:border-green-500" id="grid-state" required>
                            <option v-for="category in categories">
                                {{category}}
                            </option>
                        </select>

                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>

                    </div>

                </div>

            </div>

            <div class="flex flex-wrap -mx-3 mb-6 mt-8">

                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                    <div class="block uppercase tracking-wide text-gray-700 font-bold mb-5 text-left" for="grid-first-name">
                        Original Quantity
                    </div>

                    <input class="appearance-none bg-transparent w-full text-lg py-2 border-b border-gray-700 focus:outline-none focus:border-green-500" id="grid-first-name" type="text" v-model="uploadForm.quantityOriginal" required>
                    <p v-show='isFloatOrInt(uploadForm.quantityOriginal)' class='text-red-500 text-left mt-2 italic'>Please input a numeric value.</p>

                </div>

                <div class="w-full md:w-1/2 px-3">

                    <div class="block uppercase tracking-wide text-gray-700 font-bold mb-5 text-left" for="grid-first-name">
                        Metrics
                    </div>

                    <div class="relative">

                        <select class="appearance-none bg-transparent w-full border-b border-gray-700 text-lg py-2 focus:outline-none focus:border-green-500" id="grid-first-name" type='text' autocomplete="off"  v-model="uploadForm.unit" required>
                            <option v-for='(value,key) in unitList'>
                                {{key}}
                            </option>
                        </select>
                    
                    </div>

                </div>

            </div>

            <div class="flex flex-wrap -mx-3 mb-6 mt-8">

                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                     <div class="block uppercase tracking-wide text-gray-700 font-bold mb-5 text-left" for="grid-first-name">
                        Quantity Left
                    </div>
                    <input v-model='uploadForm.quantityLeft' type="text" class="appearance-none bg-transparent w-full text-lg py-2 border-b border-gray-700 focus:outline-none focus:border-green-500" focus:outline-none focus:border-green-500/>

                    <p v-show='isFloatOrInt(uploadForm.quantityLeft)' class='text-red-500 text-left mt-2 italic'>Please input a numeric value.</p>
                </div>

                <div class="w-full md:w-1/2 px-3">
                    <div class="block uppercase tracking-wide text-gray-700 font-bold mb-5 text-left" for="grid-first-name">
                        Expiry Date
                    </div>
                    <div class="relative">
                        
                        <DatePicker v-model='uploadForm.date' color='green' class='w-full' :timezone='timezone'>
                            <template v-slot="{inputValue,togglePopover}">
                                <div class='flex'>
                                    <input @click='togglePopover()' :value='inputValue' type="text" class="appearance-none bg-transparent w-full text-lg py-2 border-b border-gray-700 focus:outline-none focus:border-green-500">

                                    <div @click='togglePopover()' class='ring-green-200 cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-7 h-7 fill-current">
                                            <path d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </template>
                        </DatePicker> 

                    </div>
                </div>
            </div>


            <div class= "flex flex-wrap -mx-3 mb-2 mt-24 justify-center items-center">
                <button class=" text-xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border rounded" type="submit">Submit</button>
            </div>
        </form>

    </div>

</div>

</template>

<script>

import axios from "axios"
import router from "../router"
import NavBar from "@/components/NavBar.vue"
import top_1K_ingredients from "../assets/top-1k-ingredients"
import units from "../assets/units.json"
import categories from "../assets/category.json"
import {Calendar,DatePicker} from 'v-calendar'

export default {
    name: 'Upload',
    components:{
        NavBar,
        Calendar,
        DatePicker,
    },
    data() {
        return {
            uploadForm: {
                id:"",
                name: "",
                category: "",
                quantityOriginal:"",
                unit:"",
                quantityLeft:"",
                date: new Date()
            },
            categories : [
                "Fruits & Vegetables",
                "Rice & Noodles",
                "Dairy, Chilled & Eggs",
                "Meat & Seafood",
                "Frozen Food",
                "Food Cupboard"
            ],
            // errors:[],
            filteredIngredients:[],
            modalIG: false,
            modalU: false,
            ingredientList:top_1K_ingredients,
            unitList:units,
            categoryList:categories,
            timezone:['Asia/Singapore'],
        
        }
    },
    computed:{


    },
    
    
    methods: {

        find_ingredient(){
            let input = this.uploadForm.name
            this.filteredIngredients=this.ingredientList.filter(ingredient=>{
                return ingredient[0].toLowerCase().startsWith(input.toLowerCase())
            })
        },

        setIngredient(ingredient){
            //capitalize ingredient
            let name = ingredient[0]
            name = name[0].toUpperCase() + name.substr(1)

            this.uploadForm.name = name
            this.uploadForm.id = ingredient[1]
            this.modalIG = false

            this.find_unit_category()
        },

        find_unit_category(){
            let categoryList = this.categoryList
            let unitList = this.unitList
            let id = this.uploadForm.id
            let url='https://api.spoonacular.com/food/ingredients/'+id+'/information?apiKey=ff3f9ec483104881b8b110fe4689f0e9'

            axios.get(url)
            .then(response => {
                let units = response.data.possibleUnits
                let aisle = response.data.aisle.split(';')

                //auto complete category
                for(var[key,value] of Object.entries(categoryList)){
                    
                    //if aisle category in categoryList object 
                    if(value.includes(aisle[0])){

                        this.uploadForm.category=key
                    }
                    
                }

                //auto complete unit
                for(var[key,value] of Object.entries(unitList)){
                    
                    if(units.includes(value[0])){
                        this.uploadForm.unit=key
                    }
                }
            })
            .catch(error => {
                console.log(error.message)
            })
        },

        isFloatOrInt(n){
            var number= parseFloat(n)
            if(typeof number == 'number' && !isNaN(number)){
                return false  
            } else {
                return true
            }
        },

        handleSubmitForm: function(e) {

            let submitForm={
                id:this.uploadForm.id,
                name: this.uploadForm.name,
                category: this.uploadForm.category,
                quantityOriginal:parseFloat(this.uploadForm.quantityOriginal),
                unit:this.uploadForm.unit,
                quantityLeft: parseFloat(this.uploadForm.quantityLeft),
                date: this.uploadForm.date
            }
            
            e.preventDefault()

            const config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            axios.post("/api/upload", submitForm, config)
            .then(res => {
                // success
                console.log(res);
                router.push('/inventory')
            })
            .catch(err => {
                // error - there should not be any error
                console.log(err)
            })
        }
    }
}

</script>