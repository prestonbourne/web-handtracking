// vite.config.js
import { defineConfig } from 'vite'
import dns from 'dns'

 dns.setDefaultResultOrder('verbatim')

 /*TODO: RESOLVE THE PROMISE BEFORE EXPORTING BECAUSE USING ESNEXT MEANS THIS WON'T WORK ON OLDER VERSIONS OF BROWSERS */

export default defineConfig({
 server:{ port: 3000 },
 build:{
  target: 'esnext'
 },
 assetsInclude: ["**/*.task", "**/*.glb"]
})