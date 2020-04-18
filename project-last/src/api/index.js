import Vue from 'vue';

let files = require.context('./', false, /\.js$/);
let api = files.keys().filter(val => !val.includes('index')).reduce((prev, item) => {
    prev = {
        ...prev,
        ...files(item).default
    }
    return prev;
},{})

Vue.prototype.request = api;