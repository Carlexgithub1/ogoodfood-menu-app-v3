<script>
  import ButtonNav from "./ButtonNav.svelte";
  const { disabled, onclick } = $props();
</script>

<ButtonNav type="prev" {disabled} {onclick}>
  <svg
    class="icon-arrow-left"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill="currentColor"
    ><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg
  >
  Précédent
</ButtonNav>
