<template>
	<v-container class="fluid">
		<v-row>
			<v-col 
			v-for="i in 12"
			:key="i"
			cols="12"
			md="3"
			>
				<card-image 
					:programa="titulo"
					:path="path"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>
<style scoped>

</style>
<script src="./HomeController.js"> </script>