import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import {
  celo,
  celoAlfajores,
  celoCannoli,
  sepolia,
  mainnet,
  goerli,
} from "wagmi/chains";

export const { chains, publicClient } = configureChains(
  [celo, celoAlfajores, celoCannoli, sepolia, mainnet, goerli],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Template",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID, // Get your project ID from https://cloud.walletconnect.com/
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
