export const THEME_STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

// Runs in <head> before first paint. A ?theme=dark|light override wins for
// that page view only (used for screenshots); otherwise a theme the visitor
// picked earlier; otherwise nothing is set and CSS follows the device setting.
export const themeScript = `(function(){var d=document.documentElement,t=null;try{t=new URLSearchParams(location.search).get("theme")}catch(e){}if(t!=="dark"&&t!=="light"){try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){t=null}}if(t==="dark"||t==="light")d.setAttribute("data-theme",t)})()`;
