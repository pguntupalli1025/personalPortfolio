export interface RepoLanguage {
  name: string;
  color: string | null;
}

export interface ProjectRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage: RepoLanguage | null;
  /** Shown on the card outside the description dropdown */
  badge: string | null;
}

interface GraphQLRepository {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage: RepoLanguage | null;
}

interface ReposByNameResponse {
  data?: {
    repository?: GraphQLRepository | null;
  };
  errors?: Array<{ message: string }>;
}

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const DEFAULT_USERNAME = "pguntupalli1025";

/** Only these repos appear on /projects — edit this list to change what's shown */
export const FEATURED_REPO_NAMES = [
  "LostChain",
  "viro",
  "cs3200-FairShare",
] as const;

/**
 * Dropdown copy for each featured project.
 */
export const PROJECT_DESCRIPTIONS: Record<
  (typeof FEATURED_REPO_NAMES)[number],
  string
> = {
  LostChain:
    "Blockchain lost-and-found for college campuses. Descriptions are hashed on-chain for privacy. Smart contracts match owners with finders and release escrowed ETH rewards automatically. Next.js and Solidity on Ethereum.",
  viro: "VIRO (Viral Intelligence and Response Orchestrator): AI triage, routing, and surveillance for pandemic response. Patients get GPT-4o triage tiers. Providers get live network graphs, pattern detection, and outbreak forecasts. Next.js, Supabase, OpenAI.",
  "cs3200-FairShare":
    "RoommateSync: shared living platform for splitting expenses, chores, groceries, and maintenance across roommates, household leads, and property managers. Streamlit UI, Flask API, MySQL.",
};

/** Badge shown on the card (outside the dropdown) */
export const PROJECT_BADGES: Partial<
  Record<(typeof FEATURED_REPO_NAMES)[number], string>
> = {
  LostChain: "3rd · BU Blockchain Hackathon 2025",
  viro: "InnovAIte 2026",
};

/** Language chip override so cards match each project's real stack */
export const PROJECT_LANGUAGES: Record<
  (typeof FEATURED_REPO_NAMES)[number],
  RepoLanguage
> = {
  LostChain: { name: "TypeScript", color: "#3178c6" },
  viro: { name: "TypeScript", color: "#3178c6" },
  "cs3200-FairShare": { name: "Python", color: "#3572A5" },
};

const PLACEHOLDER_PROJECTS: ProjectRepo[] = [
  {
    name: "LostChain",
    description: PROJECT_DESCRIPTIONS.LostChain,
    url: "https://github.com/pguntupalli1025/LostChain",
    stargazerCount: 0,
    primaryLanguage: PROJECT_LANGUAGES.LostChain,
    badge: PROJECT_BADGES.LostChain ?? null,
  },
  {
    name: "viro",
    description: PROJECT_DESCRIPTIONS.viro,
    url: "https://github.com/pguntupalli1025/viro",
    stargazerCount: 0,
    primaryLanguage: PROJECT_LANGUAGES.viro,
    badge: PROJECT_BADGES.viro ?? null,
  },
  {
    name: "cs3200-FairShare",
    description: PROJECT_DESCRIPTIONS["cs3200-FairShare"],
    url: "https://github.com/pguntupalli1025/cs3200-FairShare",
    stargazerCount: 0,
    primaryLanguage: PROJECT_LANGUAGES["cs3200-FairShare"],
    badge: null,
  },
];

function mapRepo(repo: GraphQLRepository): ProjectRepo {
  const key = repo.name as (typeof FEATURED_REPO_NAMES)[number];

  return {
    name: repo.name,
    description: PROJECT_DESCRIPTIONS[key] ?? repo.description,
    url: repo.url,
    stargazerCount: repo.stargazerCount,
    primaryLanguage: PROJECT_LANGUAGES[key] ?? repo.primaryLanguage,
    badge: PROJECT_BADGES[key] ?? null,
  };
}

async function githubGraphQL<T>(
  query: string,
  variables?: Record<string, string | number>,
): Promise<T | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

const REPO_QUERY = `
  query ($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      description
      url
      stargazerCount
      primaryLanguage {
        name
        color
      }
    }
  }
`;

export async function getPinnedProjects(): Promise<{
  projects: ProjectRepo[];
  isFallback: boolean;
}> {
  const owner = process.env.GITHUB_USERNAME ?? DEFAULT_USERNAME;

  const results = await Promise.all(
    FEATURED_REPO_NAMES.map(async (name) => {
      const data = await githubGraphQL<ReposByNameResponse>(REPO_QUERY, {
        owner,
        name,
      });
      const repo = data?.data?.repository;
      return repo ? mapRepo(repo) : null;
    }),
  );

  const projects = results.filter((repo): repo is ProjectRepo => repo !== null);

  if (projects.length === 0) {
    return { projects: PLACEHOLDER_PROJECTS, isFallback: true };
  }

  return { projects, isFallback: false };
}
