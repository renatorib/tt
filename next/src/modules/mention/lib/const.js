// pattern used in react-mentions
export const MENTION_PATTERN = '@[__display__](__id__)'

// capture full mention in a single group
// eg.: @[renatorib](2) => ['@[renatorib](2)']
export const MENTION_MATCH = /(@\[.+?\]\(\d+\))/i

// capture mention in two groups: name and id
// eg.: @[renatorib](2) => ['renatorib', 2]
export const MENTION_GROUPS = /@\[(.+?)\]\((\d+)\)/i
