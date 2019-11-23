<template>
	<v-container class="fluid">
		<v-row no-gutters>
			<v-col
			cols="12"
			md="4"
			>
				<v-img :src="path" :alt="titulo"></v-img>
			</v-col>
			<v-col
			cols="12"
			md="8"
			>
				<v-card color="latecoereBlueLight">
					<v-card-title class="white--text">Programa: {{titulo}}</v-card-title>

					<v-card-subtitle>Estatísticas sobre o programa</v-card-subtitle>

					<v-card-text class="white--text">
						<p>aaaaaaaaaaaaaaaaaaaaaaaaa</p>
						<p>aaaaaaaaaaaaaaaaaaaaaaaaa</p>
						<p>aaaaaaaaaaaaaaaaaaaaaaaaa</p>
						<p>aaaaaaaaaaaaaaaaaaaaaaaaa</p>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col
				cols="12"
				md="10"
			>
				<v-row>
					<v-col
						cols="12"
						md="3"
						v-for="i in 35" :key="i"
					>
						<v-card color="latecoereOrange" outlined>
							<v-card-subtitle>Posto: 111</v-card-subtitle>	
							<v-card-text class="white--text">
								<p>Dados: 222</p>
								<p>Dados: 333</p>
								<p>Dados: 444</p>
								<p>Dados: 555</p>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
			<v-col
			cols="12"
			md="2"
			>
				<v-card color="latecoereBlueDark mb-3" v-for="i in 12" :key="i">
					<v-card-text class="white--text">aaaaaaaaaaaaaaaaaaaaaaaaa</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<style scoped>

</style>
<script src="./ProgramaController.js"> </script>