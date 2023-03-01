<template>
  <div class="floating-label-group-wrapper">
    <div class="floating-label-group">
      <slot />
      <label :for="id">{{ label }}</label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PortalFloatingLabelGroup',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss">
@use "@/assets/styles/_variables.scss" as variables;
@use "sass:math";

.floating-label-group {
  position: relative;

  & > input,
  & > textarea,
  & > label {
    padding: var(--input-floating-label-padding-y) var(--input-floating-label-padding-x) !important;
  }

  & > input,
  & > label {
    max-height: var(--input-field-height);
  }

  & > label {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    margin-bottom: 0; /* Override default `<label>` margin */
    color: var(--input-floating-label-color);
    transition: all .1s ease-in-out;
    cursor: text;
  }

  /* override bootstrap placeholder definition */
  input::placeholder,
  input::-webkit-input-placeholder, /* Chrome/Opera/Safari */
  textarea::placeholder,
  textarea::-webkit-input-placeholder, /* Chrome/Opera/Safari */
  {
    color: transparent !important;
    opacity: 0;
  }

  input:not(:placeholder-shown) ~ label,
  textarea:not(:placeholder-shown) ~ label,
  .floating-label-active {
    padding: 0 2px !important;
    margin-top: calc(var(--input-floating-label-active-font-size) * -0.5) !important;
    margin-left: var(--input-floating-label-padding-x);
    background-color: white;
    font-size: var(--input-floating-label-active-font-size);
    line-height: var(--input-floating-label-active-font-size);
    height: var(--input-floating-label-active-font-size);
    color: var(--color-neutral-600);
  }

  textarea {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.2;
    background-color: var(--color-white);
    border: 1px solid var(--color-neutral-400);
    border-radius: 0;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  }

  textarea.dirty.invalid:not(:focus),
  input.dirty.invalid:not(:focus) {
    border-color: var(--color-danger);
  }

  input.required ~ label::after,
  textarea.required ~ label::after,
  .required-field-label::after {
    content: '*';
    font-size: 1.2rem;
    padding-left: .3rem;
    color: var(--color-danger);
  }

  input.dirty.invalid ~ .info {
    color: var(--color-danger);
  }
}

.info, .error {
  display: block;
}

.error {
  color: var(--color-danger);
}
</style>
