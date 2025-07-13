<script>
  import "./Menu.css";
  import MenuPage from "../MenuPage/MenuPage.svelte";
  import { derived } from "svelte/store";
  const { MenuManifest, PageDisplayMode, PageWidth } = $props();

  function GetMenuPages(images, DeviceMode) {
    const MenuPages = [];

    switch (DeviceMode) {
      case "desktop":
        for (let i = 0; i < images.length; i += 2) {
          const recto = images[i];
          const verso = images[i + 1] || MenuManifest.blank;

          MenuPages.push([recto, verso]);
        }
        break;
      case "mobile":
        for (let i = 0; i < images.length; i++) {
          const recto = images[i];
          const verso = MenuManifest.blank;

          MenuPages.push([recto, verso]);
        }
      default:
        break;
    }
    return MenuPages;
  }
</script>

<section class={`menu ${PageDisplayMode === 1 ? "mobile" : "desktop"}`}>
  {#if MenuManifest}
    <!-- <MenuPage id=/> -->
    <div id="menu-container-desktop" class="menu-container desktop">
      {#each GetMenuPages(MenuManifest.images, "desktop") as page, index}
        <MenuPage
          id={index + 1}
          images={page}
          flipped={false}
          DeviceMode="desktop"
        />
      {/each}
    </div>

    <div id="menu-container-mobile" class="menu-container mobile">
      {#each GetMenuPages(MenuManifest.images, "mobile") as page, index}
        <MenuPage
          id={index + 1}
          images={page}
          flipped={false}
          DeviceMode="mobile"
        />
      {/each}
    </div>
  {:else}
    <img class="menu-page" src="/menu/blank.jpg" alt="Empty menu page" />
  {/if}
</section>

<style>
</style>
