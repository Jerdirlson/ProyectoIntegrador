<script lang="ts" setup>
import {defineProps, defineEmits, ref, onMounted, toRaw} from 'vue';
import Input from '@/components/Input.vue';
import Button from "@/components/Button.vue";
import {useAuth} from "@/composables/UseAuth";

defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(['close']);

const login = ref({
  email: '',
  password: '',
  name: '',
  nickname: ''
});

const WindowStatus = ref({
  access: 0
});

const validateForm = () => {
  if (login.value.email === '') return false;
  if (login.value.password === '') return false;
  return true;
};

const validateRegister = () => {
  if (login.value.nickname === '') return false;
  if (login.value.name === '') return false;
  return true;
};

// Función para enviar el formulario de login
const send = async () => {
  const validated = validateForm();
  if (!validated) {
    // useAlert({
    //   title: 'Información de inicio de sesión incompleta',
    //   description: 'No se ha completado el formulario'
    // });
    return;
  }
  const { data, status } = await useAuth().login({
    user: login.value.email,
    pwd: login.value.password
  });
  const token = data.aws;
  setToken(token);
  if (useAuth().isTokenExpired(token)) {
    // useAlert({
    //   title: 'La sesión ha expirado',
    //   description: 'La sesión ha expirado, por favor inicia sesión nuevamente'
    // });
    return;
  }
  const user = await useAuth().getUser(token);
  if (status === 200) {
    // router.visit('/dashboard');
    emit('close');
  }
};

const signup = async () => {
  const validated = validateForm();
  const validated2 = validateRegister();
  if (!validated || !validated2) {
    // useAlert({
    //   title: 'Información de registro incompleta',
    //   description: 'No se ha completado el formulario'
    // });
    return;
  }
  // const { data, status } = await CreateUserService(login.value);
  // const token = data.token;
  // setToken(token);
  // if (status === 200) {
  //   router.visit('/dashboard');
  //   emit('close'); // Cerrar modal al registrarse
  // }
};

// Almacenar el token en el localStorage
const setToken = (token: string) => {
  window.localStorage.setItem('token', token);
};

const toggleStatus = () => {
  WindowStatus.value.access = WindowStatus.value.access === 0 ? 1 : 0;
};

const closeModal = () => {
  console.log('close');
  emit('close');
};

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('meta');
  if (myParam === 'register') {
    WindowStatus.value.access = 1;
  }
});
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-30 backdrop-blur-sm" @click="closeModal">
    <div class="fixed flex justify-center h-full w-full items-center">
      <div class="relative w-2/3 tablet:w-lg rounded-3xl overflow-hidden flex py-10 px-5 bg-neutral-100/90 backdrop-blur-xl duration-500" @click.stop>
        <div :class="[WindowStatus.access == 1 ? 'translate-x-0' : '-translate-x-full md:translate-x-0']" class="w-full md:w-1/2 flex shrink-0 justify-center flex-col px-5 duration-200">
          <span class="text-center text-blue-accent font-bold text-5xl py-5">
            Inicio de Sesión
          </span>
          <div class="w-full duration-100">
            <Input v-model="login.email" label="Correo electrónico" @enter="send" />
          </div>
          <div class="w-full duration-100">
            <Input v-model="login.password" label="Contraseña" type="password" @enter="send" />
          </div>
          <div class="w-full">
            <Button :meta="{twColor: 'third'}" @click="send">Acceder</Button>
          </div>
          <span class="mt-10 self-end cursor-pointer px-5 hover:scale-110 duration-200" @click="toggleStatus">
            ¿Eres nuevo?
          </span>
        </div>

        <div :class="[WindowStatus.access == 1 ? 'translate-x-0' : '-translate-x-full md:translate-x-0']" class="w-full md:w-1/2 flex shrink-0 justify-center flex-col px-5 duration-200">
          <span class="text-center text-blue-accent font-bold text-5xl py-5">
            Regístrate
          </span>
          <div class="w-full duration-100">
            <Input v-model="login.email" label="Correo electrónico" @enter="signup" />
          </div>
          <div class="w-full duration-100">
            <Input v-model="login.name" label="Nombre" name="Nombre" @enter="signup" />
          </div>
          <div class="w-full duration-100">
            <Input v-model="login.nickname" label="Apodo" name="Nickname" @enter="signup" />
          </div>
          <div class="w-full duration-100">
            <Input v-model="login.password" label="Contraseña" type="password" @enter="signup" />
          </div>
          <div class="w-full">
            <Button :meta="{twColor: 'third'}" @click="signup">Registrar</Button>
          </div>
          <span class="mt-10 self-end cursor-pointer px-5 hover:scale-110 duration-200" @click="toggleStatus">
            ¿Ya tienes cuenta?
          </span>
        </div>

        <div :style="{ transform: `translateX(${WindowStatus.access == 1 ? '0%' : '100%'})` }" class="absolute overflow-hidden select-none h-full w-0 md:w-1/2 bg-white/80 backdrop-blur-md top-0 left-0 rounded-lg z-[99] flex duration-200">
          <template @click="toggleStatus" class="w-full h-full flex flex-wrap justify-center items-center cursor-pointer hover:bg-secondary/60 rounded-lg duration-200 font-bold text-3xl text-primary hover:text-white">
            <div v-if="WindowStatus.access == 0">
              <span>¿Eres nuevo?</span>
            </div>
            <div v-if="WindowStatus.access == 1">
              <span>¿Ya tienes cuenta?</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
