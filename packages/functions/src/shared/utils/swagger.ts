import type swaggerJSDoc from 'swagger-jsdoc';

export function makeSwaggerPaths(docsArr: swaggerJSDoc.Paths[]) {
  const swaggerPaths: swaggerJSDoc.Paths = {};

  docsArr.forEach(currentObj => {
    const currentPath = Object.keys(currentObj)[0];

    if (currentPath) {
      const currentSwaggerPath = swaggerPaths[currentPath];
      const newSwaggerPath = currentObj[currentPath];

      if (currentSwaggerPath && newSwaggerPath) {
        Object.assign(currentSwaggerPath, newSwaggerPath);
      } else if (newSwaggerPath) {
        swaggerPaths[currentPath] = newSwaggerPath;
      }
    }
  });

  return swaggerPaths;
}
