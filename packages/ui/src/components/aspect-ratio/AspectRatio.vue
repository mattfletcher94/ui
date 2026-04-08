<script setup lang="ts">
import type { AspectRatioProps } from 'reka-ui';
import { AspectRatio as AspectRatioPrimitive } from 'reka-ui';

const props = defineProps<AspectRatioProps>();
</script>

<template>
  <AspectRatioPrimitive v-slot="slotProps" data-slot="aspect-ratio" v-bind="props">
    <slot v-bind="slotProps" />
  </AspectRatioPrimitive>
</template>
