// Run this in mongosh after selecting the same database used by the website.
// It reports malformed and duplicate property slugs without changing data.

print('\nPublished properties without a usable slug:');
printjson(
  db.properties
    .find({
      status: 'published',
      $or: [
        { slug: { $exists: false } },
        { slug: null },
        { slug: '' },
        { slug: { $not: { $type: 'string' } } },
      ],
    })
    .project({ title: 1, slug: 1, status: 1 })
    .toArray(),
);

print('\nDuplicate published slugs:');
printjson(
  db.properties
    .aggregate([
      { $match: { status: 'published', slug: { $type: 'string', $ne: '' } } },
      { $group: { _id: '$slug', count: { $sum: 1 }, ids: { $push: '$_id' }, titles: { $push: '$title' } } },
      { $match: { count: { $gt: 1 } } },
      { $sort: { count: -1, _id: 1 } },
    ])
    .toArray(),
);
