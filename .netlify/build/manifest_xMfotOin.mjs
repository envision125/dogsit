import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { p as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_DH6mTnGR.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/elraton/Documents/GitHub/dogsit/","cacheDir":"file:///Users/elraton/Documents/GitHub/dogsit/node_modules/.astro/","outDir":"file:///Users/elraton/Documents/GitHub/dogsit/dist/","srcDir":"file:///Users/elraton/Documents/GitHub/dogsit/src/","publicDir":"file:///Users/elraton/Documents/GitHub/dogsit/public/","buildClientDir":"file:///Users/elraton/Documents/GitHub/dogsit/dist/","buildServerDir":"file:///Users/elraton/Documents/GitHub/dogsit/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"client/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/client","isIndex":false,"type":"page","pattern":"^\\/client\\/?$","segments":[[{"content":"client","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/client.astro","pathname":"/client","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"demo/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/demo","isIndex":false,"type":"page","pattern":"^\\/demo\\/?$","segments":[[{"content":"demo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/demo.astro","pathname":"/demo","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"demosdos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/demosdos","isIndex":false,"type":"page","pattern":"^\\/demosdos\\/?$","segments":[[{"content":"demosdos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/demosdos.astro","pathname":"/demosdos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"menu/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/menu","isIndex":false,"type":"page","pattern":"^\\/menu\\/?$","segments":[[{"content":"menu","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/menu.astro","pathname":"/menu","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/elraton/Documents/GitHub/dogsit/src/pages/demo.astro",{"propagation":"none","containsHead":true}],["/Users/elraton/Documents/GitHub/dogsit/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/elraton/Documents/GitHub/dogsit/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/elraton/Documents/GitHub/dogsit/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/client@_@astro":"pages/client.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/demo@_@astro":"pages/demo.astro.mjs","\u0000@astro-page:src/pages/demosdos@_@astro":"pages/demosdos.astro.mjs","\u0000@astro-page:src/pages/menu@_@astro":"pages/menu.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_xMfotOin.mjs","/Users/elraton/Documents/GitHub/dogsit/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/elraton/Documents/GitHub/dogsit/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DUVvoN3L.mjs","/Users/elraton/Documents/GitHub/dogsit/src/pages/demo.astro?astro&type=script&index=1&lang.ts":"_astro/demo.astro_astro_type_script_index_1_lang.CxO_JRN6.js","/Users/elraton/Documents/GitHub/dogsit/src/pages/demo.astro?astro&type=script&index=0&lang.ts":"_astro/demo.astro_astro_type_script_index_0_lang.B_V5efuC.js","/Users/elraton/Documents/GitHub/dogsit/src/pages/contact.astro?astro&type=script&index=0&lang.ts":"_astro/contact.astro_astro_type_script_index_0_lang.DNUlyuw9.js","/Users/elraton/Documents/GitHub/dogsit/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.BP4NIEkQ.js","/Users/elraton/Documents/GitHub/dogsit/src/components/Welcome.astro?astro&type=script&index=0&lang.ts":"_astro/Welcome.astro_astro_type_script_index_0_lang.BHqE0l__.js","/Users/elraton/Documents/GitHub/dogsit/src/components/Navigation.astro?astro&type=script&index=0&lang.ts":"_astro/Navigation.astro_astro_type_script_index_0_lang.BRogyGbd.js","/Users/elraton/Documents/GitHub/dogsit/src/pages/menu.astro?astro&type=script&index=0&lang.ts":"_astro/menu.astro_astro_type_script_index_0_lang.BN1r4mBX.js","/Users/elraton/Documents/GitHub/dogsit/src/components/Footer.astro?astro&type=script&index=0&lang.ts":"_astro/Footer.astro_astro_type_script_index_0_lang.CxO_JRN6.js","/Users/elraton/Documents/GitHub/dogsit/src/components/Slider.astro?astro&type=script&index=0&lang.ts":"_astro/Slider.astro_astro_type_script_index_0_lang.BUqsjnGV.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/elraton/Documents/GitHub/dogsit/src/pages/demo.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"contactButton\"),t=document.getElementById(\"contactWidget\"),c=document.getElementById(\"closeWidget\");e&&t&&e.addEventListener(\"click\",()=>{t.classList.toggle(\"hidden\")});c&&t&&c.addEventListener(\"click\",()=>{t.classList.add(\"hidden\")});"],["/Users/elraton/Documents/GitHub/dogsit/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","const e=document.querySelector(\".hamburger\"),s=document.querySelector(\".nav-links\");e.addEventListener(\"click\",()=>{s.classList.toggle(\"expanded\"),e.classList.toggle(\"active\")});window.addEventListener(\"resize\",()=>{window.innerWidth>635&&(s.classList.remove(\"expanded\"),e.classList.remove(\"active\"))});"],["/Users/elraton/Documents/GitHub/dogsit/src/components/Navigation.astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"mobile-menu-button\"),n=document.getElementById(\"mobile-menu\");let s=!1;t.addEventListener(\"click\",()=>{s=!s,s?(n.classList.add(\"open\"),t.innerHTML='<i class=\"fas fa-times text-2xl\"></i>'):(n.classList.remove(\"open\"),t.innerHTML='<i class=\"fas fa-bars text-2xl\"></i>')});const i=document.querySelectorAll(\"#mobile-menu a\");i.forEach(e=>{e.addEventListener(\"click\",()=>{n.classList.remove(\"open\"),t.innerHTML='<i class=\"fas fa-bars text-2xl\"></i>',s=!1})});const a=document.querySelectorAll(\".nav-link\"),o=window.location.pathname.split(\"/\").pop()||\"index.html\";a.forEach(e=>{if(e.getAttribute(\"href\").includes(o)){e.classList.add(\"text-blue-500\"),e.classList.remove(\"text-gray-800\");const l=e.querySelector(\"::after\");l&&(l.style.width=\"100%\")}});"]],"assets":["/_astro/dog4.Db8hW8tn.jpg","/_astro/dog4.1Dr5WYfk.jpeg","/_astro/whitedog.D5ma3LHP.jpeg","/_astro/Sunnyside.c211-QsS.jpg","/_astro/dogcat.PgKgbE8U.jpeg","/_astro/logoblack.DCstcfMs.jpg","/_astro/dog6.DwuJ9bKb.jpeg","/_astro/browndog.CHLjJ0e7.jpeg","/_astro/dog7.DkOXNiWM.jpeg","/_astro/dog12.DuzIXjAk.jpg","/_astro/index.RCJU_ANV.css","/favicon.svg","/_astro/Footer.astro_astro_type_script_index_0_lang.CxO_JRN6.js","/_astro/Slider.astro_astro_type_script_index_0_lang.BUqsjnGV.js","/_astro/Welcome.astro_astro_type_script_index_0_lang.BHqE0l__.js","/_astro/contact.astro_astro_type_script_index_0_lang.DNUlyuw9.js","/_astro/demo.astro_astro_type_script_index_1_lang.CxO_JRN6.js","/_astro/index.Cj2nXUqS.js","/_astro/menu.astro_astro_type_script_index_0_lang.BN1r4mBX.js","/about/index.html","/client/index.html","/contact/index.html","/demo/index.html","/demosdos/index.html","/menu/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"oMBhXF+orDNscbwpfjW/1E8a2keBjNb5zSGZkg87+kc=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/elraton/Documents/GitHub/dogsit/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
