<script>
  import "./ButtonNav.css";
  import Button from "../Button/Button.svelte";

  const { type, disabled = false, onclick } = $props();
  const ButtonId = `btn-${type}`;
  const ButtonClasses = `btn-nav ${ButtonId}`;
</script>

<Button id={ButtonId} className={ButtonClasses} {disabled} {onclick}>
  <slot></slot>
</Button>
