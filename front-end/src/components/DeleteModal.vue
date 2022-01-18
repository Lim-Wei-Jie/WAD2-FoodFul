<template>
<!-- eslint-disable -->

<transition name='model-animation'>

    <div v-show='modalActive' class=" modal fixed inset-0 z-10 overflow-y-auto text-center bg-gray-100 bg-opacity-30">

        <div class='min-h-screen px-4 text-center relative mx-auto'>

            <transition name='modal-animation-inner' class='modal-inner'>

                <div v-show='modalActive' class='modal-inner min-h-screen px-4'>

                    <div class='fixed xl:inset-y-96 xl:inset-x-80 lg:inset-y-96 lg:inset-x-64  inset-x-14 inset-y-72 bg-white rounded shadow-2xl flex flex-col h-1/3 w-2/3 xl:h-1/3 xl:w-1/2 lg:h-1/4 lg:w-1/2 md:h-3/4 md:w-1/2'>
                        <!-- Modal content -->
                        <span class='pt-5 mx-auto'>
                            <img class="xl:h-32 xl:w-32 lg:w-32 lg:h-32 h-20 w-20" :src="warning" alt="warning" >
                        </span>

                        <div class="modal-content px-5 pt-5">
                            <h1 class='xl:text-3xl lg:text-3xl text-lg font-black'>
                            Are you sure you want to delete?
                            </h1>
                        </div>

                        <div class='pt-4 xl:pt-10 lg:pt-8 flex justify-evenly'>
                            <button @click='close' type='button' class='inline-flex text-sm xl:text-xl lg:text-xl xl:p-3 lg:p-3 text-white font-bold bg-gray-600 p-2 rounded-lg hover:bg-red-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Cancel</button>
                            <button @click="handleDelete(), reloadPage()" type='button' class='inline-flex text-sm xl:text-xl lg:text-xl xl:p-3 lg:p-3 text-white font-bold bg-red-500 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>Delete</button>
                        </div>
                    </div>

                </div>

            </transition>

        </div>

    </div>

</transition>

</template>

<script>
import warning from '../assets/warning.png'
import axios from "axios"

export default {
    name: 'DeleteModal',
    props:['modalActive', 'toDelete'],
    data() {
        return {
            warning: warning,
        }
    },

    methods: {
        
        handleDelete() {

            axios.post("/api/delete", this.toDelete)
            .then(res => {
                // success
                console.log(res.data);
            })
            .catch(err => {
                // error - there should not be any error
                console.log(err.message)
            })

        },

        reloadPage() {
            window.location.reload();
        }

    },

    setup(props,{emit}){
        const close = ()=>{
            emit('close')
        }

        return {close}
    }
}
</script>

