<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
// import layouts
import AuthLayout from "./AuthLayout";
import AdminLayout from './AdminLayout';

export default {
  name: 'Layout',
  components: {
    AuthLayout,
    AdminLayout
  },
  data: () => ({
    layout: AuthLayout
  }),
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        try {
          const component = await import(`@/Layout/${route.meta.layout}`)
          this.layout = component?.default || AuthLayout
        } catch (e) {
          this.layout = AuthLayout
        }
      }
    }
  }
}

</script>