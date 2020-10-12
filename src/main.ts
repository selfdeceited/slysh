import App from "./components/App/App.svelte";
import { localize } from "./i18n";

localize();
const app = new App({
  target: document.body,
});

export default app;
