import '@/styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import { WagmiConfig } from 'wagmi'
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chains, wagmiConfig } from "config/wagmi";
import "@rainbow-me/rainbowkit/styles.css";

export default function App({ Component, pageProps }) {

  return (
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
       <Component {...pageProps} />
    </RainbowKitProvider>
    </WagmiConfig>
  )
  
}
