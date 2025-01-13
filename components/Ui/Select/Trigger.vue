<template>
  <SelectTrigger :class="styles({ class: props.class })" v-bind="forwarded">
    <slot>
      <UiSelectValue :placeholder="placeholder" class="line-clamp-1" />
    </slot>
    <UiSelectIcon :icon="icon" />
  </SelectTrigger>
</template>

<script lang="ts" setup>
  import { SelectTrigger } from "radix-vue";
  import type { SelectTriggerProps } from "radix-vue";

  const props = defineProps<
    SelectTriggerProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
      /** Icon to render */
      icon?: string;
      /** Placeholder text */
      placeholder?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "icon", "placeholder");
  const styles = tv({
    base: "line-clamp-1 flex h-10 w-full items-center justify-between truncate rounded-md border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground",
  });
</script>
