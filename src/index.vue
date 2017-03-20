<template>
    <div class="vue-data-tree">
        <data-tree :field="value" v-for="value in normalizedValue" :key="value.key"></data-tree>
    </div>
</template>

<script>
    import DataTree from './data-tree.vue'

    export default {
        name: 'VueDataTree',
        props: {
            value: Object
        },
        computed: {
            normalizedValue(){
                let value = this.value
                if (Array.isArray(value)) {
                    value = value.map((item, i) => ({
                        key: i,
                        value: item
                    }))
                } else if (typeof value === 'object') {
                    value = Object.keys(value).map(key => ({
                        key,
                        value: value[key]
                    }))
                    value = value.slice().sort((a, b) => a.key > b.key)
                }
                return value 
            }
        },
        components: { DataTree }
    }
</script>

<style scoped>
    .vue-data-tree {
        padding: 10px;
    }
</style>