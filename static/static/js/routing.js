// import mainPage from "../mainPage.js";
let count = 0;
const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  console.log({ lp: location.pathname});
  const mainPage = await window.api.mainPage.index()
  const index = await window.api.article.index();
  const new1 = await window.api.article.new();
  // const edit = await window.api.article.edit();

  const routes = [
    { path: "/", view: mainPage },
    { path: "/articles", view: index },
    { path: "/articles/new", view: new1 },
    // { path: "/articles/edit", view: edit },
    { path: "/notFound", view: { form: "<h1>Not Found 404</h1>" } },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    const  lp = location.pathname;
    if (lp.startsWith('/articles')) {
      const [path, id] = lp.substring(1).split("/");
      const getArticle = await window.api.article.getArticle(id);
      if (!!getArticle) {
        match = {
          route: { view: getArticle },
          result: [location.pathname],
        };
      }
    } else {
      match = {
        route: routes[3], //Not Found
        result: [location.pathname],
      };
    }
  }

  // console.log({ match, lp: location.pathname });
  const view = match.route.view;
  console.log({ view });
  document.querySelector("#app").innerHTML = view.data;
};

export { router, navigateTo };

// window.addEventListener("popstate", router);
