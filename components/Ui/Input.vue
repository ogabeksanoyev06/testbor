<template>
  <input v-bind="props" v-model="localModel" :class="[styles({ class: props.class }), { '!border-destructive !bg-destructive/5': props.error }]" />
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      class?: any;
      id?: string;
      name?: string;
      placeholder?: string;
      disabled?: boolean;
      required?: boolean;
      type?: string;
      modelValue?: any;
      error?: boolean;
    }>(),
    { type: "text" }
  );
  const emits = defineEmits<{
    "update:modelValue": [value: any];
  }>();
  const localModel = useVModel(props, "modelValue", emits);

  const styles = tv({
    base: "transition-300 h-10 w-full rounded-md  border border-input bg-background px-3 py-2 text-base outline-none file:border-0 file:bg-transparent file:px-1 file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus:border-input focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:[color-scheme:dark] sm:text-sm",
  });
</script>
