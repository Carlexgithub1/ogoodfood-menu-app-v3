<script>
  import "./MenuPageFace.css";
  const { MenuPageId, image, type } = $props();
  const MenuPageFaceId = `${MenuPageId}-${type}`;
  const MenuPageFaceClass = `menu-page-face ${type}`;

  function OnImageLoad(event) {
    const img = event.target;
    img.classList.add("loaded");
  }
</script>

<div id={MenuPageFaceId} class={MenuPageFaceClass}>
  <div class="loading-animation">
    <div class="spinner"></div>
  </div>
  <img onload={OnImageLoad} src={image.url} alt="Page menu" loading="lazy" />
</div>
