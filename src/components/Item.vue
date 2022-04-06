<template>
    <div id="item" class="pb2">
        <div class="row centering">
          <div class="one columns">
            <!-- Look a char instead of checkbox! :P -->
            <label v-on:click="selectItem(element)" v-if="element == getSelectedItem()">&#9745;</label>
            <label v-on:click="selectItem(element)" v-else>&#9744;</label>
          </div>
          <div class="one columns">{{element.number}}</div>
          <div class="six columns">{{element.desc}}</div>
          <div class="one columns">{{element.miliSeconds | exactTime}}</div>
          <div class="three columns textalignright">
            <button class="w96" v-on:click="selectItem(element)" v-show="element != getSelectedItem()">Select</button>
            <button class="button-danger w32" v-on:click="removeItem(element)" v-show="element != getSelectedItem()">[X]</button>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Item",
        props: [
            'element','getSelectedItemParent','selectItemParent','removeItemParent'
        ],
        filters: {
            /** receive an int and return a string in format HH:mm:ss.mmm */
            exactTime: function (duration) { // value
                // duration = duration * 1000;
                console.log("value",duration);
                var milliseconds = parseInt((duration % 1000) / 100),
                seconds = Math.floor((duration / 1000) % 60),
                minutes = Math.floor((duration / (1000 * 60)) % 60),
                hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

                hours = (hours < 10) ? "0" + hours : hours;
                minutes = (minutes < 10) ? "0" + minutes : minutes;
                seconds = (seconds < 10) ? "0" + seconds : seconds;

                return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
                
                // return ""+value+"HH";
            }
        },
        methods: {
            selectItem: function (i) {
                this.selectItemParent(i);
            },
            removeItem: function (i) {
                this.removeItemParent(i);
            },
            getSelectedItem: function(){
                return this.getSelectedItemParent();
            }
        }
    }
</script>