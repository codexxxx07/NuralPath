/**
 * DSA content library. Every topic page is generated from this data so the
 * learning structure stays identical: introduction → concepts → visual →
 * code → complexity → practice → mistakes → related topics.
 */

export const dsaTopics = [
  {
    slug: "arrays",
    title: "Arrays",
    subtitle: "Contiguous memory, index arithmetic and the two-pointer family.",
    tone: "#3f6285",
    label: "DS-01",
    level: "Foundation",
    readTime: "25 min",
    stack: ["Contiguous memory", "Two pointers", "Prefix sums", "Sliding window"],
    intro: [
      "An array stores elements in one contiguous block of memory. Because every element has the same size, the address of index i is simply base + i × element_size. That one fact explains both the greatest strength and the greatest weakness of arrays: indexing is constant time, but inserting in the middle requires shifting everything after it.",
      "Most interview problems that look like they need something clever are solved by exploiting contiguity — two pointers converging, a window sliding forward, or a prefix sum that turns a range query into one subtraction.",
    ],
    concepts: [
      {
        title: "Random access is the whole point",
        body: "Indexing is O(1) because the address is computed, not searched. Any structure that promises the same speed must reproduce contiguous, fixed-size layout or an equivalent direct mapping (like a hash table).",
        bullets: [
          "Reading and writing a[i] is one arithmetic operation plus one memory access.",
          "Iteration is cache-friendly: neighbouring elements live on the same cache line.",
          "A dynamic array (vector) is a fixed array plus a length; growing copies into a bigger block.",
        ],
      },
      {
        title: "Two pointers",
        body: "If the array is sorted, or if you need a pair satisfying a monotone condition, two indices moving toward each other can replace a nested loop and reduce O(n²) to O(n).",
        bullets: [
          "Opposite ends: two-sum on a sorted array, container with most water, palindrome check.",
          "Same direction: remove duplicates in place, move zeroes, merge two sorted arrays.",
          "The invariant matters more than the code: state what is always true between the pointers.",
        ],
      },
      {
        title: "Prefix sums and sliding windows",
        body: "A prefix array P where P[i] is the sum of the first i elements makes every subarray sum O(1): sum(l..r) = P[r+1] − P[l]. Sliding windows maintain a running aggregate over a window whose boundaries only move forward.",
        bullets: [
          "Prefix sums answer static range-sum queries in constant time.",
          "A sliding window works when adding an element never invalidates earlier progress (monotone condition).",
          "For negative numbers, a hash map of prefix sums is often needed instead of a window.",
        ],
      },
      {
        title: "In-place algorithms and invariants",
        body: "In-place means O(1) auxiliary space. The technique is to partition the array into regions with an invariant — for example, [0, slow) is processed, [slow, fast) is not.",
        bullets: [
          "Dutch national flag partitions into three regions around a pivot.",
          "Rotation by reversal uses three reversals and no extra array.",
          "Always re-check the invariant after every write.",
        ],
      },
    ],
    visual: {
      kind: "array",
      algorithm: "binarySearch",
      caption:
        "Binary search keeps the candidate region between lo and hi. Each frame shows the midpoint inspected and the half that gets discarded — this works only because the array is sorted.",
    },
    code: [
      {
        title: "Two-sum on a sorted array",
        lang: "c",
        note: "Sorted input lets the pointers eliminate one candidate per step: O(n) time, O(1) space.",
        code: `int two_sum_sorted(const int *a, int n, int target, int *out) {
    int lo = 0, hi = n - 1;
    while (lo < hi) {
        int sum = a[lo] + a[hi];
        if (sum == target) { out[0] = lo; out[1] = hi; return 1; }
        if (sum < target) lo++;   /* need a larger sum */
        else hi--;                /* need a smaller sum */
    }
    return 0;
}`,
      },
      {
        title: "Prefix sums for range queries",
        lang: "javascript",
        note: "Build once in O(n), then answer any range sum in O(1).",
        code: `function prefixSums(a) {
  const p = new Array(a.length + 1).fill(0);
  for (let i = 0; i < a.length; i++) p[i + 1] = p[i] + a[i];
  return p;
}

function rangeSum(p, l, r) {
  return p[r + 1] - p[l]; // inclusive l..r
}`,
      },
    ],
    complexity: [
      { operation: "Access a[i]", time: "O(1)", space: "O(1)", note: "Address arithmetic" },
      { operation: "Search (unsorted)", time: "O(n)", space: "O(1)", note: "Linear scan" },
      { operation: "Search (sorted)", time: "O(log n)", space: "O(1)", note: "Binary search" },
      { operation: "Insert at end (dynamic)", time: "O(1) amortised", space: "O(n)", note: "Occasional realloc" },
      { operation: "Insert / delete in middle", time: "O(n)", space: "O(1)", note: "Shift elements" },
    ],
    practice: [
      {
        title: "Move zeroes",
        difficulty: "Easy",
        prompt: "Move all zeroes to the end while keeping the relative order of non-zero elements. Do it in place.",
        hint: "Maintain a write pointer for the next non-zero position; swap, don't shift.",
      },
      {
        title: "Subarray sum equals K",
        difficulty: "Medium",
        prompt: "Count the contiguous subarrays whose sum equals K. The array may contain negative values.",
        hint: "A sliding window fails with negatives. Store prefix-sum frequencies in a hash map.",
      },
      {
        title: "Container with most water",
        difficulty: "Medium",
        prompt: "Given heights, choose two lines forming a container holding the most water.",
        hint: "Move the shorter line inward — moving the taller one can never increase the area.",
      },
      {
        title: "Product of array except self",
        difficulty: "Medium",
        prompt: "Return an array where each element is the product of all others, without division.",
        hint: "One pass of prefix products, one pass of suffix products.",
      },
    ],
    mistakes: [
      "Using a sliding window with negative numbers — the window is no longer monotone.",
      "Off-by-one errors in binary search: decide once whether hi is inclusive and keep it consistent.",
      "Forgetting that a dynamic array's growth invalidates previously stored pointers.",
      "Assuming O(1) insertion at the end is worst-case O(1) — a reallocation is O(n).",
    ],
    related: [
      { label: "Strings", to: "/dsa/strings" },
      { label: "Stack & Queue", to: "/dsa/stack-queue" },
      { label: "Practice problems", to: "/dsa/practice" },
    ],
  },
  {
    slug: "strings",
    title: "Strings",
    subtitle: "Character arrays, hashing, palindromes and pattern matching.",
    tone: "#6b7f4a",
    label: "DS-02",
    level: "Foundation",
    readTime: "24 min",
    stack: ["Hashing", "Sliding window", "Two pointers", "KMP"],
    intro: [
      "A string is an array of characters with an encoding contract. In C it is a null-terminated char array; in JavaScript it is an immutable sequence of UTF-16 code units. Almost every string algorithm is an array algorithm with one extra decision: are you allowed to allocate, or must you work in place?",
      "Most interview string questions reduce to counting, windowing, or matching. Recognising which of the three you need is most of the work.",
    ],
    concepts: [
      {
        title: "Frequency maps beat nested loops",
        body: "Anagram checks, character counts and 'first unique character' all collapse to a frequency table. With a fixed alphabet the table is an array of 26 (or 128) counters, giving O(n) time and O(1) space.",
        bullets: [
          "Fixed alphabet → array counters; arbitrary Unicode → hash map.",
          "Compare frequency vectors to test anagrams without sorting.",
          "Update counts incrementally when a window slides.",
        ],
      },
      {
        title: "Window on a string",
        body: "Longest substring without repeating characters, minimum window substring and at most K distinct characters all use the same template: expand right, shrink left while invalid, record the best window.",
        bullets: [
          "Track how many distinct characters are inside the window.",
          "Shrink with a while loop, never an if — the window may need several removals.",
          "Record the answer after the window becomes valid.",
        ],
      },
      {
        title: "Palindrome structure",
        body: "A palindrome is symmetric about its centre. Expanding around each of the 2n−1 centres finds the longest palindromic substring in O(n²) without the O(n³) of testing every substring.",
        bullets: [
          "Odd centres are characters; even centres are gaps between characters.",
          "Two pointers from both ends detect palindromes in O(n).",
          "Manacher's algorithm reaches O(n) but is rarely required in interviews.",
        ],
      },
      {
        title: "Pattern matching",
        body: "Naive matching is O(n·m). KMP precomputes a failure table so the pattern never moves backwards, giving O(n + m). Rabin–Karp hashes windows for expected O(n + m).",
        bullets: [
          "The KMP failure table encodes the longest proper prefix that is also a suffix.",
          "Hashing needs care with collisions; double hashing reduces the risk.",
          "For repeated searches of one pattern, precompute once and reuse.",
        ],
      },
    ],
    visual: {
      kind: "array",
      algorithm: "linearSearch",
      caption:
        "A character scan is a linear search over positions. Watch how each comparison advances exactly one index — the same invariant used when scanning a string for a character or a delimiter.",
    },
    code: [
      {
        title: "Longest substring without repeating characters",
        lang: "javascript",
        note: "Sliding window with the last seen index: O(n) time, O(min(n, alphabet)) space.",
        code: `function longestUnique(s) {
  const last = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (last.has(ch) && last.get(ch) >= left) {
      left = last.get(ch) + 1;
    }
    last.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
      },
      {
        title: "Valid palindrome with two pointers",
        lang: "c",
        note: "Skip non-alphanumeric characters and compare case-insensitively.",
        code: `#include <ctype.h>
int is_palindrome(const char *s) {
    int i = 0, j = (int)strlen(s) - 1;
    while (i < j) {
        while (i < j && !isalnum((unsigned char)s[i])) i++;
        while (i < j && !isalnum((unsigned char)s[j])) j--;
        if (tolower((unsigned char)s[i]) != tolower((unsigned char)s[j])) return 0;
        i++; j--;
    }
    return 1;
}`,
      },
    ],
    complexity: [
      { operation: "Character access", time: "O(1)", space: "O(1)", note: "Indexing" },
      { operation: "Concatenate (immutable)", time: "O(n + m)", space: "O(n + m)", note: "New allocation" },
      { operation: "Anagram check", time: "O(n)", space: "O(1)", note: "Fixed counters" },
      { operation: "Naive substring search", time: "O(n·m)", space: "O(1)", note: "Backtracking" },
      { operation: "KMP search", time: "O(n + m)", space: "O(m)", note: "Failure table" },
    ],
    practice: [
      {
        title: "Group anagrams",
        difficulty: "Medium",
        prompt: "Group words that are anagrams of each other.",
        hint: "The sorted word, or its 26-length count signature, is a canonical key.",
      },
      {
        title: "Minimum window substring",
        difficulty: "Hard",
        prompt: "Find the smallest substring of s containing every character of t, including duplicates.",
        hint: "Maintain a need/have count; shrink while the window is valid.",
      },
      {
        title: "Longest palindromic substring",
        difficulty: "Medium",
        prompt: "Return the longest substring that reads the same forwards and backwards.",
        hint: "Expand around 2n−1 centres.",
      },
      {
        title: "String compression",
        difficulty: "Easy",
        prompt: "Compress runs of characters in place, e.g. aabccc → a2bc3.",
        hint: "Write pointer and a read pointer; write the count after the run ends.",
      },
    ],
    mistakes: [
      "Treating a string as mutable when the language makes it immutable — repeated concatenation becomes O(n²).",
      "Assuming ASCII; Unicode case folding and grapheme clusters differ from code units.",
      "Forgetting the empty string and single-character edge cases.",
      "Using a window without checking that the validity condition is monotone.",
    ],
    related: [
      { label: "Arrays", to: "/dsa/arrays" },
      { label: "Dynamic Programming", to: "/dsa/dp" },
      { label: "Interview questions", to: "/dsa/interview-questions" },
    ],
  },
  {
    slug: "linked-list",
    title: "Linked Lists",
    subtitle: "Nodes, pointers, reversal, cycles and the dummy-head pattern.",
    tone: "#7a5a3c",
    label: "DS-03",
    level: "Foundation",
    readTime: "28 min",
    stack: ["Singly linked", "Doubly linked", "Two pointers", "Dummy head"],
    intro: [
      "A linked list is a chain of nodes, each holding a value and a reference to the next node. There is no index arithmetic: reaching the k-th node costs k steps. In exchange, inserting or removing a node you already hold is O(1) and needs no shifting.",
      "The linked list is the best place to become fluent with pointer manipulation, because every bug is visible: a lost pointer, a cycle, or a null dereference.",
    ],
    concepts: [
      {
        title: "The dummy head removes special cases",
        body: "Most insertion and deletion code branches on 'is this the head?'. Allocating a dummy node whose next points at the head collapses those branches into one uniform loop.",
        bullets: [
          "Create dummy, link it to head, walk with prev starting at dummy.",
          "Return dummy.next at the end.",
          "Never lose the reference to the original head until you have re-linked.",
        ],
      },
      {
        title: "Reversal is three pointers",
        body: "Iterative reversal keeps prev, curr and next. Save next before overwriting curr.next, then advance. The loop ends with prev as the new head.",
        bullets: [
          "Order matters: save, reverse, advance.",
          "Recursive reversal is elegant but uses O(n) stack space.",
          "Reversing a sublist requires stitching both ends back.",
        ],
      },
      {
        title: "Fast and slow pointers",
        body: "Two pointers moving at different speeds detect cycles (Floyd), find the middle in one pass, and locate the k-th node from the end.",
        bullets: [
          "If fast meets slow, a cycle exists.",
          "Reset one pointer to the head and advance both by one to find the cycle entry.",
          "For the middle, stop when fast is null or fast.next is null — decide which for even lengths.",
        ],
      },
      {
        title: "When a list beats an array",
        body: "Linked lists win when you already hold a node and need O(1) removal, or when you need stable references that survive insertion elsewhere. They lose on cache locality and random access.",
        bullets: [
          "LRU cache: hash map to node plus a doubly linked list for O(1) eviction.",
          "Free lists inside allocators.",
          "Avoid linked lists when iteration dominates — arrays are far faster in practice.",
        ],
      },
    ],
    visual: {
      kind: "linkedlist",
      caption:
        "Each step follows one `next` pointer from the head. The list ends at null — a traversal that never reaches null has found a cycle.",
    },
    code: [
      {
        title: "Iterative reversal",
        lang: "c",
        note: "Save next before rewiring; O(n) time, O(1) space.",
        code: `typedef struct Node { int value; struct Node *next; } Node;

Node *reverse(Node *head) {
    Node *prev = NULL;
    while (head) {
        Node *next = head->next;  /* save */
        head->next = prev;        /* reverse */
        prev = head;              /* advance */
        head = next;
    }
    return prev;
}`,
      },
      {
        title: "Detect a cycle (Floyd)",
        lang: "javascript",
        note: "If a cycle exists, the fast pointer must eventually lap the slow one.",
        code: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
      },
    ],
    complexity: [
      { operation: "Access by index", time: "O(n)", space: "O(1)", note: "Walk from head" },
      { operation: "Insert at head", time: "O(1)", space: "O(1)", note: "Rewire one pointer" },
      { operation: "Delete given node (doubly)", time: "O(1)", space: "O(1)", note: "Adjust neighbours" },
      { operation: "Search", time: "O(n)", space: "O(1)", note: "Linear" },
      { operation: "Reverse", time: "O(n)", space: "O(1)", note: "Iterative" },
    ],
    practice: [
      {
        title: "Merge two sorted lists",
        difficulty: "Easy",
        prompt: "Merge two sorted linked lists into one sorted list by re-linking nodes.",
        hint: "Dummy head plus a tail pointer; attach the remainder at the end.",
      },
      {
        title: "Remove the N-th node from the end",
        difficulty: "Medium",
        prompt: "Do it in one pass.",
        hint: "Advance a lead pointer N steps, then move both until lead reaches the end.",
      },
      {
        title: "Reverse nodes in k-group",
        difficulty: "Hard",
        prompt: "Reverse every k consecutive nodes; leave a shorter remainder as is.",
        hint: "Check that k nodes exist before reversing; stitch prev-group to the new head.",
      },
      {
        title: "Intersection of two lists",
        difficulty: "Medium",
        prompt: "Find the node where two singly linked lists merge, in O(1) space.",
        hint: "Switch to the other list's head at the end; both pointers then travel the same distance.",
      },
    ],
    mistakes: [
      "Losing the rest of the list by overwriting next before saving it.",
      "Dereferencing null when the list is empty or has one node.",
      "Returning the dummy node instead of dummy.next.",
      "Using a singly linked list for an LRU cache — O(1) eviction needs the previous pointer.",
    ],
    related: [
      { label: "Stack & Queue", to: "/dsa/stack-queue" },
      { label: "Trees", to: "/dsa/trees" },
      { label: "Cheat sheets", to: "/dsa/cheat-sheets" },
    ],
  },
  {
    slug: "stack-queue",
    title: "Stack & Queue",
    subtitle: "LIFO and FIFO, monotonic stacks, deques and scheduling.",
    tone: "#8a5a52",
    label: "DS-04",
    level: "Foundation",
    readTime: "26 min",
    stack: ["LIFO", "FIFO", "Monotonic stack", "Deque", "BFS"],
    intro: [
      "A stack pushes and pops at one end; a queue adds at the back and removes at the front. Both are restricted lists, and that restriction is exactly what makes them useful: the constraint encodes an ordering discipline.",
      "Stacks model nesting — function calls, brackets, undo history, DFS. Queues model fairness and breadth — BFS, scheduling, buffering. Once you see a nesting or level-order requirement, the right structure is usually already decided.",
    ],
    concepts: [
      {
        title: "Stacks model nesting",
        body: "Anything that must be resolved in reverse order of appearance is a stack: matching brackets, evaluating postfix expressions, parsing nested structures, DFS.",
        bullets: [
          "Push an opening token, pop on the matching close.",
          "A stack can simulate recursion without the call-stack limit.",
          "Two stacks implement a queue with amortised O(1) operations.",
        ],
      },
      {
        title: "Monotonic stacks",
        body: "To find the next greater or smaller element, keep a stack of indices whose values are monotone. When a new value breaks the order, pop and resolve every element it dominates.",
        bullets: [
          "Each index is pushed and popped at most once → O(n).",
          "Next greater element, largest rectangle in histogram, daily temperatures.",
          "Store indices, not values, so you can compute distances.",
        ],
      },
      {
        title: "Queues and BFS",
        body: "Breadth-first search is a queue plus a visited set. Processing in FIFO order guarantees nodes are reached in increasing distance from the source.",
        bullets: [
          "Enqueue neighbours when first discovered; never enqueue twice.",
          "A deque supports 0-1 BFS, sliding-window maxima and work stealing.",
          "A circular buffer implements a bounded queue with O(1) space overhead.",
        ],
      },
      {
        title: "Choosing an implementation",
        body: "An array-backed stack is the fastest in practice. For queues, shifting an array is O(n), so use a ring buffer or a linked list. In JavaScript, an array with a moving head index avoids repeated shift cost.",
        bullets: [
          "Preallocate when an upper bound is known.",
          "Check empty before pop/dequeue — underflow is a real interview scenario.",
          "For thread-safe queues, the ring buffer is easier to make lock-free.",
        ],
      },
    ],
    visual: {
      kind: "stack",
      caption:
        "Push and pop act on the top only. A queue uses the same instrument but removes from the front instead — try both instruments on this page's topic siblings.",
    },
    code: [
      {
        title: "Next greater element with a monotonic stack",
        lang: "javascript",
        note: "Every index enters and leaves the stack once, so the total work is O(n).",
        code: `function nextGreater(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // indices, values strictly decreasing
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack.at(-1)] < nums[i]) {
      result[stack.pop()] = nums[i];
    }
    stack.push(i);
  }
  return result;
}`,
      },
      {
        title: "Queue built from two stacks",
        lang: "c",
        note: "Each element is moved at most once, giving amortised O(1) dequeue.",
        code: `typedef struct { int in[256], out[256]; int ni, no; } Queue;

void enqueue(Queue *q, int v) { q->in[q->ni++] = v; }

int dequeue(Queue *q) {
    if (q->no == 0) {
        while (q->ni > 0) q->out[q->no++] = q->in[--q->ni];
    }
    return q->out[--q->no];
}`,
      },
    ],
    complexity: [
      { operation: "Stack push / pop", time: "O(1)", space: "O(1)", note: "Top only" },
      { operation: "Queue enqueue / dequeue (ring)", time: "O(1)", space: "O(1)", note: "Front and back indices" },
      { operation: "Monotonic stack pass", time: "O(n)", space: "O(n)", note: "Each index once" },
      { operation: "BFS", time: "O(V + E)", space: "O(V)", note: "Queue + visited" },
    ],
    practice: [
      {
        title: "Valid parentheses",
        difficulty: "Easy",
        prompt: "Determine whether a string of brackets is correctly nested.",
        hint: "Push openers; on a closer, the top must be its match.",
      },
      {
        title: "Largest rectangle in histogram",
        difficulty: "Hard",
        prompt: "Find the largest rectangle that fits under the histogram.",
        hint: "Increasing stack of indices; pop when a lower bar appears and compute width.",
      },
      {
        title: "Sliding window maximum",
        difficulty: "Hard",
        prompt: "Return the maximum of every window of size k.",
        hint: "Monotonic deque of indices; drop out-of-window indices from the front.",
      },
      {
        title: "Implement a circular queue",
        difficulty: "Medium",
        prompt: "Support enqueue, dequeue, front, rear and isFull with a fixed array.",
        hint: "Use (head + count) % capacity for the tail.",
      },
    ],
    mistakes: [
      "Calling pop or dequeue on an empty structure without checking.",
      "Using array.shift() in a loop — O(n) each time turns BFS into O(n²).",
      "Forgetting to pop equal elements in a monotonic stack when the requirement is strictly greater.",
      "Enqueuing a node multiple times in BFS because the visited check happens after enqueue.",
    ],
    related: [
      { label: "Arrays", to: "/dsa/arrays" },
      { label: "Graphs", to: "/dsa/graphs" },
      { label: "Trees", to: "/dsa/trees" },
    ],
  },
  {
    slug: "trees",
    title: "Trees",
    subtitle: "Binary trees, traversals, BST invariants and recursion.",
    tone: "#4d6b4f",
    label: "DS-05",
    level: "Intermediate",
    readTime: "32 min",
    stack: ["Binary tree", "BST", "DFS", "BFS", "Balancing"],
    intro: [
      "A tree is a connected acyclic graph with a designated root. Binary trees restrict each node to two children, which is enough to encode search order, expression structure and hierarchical data.",
      "Trees are where recursion stops feeling abstract: the structure is self-similar, so the natural solution is a function that solves the left subtree, the right subtree, and combines the results.",
    ],
    concepts: [
      {
        title: "Four traversals, one recursion shape",
        body: "Preorder visits node-left-right, inorder left-node-right, postorder left-right-node, and level order uses a queue. The recursion differs only in where the visit happens.",
        bullets: [
          "Inorder on a BST yields sorted order.",
          "Postorder is used when children must be processed before the parent — deletion, evaluation.",
          "Level order is BFS and processes one depth at a time.",
        ],
      },
      {
        title: "BST invariant",
        body: "For every node, all values in the left subtree are smaller and all values in the right subtree are larger. Checking only immediate children is a classic bug — the bound must be inherited.",
        bullets: [
          "Validate with (min, max) bounds passed down, not a local comparison.",
          "Search, insert and delete are O(h): O(log n) balanced, O(n) degenerate.",
          "Deleting a node with two children replaces it with its inorder successor.",
        ],
      },
      {
        title: "Height, depth and balance",
        body: "Height is the longest path from a node to a leaf. A tree is height-balanced when the two subtree heights differ by at most one at every node. Balance determines whether operations stay logarithmic.",
        bullets: [
          "Compute height bottom-up in one pass; return −1 to signal imbalance early.",
          "AVL trees rebalance with rotations after every insertion.",
          "Red-black trees trade perfect balance for fewer rotations.",
        ],
      },
      {
        title: "Trees as recursive contracts",
        body: "For most tree problems, define what the function returns for a subtree, then combine. Diameter returns height while updating a global maximum; lowest common ancestor returns the node found or null.",
        bullets: [
          "Write the base case first: null returns the identity.",
          "Decide whether the answer is a return value or a side effect.",
          "Beware of deep recursion on skewed trees — use an explicit stack when needed.",
        ],
      },
    ],
    visual: {
      kind: "tree",
      caption:
        "Pick inorder, preorder or postorder and step through the visit order. The highlighted nodes are exactly the ones already visited in that traversal.",
    },
    code: [
      {
        title: "Iterative inorder traversal",
        lang: "javascript",
        note: "An explicit stack replaces recursion, avoiding call-stack limits on skewed trees.",
        code: `function inorder(root) {
  const out = [];
  const stack = [];
  let node = root;
  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    out.push(node.value);
    node = node.right;
  }
  return out;
}`,
      },
      {
        title: "Validate a BST with inherited bounds",
        lang: "c",
        note: "Passing bounds down is what makes this correct; checking children locally is not enough.",
        code: `int valid_bst(const Node *n, long lo, long hi) {
    if (!n) return 1;
    if (n->value <= lo || n->value >= hi) return 0;
    return valid_bst(n->left, lo, n->value) &&
           valid_bst(n->right, n->value, hi);
}`,
      },
    ],
    complexity: [
      { operation: "Traversal", time: "O(n)", space: "O(h)", note: "Recursion depth h" },
      { operation: "BST search / insert", time: "O(h)", space: "O(1)", note: "h = height" },
      { operation: "Balanced BST operation", time: "O(log n)", space: "O(1)", note: "h ≈ log n" },
      { operation: "Skewed tree operation", time: "O(n)", space: "O(1)", note: "h = n" },
    ],
    practice: [
      {
        title: "Maximum depth",
        difficulty: "Easy",
        prompt: "Return the number of nodes on the longest root-to-leaf path.",
        hint: "1 + max(depth(left), depth(right)), null is 0.",
      },
      {
        title: "Lowest common ancestor",
        difficulty: "Medium",
        prompt: "Find the deepest node that is an ancestor of both given nodes in a binary tree.",
        hint: "Return the node if it matches either target; combine left and right results.",
      },
      {
        title: "Binary tree level order",
        difficulty: "Medium",
        prompt: "Return the values level by level as a list of lists.",
        hint: "Record the queue length at the start of each level.",
      },
      {
        title: "Serialize and deserialize",
        difficulty: "Hard",
        prompt: "Convert a binary tree to a string and back, preserving shape.",
        hint: "Preorder with explicit null markers is unambiguous.",
      },
    ],
    mistakes: [
      "Validating a BST by comparing each node only with its immediate children.",
      "Confusing height (edges or nodes?) between problems — state your definition.",
      "Using BFS when the answer needs subtree results (use DFS), or DFS when it needs levels.",
      "Ignoring recursion depth on a degenerate tree.",
    ],
    related: [
      { label: "Graphs", to: "/dsa/graphs" },
      { label: "Dynamic Programming", to: "/dsa/dp" },
      { label: "Interview questions", to: "/dsa/interview-questions" },
    ],
  },
  {
    slug: "graphs",
    title: "Graphs",
    subtitle: "Adjacency, BFS, DFS, topological order and shortest paths.",
    tone: "#41617a",
    label: "DS-06",
    level: "Intermediate",
    readTime: "34 min",
    stack: ["Adjacency list", "BFS", "DFS", "Topological sort", "Dijkstra"],
    intro: [
      "A graph is a set of vertices and edges. Trees are a special case. The representation you choose — adjacency list or matrix — decides the cost of every operation that follows.",
      "Graph problems are mostly about choosing the right traversal and the right state to track. BFS answers 'fewest edges', DFS answers 'is there a path / what is connected', and topological order answers 'what can come first'.",
    ],
    concepts: [
      {
        title: "Representation decides complexity",
        body: "An adjacency list uses O(V + E) space and iterates neighbours efficiently. A matrix uses O(V²) space but answers 'is there an edge?' in O(1). Dense graphs may favour a matrix; sparse graphs almost always favour lists.",
        bullets: [
          "Adjacency list: array of arrays, or a map for sparse integer ids.",
          "Adjacency matrix: good for Floyd–Warshall and very dense graphs.",
          "Edge lists are best for sorting edges in Kruskal's algorithm.",
        ],
      },
      {
        title: "BFS and DFS",
        body: "BFS uses a queue and visits in order of distance, so the first time it reaches a node is via a shortest path in unweighted graphs. DFS uses a stack or recursion and naturally computes entry/exit times, connected components and cycles.",
        bullets: [
          "Mark visited when enqueuing to avoid duplicate work.",
          "DFS with a recursion stack detects cycles in directed graphs.",
          "BFS on a grid with 8 directions can use a deque for 0-1 weights.",
        ],
      },
      {
        title: "Topological sort",
        body: "Only a DAG has a topological order. Kahn's algorithm repeatedly removes nodes with in-degree zero; DFS finishes nodes in reverse postorder. If Kahn's algorithm processes fewer than V nodes, a cycle exists.",
        bullets: [
          "Kahn's algorithm naturally detects cycles.",
          "Use it for build systems, course prerequisites and task scheduling.",
          "Multiple valid orders usually exist — do not assume uniqueness.",
        ],
      },
      {
        title: "Shortest paths",
        body: "BFS handles unweighted graphs. Dijkstra handles non-negative weights with a priority queue in O((V + E) log V). Bellman–Ford handles negative edges and detects negative cycles. Floyd–Warshall computes all pairs in O(V³).",
        bullets: [
          "Dijkstra fails with negative edges — use Bellman–Ford there.",
          "A* needs an admissible heuristic to stay optimal.",
          "For dense graphs, an O(V²) Dijkstra without a heap can be faster.",
        ],
      },
    ],
    visual: {
      kind: "graph",
      caption:
        "BFS explores level by level and DFS dives along edges first. Both visit each vertex and edge once, so both are O(V + E) — the order is what differs.",
    },
    code: [
      {
        title: "BFS shortest distances",
        lang: "javascript",
        note: "Distances are filled on first discovery; unvisited nodes stay at -1.",
        code: `function bfs(adj, start) {
  const dist = new Array(adj.length).fill(-1);
  const queue = [start];
  dist[start] = 0;
  for (let head = 0; head < queue.length; head++) {
    const node = queue[head];
    for (const next of adj[node]) {
      if (dist[next] === -1) {
        dist[next] = dist[node] + 1;
        queue.push(next);
      }
    }
  }
  return dist;
}`,
      },
      {
        title: "Kahn's topological sort",
        lang: "c",
        note: "Processing fewer than V nodes means the graph contains a cycle.",
        code: `int topo_sort(int V, int adj[][8], int out[]) {
    int in_degree[8] = {0}, queue[8], head = 0, tail = 0, count = 0;
    for (int u = 0; u < V; u++)
        for (int j = 0; adj[u][j] != -1; j++) in_degree[adj[u][j]]++;
    for (int u = 0; u < V; u++) if (in_degree[u] == 0) queue[tail++] = u;
    while (head < tail) {
        int u = queue[head++];
        out[count++] = u;
        for (int j = 0; adj[u][j] != -1; j++)
            if (--in_degree[adj[u][j]] == 0) queue[tail++] = adj[u][j];
    }
    return count == V; /* 0 means a cycle */
}`,
      },
    ],
    complexity: [
      { operation: "BFS / DFS", time: "O(V + E)", space: "O(V)", note: "Adjacency list" },
      { operation: "Dijkstra (binary heap)", time: "O((V + E) log V)", space: "O(V)", note: "Non-negative weights" },
      { operation: "Bellman–Ford", time: "O(V·E)", space: "O(V)", note: "Negative edges" },
      { operation: "Floyd–Warshall", time: "O(V³)", space: "O(V²)", note: "All pairs" },
      { operation: "Kahn topological sort", time: "O(V + E)", space: "O(V)", note: "DAG" },
    ],
    practice: [
      {
        title: "Number of islands",
        difficulty: "Medium",
        prompt: "Count connected components of land in a grid.",
        hint: "DFS or BFS from each unvisited land cell; sink visited cells.",
      },
      {
        title: "Course schedule",
        difficulty: "Medium",
        prompt: "Decide whether all courses can be finished given prerequisite pairs.",
        hint: "Cycle detection with Kahn's algorithm or DFS colours.",
      },
      {
        title: "Network delay time",
        difficulty: "Medium",
        prompt: "Find the time for a signal to reach every node from a source.",
        hint: "Dijkstra; answer is the maximum settled distance.",
      },
      {
        title: "Word ladder",
        difficulty: "Hard",
        prompt: "Find the shortest transformation sequence between two words.",
        hint: "Precompute wildcard patterns as graph edges, then BFS.",
      },
    ],
    mistakes: [
      "Forgetting the visited set — infinite loops on cyclic graphs.",
      "Using Dijkstra with negative edge weights.",
      "Marking visited when dequeuing instead of enqueuing, causing exponential duplicates.",
      "Assuming a topological order is unique.",
    ],
    related: [
      { label: "Trees", to: "/dsa/trees" },
      { label: "Dynamic Programming", to: "/dsa/dp" },
      { label: "Practice problems", to: "/dsa/practice" },
    ],
  },
  {
    slug: "dp",
    title: "Dynamic Programming",
    subtitle: "Overlapping subproblems, states, transitions and space reduction.",
    tone: "#6a5478",
    label: "DS-07",
    level: "Advanced",
    readTime: "36 min",
    stack: ["Memoisation", "Tabulation", "Knapsack", "LCS", "DP on trees"],
    intro: [
      "Dynamic programming applies when a problem has overlapping subproblems and an optimal substructure. You define a state, a transition between states, a base case, and an evaluation order.",
      "The hard part is never the code. It is choosing a state small enough to fit in memory but complete enough to be reusable. Once the state is right, the recurrence usually writes itself.",
    ],
    concepts: [
      {
        title: "State first, code second",
        body: "A state must capture exactly what future decisions depend on. For a knapsack it is (item index, remaining capacity). For edit distance it is (prefix of a, prefix of b). Add information only when a decision genuinely needs it.",
        bullets: [
          "Write the state as a sentence: 'dp[i][w] is the best value using the first i items with capacity w'.",
          "If you cannot state it in a sentence, the state is not ready.",
          "Distinct states bound the time complexity.",
        ],
      },
      {
        title: "Top-down versus bottom-up",
        body: "Memoisation computes only reachable states and mirrors the recursive definition. Tabulation fills a table in dependency order and avoids recursion depth, often enabling space optimisation.",
        bullets: [
          "Top-down is easier to derive and debug; watch the recursion limit.",
          "Bottom-up makes the iteration order explicit.",
          "If dp[i] depends only on dp[i−1] and dp[i−2], keep two variables.",
        ],
      },
      {
        title: "Classic shapes",
        body: "Most interview DP falls into a small set of shapes: linear (climbing stairs, house robber), interval (matrix chain, burst balloons), knapsack (subset sum, partition), two-sequence (LCS, edit distance) and tree DP (diameter, maximum path sum).",
        bullets: [
          "Linear: dp[i] from earlier indices.",
          "Knapsack: choose or skip each item; iterate capacity backwards for 0/1.",
          "Two-sequence: match or skip a character on either side.",
        ],
      },
      {
        title: "Reconstructing the answer",
        body: "A numeric DP answers 'how much' but interviews often ask 'which'. Store parent pointers or recompute by walking the table backwards from the final state.",
        bullets: [
          "For subset sum, walking from dp[n][W] backwards reveals chosen items.",
          "For LCS, move diagonally on a match, otherwise toward the larger neighbour.",
          "Keep enough auxiliary state to reconstruct without re-solving.",
        ],
      },
    ],
    visual: {
      kind: "array",
      algorithm: "insertionSort",
      caption:
        "Insertion sort is not DP, but watch how each prefix is already solved before the next element is inserted. DP uses the same idea: every state is built from states already known to be correct.",
    },
    code: [
      {
        title: "0/1 knapsack with one-dimensional DP",
        lang: "javascript",
        note: "Capacity is iterated backwards so each item is used at most once.",
        code: `function knapsack(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (let i = 0; i < weights.length; i++) {
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  return dp[capacity];
}`,
      },
      {
        title: "Longest common subsequence",
        lang: "c",
        note: "Match → diagonal + 1; otherwise take the better of skipping either character.",
        code: `int lcs(const char *a, const char *b) {
    int n = strlen(a), m = strlen(b);
    int dp[n + 1][m + 1];
    for (int i = 0; i <= n; i++)
        for (int j = 0; j <= m; j++) {
            if (i == 0 || j == 0) dp[i][j] = 0;
            else if (a[i - 1] == b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
        }
    return dp[n][m];
}`,
      },
    ],
    complexity: [
      { operation: "1D DP", time: "O(n) states × transition", space: "O(n)", note: "Often reducible" },
      { operation: "Knapsack", time: "O(n·W)", space: "O(W)", note: "One-dimensional" },
      { operation: "LCS / edit distance", time: "O(n·m)", space: "O(n·m) or O(m)", note: "Two sequences" },
      { operation: "Interval DP", time: "O(n³)", space: "O(n²)", note: "Matrix chain" },
    ],
    practice: [
      {
        title: "Climbing stairs",
        difficulty: "Easy",
        prompt: "Count the ways to reach step n taking one or two steps at a time.",
        hint: "dp[i] = dp[i−1] + dp[i−2]; only two variables are needed.",
      },
      {
        title: "Coin change",
        difficulty: "Medium",
        prompt: "Find the minimum number of coins to make an amount, or −1.",
        hint: "Unbounded knapsack: iterate coins outside, amounts forward.",
      },
      {
        title: "Edit distance",
        difficulty: "Hard",
        prompt: "Find the minimum insert/delete/replace operations to turn one string into another.",
        hint: "Three transitions plus a match shortcut.",
      },
      {
        title: "House robber",
        difficulty: "Medium",
        prompt: "Maximise the sum of non-adjacent values.",
        hint: "dp[i] = max(dp[i−1], dp[i−2] + value[i]).",
      },
    ],
    mistakes: [
      "Iterating capacity forwards in 0/1 knapsack, which allows reusing an item.",
      "A state that omits a needed constraint, producing wrong-but-plausible answers.",
      "Confusing subsequence with substring — a substring is contiguous, a subsequence is not.",
      "Optimising space before the recurrence is verified correct.",
    ],
    related: [
      { label: "Trees", to: "/dsa/trees" },
      { label: "Strings", to: "/dsa/strings" },
      { label: "Cheat sheets", to: "/dsa/cheat-sheets" },
    ],
  },
];

export const dsaRoadmapStages = [
  {
    stage: "Stage 01",
    title: "Complexity & recursion",
    description: "Before structures, learn to reason about growth. Big-O, recurrence intuition, and writing a correct recursive base case.",
    topics: [
      { label: "Time & space complexity", to: "/dsa/arrays" },
      { label: "Recursion fundamentals", to: "/dsa/trees" },
    ],
    prerequisite: "Any programming language",
  },
  {
    stage: "Stage 02",
    title: "Linear structures",
    description: "Arrays and strings first — they build the habits of indexing, invariants and two-pointer reasoning that everything else reuses.",
    topics: [
      { label: "Arrays", to: "/dsa/arrays" },
      { label: "Strings", to: "/dsa/strings" },
    ],
    prerequisite: "Stage 01",
  },
  {
    stage: "Stage 03",
    title: "Pointer structures",
    description: "Move from indices to links. Linked lists, stacks and queues teach ownership, rewiring, and ordering discipline.",
    topics: [
      { label: "Linked lists", to: "/dsa/linked-list" },
      { label: "Stack & queue", to: "/dsa/stack-queue" },
    ],
    prerequisite: "Stage 02",
  },
  {
    stage: "Stage 04",
    title: "Hierarchies & networks",
    description: "Trees and graphs generalise linked structures. Traversal becomes the main tool rather than the code you write.",
    topics: [
      { label: "Trees", to: "/dsa/trees" },
      { label: "Graphs", to: "/dsa/graphs" },
    ],
    prerequisite: "Stage 03",
  },
  {
    stage: "Stage 05",
    title: "Optimisation",
    description: "Dynamic programming ties the course together: define a state, find a transition, and evaluate in dependency order.",
    topics: [
      { label: "Dynamic programming", to: "/dsa/dp" },
      { label: "Practice set", to: "/dsa/practice" },
    ],
    prerequisite: "Stage 04",
  },
  {
    stage: "Stage 06",
    title: "Interview readiness",
    description: "Timed practice, explanation drills and pattern recall. The goal is not more problems — it is faster recognition.",
    topics: [
      { label: "Interview questions", to: "/dsa/interview-questions" },
      { label: "Cheat sheets", to: "/dsa/cheat-sheets" },
    ],
    prerequisite: "Stage 05",
  },
];

export const dsaPracticeProblems = [
  { title: "Two Sum (sorted)", topic: "Arrays", difficulty: "Easy", pattern: "Two pointers", prompt: "Return the indices of two numbers adding to a target. The array is sorted.", hint: "Move the pointer that can improve the sum." },
  { title: "Best time to buy and sell stock", topic: "Arrays", difficulty: "Easy", pattern: "Running minimum", prompt: "Maximise profit from one buy and one later sell.", hint: "Track the cheapest price so far and the best profit." },
  { title: "Move zeroes", topic: "Arrays", difficulty: "Easy", pattern: "Two pointers", prompt: "Move zeroes to the end in place, preserving order.", hint: "Write pointer for the next non-zero." },
  { title: "Subarray sum equals K", topic: "Arrays", difficulty: "Medium", pattern: "Prefix sums + hash", prompt: "Count subarrays with sum K (negatives allowed).", hint: "Count prefixes seen; add count[prefix − K]." },
  { title: "Product of array except self", topic: "Arrays", difficulty: "Medium", pattern: "Prefix / suffix", prompt: "Return products of all other elements without division.", hint: "Left pass then right pass." },
  { title: "Longest unique substring", topic: "Strings", difficulty: "Medium", pattern: "Sliding window", prompt: "Length of the longest substring without repeated characters.", hint: "Last-seen map plus a left boundary." },
  { title: "Valid anagram", topic: "Strings", difficulty: "Easy", pattern: "Frequency map", prompt: "Decide whether two strings are anagrams.", hint: "26 counters or a hash map." },
  { title: "Group anagrams", topic: "Strings", difficulty: "Medium", pattern: "Canonical key", prompt: "Group words by anagram class.", hint: "Sorted word as key." },
  { title: "Minimum window substring", topic: "Strings", difficulty: "Hard", pattern: "Sliding window", prompt: "Smallest window of s containing all of t.", hint: "Need/have counters; shrink while valid." },
  { title: "Reverse a linked list", topic: "Linked List", difficulty: "Easy", pattern: "Pointer rewiring", prompt: "Reverse a singly linked list iteratively.", hint: "Save next, reverse, advance." },
  { title: "Merge two sorted lists", topic: "Linked List", difficulty: "Easy", pattern: "Dummy head", prompt: "Merge by re-linking nodes.", hint: "Dummy head plus tail." },
  { title: "Linked list cycle II", topic: "Linked List", difficulty: "Medium", pattern: "Floyd", prompt: "Return the node where a cycle begins, or null.", hint: "Meet, reset one pointer, advance both by one." },
  { title: "Valid parentheses", topic: "Stack & Queue", difficulty: "Easy", pattern: "Stack", prompt: "Check bracket nesting.", hint: "Push openers, match closers." },
  { title: "Daily temperatures", topic: "Stack & Queue", difficulty: "Medium", pattern: "Monotonic stack", prompt: "Days until a warmer temperature.", hint: "Decreasing stack of indices." },
  { title: "Sliding window maximum", topic: "Stack & Queue", difficulty: "Hard", pattern: "Deque", prompt: "Maximum of each window of size k.", hint: "Monotonic deque of indices." },
  { title: "Maximum depth of binary tree", topic: "Trees", difficulty: "Easy", pattern: "DFS", prompt: "Longest root-to-leaf path length.", hint: "1 + max(left, right)." },
  { title: "Validate BST", topic: "Trees", difficulty: "Medium", pattern: "Bounds", prompt: "Verify the BST invariant.", hint: "Pass (min, max) down." },
  { title: "Lowest common ancestor", topic: "Trees", difficulty: "Medium", pattern: "Postorder", prompt: "Deepest common ancestor of two nodes.", hint: "Return matches upward." },
  { title: "Number of islands", topic: "Graphs", difficulty: "Medium", pattern: "DFS / BFS", prompt: "Count connected land regions.", hint: "Sink visited cells." },
  { title: "Course schedule", topic: "Graphs", difficulty: "Medium", pattern: "Topological sort", prompt: "Detect whether prerequisites form a cycle.", hint: "Kahn's algorithm." },
  { title: "Network delay time", topic: "Graphs", difficulty: "Medium", pattern: "Dijkstra", prompt: "Time for a signal to reach all nodes.", hint: "Max settled distance." },
  { title: "Climbing stairs", topic: "DP", difficulty: "Easy", pattern: "Linear DP", prompt: "Count ways to climb n stairs.", hint: "Two rolling values." },
  { title: "Coin change", topic: "DP", difficulty: "Medium", pattern: "Unbounded knapsack", prompt: "Fewest coins for an amount.", hint: "Coins outside, amounts forward." },
  { title: "Edit distance", topic: "DP", difficulty: "Hard", pattern: "Two-sequence DP", prompt: "Minimum edits to transform one string into another.", hint: "Insert, delete, replace." },
];

export const dsaInterviewQuestions = [
  {
    topic: "Arrays",
    items: [
      { q: "Why is array indexing O(1)?", a: "Because the element address is computed arithmetically from the base address and the index, not found by scanning." },
      { q: "When does a sliding window fail?", a: "When the validity condition is not monotone — for example when negative numbers can make a window sum decrease as it grows." },
      { q: "How do you rotate an array by k in O(1) space?", a: "Reverse the whole array, then reverse the first k and the remaining n−k elements." },
    ],
  },
  {
    topic: "Strings",
    items: [
      { q: "Why is repeated string concatenation slow?", a: "Immutable strings allocate and copy on every concatenation, turning a loop into O(n²) work." },
      { q: "How does KMP avoid rescanning?", a: "A failure table records the longest proper prefix that is also a suffix, so the pattern advances without moving the text index backwards." },
      { q: "Anagram check in O(1) extra space?", a: "Use fixed-size counters for a known alphabet and compare them." },
    ],
  },
  {
    topic: "Linked List",
    items: [
      { q: "Why use a dummy head?", a: "It removes the special case for inserting or deleting at the head, so one loop handles every position." },
      { q: "How do you find the middle in one pass?", a: "Advance a slow pointer by one and a fast pointer by two; when fast reaches the end, slow is at the middle." },
      { q: "Why is an array usually faster than a linked list in practice?", a: "Cache locality. Sequential memory access is far cheaper than chasing pointers, despite identical asymptotic complexity." },
    ],
  },
  {
    topic: "Stack & Queue",
    items: [
      { q: "How does a monotonic stack achieve O(n)?", a: "Each index is pushed once and popped at most once, so the total number of operations is linear." },
      { q: "How do you implement a queue with two stacks?", a: "Push onto the in-stack; when dequeuing, transfer everything to the out-stack if it is empty, then pop. Amortised O(1)." },
      { q: "Why use a deque for sliding window maximum?", a: "It keeps candidate indices in decreasing value order and supports O(1) removal from both ends." },
    ],
  },
  {
    topic: "Trees",
    items: [
      { q: "Why is checking only immediate children insufficient for a BST?", a: "A node deep in the right subtree can still violate an ancestor's bound. Bounds must be inherited from every ancestor." },
      { q: "Difference between height and depth?", a: "Height is measured from a node down to its deepest leaf; depth is measured from the root down to that node." },
      { q: "When would you use an iterative traversal?", a: "When the tree may be deep enough to overflow the call stack, or when you need explicit control over the traversal state." },
    ],
  },
  {
    topic: "Graphs",
    items: [
      { q: "When does BFS give shortest paths?", a: "When every edge has the same weight (usually 1). For weights, use Dijkstra." },
      { q: "How do you detect a cycle in a directed graph?", a: "DFS with three colours (unvisited, in-stack, done) — an edge to an in-stack node is a back edge. Kahn's algorithm also works by leftover nodes." },
      { q: "Adjacency list or matrix?", a: "List for sparse graphs (O(V+E) space, efficient neighbour iteration); matrix for dense graphs or O(1) edge queries." },
    ],
  },
  {
    topic: "Dynamic Programming",
    items: [
      { q: "What makes a problem suitable for DP?", a: "Overlapping subproblems and optimal substructure — an optimal solution can be built from optimal solutions of smaller subproblems." },
      { q: "Why iterate knapsack capacity backwards?", a: "Backwards iteration ensures each item is considered once; forwards iteration would allow reusing the same item." },
      { q: "How do you reconstruct the chosen items?", a: "Walk the table backwards from the final state, comparing with the state that would have produced it, or store parent pointers." },
    ],
  },
];

export const dsaCheatSheets = [
  {
    title: "Complexity reference",
    rows: [
      ["Array access", "O(1)"],
      ["Array insert middle", "O(n)"],
      ["Linked list insert at head", "O(1)"],
      ["Linked list search", "O(n)"],
      ["Balanced BST search", "O(log n)"],
      ["Hash map average lookup", "O(1)"],
      ["Sorting comparison bound", "O(n log n)"],
      ["BFS / DFS", "O(V + E)"],
      ["Dijkstra (heap)", "O((V+E) log V)"],
    ],
  },
  {
    title: "Pattern triggers",
    rows: [
      ["Sorted array + pair", "Two pointers"],
      ["Contiguous subarray sum", "Prefix sums / window"],
      ["Next greater element", "Monotonic stack"],
      ["Shortest unweighted path", "BFS"],
      ["Topological ordering", "Kahn / DFS postorder"],
      ["Optimal choice with constraints", "Dynamic programming"],
      ["k-th largest streaming", "Heap of size k"],
      ["Merge sorted sequences", "Heap / two pointers"],
    ],
  },
  {
    title: "Traversal templates",
    rows: [
      ["Preorder", "node → left → right"],
      ["Inorder", "left → node → right (sorted for BST)"],
      ["Postorder", "left → right → node"],
      ["Level order", "queue, one level at a time"],
      ["Topological", "reverse postorder / in-degree zero"],
    ],
  },
];
