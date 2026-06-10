/** Пари «до / після» у public/images/before-after/ */
export const BEFORE_AFTER_PAIR_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

export type BeforeAfterPairId = (typeof BEFORE_AFTER_PAIR_IDS)[number];

export type BeforeAfterPair = {
  id: BeforeAfterPairId;
  before: string;
  after: string;
};

const BASE = "/images/before-after";

/** До: `N.webp` · Після: `1-1`, `10-1`, `11-1` або `N-N` (2-2 … 9-9) */
export function getAfterImagePath(id: number): string {
  if (id === 1 || id === 10 || id === 11) {
    return `${BASE}/${id}-1.webp`;
  }
  return `${BASE}/${id}-${id}.webp`;
}

export function getBeforeAfterPair(id: number): BeforeAfterPair | null {
  const pairId = BEFORE_AFTER_PAIR_IDS.find((n) => n === id);
  if (!pairId) return null;
  return {
    id: pairId,
    before: `${BASE}/${pairId}.webp`,
    after: getAfterImagePath(pairId),
  };
}

export const BEFORE_AFTER_PAIRS: BeforeAfterPair[] = BEFORE_AFTER_PAIR_IDS.map(
  (id) => getBeforeAfterPair(id)!
);

export const BEFORE_AFTER_PAIR_COUNT = BEFORE_AFTER_PAIRS.length;
