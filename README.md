# vue-data-tree
Vue Data Tree

<p align="center"><img src="https://raw.githubusercontent.com/owen-it/vue-data-tree/master/vue-data-tree.gif" title="vue data tree"/></p>

## Install

`npm install vue-data-tree --save`

## Usage

```js
import Vue from 'vue'
import VueDataTree from 'vue-data-tree'

new Vue({
  el: '#app',
  // ...
  data(){
    return {
      target: {msg: 'Hello Vuejs!'}
    }
  },
  components: { VueDataTree }
})
```

```html
<div id="app">
  <vue-data-tree :value="target"></vue-data-tree>
</div>
```

## LICENSE

The MIT License
