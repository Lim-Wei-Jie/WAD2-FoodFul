<template>
<!-- eslint-disable -->

<div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

    <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">

        <!-- show all video suggestions -->
        <a v-for="item in items" :key="item.id" class="group shadow-lg rounded cursor-pointer" @click="showModal = true; setCurrentItem(item);" data-toggle="modal" data-target="#exampleModal">
            <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img :src="item.thumbnail" :alt="item.thumbnail" class="w-full h-full object-center object-cover group-hover:opacity-75">
            </div>

            <h3 class="px-6 py-4 font-medium text-xl mb-2">
                {{ item.title }}
            </h3>
        </a>

        <div v-if="showModal" class="fixed inset-0 z-10 overflow-y-auto" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

            <div class="xl:min-h-screen px-4 text-center">

                <div class="relative">

                    <div class="mt-24 xl:fixed inset-28 bg-white rounded shadow-2xl flex flex-col">
                        <span class="font-bold text-center text-xl mt-12">
                            {{ currentItem.title }} 
                        </span>

                        <div class="flex justify-end">
                            <button class="w-8 h-8 mr-12" @click="showModal = false">
                                <img :src="closebutton">
                            </button>
                        </div>
                        
                        <div class="mt-2 xl:mt-20">
                            <!-- VIDEO GOES HERE :D -->
                            <iframe width="525" height="300" :src="`https://www.youtube.com/embed/${currentItem.embed}`" title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="mx-auto w-11/12 h-11/12 mb-24 mt-8">
                            </iframe>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

</template>

<script>
import axios from 'axios'
import closebutton from '../assets/closebutton.png'

export default{
    data() {
        return{
            closebutton:closebutton,
            showModal: false,
            info:[],
            items: [],
            currentItem: {},
        };
    },

    created: function() {
        this.youtube_api()
    },
    
    methods: {

        setCurrentItem(item) {
            this.currentItem = item
        },

        youtube_api() {
            let apikey = 'AIzaSyAfcHJQqnkgqIS5hhLYDcnPQvz1ZdzL91Q'
            let search_terms = ['cool fun recipes', 'trending recipe videos', 'trending food recipes', 'fun quick recipe', 'recipe for fun', 'what to cook fun']
            let random_number = Math.floor(Math.random()*(search_terms.length)+0)
            let search_term = encodeURI(search_terms[random_number])
            let api_endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&q=${search_term}&key=${apikey}`

            axios.get(api_endpoint)
            .then(response => {
                for (var info of response.data.items) {

                    if (info.id.kind == "youtube#video"){
                    
                        let vid_title = info.snippet.title
                        let vid_thumbnail = info.snippet.thumbnails.default.url
                        let vid_id = info.id.videoId
                        let new_video = { title: vid_title, thumbnail: vid_thumbnail, embed: vid_id }

                        if (!vid_title.includes("&")) {
                            this.items.push(new_video)
                        }
                    }
                }
            })
            .catch(error => {
                console.log( error.message )
            })
        },
    }
}

</script>
