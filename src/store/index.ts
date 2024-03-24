import { createPinia } from "pinia";
import { resetStore } from "@/utils/store";

const pinia = createPinia();
pinia.use(resetStore);

export default pinia;
