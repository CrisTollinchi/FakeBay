

let repo = {};



repo.getCategories = () => {
  return Object.keys(schemaData);
};

repo.getCategoryTypes = (category) => {
  const typeList = Object.values(schemaData[category]).map(
    (x) => x.path("type").defaultValue
  );

  return typeList;
};

repo.getCategoriesAndTypes = () => {
  let obj = {};
  const allFields = Object.entries(schemaData).map(([key, value]) => {
    const path = value.map((type) => type.path("type").defaultValue);
    return (obj[key] = path);
  });
  return obj;
};

repo.allFields = () => {
  let obj = {};
  const allFields = Object.entries(schemaData).map(([key, value]) => {
    let nestedObj = {};
    const path = value.map((type) => {
      const certainFields = Object.keys(type.tree).filter(
        (fields) =>
          fields !== "type" &&
          fields !== "createdAt" &&
          fields !== "updatedAt" &&
          fields !== "_id" &&
          fields !== "watch" &&
          fields !== "sold"
      );

      nestedObj[type.path("type").defaultValue] = certainFields;
    });
    return (obj[key] = [nestedObj]);
  });

  return obj;
};

export default repo;
