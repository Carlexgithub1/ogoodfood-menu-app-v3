<script>
  import ButtonNav from "./ButtonNav.svelte";
  const { disabled, onclick } = $props();
</script>

<ButtonNav type="next" {disabled} {onclick}>
  Suivant
  <svg
    class="icon-arrow-right"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill="currentColor"
    ><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg
  >
</ButtonNav>
