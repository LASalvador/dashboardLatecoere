<template>
	<v-container>
		<v-row>
			<v-col 
			v-for="i in 12"
			:key="i"
			col="3"
			>
				<card-image 
					:programa="titulo"
					:path="path"
				/>
			</v-col>
		</v-row>
		<span>{{titulo}}</span>
	</v-container>
</template>
<style scoped>

</style>
<script src="./HomeController.js"> </script>