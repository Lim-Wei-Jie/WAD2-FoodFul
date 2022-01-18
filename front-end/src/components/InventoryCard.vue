<template>
<!-- eslint-disable -->

<div class="InventoryCard xl:mt-5 mt-5 w-full">

    <div class=" bg-white shadow-lg rounded-lg w-full">

        <div class="bg-white rounded-xl shadow-lg">

            <header class='pt-3 text-left mb-5'>
                <a class=" bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 pl-4 rounded inline-flex items-center">
                    <img @click="editItem()" class="xl:h-5 xl:w-5 h-4 w-4 cursor-pointer" :src="edit" alt="Edit" >
                </a>

                <button @click="toggleModal" class=" bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 pl-3 rounded inline-flex items-center">
                    <img class="xl:h-5 xl:w-5 h-4 w-4" :src="bin" alt="Delete" >
                </button>
            </header>
            
            <div class='grid grid-rows-2 grid-flow-col gap-2 rounded-t-lg pb-3 ml-10'>

                <div class='row-span-1 text-left'>
                    <span v-show='getDaysLeft<=0' class="xl:text-3xl text-2xl font-bold text-red-600"> 
                        {{item.name[0].toUpperCase()+ item.name.substr(1)}} 
                    </span>

                    <span v-show='getDaysLeft>0' class=" xl:text-3xl text-2xl font-bold text-green-600"> 
                        {{item.name[0].toUpperCase()+ item.name.substr(1)}} 
                    </span>
                </div>

                <div class='row-span-1 text-left'>
                    <div v-show='getDaysLeft>0' class=' text-md xl:text-xl text-red-500' >
                        Expiring in 
                        {{getDaysLeft}} 
                        <span v-show='getDaysLeft>1'>days</span>
                        <span v-show='getDaysLeft<=1'>day</span>
                    </div>

                    <div v-show='getDaysLeft<=0' class='text-md xl:text-xl text-red-500' >
                        Expired on
                        {{formatExpiry}} 
                    </div>
                </div>

                <div class='row-span-2 w-3/4 items-end'>
                    <span>
                        <img class="xl:h-20 xl:w-20 h-16 w-16" :src="getImage" :alt="getImage">
                    </span>
                </div>

            </div>
            
            <footer class="px-10 text-center rounded-b-lg">
                <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                    <div class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500" v-bind:style="{width: getPercentage + '%'}" >
                    </div>
                </div>

                <span class=" pb-3 xl:text-xl text-md font-semibold inline-block text-green-600">
                    {{getPercentage}}% left
                </span>
            </footer>

        </div>

    </div>
    
</div>

<DeleteModal :modalActive="modalActive" :toDelete='toDelete' @close='toggleModal'/>

</template>

<script>
import filter from '../assets/filter.png'
import edit from '../assets/edit.png'
import bin from '../assets/bin.png'
import fruitvege from '../assets/fruitvege.png'
import wheat from '../assets/wheat.png'
import dairy from '../assets/dairy.png'
import meatseafood from '../assets/meatseafood.png'
import frozen from '../assets/frozen.png'
import cupboard from '../assets/cupboard.png'
import router from '../router'
import DeleteModal from "@/components/DeleteModal"
import {ref} from 'vue'

export default {
    name: "InventoryCard",
    props: ["item"],
    components:{DeleteModal},
    setup() {
        const modalActive=ref(false)

        const toggleModal=()=>{
            modalActive.value=!modalActive.value
        }

        return {modalActive, toggleModal}
    },
    data() {
        return {
            filter: filter,
            edit: edit,
            bin: bin,
            category_image: {
                'Fruits & Vegetables': fruitvege,
                'Rice & Noodles': wheat,
                'Dairy, Chilled & Eggs': dairy,
                'Meat & Seafood': meatseafood,
                'Frozen Food': frozen,
                'Food Cupboard': cupboard,
            },
            toEdit: this.item,
            toDelete: Number(this.item.id)
        }
    },

    methods: {

        editItem() {
            router.push({
                name: 'Edit',
                params: {
                    curId: Number(this.toEdit.id),
                    curName: this.toEdit.name,
                    curCategory: this.toEdit.category,
                    curQuantityOriginal: Number(this.toEdit.quantityOriginal),
                    curUnit: this.toEdit.unit,
                    curQuantityLeft: Number(this.toEdit.quantityLeft),
                    curDate: this.toEdit.date
                }
            })
        }
    },

    computed: {

        getImage() {
            return this.category_image[this.item.category]
        },

        formatExpiry() {
            let date_expiry = new Date(this.item.date)
            let expiryDate = date_expiry.getFullYear() + '/' + (date_expiry.getMonth()+1) + '/' + date_expiry.getDate()
            return expiryDate
        },

        getDaysLeft() {
            // current date
            let date_today = new Date()
    
            // expiry date
            let date_expiry = new Date(this.item.date)
            
            // days remaining
            let diff_time=date_expiry.getTime()-date_today.getTime()
            let diff_days=Math.round(diff_time/(1000 * 3600 * 24))

            return diff_days
        },

        getPercentage(){
            return Math.round((this.item.quantityLeft/this.item.quantityOriginal)*100)
        },
    }
}

</script>
