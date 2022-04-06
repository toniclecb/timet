<!-- A simple project (coded in Vue.js) to manage your time! by Cleiton Balansin - TonicleCB - https://github.com/toniclecb -->
<template>
  <div>
    <div>
      <div class="container">
        <div class="row pb10">
          <input class="four columns" v-model="number" type="text" placeholder="Issue number" />
          <input class="six columns" v-model="desc" type="text" placeholder="Description" />
          <button class="button-primary two columns" v-on:click="add">Add</button>
          {{validationMessage}}
        </div>

        <div v-if="!lista.length">
          <legend>Click in add to insert a new task!</legend>
        </div>

        <div v-for="i in lista" :key="i.number">

          <Item :element="i" :getSelectedItemParent="getSelectedItem" :selectItemParent="selectItem" :removeItemParent="removeItem"/>

        </div>
      </div>
      <div style="padding-bottom: 8px">
        <!-- <input v-model="datatime" type="text" placeholder="This will show the start time" disabled /> -->
        <p style="display: inline; color: #AAAAAA; margin-right: 2px;">{{datatime | timeString}}</p>
        <button class="w96" v-on:click="startStop">{{startStopText}}</button>
        <button class="button-danger w96" v-on:click="discard">Discard</button>
        {{validationStopMessage}}
      </div>
      <div class="container">
        <div class="row pb10">
          <div class="two columns">
            <button class="w132 pad0" v-on:click="exportCSVRedMine">CSV - RedMine</button>
            <button class="w132 pad0" v-on:click="exportCSVExcel">CSV - Excel</button>
            <button class="w132 pad0" v-on:click="clearAll">Clear All</button>
            <button class="w132 pad0" v-on:click="clearTimes">Clear Times</button>
          </div>
          <div class="ten columns stylecontainer1">
            <textarea class="h100" v-model="exported"></textarea>
          </div>
        </div>
      </div>        
    </div>

    <Modalzin ref="uniqmodal" :cbQuestion="callbackQuestion">
    </Modalzin>

  </div>    
</template>
<script>

/** Transform miliseconds in a double in redmine format. 0.25 = 15 minutes */
function getRedMineTime(miliSeconds) {
    let seconds = miliSeconds / 1000.0;
    let min = seconds / 60.0;
    let redmine = min / 60.0;
    return redmine.toFixed(2);
}

/** Transform miliseconds in a double in google docs sheets format. 2.75 = 66 hours */
function getGoogleDocs(miliSeconds) {
    let days = miliSeconds / 86400000.0;
    return days.toFixed(2);
}

import Item from './Item.vue';
import Modalzin from './Modalzin.vue';

export default {
    name: 'TimeT', // https://vuejs.org/v2/api/#name - Allow the component to recursively invoke itself in its template....Named components result in more helpful warning messages.
    components: {
      Item, Modalzin
    },
    data() {
        return {
            selectedItem: null,
            lista: [],
            datatime: null,
            startStopText: "Start",
            number: "",
            desc: "",
            validationMessage: "",
            validationStopMessage: "",
            exported: null
        }
    },
    mounted() {
      // console.log('this.$refs.uniqmodal', this.$refs.uniqmodal);

      if (localStorage.itens){
        this.lista = JSON.parse(localStorage.itens);
      }
    },
    // watch: {
    //   lista (newValid){
    //     console.log("AA");
    //     localStorage.itens = newValid;
    //   }
    // },
    filters: {
      timeString: function (value) {
        if (value){
          var dd = new Date(value);
          return dd.toLocaleDateString() + ' ' + dd.toLocaleTimeString();
        } else {
          return "This will show the start time";
        }
      }
    },
    methods: {
      updateListaStorage: function(){
        localStorage.itens = JSON.stringify(this.lista);
      },
      getSelectedItem: function(){
          return this.selectedItem;
      },
      selectItem: function (item) {
        if (item == this.selectedItem) {
          return;
        }
        this.selectedItem = item;
      },
      removeItem: function (item) {
        // returns in callbackQuestion
        this.$refs.uniqmodal.show(item, 'Are you sure you want to remove it?');
      },
      callbackQuestion: function(item, response){
        if (response && item){
          if (item === 'clearAll'){
            this.clearAllcb();
          } else if (item === 'clearTimes'){
            this.clearTimescb();
          } else { // removeItem()
            for( var i = 0; i < this.lista.length; i++){ 
              if ( this.lista[i] === item) { 
                this.lista.splice(i, 1); 
              }
            }
            this.updateListaStorage();
          }
        }
      },
      validateIssueNumber: function (issueNumber) {
        var i;
        for (i = 0; i < this.lista.length; i++) {
          if (this.lista[i].number == issueNumber) {
            return false;
          }
        }

        return true;
      },
      add: function () {
        if (this.number.length == 0) {
          this.validationMessage = "Please, fill the issue number!";
        } else if (!this.validateIssueNumber(this.number)) {
          this.validationMessage =
            "Attention, Issue number already present!";
        } else {
          let issue = {};
          issue.number = this.number;
          issue.desc = this.desc;
          issue.miliSeconds = 0;
          this.lista.push(issue);
          this.validationMessage = "";
          this.desc = "";
          this.number = "";

          this.updateListaStorage();
        }
      },
      discard: function () {
        this.validationStopMessage = "";
        this.datatime = null;
        this.startStopText = "Start";
      },
      startStop: function () {
        this.validationStopMessage = "";
        if (this.datatime) {
          if (!this.selectedItem) {
            this.validationStopMessage = "Please, select one item!";
            return;
          }
          // stop
          let olddatatime = new Date(this.datatime);
          let newdatatime = new Date();
          var dif = newdatatime.getTime() - olddatatime.getTime();

          this.selectedItem.miliSeconds += dif;
          this.datatime = null;
          this.startStopText = "Start";

          this.updateListaStorage();
        } else {
          // start
          this.datatime = new Date().toISOString();
          this.startStopText = "Stop";
        }
      },
      clearAll: function(){
        this.$refs.uniqmodal.show('clearAll', 'Are you sure you want to remove all?');
      },
      clearAllcb: function(){
        this.exported = "";
        this.lista = [];
        this.updateListaStorage();
      },
      clearTimes: function(){
        this.$refs.uniqmodal.show('clearTimes', 'Are you sure you want to remove times?');
      },
      clearTimescb: function(){
        this.lista.forEach(element => {
          element.miliSeconds = 0;
        });
        this.updateListaStorage();
      },
      exportCSVRedMine: function () {
        this.exported = "Issue;Description;Time (RedMine);\n";
        this.lista.forEach((element) => {
          this.exported += element.number + ";";
          this.exported += element.desc + ";";
          this.exported += getRedMineTime(element.miliSeconds) + ";\n";
        });
      },
      exportCSVExcel: function () {
        this.exported = "Issue;Description;Time (Google Docs);\n";
        this.lista.forEach((element) => {
          this.exported += element.number + ";";
          this.exported += element.desc + ";";
          this.exported += getGoogleDocs(element.miliSeconds) + ";\n";
        });
      }
    },
}
</script>
<style>
    
</style>