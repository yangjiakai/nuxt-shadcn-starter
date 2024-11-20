<template>
  <div class="container p-8">
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Welcome to Shadcn Vue Demo</h1>
        <p class="text-muted-foreground mt-2">
          This is a demo of Shadcn Vue components. Click on the sidebar links to explore different components.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Various button styles and variants</CardDescription>
          </CardHeader>
          <CardContent class="flex justify-end">
            <NuxtLink to="/buttonTest">
              <Button>View Demo</Button>
            </NuxtLink>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select</CardTitle>
            <CardDescription>Dropdown select components with various features</CardDescription>
          </CardHeader>
          <CardContent class="flex justify-end">
            <NuxtLink to="/selectTest">
              <Button>View Demo</Button>
            </NuxtLink>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
</script>
