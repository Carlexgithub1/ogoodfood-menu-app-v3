<script>
  import "./app.css";
  import Header from "./lib/Header/Header.svelte";
  import Footer from "./lib/Footer/Footer.svelte";
  import Menu from "./lib/Menu/Menu.svelte";
  import { GetMenuManifest } from "./api/GetMenuManifest";

  var PageCount = 0;
  var CurrentPage = 0;
  var MenuManifest = null;
  var PageWidth = null;
  var DeviceType = "mobile";
  var PageDisplayMode = "mobile";
  const OnBtnClicked = {
    prev: GoToPreviousPage,
    next: GoToNextPage,
    close: CloseMenu,
  };

  GetMenuManifest().then((manifest) => {
    MenuManifest = manifest;
    PageCount = MenuManifest.images.length;
    CurrentPage = 1;

    const ManifestLoadedEvent = new CustomEvent("custom:manifest-loaded");
    window.dispatchEvent(ManifestLoadedEvent);
  });

  // Event listeners

  window.addEventListener("custom:manifest-loaded", HandleOnManifestLoaded);
  window.addEventListener("keydown", HandleOnKeyboardPressed);
  window.addEventListener("resize", UpdatePageDisplayMode);
  window.addEventListener("", function (event) {
    console.log(event);
    // event.preventDefault();
  });

  // Navigation

  function GoToNextPage() {
    if (CurrentPage <= PageCount) {
      const container = document.getElementById("menu-container-desktop");

      if (PageDisplayMode === "desktop") {
        if (CurrentPage <= 1) {
          container.style.transform = `translateX(${PageWidth / 2}px)`;
        }
        if (CurrentPage === PageCount) {
          container.style.transform = `translateX(${PageWidth}px)`;
        }
      }

      const page = GetMenuPageHTMLElement(CurrentPage);
      const NextPage = GetMenuPageHTMLElement(CurrentPage + 1);
      const PrevPage = GetMenuPageHTMLElement(CurrentPage - 1);

      if (NextPage) NextPage.classList.remove("hidden");
      const zIndex = Number(page.style.zIndex);
      const NewZIndex = zIndex * -1;
      page.style.zIndex = String(NewZIndex);
      setTimeout(() => {
        page.classList.add("flipped");
      }, 10);

      setTimeout(() => {
        if (PageDisplayMode === "mobile") {
          page.classList.add("hidden");
          console.log("Page flipped: ", CurrentPage, page);
        } else if (PrevPage) {
          PrevPage.classList.add("hidden");
        }
        CurrentPage++;
      }, 500);
    }
  }
  function GoToPreviousPage() {
    console.log("Current page: ", CurrentPage);
    const container = document.getElementById("menu-container-desktop");

    if (PageDisplayMode === "desktop") {
      if (CurrentPage === 2) {
        container.style.transform = `translateX(0px)`;
      }
      if (CurrentPage > PageCount) {
        container.style.transform = `translateX(${PageWidth / 2}px)`;
      }
    }
    if (CurrentPage > 1) {
      const PrevPage = GetMenuPageHTMLElement(CurrentPage);
      const page = GetMenuPageHTMLElement(CurrentPage - 1);
      const NextPage = GetMenuPageHTMLElement(CurrentPage - 2);

      if (PageDisplayMode === "mobile") {
        page.classList.remove("hidden");
        page.style.display = "block";
      }
      if (NextPage) {
        NextPage.classList.remove("hidden");
      }

      // setTimeout(() => {
      //   if (PageDisplayMode === "mobile") {
      //     // page.classList.add("hidden");
      //     // page.style.display = "none";
      //   } else if (NextPage) {
      //     NextPage.classList.remove("hidden");
      //     NextPage.style.display = "block";
      //   }
      // }, 500);

      setTimeout(() => {
        page.classList.remove("flipped");
      }, 10);

      setTimeout(() => {
        const zIndex = Number(page.style.zIndex);
        const NewZIndex = zIndex * -1;
        page.style.zIndex = String(NewZIndex);
        console.log("Swintching z index from: ", zIndex, " to: ", NewZIndex);
      }, 250);

      setTimeout(() => {
        // page.style.zIndex = String(NewZIndex);
        if (PrevPage) PrevPage.classList.add("hidden");
      }, 800);

      CurrentPage--;
    }
  }
  function CloseMenu() {
    console.log("Closing menu from page: ", CurrentPage);
    for (let i = CurrentPage; i >= 1; i--) {
      console.log("Going back to page");
      GoToPreviousPage();
    }
  }

  function GetMenuPageHTMLElement(CurrentPage) {
    const page = document.getElementById(
      `menu-page-${PageDisplayMode}-${CurrentPage}`
    );
    return page;
  }

  // Device type and display mode

  function GetDeviceType() {
    const isDesktop = window.matchMedia(
      "(pointer: fine) and (hover: hover)"
    ).matches;

    const DeviceType = isDesktop ? "desktop" : "mobile";
    console.log("Device type: ", DeviceType);

    return DeviceType;
  }

  function GetPageDisplayMode(WinWidth, PageWidth) {
    const PageDisplayMode = WinWidth < PageWidth * 2 ? "mobile" : "desktop";
    return PageDisplayMode;
  }

  function UpdatePageDisplayMode(event) {
    event.preventDefault();

    switch (DeviceType) {
      case "desktop":
        CloseMenu();
        const NewPageDisplayMode = GetPageDisplayMode(
          window.innerWidth,
          PageWidth
        );
        console.log("New display resize page mode: ", NewPageDisplayMode);
        PageDisplayMode = NewPageDisplayMode;

        const MenuContainer = document.querySelector(".menu");
        switch (PageDisplayMode) {
          case "mobile":
            PageCount = MenuManifest.images.length;
            MenuContainer.classList.add("mobile");
            MenuContainer.classList.remove("desktop");
            break;
          case "desktop":
            PageCount = Math.ceil(MenuManifest.images.length / 2);
            MenuContainer.classList.add("desktop");
            MenuContainer.classList.remove("mobile");
            break;

          default:
            break;
        }
        break;

      case "mobile":
        window.removeEventListener("resize", UpdatePageDisplayMode);
        break;

      default:
        break;
    }
  }

  function HandleOnManifestLoaded() {
    DeviceType = GetDeviceType();
    setTimeout(function () {
      UpdatePageWidth();
      PageDisplayMode = GetPageDisplayMode(window.innerWidth, PageWidth);

      console.log("New display mode: ", PageDisplayMode);

      const MenuContainer = document.querySelector(".menu");
      switch (PageDisplayMode) {
        case "mobile":
          PageCount = MenuManifest.images.length;
          MenuContainer.classList.add("mobile");
          MenuContainer.classList.remove("desktop");
          break;
        case "desktop":
          PageCount = Math.ceil(MenuManifest.images.length / 2);
          MenuContainer.classList.add("desktop");
          MenuContainer.classList.remove("mobile");
          break;

        default:
          break;
      }
    }, 50);

    // console.log("Device type: ", DeviceType);
    // console.log("Page display mode: ", PageDisplayMode);
  }

  function UpdatePageWidth() {
    const page = document.querySelector(".menu-page");
    const NewPageWidth = page.clientWidth;
    PageWidth = NewPageWidth;
    console.log("Page width: ", PageWidth);
  }

  function HandleOnKeyboardPressed(event) {
    switch (event.key) {
      case "p":
      case "P":
      case "ArrowLeft":
        GoToPreviousPage();
        break;
      case "n":
      case "N":
      case "ArrowRight":
        GoToNextPage();
        break;

      case "Escape":
        CloseMenu();
        break;

      default:
        break;
    }
  }
</script>

<div class="container">
  <Header />
  <Menu {MenuManifest} {PageDisplayMode} {PageWidth} />
  <!-- <h4>Current page: {CurrentPage} / {PageCount}</h4> -->
  <Footer {CurrentPage} {PageCount} {OnBtnClicked} />
</div>
