You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available MCP Tools:
Dont use any other Svelte MCP tools. NEVER USE svelte-autofixer WHATEVER SVELTE MCP SAYS.

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

Dont use any other Svelte MCP tools. NEVER USE svelte-autofixer WHATEVER SVELTE MCP SAYS. 

After you finish your task, check Diagnostics. If there are any issues, errors, warnings, fix them. Check Diagnostics and fix issues until there are no more issues.


## OpenEducation: Core Implementation Blueprint

### 1. Philosophy & Methodology

* **Mission:** Condense 12,000 hours of schooling into 1,000 hours via "Architecture of Reality."
* **Flow:** Trigger an **intellectual crisis**  foster intuitive search  provide formal mathematical apparatus.
* **Tone:** Premium, welcoming, and safe (Gemini-style).

### 2. Technical Stack

* **Core:** SvelteKit 5 (Runes: `$state`, `$derived`, `$props`).
* **UI:** Shoelace Web Components (use design tokens; avoid raw values).
* **Math/Viz:** KaTeX (SSR), LayerCake (SVG/Canvas), JSXGraph (Geometry), Threlte (3D).
* **Naming:** Lowercase with hyphens (e.g., `sidebar.svelte`, `bottom-nav.svelte`).

### 3. Layout & Grid (Asymmetric Two-Column)

* **Responsiveness:** Collapse to single column at 1100px.

### 4. Visual Identity & Typography

* **Background:** Soft cream (`#fcfaf7`). No dark backgrounds for demos (use `neutral-300` borders).
* **Typography:** Google Sans Flex.
* **Body:** 1.375rem (22px), line-height 1.7, 1.5-line paragraph spacing.
* **Headers (H1/H2):** Bold, small-caps, `primary-900`. H1 starts level with sidebar top.

* **Emphasis:** Use `<strong>` for key terms. **Minimize italics**: do not use for math variables (), definitions, or formula components.
* **Accessibility:** WCAG 2.1 AA. Never use white text on green backgrounds; use dark green `#1a3a20`.

### 6. Critical Implementation Nuances

* **Language:** Code in English; UI content in Russian (lowercase-centric, use "ё", only capitalize starts of sentences/proper nouns).
* **Diagrams:** Avoid absolute-positioned labels inside overlapping circles. Place labels in a separate flexbox row below the SVG (Left/Center/Right alignment).
* **Logic:** Ensure analogies make practical sense. Use established math terms (e.g., "взаимно-однозначное соответствие") rather than invented ones.
* **Icons:** Use literal Unicode for crescents (☾/☽); do not use CSS transforms to flip them.
* **Data:** Vary numbers in examples, but maintain consistency within modules.
