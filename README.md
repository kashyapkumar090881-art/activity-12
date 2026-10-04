# HackerRank 3rd-Semester Algorithm Portfolio

## Student Metadata

| Field | Details |
|---|---|
| Name | `KASHYAP KUMAR M GHATKE` |
| USN / Student ID | `DCET2600465` |
| Semester | 3rd Semester |
| HackerRank Profile | https://www.hackerrank.com/profile/kashyapkumar0901 |
| GitHub Repository | `https://github.com/kashyapkumar090881-art/activity-12.git |

> Replace the bracketed placeholders with your own details before submitting.

## Portfolio Overview

This repository contains five JavaScript (Node.js) solutions for foundational data structures and algorithms exercises suitable for a third-semester computer science course. The set demonstrates array traversal, greedy selection, insertion sort mechanics, and binary search. Each solution reads HackerRank-style input from standard input and writes only the expected answer to standard output. The comments explain the central operation; the analyses below discuss correctness, complexity, and trade-offs.

Run an individual solution with Node.js from the repository root:

```bash
node 01-Mini-Max-Sum/solution.js < input.txt
```

Use the corresponding directory name to run any other solution.

## Problem Summary

| # | Problem Name | Algorithmic Pattern / Approach | Time Complexity | Space Complexity | HackerRank Challenge Link |
|---:|---|---|---:|---:|---|
| 1 | Mini-Max Sum | One-pass aggregate; subtract the excluded minimum/maximum | O(1) for five values | O(1) auxiliary | [Mini-Max Sum](https://www.hackerrank.com/challenges/mini-max-sum/problem) |
| 2 | Birthday Cake Candles | One-pass maximum and frequency count | O(n) | O(1) auxiliary | [Birthday Cake Candles](https://www.hackerrank.com/challenges/birthday-cake-candles/problem) |
| 3 | Insertion Sort - Part 1 | In-place-style right shifts into a sorted prefix | O(n²) including required output | O(n²) output snapshots | [Insertion Sort - Part 1](https://www.hackerrank.com/challenges/insertionsort1/problem) |
| 4 | Binary Search (Tutorial Intro) | Iterative divide-and-conquer on a sorted array | O(log n) | O(1) auxiliary | [Tutorial Intro](https://www.hackerrank.com/challenges/tutorial-intro/problem) |
| 5 | Mark and Toys | Greedy: sort prices, then take the cheapest affordable prefix | O(n log n) | O(n) input/price storage | [Mark and Toys](https://www.hackerrank.com/challenges/mark-and-toys/problem) |

Here, `n` is the number of input elements. “Auxiliary space” describes working memory beyond the input; implementation-level input parsing and required output storage are called out in each section.

## Detailed Algorithm Analysis

### 1. Mini-Max Sum

**Problem statement summary:** Given five integers, calculate the smallest and largest sums obtainable by adding exactly four of them. Print the minimum sum followed by the maximum sum.

**Chosen approach & strategy:** Compute the total sum once. The minimum four-element sum excludes one largest value; the maximum four-element sum excludes one smallest value.

**Key execution steps:**
1. Read the five integers.
2. Compute their total, minimum, and maximum.
3. Print `total - maximum` and `total - minimum`.

**Time complexity:** The total, minimum, and maximum each take a constant number of passes over the five values, so the required fixed-size problem is O(1). If generalized to `n` values, the traversal is O(n) + O(n) for built-in min/max scans, which simplifies to O(n).

**Auxiliary space complexity:** O(1) working space for the aggregate values. The solution retains the five parsed inputs (O(1) because the problem fixes their count); the Node.js line/token parser also uses space proportional to input size in a generalized setting.

**Alternative approach & trade-offs:** Sort the values and add the first/last four. Sorting is O(n log n), which is unnecessary when only the extrema and total are needed. Separate repeated summations for each exclusion are still linear for a fixed five values but repeat work.

**Efficiency justification:** A single total plus the extrema directly captures both required sums without sorting or repeated accumulation.

### 2. Birthday Cake Candles

**Problem statement summary:** Given candle heights, count how many candles have the maximum height.

**Chosen approach & strategy:** Scan once, keeping the current tallest height and the number of candles matching it. A newly observed maximum resets the count; an equal height increments it.

**Key execution steps:**
1. Read `n` and the `n` candle heights.
2. Initialize the tallest value below any valid height and the count to zero.
3. Update the maximum and its frequency as each height is visited.
4. Print the frequency.

**Time complexity:** Each of the `n` heights is inspected exactly once: O(n).

**Auxiliary space complexity:** O(1) beyond the input. The parsed heights are stored in O(n) space by this command-line implementation, but the counting algorithm itself needs only two scalar variables.

**Alternative approach & trade-offs:** Find the maximum in one pass and count it in another. This remains O(n) time and O(1) auxiliary space but does twice the traversal. Sorting is O(n log n) and uses more work than necessary.

**Efficiency justification:** The fused scan determines both the maximum and its multiplicity in the minimum possible number of input inspections.

### 3. Insertion Sort - Part 1

**Problem statement summary:** An array has a sorted prefix and one final value that belongs in that prefix. Insert the value in its correct position and print the entire array after every right shift and after the final placement.

**Chosen approach & strategy:** Save the last element, walk backward through the sorted prefix, and shift each larger value one position to the right. Then place the saved value in the newly opened position.

**Key execution steps:**
1. Save the final array value as the insertion value.
2. Compare it with prefix elements from right to left.
3. Shift each larger element right and record/print that intermediate array state.
4. Put the saved value at the first available location and print the final state.

**Time complexity:** In the worst case, the value moves across all `n - 1` prefix elements, so the insertion operation is O(n). The HackerRank-required output contains up to `n` full array snapshots, making total output construction O(n²) characters/work in the worst case; this implementation's end-to-end cost including that required output is O(n²).

**Auxiliary space complexity:** The insertion operation uses O(1) extra working space aside from the mutable result array. This implementation also retains up to `n` snapshots, each of length `n`, so output buffering is O(n²) space in the worst case. Streaming each snapshot could reduce output buffering, but would not change the required output volume.

**Alternative approach & trade-offs:** Build a new array by inserting the saved value into the correct position. That uses O(n) extra array space and still requires snapshots. A binary search could find the insertion position in O(log n), but shifting elements and printing intermediate states still costs O(n) and dominates this task.

**Efficiency justification:** The challenge asks to show the actual insertion-sort shifts; moving the value once through the prefix is optimal and directly exposes those dynamics.

### 4. Binary Search (HackerRank Tutorial Intro)

**Problem statement summary:** Given a target and an ascending sorted array, return the target’s zero-based index. The solution follows HackerRank’s Tutorial Intro input order: target, array length, then array values.

**Chosen approach & strategy:** Iteratively maintain an inclusive candidate interval. Compare the target to the middle element and discard the half that cannot contain it. The input contract guarantees that the array is in ascending order.

**Key execution steps:**
1. Read the target, `n`, and the sorted values.
2. Initialize the search interval to indices `0` through `n - 1`.
3. Inspect the midpoint; return its index if it matches.
4. Otherwise move the left or right boundary to keep only the possible half.
5. Print the index, or `-1` if the interval becomes empty.

**Time complexity:** Each comparison approximately halves the remaining candidates. After `k` iterations, at most `n / 2^k` candidates remain; reaching one candidate takes `k = O(log n)` comparisons. Reading and parsing standard input takes O(n), but the binary-search operation itself is O(log n).

**Auxiliary space complexity:** O(1) for the boundaries, midpoint, and result. The input array itself takes O(n) space in the Node.js parser, separate from the search’s auxiliary memory.

**Alternative approach & trade-offs:** A linear scan takes O(n) time but works on unsorted data. A recursive binary search has the same O(log n) time but uses O(log n) call-stack space. Binary search trees are a different structure: lookup is O(log n) only when the tree is suitably balanced, while this array solution relies on sorted indexing.

**Efficiency justification:** For a sorted array, halving the search interval provides logarithmic comparisons and is asymptotically faster than scanning for large inputs.

### 5. Mark and Toys

**Problem statement summary:** Given toy prices and a budget, buy as many toys as possible without exceeding the budget.

**Chosen approach & strategy:** Sort prices from lowest to highest, then greedily purchase each next-cheapest toy while it still fits within the remaining budget.

**Key execution steps:**
1. Read the number of toys, budget, and prices.
2. Sort the prices in ascending numeric order.
3. Accumulate the cost and count toys until the next purchase would exceed the budget.
4. Print the count.

**Time complexity:** Sorting takes O(n log n); the subsequent scan takes O(n). The total is O(n log n).

**Auxiliary space complexity:** The purchase scan uses O(1) state. The parser stores the input and the extracted prices in O(n) space; prices are sorted in place. JavaScript’s built-in sort may use implementation-dependent workspace.

**Alternative approach & trade-offs:** Enumerating combinations can identify the best set but is exponential in the number of toys. A min-heap can support repeated cheapest-item extraction, but would add data-structure overhead and does not improve the overall sorting bound for a single batch.

**Efficiency justification:** Since all prices are non-negative, replacing any selected expensive toy with an unselected cheaper one never increases spending. Therefore, the cheapest affordable prefix yields the maximum possible count.



## Reflective Summary

Working through this portfolio helped me connect algorithm descriptions to executable code and reason precisely about the cost of each operation. Mini-Max Sum and Birthday Cake Candles reinforced the value of a single pass: a small set of maintained values can replace repeated scans or sorting. Mark and Toys showed how a greedy choice can be proven correct when prices are non-negative—the cheapest available purchase always preserves the largest number of future options. Insertion Sort - Part 1 made the mechanics of shifting explicit, including how the sorted-prefix invariant is maintained and why output requirements can add substantial work beyond the core algorithm. Binary Search demonstrated divide-and-conquer on a sorted array, with logarithmic comparisons, and clarified that an array-based binary search is distinct from searching a Binary Search Tree. A balanced tree can provide logarithmic lookup while an unbalanced one may degrade to linear time. Across the problems, I learned to distinguish auxiliary memory from input and required output storage, and to select alternatives based on constraints rather than habit. Finally, checking edge cases—duplicate maxima, insertion at either end, missing search targets, and budgets that cannot afford the cheapest toy—made the solutions more reliable and strengthened my understanding of correctness as well as efficiency.
