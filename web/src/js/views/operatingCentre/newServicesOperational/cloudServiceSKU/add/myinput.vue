<template>
    <div>
        
        <input :value="value" size="small" v-bind="$attrs"></input>
    </div>
</template>
<script>
export default {
    inheritAttrs:false,
    props:['value']
}
</script>