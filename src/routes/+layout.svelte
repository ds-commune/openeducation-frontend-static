<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();

  // onMount(() => {
  //   const setTheme = (theme: string) => {
  //     document.documentElement.setAttribute("data-theme", theme);
  //     alert(`set theme = '${theme}'`);
  //   };

  //   // setTheme("cerberus");
  //   // setTheme("modern");
  //   // setTheme("catppuccin");
  //   // setTheme("concord");
  //   // setTheme("crimson");
  //   // setTheme("fennec");
  //   // setTheme("hamlindigo");
  //   // setTheme("legacy");
  //   // setTheme("mint");
  //   // setTheme("mona");
  //   // setTheme("nosh");
  //   // setTheme("nouveau");
  //   // setTheme("pine");
  //   // setTheme("reign");
  //   setTheme("rocket");
  //   // setTheme("rose");
  //   // setTheme("sahara");
  //   // setTheme("seafoam");
  //   // setTheme("terminus");
  //   // setTheme("vintage");
  //   // setTheme("vox");
  //   // setTheme("wintry");
  // });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&family=Noto+Color+Emoji&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{@render children()}

<style>
  :global {
    :root {
      --base-font-family:
        "Google Sans Flex", system-ui, -apple-system, sans-serif,
        "Noto Color Emoji";
    }

    html {
      font-family: var(--base-font-family);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      margin: 0;
      background-color: #fcfaf7;
      color: #2b2d42;
      line-height: 1.65;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-variant: small-caps;
      text-transform: lowercase;
    }

    h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--color-primary-900, #1a3a20);
      margin: 0 0 1.5rem;
    }

    h3,
    h4 {
      font-weight: 600;
      margin: 0 0 1rem;
    }

    h3 {
      font-size: 1.375rem;
      color: var(--color-surface-800, #343a40);
    }

    h4 {
      font-size: 1.25rem;
    }

    p {
      font-size: 1.375rem;
      line-height: 1.7;
      color: var(--color-surface-800, #343a40);
      margin: 0 0 1.75rem;
    }

    blockquote {
      display: inline-block;
      font-size: 1.375rem;
      line-height: 1.6;
      color: var(--color-surface-700, #495057);
      margin: 1.5rem 0;
      padding: 1.5rem;
      border: 3px solid var(--color-warning-400, #ffc107);
      border-radius: calc(var(--radius-container, 0.25rem) * 2);
    }

    /* Mobile: compact scale (~50% more content fits) */
    @media (max-width: 1100px) {
      html {
        font-size: 12px;
      }

      h2 {
        font-size: 1.5rem;
        margin: 0 0 1rem;
      }

      h3 {
        font-size: 1.25rem;
      }

      h4 {
        font-size: 1.125rem;
      }

      p {
        font-size: 1.125rem;
        line-height: 1.6;
        margin: 0 0 1.25rem;
      }

      blockquote {
        font-size: 1.125rem;
        margin: 1rem 0;
        padding-left: 1rem;
        border-width: 2px;
      }
    }
  }
</style>
