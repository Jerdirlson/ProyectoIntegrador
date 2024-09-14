<script lang="ts">

import { ref } from "vue";

export function useStepper(totalSteps: number) {
  const currentStep = ref(1);

  const nextStep = () => {
    if (currentStep.value < totalSteps) {
      currentStep.value++;
    }
  };

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  };

  const isFirstStep = () => currentStep.value === 1;
  const isLastStep = () => currentStep.value === totalSteps;

  return {
    currentStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
  };
}

</script>