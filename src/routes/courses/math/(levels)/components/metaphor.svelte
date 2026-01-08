<script lang="ts">
  import type { Props as CardProps } from "./card.svelte";
  import Card from "./card.svelte";

  export type Props = CardProps;

  const { icon, title = "Метафора", description, children }: Props = $props();
</script>

<Card {icon} {title} {description} {children}></Card>
