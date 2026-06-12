declare module "next-pwa" {
  import type { NextConfig } from "next"
  interface PWAPluginOptions {
    dest: string
    register?: boolean
    skipWaiting?: boolean
    disable?: boolean
    [key: string]: unknown
  }
  function withPWA(options: PWAPluginOptions): (config: NextConfig) => NextConfig
  export default withPWA
}
