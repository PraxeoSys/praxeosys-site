/**
 * ============================================================================
 *  Narrative acts — chapter-rail structure (not editorial content)
 * ============================================================================
 * This holds only ordering/id/DOM-target data. Act names/labels are UI chrome
 * and live in messages/{en,zh}.json under the "chapterRail" namespace, not
 * here — this file is not something the site owner edits.
 */

export interface NarrativeAct {
  id: "whoami" | "how-i-work" | "proof" | "work" | "thinking";
  /** DOM id of the section this act's rail entry scrolls to / observes. */
  sectionId: string;
}

export const narrativeActs: NarrativeAct[] = [
  { id: "whoami", sectionId: "whoami" },
  { id: "how-i-work", sectionId: "loop" },
  { id: "proof", sectionId: "proof" },
  { id: "work", sectionId: "projects" },
  { id: "thinking", sectionId: "thinking" },
];
