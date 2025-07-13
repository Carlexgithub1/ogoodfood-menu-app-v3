<script>
  import "./Button.css";
  import { v4 as uuid } from "uuid";

  const { id = uuid(), className = "", disabled = false, onclick } = $props();
</script>

<button {id} class={`btn ${className}`} {disabled} {onclick}>
  <slot></slot>
</button>
