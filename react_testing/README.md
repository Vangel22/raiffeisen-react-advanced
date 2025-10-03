1. Install libraries

npm install vitest@^3.2.4 @testing-library/react@^16.3.0 @testing-library/jest-dom@^6.9.1 @testing-library/user-event@^14.6.1 @testing-library/dom@^10.4.1 jsdom@^27.0.0 --save-dev

2. vitest.config.ts
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
plugins: [react()],
test: {
globals: true,
environment: "jsdom",
setupFiles: ["./src/setupTests.ts"],
},
});

3. setupTests.ts -> should be in your /src folder

import "@testing-library/jest-dom";
