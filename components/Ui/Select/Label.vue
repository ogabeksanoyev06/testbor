<template>
  <SelectLabel :class="styles({ class: props.class })" v-bind="forwarded">
    <slot />
  </SelectLabel>
</template>

<script lang="ts" setup>
  import { SelectLabel } from "radix-vue";
  import type { SelectLabelProps } from "radix-vue";

  const props = defineProps<
    SelectLabelProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "py-1.5 pr-8 pl-2 text-sm font-semibold",
  });
</script>
