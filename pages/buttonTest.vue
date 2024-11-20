<template>
  <div class="container p-8 space-y-8">
    <h1 class="text-3xl font-bold mb-6">Button Variants Demo</h1>

    <!-- Default Buttons -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Default Variants</h2>
      <div class="flex flex-wrap gap-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>

    <!-- Size Variants -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Size Variants</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Button size="lg">Large</Button>
        <Button>Default Size</Button>
        <Button size="sm">Small</Button>
      </div>
    </div>

    <!-- State Variants -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">State Variants</h2>
      <div class="flex flex-wrap gap-4">
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <Button variant="outline" loading>Loading Outline</Button>
      </div>
    </div>

    <!-- Icons with Buttons -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Buttons with Icons</h2>
      <div class="flex flex-wrap gap-4">
        <Button>
          <Icon name="lucide:download" class="mr-2 h-4 w-4" /> Download
        </Button>
        <Button variant="secondary">
          <Icon name="lucide:settings" class="mr-2 h-4 w-4" /> Settings
        </Button>
        <Button variant="outline">
          <Icon name="lucide:trash" class="mr-2 h-4 w-4" /> Delete
        </Button>
      </div>
    </div>

    <!-- Icon Only Buttons -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Icon Only Buttons</h2>
      <div class="flex flex-wrap gap-4">
        <Button size="icon">
          <Icon name="lucide:mail" class="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary">
          <Icon name="lucide:bell" class="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline">
          <Icon name="lucide:star" class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '../components/ui/button'
</script>
