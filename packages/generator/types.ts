/** Internal types for the site generation pipeline */

export interface VibeProfile {
  primary: string;
  secondary: string;
  tertiary: string;
  scores: Record<string, number>;
}

export interface FontPairingSelection {
  id: string;
  display: string;
  body: string;
  displayWeights: number[];
  bodyWeights: number[];
  nextFontImport: string;
  isLocal: boolean;
}

export interface PaletteSelection {
  id: string;
  primary: string;
  accent: string;
  bgLight: string;
  textDark: string;
  textMuted: string;
}

export interface HeroSelection {
  variant:
    | "photo-bg"
    | "split"
    | "centered"
    | "dark-bold"
    | "blurred-reveal"
    | "video-bg";
  databaseId: string;
}

export interface AnimationSelection {
  id: string;
  name: string;
  category: string;
  complexity: string;
  cssRecipe?: string;
}

export interface NavSelection {
  variant: "light" | "dark" | "transparent";
}

export interface SectionSelection {
  component: string;
  variant?: string;
  anchorId: string;
  altBackground: boolean;
  props: Record<string, unknown>;
}

export interface DesignBrief {
  font: FontPairingSelection;
  palette: PaletteSelection;
  hero: HeroSelection;
  nav: NavSelection;
  animations: AnimationSelection[];
  cssRecipes: string[];
  componentVariants: Record<string, string>;
}

export interface GeneratedContent {
  headline: string;
  subheadline: string;
  sectionHeadings: Record<string, { heading: string; subheading?: string }>;
  aboutStory?: string;
  processSteps?: { title: string; description: string }[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

/** Shape of a font pairing from design-elements-database.json */
export interface DbFontPairing {
  id: string;
  display: string;
  body: string;
  display_weights: number[];
  body_weights: number[];
  vibe: string[];
  sources: string[];
  next_font_import: string;
  notes: string;
}

/** Shape of a color palette from design-elements-database.json */
export interface DbColorPalette {
  id: string;
  colors: {
    primary: string;
    accent: string;
    bg_light: string;
    text_dark: string;
    text_muted: string;
  };
  vibe: string[];
  sources: string[];
  notes: string;
}

/** Shape of a hero from design-elements-database.json */
export interface DbHero {
  id: string;
  name: string;
  description: string;
  sources: string[];
  vibe: string[];
  exceptional?: boolean;
  implementation?: {
    html?: string;
    css?: string;
    framer_motion?: string;
    notes?: string;
  };
}

/** Shape of an animation from design-elements-database.json */
export interface DbAnimation {
  id: string;
  name: string;
  category: string;
  description: string;
  complexity: string;
  sources?: string[];
  implementation: {
    framer_motion?: string;
    css?: string;
    notes?: string;
  };
}

/** Shape of a section from design-elements-database.json */
export interface DbSection {
  id: string;
  name: string;
  category: string;
  description: string;
  sources: string[];
  vibe?: string[];
  implementation?: {
    css?: string;
    notes?: string;
  };
}

/** Shape of a navigation pattern from design-elements-database.json */
export interface DbNavigation {
  id: string;
  name: string;
  description: string;
  sources: string[];
  vibe: string[];
}

/** Full design database shape */
export interface DesignDatabase {
  metadata: Record<string, unknown>;
  sources: unknown[];
  font_pairings: DbFontPairing[];
  color_palettes: DbColorPalette[];
  heroes: DbHero[];
  sections: DbSection[];
  animations: DbAnimation[];
  interactions: unknown[];
  layout_patterns: unknown[];
  navigation: DbNavigation[];
}

/** Section Registry — extracted code blocks from reference sites */
export interface SectionRegistryEntry {
  id: string;
  source: string;
  sectionType: string;
  name: string;
  description: string;
  vibes: string[];
  visualTraits: string[];
  complexity: "simple" | "medium" | "complex";
  dependencies: {
    imports: string[];
    components: string[];
    cssVariables: string[];
    customKeyframes: string[];
  };
  code: string;
  dataShape: string;
  linesOfCode: number;
}

export interface SectionRegistry {
  version: string;
  lastUpdated: string;
  entries: SectionRegistryEntry[];
}

export interface PhotoManifest {
  heroImage?: { src: string; alt: string; category: string };
  aboutImage?: { src: string; alt: string; category: string };
  galleryImages: { src: string; alt: string; category: string }[];
  allPhotos: { src: string; alt: string; category: string }[];
}
