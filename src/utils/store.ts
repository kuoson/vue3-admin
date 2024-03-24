import cloneDeep from "lodash-es/cloneDeep";

export function resetStore({ store }) {
  const initialState = cloneDeep(store.$state);
  store.$reset = () => store.$patch(cloneDeep(initialState));
}
