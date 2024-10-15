<script setup lang="ts">
import ViewTable from "@/components/DashboardUser/ViewTable.vue";
import MainLayout from "@/layouts/MainLayout.vue";
</script>

<template>
  <MainLayout>
    <div class="w-full h-[calc(100vh-9rem)]">
      <div class="w-full h-full p-16">
        <div class="flex flex-col h-full w-full">
                    
          <!-- Título y descripción alineados a la izquierda -->
          <div class="text-left">
            <h1 class="text-3xl font-bold mb-4">Ver tu cita</h1>
            <p class="text-lg">
              Explora nuestros servicios diseñados para cuidar de ti y tu familia. Desde medicina general hasta emergencias y diagnósticos avanzados,
              estamos aquí para atenderte con la mejor calidad y profesionalismo.
            </p>
          </div>

          <!-- Caja de ver Cita y ID debajo del botón -->
          <div class="flex flex-col mt-8">
            <div class="flex items-center mb-4">
              <div class="flex h-14 w-96 bg-primary rounded-3xl justify-center items-center">
                <p class="text-2xl font-bold text-neutral-200">Ver Citas</p>
              </div>
            </div>

            <!-- Campo de ID debajo del botón -->
            <div class="flex items-start">
              <label for="cita-id" class="font-bold">ID de la Cita</label>
              <input type="text" id="cita-id" class="border border-gray-300 rounded-md p-2 ml-2" placeholder="Ingrese el ID">
            </div>
          </div>

          <!-- Tabla justo debajo del texto -->
          <div class="mt-8">
            <ViewTable/>
          </div>                   

        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.bg-primary {
  background-color: #1e90ff;
}
.text-neutral-200 {
  color: #f0f0f0;
}
</style>
