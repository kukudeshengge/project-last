import Vue from 'vue';

let files = require.context('./', true, /\.vue$/);

files.keys().forEach(val => {
    let Com = files(val).default;
    Vue.component(Com.name, Com);
});
