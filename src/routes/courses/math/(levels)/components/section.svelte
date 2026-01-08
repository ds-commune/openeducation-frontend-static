<script lang="ts">
  import type { Snippet } from "svelte";

  export type Props = {
    id?: string;
    icon?: string;
    title?: string;
    description?: Snippet | string;
    children: Snippet;
  };

  const { id, icon, title, description, children }: Props = $props();
</script>

<section {id}>
  {#if icon || title}
    <div class="header">
      {#if icon}
        <span>{icon}</span>
      {/if}

      {#if title}
        <h2>
          <a href={`#${id}`}>
            # {title}
          </a>
        </h2>
      {/if}
    </div>
  {/if}

  {#if description}
    <p>
      {#if typeof description === "string"}
        {description}
      {:else}
        {@render description()}
      {/if}
    </p>
  {/if}

  {@render children()}
</section>

<style>
  section {
    margin-bottom: 4rem;

    .header {
      a:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 1100px) {
    section {
      margin-bottom: 2.5rem;
    }
  }
</style>
