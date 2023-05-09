import type swaggerJSDoc from 'swagger-jsdoc';

export function makeSwaggerPaths(docsArr: swaggerJSDoc.Paths[]) {
  const swaggerPaths = docsArr.reduce((newObj, currentObj) => {
    const currentPath = Object.keys(currentObj)[0] as keyof typeof newObj;
    // If the currentObj path already exists in the accumulator, merge the currentObj path with the accumulator path
    if (newObj[currentPath]) {
      return {
        ...newObj,
        [currentPath]: {
          ...newObj[currentPath],
          ...currentObj[currentPath],
        },
      };
    }

    return {
      ...newObj,
      ...currentObj,
    };
  }, {});

  return swaggerPaths;
}
