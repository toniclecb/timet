<template>
    <div class="modal " v-bind:class="{ 'modal-open': isActive }">
        <div class="modal-inner">
            <div class="modal-content">
                <div class="modal-content-inner">
                    <h4>Are you sure?</h4>
                    <p>{{message}}</p>  
                </div>
                <hr class="modal-buttons-seperator">
                <div class="modal-buttons">
                    <button v-on:click="negative()" class="button close-modal">No!</button>
                    <button v-on:click="positive()" class="button button-primary close-modal">Yes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
        name: "Modalzin",
        props: [
            'cbQuestion'
        ],
        data(){
            return {
                message: 'Are you sure you want to remove it?',
                isActive: false,
                item: null
            }
        },
        methods: {
            // var modal = document.querySelector('.modal');
            // modal.classList.toggle('modal-open');
            show: function (item, msg){
                if (msg){
                    this.message = msg;
                }
                this.isActive = !this.isActive;
                this.item = item;
            },
            positive: function (){
                this.isActive = false;
                this.cbQuestion(this.item, true);
            },
            negative: function (){
                this.isActive = false;
                this.cbQuestion(this.item, false);
            }
        }
}
</script>

