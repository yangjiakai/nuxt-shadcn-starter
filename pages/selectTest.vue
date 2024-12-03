<template>
  <div class="container p-8 space-y-8">
    <h1 class="text-3xl font-bold mb-6">Select Component Demo</h1>

    <!-- Basic Select -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Basic Select</h2>
      <div class="w-[180px]">
        <Select v-model="basicValue">
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem
                v-for="option in basicOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p class="mt-2 text-sm text-gray-500">
          Selected value:
          {{
            basicOptions.find((opt) => opt.value === basicValue)?.label ||
            "None"
          }}
        </p>
      </div>
    </div>

    <!-- Select with Icons -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Select with Icons</h2>
      <div class="w-[180px]">
        <Select v-model="iconValue">
          <SelectTrigger>
            <SelectValue>
              <template #default>
                <div v-if="iconValue" class="flex items-center gap-2">
                  <Icon
                    :name="
                      iconOptions.find((opt) => opt.value === iconValue)
                        ?.icon || 'lucide:smile'
                    "
                    class="h-4 w-4"
                  />
                  <span>{{
                    iconOptions.find((opt) => opt.value === iconValue)?.label
                  }}</span>
                </div>
                <div v-else class="flex items-center gap-2">
                  <Icon name="lucide:smile" class="h-4 w-4" />
                  <span>Select mood</span>
                </div>
              </template>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Moods</SelectLabel>
              <SelectItem
                v-for="option in iconOptions"
                :key="option.value"
                :value="option.value"
              >
                <div class="flex items-center gap-2">
                  <Icon :name="option.icon" class="h-4 w-4" />
                  {{ option.label }}
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p class="mt-2 text-sm text-gray-500">
          Selected mood:
          {{
            iconOptions.find((opt) => opt.value === iconValue)?.label || "None"
          }}
        </p>
      </div>
    </div>

    <!-- Disabled Select -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Disabled Select</h2>
      <div class="w-[180px]">
        <Select v-model="disabledValue" disabled>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem
                v-for="option in basicOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- Form Select with Label -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">Form Select with Label</h2>
      <div class="w-[180px]">
        <Label for="form-select">Choose a fruit</Label>
        <Select v-model="formValue" id="form-select" class="mt-2">
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem
                v-for="option in basicOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p class="mt-2 text-sm text-muted-foreground">
          Selected:
          {{
            basicOptions.find((opt) => opt.value === formValue)?.label || "None"
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";

// Basic options
const basicOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "strawberry", label: "Strawberry" },
];

// Options with icons
const iconOptions = [
  { value: "happy", label: "Happy", icon: "lucide:smile" },
  { value: "sad", label: "Sad", icon: "lucide:frown" },
  { value: "excited", label: "Excited", icon: "lucide:party-popper" },
  { value: "calm", label: "Calm", icon: "lucide:coffee" },
];

// Reactive values for each select (storing only the value string)
const basicValue = ref<string>("");
const iconValue = ref<string>("");
const disabledValue = ref<string>("apple"); // Pre-selected value
const formValue = ref<string>("");
</script>
