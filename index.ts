interface Routes {
  url: string;
  children?: Routes[];
}

const findInChildren = (children: Routes[], path: string, found = false) => {
  if (!found) {
    for (const child of children) {
      if (child.url === path) {
        found = true;
      } else {
        if (child.children) {
          found = findInChildren(child.children, path, found);
        }
      }
    }
  }
  return found;
};

const findPathInRoutes = (
  pathToFind: string,
  routes: Routes[]
): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      let found = false;
      for (let route of routes) {
        if (route.url === pathToFind) {
          found = true;
        } else if (!found) {
          if (route.children) {
            found = findInChildren(route.children, pathToFind);
          }
        }
      }
      resolve(found);
    } catch (e) {
      reject(e.message);
    }
  });
};

const routes: Routes[] = [
  {
    url: "fa",
    children: [
      {
        url: "a",
        children: [
          {
            url: "a",
            children: [
              {
                url: "a",
                children: [
                  {
                    url: "a",
                    children: [
                      {
                        url: "a",
                        children: []
                      },
                      {
                        url: "a",
                        children: [
                          {
                            url: "a",
                            children: [
                              {
                                url: "asas",
                                children: []
                              },
                              {
                                url: "a",
                                children: []
                              },
                              {
                                url: "walle",
                                children: []
                              },
                              {
                                url: "oth",
                                children: []
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        url: "a",
        children: []
      },
      {
        url: "a",
        children: [
          {
            url: "a",
            children: [
              {
                url: "a",
                children: [
                  {
                    url: "a",
                    children: []
                  },
                  {
                    url: "a",
                    children: [
                      {
                        url: "a",
                        children: [
                          {
                            url: "asas",
                            children: []
                          },
                          {
                            url: "a",
                            children: []
                          },
                          {
                            url: "a",
                            children: []
                          },
                          {
                            url: "ass",
                            children: []
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        url: "ass",
        children: [
          {
            url: "asas"
          }
        ]
      }
    ]
  }
];

findPathInRoutes("oth", routes)
  .then(res => {
    console.log(res);
  })
  .catch(reason => {
    console.log(reason);
  });
