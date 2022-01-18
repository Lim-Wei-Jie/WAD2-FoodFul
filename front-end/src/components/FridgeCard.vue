<template>
<!-- eslint-disable -->

<div class="max-w-sm rounded overflow-hidden shadow-lg">

    <div class="container mt-10" >
        <img class="w-full object-scale-down h-52 mt-1.5" :src="getCategoryImg"/>
    </div>

    <div class="p-5 mt-10 mx-auto">
        <div class="font-bold text-xl mb-2 text-left text-green-600">
            {{item.name}}
        </div>
        <div v-if="daysLeft > 1" class="font-bold text-xl mb-2 text-left text-red-500">
            Expiring in {{daysLeft}} days
        </div>
        <div v-else-if='daysLeft==1' class="font-bold text-xl mb-2 text-left text-red-500">
            Expiring in {{daysLeft}} day
        </div>
        <div v-else-if='daysLeft<=0' class="font-bold text-xl mb-2 text-left text-red-500">
            Expired on {{formatExpiry}}
        </div>
    </div>

</div>

</template>

<script>
import fruitvege from '../assets/fruitvege.png'
import wheat from '../assets/wheat.png'
import dairy from '../assets/dairy.png'
import meatseafood from '../assets/meatseafood.png'
import frozen from '../assets/frozen.png'
import cupboard from '../assets/cupboard.png'

export default {
    name: "FridgeCard",
    props: ["item"],
    data() {
        return {
            category_image: {
                'Fruits & Vegetables': fruitvege,
                'Rice & Noodles': wheat,
                'Dairy, Chilled & Eggs': dairy,
                'Meat & Seafood': meatseafood,
                'Frozen Food': frozen,
                'Food Cupboard': cupboard,
            },
        }
    },

    computed: {

        getCategoryImg() {
            let curCategory = this.item.category
            return (this.category_image)[curCategory]
        },

        daysLeft() {
            let date_today = new Date
            let date_expiry = new Date((this.item).date)
            return this.getDaysLeft(date_today, date_expiry)
        },
        formatExpiry() {
            let date_expiry = new Date(this.item.date)
            let expiryDate = date_expiry.getFullYear() + '/' + (date_expiry.getMonth()+1) + '/' + date_expiry.getDate()
            return expiryDate
        }
    },

    methods: {

        getDaysLeft(date_today, date_expiry) {
            // days remaining
            let diff_time = date_expiry.getTime() - date_today.getTime()
            return Math.round(diff_time/(1000 * 3600 * 24))
        },
    },
};

</script>