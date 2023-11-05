const NameSort = (x, y) => {
  if (x.title < y.title) return -1;
  return 1;
};

const PrioritySort = (p, q) => {
  return q.priority - p.priority;
};

export { PrioritySort, NameSort };
