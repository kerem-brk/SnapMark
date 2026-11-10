export interface DiffLine {
  type: "added" | "removed" | "unchanged";
  value: string;
  oldLineNumber?: number;
  newLineNumber?: number;
}

/**
 * Computes line-by-line diff between two strings using Longest Common Subsequence (LCS).
 * Produces unified diff lines with accurate line numbers and +/- indicators.
 */
export function computeLineDiff(beforeText: string, afterText: string): DiffLine[] {
  const beforeLines = (beforeText || "").split("\n");
  const afterLines = (afterText || "").split("\n");

  const m = beforeLines.length;
  const n = afterLines.length;

  // DP table for LCS
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (beforeLines[i - 1] === afterLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to reconstruct the diff lines
  const stack: DiffLine[] = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && beforeLines[i - 1] === afterLines[j - 1]) {
      stack.push({
        type: "unchanged",
        value: beforeLines[i - 1],
        oldLineNumber: i,
        newLineNumber: j,
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({
        type: "added",
        value: afterLines[j - 1],
        newLineNumber: j,
      });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      stack.push({
        type: "removed",
        value: beforeLines[i - 1],
        oldLineNumber: i,
      });
      i--;
    }
  }

  return stack.reverse();
}

/**
 * Splits diff into side-by-side aligned rows for split view
 */
export interface SplitDiffRow {
  before?: {
    lineNumber: number;
    value: string;
    type: "removed" | "unchanged";
  };
  after?: {
    lineNumber: number;
    value: string;
    type: "added" | "unchanged";
  };
}

export function computeSplitDiff(beforeText: string, afterText: string): SplitDiffRow[] {
  const unified = computeLineDiff(beforeText, afterText);
  const rows: SplitDiffRow[] = [];

  let i = 0;
  while (i < unified.length) {
    const item = unified[i];

    if (item.type === "unchanged") {
      rows.push({
        before: {
          lineNumber: item.oldLineNumber || 0,
          value: item.value,
          type: "unchanged",
        },
        after: {
          lineNumber: item.newLineNumber || 0,
          value: item.value,
          type: "unchanged",
        },
      });
      i++;
    } else if (item.type === "removed") {
      // Check if next item is added (replacement block)
      if (i + 1 < unified.length && unified[i + 1].type === "added") {
        rows.push({
          before: {
            lineNumber: item.oldLineNumber || 0,
            value: item.value,
            type: "removed",
          },
          after: {
            lineNumber: unified[i + 1].newLineNumber || 0,
            value: unified[i + 1].value,
            type: "added",
          },
        });
        i += 2;
      } else {
        rows.push({
          before: {
            lineNumber: item.oldLineNumber || 0,
            value: item.value,
            type: "removed",
          },
        });
        i++;
      }
    } else if (item.type === "added") {
      rows.push({
        after: {
          lineNumber: item.newLineNumber || 0,
          value: item.value,
          type: "added",
        },
      });
      i++;
    }
  }

  return rows;
}

/**
 * Direct alias for computeLineDiff
 */
export const computeDiff = computeLineDiff;

