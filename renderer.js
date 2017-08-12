// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {clipboard} = require('electron')

const pkg = require(__dirname + '/package.json')
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

class MyEmitter extends EventEmitter {}
const ee = new MyEmitter();




/* * *
  BODY DROP INIT
* * */

document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault();
}
document.body.ondrop = (ev) => {
  ev.preventDefault()
  const file = ev.dataTransfer.files[0].path;
  ee.emit('document-drop', {file})
}

ee.on('background-color', (data) => {
  $("body").css({background: data.color})
});

ee.on('foreground-color', (data) => {
  $("body").css({color: data.color})
});



/* * *
  VUE COMPONENT EXAMPLE
* * */

var appTitle = new Vue({
  el: '#app-title',
  data: pkg
});

var colors = new Vue({
  el: '#colors',
  data: {
    colors: [
      {primary: '#E8B691', secondary:'#462B15', text:'#F9EBEC'},
      {primary: '#B7B7CF', secondary:'#E2402A', text:'#CFDDE8'},
      {primary: '#FCB180', secondary:'#FF4216', text:'#6D1E00'},
      {primary: '#99C4BB', secondary:'#666A59', text:'#F4EAB2'},
      {primary: '#CA972C', secondary:'#B16B1B', text:'#552605'},
      {primary: '#BAD2BC', secondary:'#CE4E98', text:'#5F0626'},
      {primary: '#838A6F', secondary:'#854521', text:'#CFBFA1'},
      {primary: '#98825C', secondary:'#541512', text:'#D5BBBB'},
      {primary: '#D84B42', secondary:'#192636', text:'#E7D5D1'},
    ]
  },

  methods: {
    flip: function (color) {
      const tmp = color.primary;
      color.primary = color.secondary;
      color.secondary = tmp;
    },
    copy: function (color) {
      clipboard.writeText([color.primary,color.secondary,color.text].join(" "))

    }
  }
})




/* * *
  JQUERY EXAMPLE
* * */

$(function(){
  $('title').text(pkg.name);
});




/* * *
  INTERNAL API EXAMPLE
* * */

ee.on('document-drop', (data) => {
  alert('Dropped ' + data.file);
});




/* * *
  INTERNAL API EXAMPLE
* * */

$(function(){

  $('title').text(pkg.productName)
  $( "#emitter-example-form" ).submit(function( event ) {
    const eventName = $( "#event-name-select" ).val();
    const color = $( "#example-color-input" ).val();
    console.log((eventName, {color}))
    ee.emit(eventName, {color})
    event.preventDefault();
  });


});
