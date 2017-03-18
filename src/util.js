export const UNDEFINED = '__vue_undefined__'
export const INFINITY = '__vue_infinity__'

export function isPlainObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

function isPrimitive (data) {
  if (data == null) {
    return true
  }
  const type = typeof data
  return (
    type === 'string' ||
    type === 'number' ||
    type === 'boolean' ||
    data instanceof RegExp
  )
}
