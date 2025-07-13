<script>
  import "./MenuPage.css";
  import MenuPageFace from "../MenuPageFace/MenuPageFace.svelte";

  const { id, images, DeviceMode, flipped } = $props();
  const MenuPageId = `menu-page-${DeviceMode}-${id}`;
  const MenuPageClass = `menu-page ${flipped ? "flipped" : ""}`;
  const MenuPageZIndex = GetZIndexFromId(id);

  function GetZIndexFromId(id) {
    const zIndex = (id + 1) * -1;
    return zIndex;
  }
</script>

<div id={MenuPageId} class={MenuPageClass} style:z-index={MenuPageZIndex}>
  <MenuPageFace {MenuPageId} image={images[0]} type="front" />
  <MenuPageFace {MenuPageId} image={images[1]} type="back" />
</div>
