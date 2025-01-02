<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
	  <Card class="flex flex-col border-none">
		<CardHeader>
		  <CardTitle class="tracking-tight text-sm font-normal">O'rtacha ball:</CardTitle>
		</CardHeader>
		<CardContent class="grid gap-4">
		  <h3 class="text-2xl font-medium">0.0</h3>
		</CardContent>
		<CardFooter class="mt-auto">
		  <NuxtLink to="/choose-test" class="w-full">
			<Button class="w-full"> <FilePenLine class="size-5" /> Test ishlash</Button>
		  </NuxtLink>
		</CardFooter>
	  </Card>
	  <Card class="flex flex-col border-none relative overflow-hidden">
		<CardHeader>
		  <CardTitle class="tracking-tight text-sm font-normal">Hisob:</CardTitle>
		</CardHeader>
		<CardContent class="grid gap-4">
		  <h3 class="text-2xl font-medium">1000 so'm</h3>
		</CardContent>
		<CardFooter class="mt-auto">
		  <Button class="w-full"> <Plus class="size-5" /> Hisobni to'ldirish </Button>
		</CardFooter>
		<div class="absolute inset-0 w-full h-full backdrop-blur-[2px] flex items-center justify-center">
		  <span class="text-sm font-medium border rounded-full text-primary border-primary bg-white px-3">Tez kunda</span>
		</div>
	  </Card>
	  <Card class="flex flex-col relative border-none overflow-hidden">
		<CardHeader>
		  <CardTitle class="tracking-tight text-sm font-normal">Yangi test:</CardTitle>
		</CardHeader>
		<CardContent class="grid gap-4">
		  <h3 class="text-2xl font-medium">Prezident maktabi testlari</h3>
		</CardContent>
		<CardFooter class="mt-auto">
		  <Button class="w-full"> <FilePenLine class="size-5" /> Testni boshlash</Button>
		</CardFooter>
		<div class="absolute inset-0 w-full h-full backdrop-blur-[2px] flex items-center justify-center">
		  <span class="text-sm font-medium border rounded-full text-primary border-primary bg-white px-3">Tez kunda</span>
		</div>
	  </Card>
	</div>
  </template>
  
  <script setup>
  import { FilePen, FilePenLine, Plus } from 'lucide-vue-next'
  </script>
  