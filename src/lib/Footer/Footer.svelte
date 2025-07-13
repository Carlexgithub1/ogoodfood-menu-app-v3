<script>
  import "./Footer.css";
  import Wrapper from "../Wrapper/Wrapper.svelte";
  import ButtonNavPrev from "../ButtonNav/ButtonNavPrev.svelte";
  import ButtonNavNext from "../ButtonNav/ButtonNavNext.svelte";
  import ButtonClose from "../ButtonClose/ButtonClose.svelte";

  const { CurrentPage, PageCount, OnBtnClicked } = $props();

  const isDisabled = $derived({
    prev: PageCount > 0 && CurrentPage > 1 ? false : true,
    next: PageCount > 0 && CurrentPage <= PageCount ? false : true,
    close: PageCount > 0 && CurrentPage > 1 ? false : true,
  });
</script>

<footer class="footer">
  <Wrapper>
    <ButtonNavPrev disabled={isDisabled.prev} onclick={OnBtnClicked.prev} />
    <ButtonClose disabled={isDisabled.close} onclick={OnBtnClicked.close} />
    <ButtonNavNext disabled={isDisabled.next} onclick={OnBtnClicked.next} />
  </Wrapper>
</footer>
