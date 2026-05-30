export interface ParsedArgs {
  _: string[];
  [key: string]: string | boolean | string[] | undefined;
}

export type SelectionStatus =
  | "undecided"
  | "shortlisted"
  | "rejected"
  | "snoozed";
type ResearchStatus = "not-started" | "needs-more-research";
type DraftDecisionStatus = "not-requested";
type FinalDecisionStatus = "undecided";

export type JobCurrentState =
  | "awaiting-human-selection"
  | "shortlisted"
  | "rejected"
  | "awaiting-human-research";

type BundleStatus = "not-created" | "prepared";
type JobDraftStatus = "not-started";

export type RankingBucket =
  | "strong-match"
  | "possible-match"
  | "weak-match"
  | null;
export type WriteResult = "skipped" | "updated" | "created";
export type DomainSignalKey =
  | "architecture"
  | "modernization"
  | "testing"
  | "integrations"
  | "microservices";

export interface SourceRecord {
  source: string;
  url: string;
}

export interface CanonicalJob {
  canonicalJobId: string;
  title: string;
  company: string;
  url: string;
  resourcesLocalSlug?: string;
  score?: number | null;
  location?: string;
  source?: string;
  externalApplyUrl?: string;
  summary?: string;
  description?: string;
  essentialSkills?: string[];
  sourceRecords?: SourceRecord[];
  duplicateConfidence?: string;
  dedupReason?: string;
  rankingReason?: string;
}

export interface JobState {
  canonicalJobId: string;
  currentState: JobCurrentState;
  createdAt: string;
  updatedAt: string;
  lastRankedAt: string;
  ranking: {
    score: number | null;
    bucket: RankingBucket;
    reportRunId: string | null;
  };
  decisionSummary: {
    selection: SelectionStatus | null;
    researchReady: ResearchStatus | null;
    draftDecision: DraftDecisionStatus | null;
    finalDecision: FinalDecisionStatus | null;
  };
  bundle: {
    slug: string;
    path: string;
    status: BundleStatus;
  };
  draft: {
    status: JobDraftStatus;
    latestVersion: number | null;
    latestFile: string | null;
  };
}

export interface DecisionState {
  canonicalJobId: string;
  selection: {
    status: SelectionStatus;
    decidedAt: string | null;
    reason: string | null;
  };
  research: {
    status: ResearchStatus;
    decidedAt: string | null;
    reason: string | null;
  };
  draft: {
    status: DraftDecisionStatus;
    decidedAt: string | null;
    reason: string | null;
  };
  final: {
    status: FinalDecisionStatus;
    decidedAt: string | null;
    reason: string | null;
  };
}

export interface BundleState {
  canonicalJobId: string;
  slug: string;
  path: string;
  status: BundleStatus;
  createdAt: string | null;
  updatedAt: string | null;
  files: {
    jobOpening: boolean;
    userInsights: boolean;
    rankingContext: boolean;
  };
  humanResearch: {
    status: "awaiting-input";
    lastConfirmedAt: string | null;
  };
}

export interface PreparedResourceBundle {
  slug: string;
  bundleDir: string;
  writes: {
    jobOpening: WriteResult;
    userInsights: WriteResult;
    rankingContext: WriteResult;
  };
}

export interface ScoringProfile {
  $schema?: string;
  generatedAt: string;
  source: string;
  seniority: "senior";
  primaryRoles: string[];
  mustHaveSkills: string[];
  strongSkills: string[];
  domainSignals: DomainSignalKey[];
  languages: string[];
  locations: string[];
}
