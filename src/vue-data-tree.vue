<template>
  <div class="vue-data-tree">
    <div class="self"
      @click="toggle"
      :style="{ marginLeft: depth * 14 + 'px' }">
      <span
        class="arrow right"
        :class="{ rotated: expanded }"
        v-show="isExpandableType">
      </span>
      <span class="key">{{ field.key }}</span>
      <span class="colon">:<div class="meta" v-if="field.meta">
        <div class="meta-field" v-for="(val, key) in field.meta">
          <span class="key">{{ key }}</span>
          <span class="value">{{ val }}</span>
        </div>
      </div></span>
      <span class="value" :class="valueType">{{ formattedValue }}</span>
    </div>
    <div class="children" v-if="expanded && isExpandableType">
      <vue-data-tree
        v-for="subField in limitedSubFields"
        :key="subField.key"
        :field="subField"
        :depth="depth + 1">
      </vue-data-tree>
      <span class="more"
        v-if="formattedSubFields.length > limit"
        @click="limit += 10"
        :style="{ marginLeft: (depth + 1) * 14 + 10 + 'px' }">
        ...
      </span>
    </div>
  </div>
</template>

<script>
import { UNDEFINED, INFINITY, isPlainObject } from './util'

const rawTypeRE = /^\[object (\w+)]$/

export default {
  name: 'VueDataTree',
  props: {
    field: Object,
    depth: Number
  },
  data () {
    return {
      limit: Array.isArray(this.field.value) ? 10 : Infinity,
      expanded: this.depth === 0 && this.field.key !== '$route'
    }
  },
  computed: {
    valueType () {
      const value = this.field.value
      const type = typeof value
      if (value == null || value === UNDEFINED) {
        return 'null'
      } else if (type === 'boolean' || type === 'number' || value === INFINITY) {
        return 'literal'
      } else if (
        value instanceof RegExp ||
        (type === 'string' && !rawTypeRE.test(value))
      ) {
        return 'string'
      }
    },
    isExpandableType () {
      const value = this.field.value
      return Array.isArray(value) || isPlainObject(value)
    },
    formattedValue () {
      const value = this.field.value
      if (value === null) {
        return 'null'
      } else if (value === UNDEFINED) {
        return 'undefined'
      } else if (value === INFINITY) {
        return 'Infinity'
      } else if (Array.isArray(value)) {
        return 'Array[' + value.length + ']'
      } else if (isPlainObject(value)) {
        return 'Object' + (Object.keys(value).length ? '' : ' (empty)')
      } else if (typeof value === 'string') {
        var typeMatch = value.match(rawTypeRE)
        if (typeMatch) {
          return typeMatch[1]
        } else {
          return JSON.stringify(value)
        }
      } else if (value instanceof RegExp) {
        return value.toString()
      } else {
        return value
      }
    },
    formattedSubFields () {
      let value = this.field.value
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
    },
    limitedSubFields () {
      return this.formattedSubFields.slice(0, this.limit)
    }
  },
  methods: {
    toggle () {
      if (this.isExpandableType) {
        this.expanded = !this.expanded
      }
    },
    hyphen: v => v.replace(/\s/g, '-')
  }
}
</script>

<style scoped>
.vue-data-tree {
	user-select: text;
	font-size: 12px;
	font-family: Menlo, Consolas, monospace;
	cursor: default;
}

.self {
	height: 20px;
	line-height: 20px;
	position: relative;
	white-space: nowrap;
	padding-left: 14px;
}

.self span,
.self div {
	display: inline-block;
	vertical-align: middle;
}

.self .arrow {
	position: absolute;
	top: 7px;
	left: 0px;
}

.self .arrow.rotated {
	transform: rotate(90deg);
}

.self .key {
	color: #881391;
}

.self .colon {
	margin-right: 0.5em;
	position: relative;
}

.self .value {
	color: #444;
}

.self .value.string {
	color: #c41a16;
}

.self .value.null {
	color: #999;
}

.self .value.literal {
	color: #03c;
}

.self .type {
	color: #fff;
	padding: 3px 6px;
	font-size: 10px;
	line-height: 10px;
	height: 16px;
	border-radius: 3px;
	margin: 2px 6px;
	position: relative;
	background-color: #eee;
}

.self .type.prop {
	background-color: #96afdd;
}

.self .type.computed {
	background-color: #af90d5;
}

.self .type.vuex-getter {
	background-color: #5dd5d5;
}

.self .type.firebase-binding {
	background-color: #fc0;
}

.self .type.observable {
	background-color: #f99;
}

.self .meta {
	display: none;
	position: absolute;
	z-index: 999;
	font-size: 11px;
	color: #444;
	top: 0;
	left: calc(100% + 5px);
	width: 150px;
	border: 1px solid #e3e3e3;
	border-radius: 3px;
	padding: 8px 12px;
	background-color: #fff;
	line-height: 16px;
	box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.self .meta .key {
	width: 65px;
}

.self .meta-field {
	display: block;
}

.self:hover {
	cursor: pointer;
}

.self:hover .meta {
	display: block;
}

.app.dark .self .key {
	color: #e36eec;
}

.app.dark .self .value {
	color: #bdc6cf;
}

.app.dark .self .value.string {
	color: #e33e3a;
}

.app.dark .self .value.null {
	color: #999;
}

.app.dark .self .value.literal {
	color: #997fff;
}

.app.dark .self .type {
	color: #242424;
}

.app.dark .self .type .meta {
	border: 1px solid #3a3a3a;
	background-color: #242424;
}

.more {
	cursor: pointer;
	display: inline-block;
	border-radius: 4px;
	padding: 0 4px 4px;
}

.more:hover {
	background-color: #eee;
}
</style>
