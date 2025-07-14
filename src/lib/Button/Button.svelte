<script>
  import "./Button.css";
  import { v4 as uuid } from "uuid";

  const {
    id = uuid(),
    className = "",
    disabled = false,
    onclick,
    children,
  } = $props();
</script>

<button {id} class={`btn ${className}`} {disabled} {onclick}>
  {@render children()}
</button>
