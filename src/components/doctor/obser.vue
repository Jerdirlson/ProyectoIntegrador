<template>
  <div class="observations-section">
    <label for="observations">Observaciones</label>
    <textarea id="observations" v-model="observations" rows="4"></textarea>
    <button @click="finalizeAppointment" class="finalize-btn">Finalizar cita</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "@/composables/UseToast";

export default {
  setup() {
    const observations = ref('');
    const router = useRouter();

    const finalizeAppointment = () => {
      if (observations.value.trim()) {
        router.push({ 
          path: '/doc', 
          query: { observaciones: observations.value }
        });
      } else {
        console.log('Error al agendar la cita:');
        useToast({
          title: 'Observaciones requeridas',
          description: 'Por favor, ingresa observaciones antes de finalizar la cita.',
          type: 'warning',
          timeoutId: 5000
        });
      }
    };

    return {
      observations,
      finalizeAppointment,
    };
  },
};
</script>

<style scoped>
.observations-section {
  width: 1150px; 
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

label {
  font-weight: bold;
}

textarea {
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
}

.finalize-btn {
  align-self: flex-end;
  padding: 10px 20px;
  background-color: #868e96;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.finalize-btn:hover {
  background-color: #495057;
}
</style>
