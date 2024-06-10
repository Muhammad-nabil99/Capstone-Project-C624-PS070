import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        MapboxGeocoder: "readonly",
        mapboxgl: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
];
