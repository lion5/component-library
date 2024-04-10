<template>
  <form @submit="onSubmit" class="login-form">
    <BaseInput
      label="E-Mail-Adresse"
      type="email"
      name="email"
      v-model="email"
      data-test="email"
    />
    <BaseInput
      label="Passwort"
      type="password"
      name="password"
      v-model="password"
      data-test="password"
    />
    <BaseButton
      class="submit-login-button"
      type="submit"
      data-test="submit-login-button"
      :loading="localBusy"
    >
      Einloggen
    </BaseButton>
    <MessageBox
      :error-message="localErrorMessage"
      :info-message="localInfoMessage"
    />
    <slot name="after" />
  </form>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue'
import { useForm } from 'vee-validate'
import BaseButton from '@core/components/buttons/BaseButton/BaseButton.vue'
import BaseInput from '@core/inputs/BaseInput/BaseInput.vue'
import { object, string } from 'yup'
import MessageBox from '@core/components/boxes/MessageBox/MessageBox.vue'

interface LoginForm {
  email: string
  password: string
}

const props = defineProps<{
  errorMessage?: string
  infoMessage?: string
  busy?: boolean
}>()

const email = ref<string>()
const password = ref<string>()
const localErrorMessage = toRef(() => props.errorMessage)
const localInfoMessage = toRef(() => props.infoMessage)
const localBusy = toRef(() => props.busy)

const { handleSubmit } = useForm<LoginForm>({
  validationSchema: object({
    email: string()
      .email('Bitte geben Sie eine korrekte E-Mail-Adresse an')
      .required('Dies ist ein Pflichtfeld'),
    password: string().required('Dies ist ein Pflichtfeld')
  })
})

const emit = defineEmits<{
  (e: 'submit', email: string, password: string): void
}>()

const onSubmit = handleSubmit((values, { resetField }) => {
  emit('submit', values.email, values.password)
  resetField('password')
})
</script>

<style scoped lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

a {
  align-self: center;
}
</style>
