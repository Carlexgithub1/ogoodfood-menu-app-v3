<script>
  import "./MenuPageFace.css";
  const { MenuPageId, image, type } = $props();
  const MenuPageFaceId = `${MenuPageId}-${type}`;
  const MenuPageFaceClass = `menu-page-face ${type}`;
</script>

<div id={MenuPageFaceId} class={MenuPageFaceClass}>
  <img src={image.url} alt="Page menu" loading="lazy" />
</div>
