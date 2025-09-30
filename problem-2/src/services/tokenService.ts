import axios from "axios";
import type { TokenPrice, Token } from "../types";

// Comprehensive token list from Switcheo token-icons repository
export const AVAILABLE_TOKENS: Omit<Token, "price">[] = [
  // Popular cryptocurrencies
  {
    currency: "BTC",
    symbol: "BTC",
    name: "Bitcoin",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BTC.svg",
  },
  {
    currency: "ETH",
    symbol: "ETH",
    name: "Ethereum",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg",
  },
  {
    currency: "USDC",
    symbol: "USDC",
    name: "USD Coin",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USDC.svg",
  },
  {
    currency: "USDT",
    symbol: "USDT",
    name: "Tether",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USDT.svg",
  },
  {
    currency: "BNB",
    symbol: "BNB",
    name: "Binance Coin",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BNB.svg",
  },
  {
    currency: "ADA",
    symbol: "ADA",
    name: "Cardano",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ADA.svg",
  },
  {
    currency: "SOL",
    symbol: "SOL",
    name: "Solana",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SOL.svg",
  },
  {
    currency: "DOGE",
    symbol: "DOGE",
    name: "Dogecoin",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/DOGE.svg",
  },
  {
    currency: "MATIC",
    symbol: "MATIC",
    name: "Polygon",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/MATIC.svg",
  },
  {
    currency: "DOT",
    symbol: "DOT",
    name: "Polkadot",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/DOT.svg",
  },

  // Switcheo ecosystem
  {
    currency: "SWTH",
    symbol: "SWTH",
    name: "Switcheo Token",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg",
  },

  // Layer 1 blockchains
  {
    currency: "ATOM",
    symbol: "ATOM",
    name: "Cosmos Hub",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ATOM.svg",
  },
  {
    currency: "AVAX",
    symbol: "AVAX",
    name: "Avalanche",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/AVAX.svg",
  },
  {
    currency: "NEAR",
    symbol: "NEAR",
    name: "NEAR Protocol",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/NEAR.svg",
  },
  {
    currency: "ALGO",
    symbol: "ALGO",
    name: "Algorand",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ALGO.svg",
  },
  {
    currency: "FTM",
    symbol: "FTM",
    name: "Fantom",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/FTM.svg",
  },
  {
    currency: "ONE",
    symbol: "ONE",
    name: "Harmony",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ONE.svg",
  },
  {
    currency: "LUNA",
    symbol: "LUNA",
    name: "Terra",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/LUNA.svg",
  },
  {
    currency: "NEO",
    symbol: "NEO",
    name: "Neo",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/NEO.svg",
  },
  {
    currency: "TRX",
    symbol: "TRX",
    name: "TRON",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/TRX.svg",
  },

  // Layer 2 & Scaling solutions
  {
    currency: "ARB",
    symbol: "ARB",
    name: "Arbitrum",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ARB.svg",
  },
  {
    currency: "OP",
    symbol: "OP",
    name: "Optimism",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OP.svg",
  },

  // DeFi tokens
  {
    currency: "UNI",
    symbol: "UNI",
    name: "Uniswap",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/UNI.svg",
  },
  {
    currency: "AAVE",
    symbol: "AAVE",
    name: "Aave",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/AAVE.svg",
  },
  {
    currency: "COMP",
    symbol: "COMP",
    name: "Compound",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/COMP.svg",
  },
  {
    currency: "MKR",
    symbol: "MKR",
    name: "Maker",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/MKR.svg",
  },
  {
    currency: "SNX",
    symbol: "SNX",
    name: "Synthetix",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SNX.svg",
  },
  {
    currency: "CRV",
    symbol: "CRV",
    name: "Curve DAO Token",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/CRV.svg",
  },
  {
    currency: "BAL",
    symbol: "BAL",
    name: "Balancer",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BAL.svg",
  },
  {
    currency: "YFI",
    symbol: "YFI",
    name: "yearn.finance",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/YFI.svg",
  },
  {
    currency: "SUSHI",
    symbol: "SUSHI",
    name: "SushiSwap",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SUSHI.svg",
  },
  {
    currency: "CAKE",
    symbol: "CAKE",
    name: "PancakeSwap",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/CAKE.svg",
  },

  // Wrapped tokens
  {
    currency: "WBTC",
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/WBTC.svg",
  },
  {
    currency: "WETH",
    symbol: "WETH",
    name: "Wrapped Ethereum",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/WETH.svg",
  },

  // Stablecoins
  {
    currency: "DAI",
    symbol: "DAI",
    name: "Dai Stablecoin",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/DAI.svg",
  },
  {
    currency: "BUSD",
    symbol: "BUSD",
    name: "Binance USD",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BUSD.svg",
  },
  {
    currency: "TUSD",
    symbol: "TUSD",
    name: "TrueUSD",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/TUSD.svg",
  },
  {
    currency: "USD",
    symbol: "USD",
    name: "US Dollar",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USD.svg",
  },

  // Meme coins & Popular tokens
  {
    currency: "SHIB",
    symbol: "SHIB",
    name: "Shiba Inu",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SHIB.svg",
  },
  {
    currency: "PEPE",
    symbol: "PEPE",
    name: "Pepe",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/PEPE.svg",
  },
  {
    currency: "WIF",
    symbol: "WIF",
    name: "dogwifhat",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/WIF.svg",
  },
  {
    currency: "BONK",
    symbol: "BONK",
    name: "Bonk",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BONK.svg",
  },
  {
    currency: "FLOKI",
    symbol: "FLOKI",
    name: "Floki Inu",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/KFLOKI.svg",
  },

  // Gaming & NFT
  {
    currency: "AXS",
    symbol: "AXS",
    name: "Axie Infinity",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/AXS.svg",
  },
  {
    currency: "SAND",
    symbol: "SAND",
    name: "The Sandbox",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SAND.svg",
  },
  {
    currency: "MANA",
    symbol: "MANA",
    name: "Decentraland",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/MANA.svg",
  },
  {
    currency: "ENJ",
    symbol: "ENJ",
    name: "Enjin Coin",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ENJ.svg",
  },
  {
    currency: "GALA",
    symbol: "GALA",
    name: "Gala",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/GALA.svg",
  },

  // Oracles & Infrastructure
  {
    currency: "LINK",
    symbol: "LINK",
    name: "Chainlink",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/LINK.svg",
  },
  {
    currency: "GRT",
    symbol: "GRT",
    name: "The Graph",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/GRT.svg",
  },
  {
    currency: "FIL",
    symbol: "FIL",
    name: "Filecoin",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/FIL.svg",
  },
  {
    currency: "AR",
    symbol: "AR",
    name: "Arweave",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/AR.svg",
  },

  // Exchange tokens
  {
    currency: "BNB",
    symbol: "BNB",
    name: "BNB",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BNB.svg",
  },
  {
    currency: "OKB",
    symbol: "OKB",
    name: "OKB",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OKB.svg",
  },
  {
    currency: "HT",
    symbol: "HT",
    name: "Huobi Token",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/HT.svg",
  },
  {
    currency: "KCS",
    symbol: "KCS",
    name: "KuCoin Shares",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/KCS.svg",
  },
  {
    currency: "LEO",
    symbol: "LEO",
    name: "UNUS SED LEO",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/LEO.svg",
  },

  // AI & Web3
  {
    currency: "FET",
    symbol: "FET",
    name: "Fetch.ai",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/FET.svg",
  },
  {
    currency: "OCEAN",
    symbol: "OCEAN",
    name: "Ocean Protocol",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OCEAN.svg",
  },
  {
    currency: "RNDR",
    symbol: "RNDR",
    name: "Render Token",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/RNDR.svg",
  },
  {
    currency: "WLD",
    symbol: "WLD",
    name: "Worldcoin",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/WLD.svg",
  },

  // Cosmos ecosystem
  {
    currency: "OSMO",
    symbol: "OSMO",
    name: "Osmosis",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OSMO.svg",
  },
  {
    currency: "JUNO",
    symbol: "JUNO",
    name: "Juno Network",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/JUNO.svg",
  },
  {
    currency: "SCRT",
    symbol: "SCRT",
    name: "Secret Network",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SCRT.svg",
  },
  {
    currency: "RUNE",
    symbol: "RUNE",
    name: "THORChain",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/RUNE.svg",
  },
  {
    currency: "KAVA",
    symbol: "KAVA",
    name: "Kava",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/KAVA.svg",
  },
  {
    currency: "BAND",
    symbol: "BAND",
    name: "Band Protocol",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BAND.svg",
  },

  // Privacy coins
  {
    currency: "XMR",
    symbol: "XMR",
    name: "Monero",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/XMR.svg",
  },
  {
    currency: "ZEC",
    symbol: "ZEC",
    name: "Zcash",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ZEC.svg",
  },
  {
    currency: "DASH",
    symbol: "DASH",
    name: "Dash",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/DASH.svg",
  },

  // Established altcoins
  {
    currency: "LTC",
    symbol: "LTC",
    name: "Litecoin",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/LTC.svg",
  },
  {
    currency: "BCH",
    symbol: "BCH",
    name: "Bitcoin Cash",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BCH.svg",
  },
  {
    currency: "ETC",
    symbol: "ETC",
    name: "Ethereum Classic",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETC.svg",
  },
  {
    currency: "XLM",
    symbol: "XLM",
    name: "Stellar",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/XLM.svg",
  },
  {
    currency: "XRP",
    symbol: "XRP",
    name: "Ripple",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/XRP.svg",
  },
  {
    currency: "VET",
    symbol: "VET",
    name: "VeChain",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/VET.svg",
  },
  {
    currency: "THETA",
    symbol: "THETA",
    name: "Theta Network",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/THETA.svg",
  },
  {
    currency: "ICP",
    symbol: "ICP",
    name: "Internet Computer",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ICP.svg",
  },
  {
    currency: "HBAR",
    symbol: "HBAR",
    name: "Hedera",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/HBAR.svg",
  },
  {
    currency: "EGLD",
    symbol: "EGLD",
    name: "MultiversX",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/EGLD.svg",
  },

  // Newer promising tokens
  {
    currency: "APT",
    symbol: "APT",
    name: "Aptos",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/APT.svg",
  },
  {
    currency: "SUI",
    symbol: "SUI",
    name: "Sui",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SUI.svg",
  },
  {
    currency: "SEI",
    symbol: "SEI",
    name: "Sei",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SEI.svg",
  },
  {
    currency: "ARB",
    symbol: "ARB",
    name: "Arbitrum",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ARB.svg",
  },
  {
    currency: "OP",
    symbol: "OP",
    name: "Optimism",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OP.svg",
  },
  {
    currency: "BLUR",
    symbol: "BLUR",
    name: "Blur",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BLUR.svg",
  },
  {
    currency: "LDO",
    symbol: "LDO",
    name: "Lido DAO",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/LDO.svg",
  },
  {
    currency: "GMX",
    symbol: "GMX",
    name: "GMX",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/GMX.svg",
  },
  {
    currency: "DYDX",
    symbol: "DYDX",
    name: "dYdX",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/DYDX.svg",
  },
  {
    currency: "INJ",
    symbol: "INJ",
    name: "Injective",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/INJ.svg",
  },
  {
    currency: "TIA",
    symbol: "TIA",
    name: "Celestia",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/TIA.svg",
  },
  {
    currency: "PYTH",
    symbol: "PYTH",
    name: "Pyth Network",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/PYTH.svg",
  },
  {
    currency: "JTO",
    symbol: "JTO",
    name: "Jito",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/JTO.svg",
  },
  {
    currency: "JUP",
    symbol: "JUP",
    name: "Jupiter",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/JUP.svg",
  },

  // Additional popular tokens from the repository
  {
    currency: "1INCH",
    symbol: "1INCH",
    name: "1inch Network",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/1INCH.svg",
  },
  {
    currency: "CHZ",
    symbol: "CHZ",
    name: "Chiliz",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/CHZ.svg",
  },
  {
    currency: "MINA",
    symbol: "MINA",
    name: "Mina",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/MINA.svg",
  },
  {
    currency: "FLOW",
    symbol: "FLOW",
    name: "Flow",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/FLOW.svg",
  },
  {
    currency: "XTZ",
    symbol: "XTZ",
    name: "Tezos",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/XTZ.svg",
  },
  {
    currency: "KSM",
    symbol: "KSM",
    name: "Kusama",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/KSM.svg",
  },
  {
    currency: "ZIL",
    symbol: "ZIL",
    name: "Zilliqa",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ZIL.svg",
  },
  {
    currency: "BAT",
    symbol: "BAT",
    name: "Basic Attention Token",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BAT.svg",
  },
  {
    currency: "ZRX",
    symbol: "ZRX",
    name: "0x",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ZRX.svg",
  },
  {
    currency: "REP",
    symbol: "REP",
    name: "Augur",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/REP.svg",
  },

  // Additional tokens from API with price data
  {
    currency: "bNEO",
    symbol: "bNEO",
    name: "Binance NEO",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/bNEO.svg",
  },
  {
    currency: "STEVMOS",
    symbol: "STEVMOS",
    name: "Stride EVMOS",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stEVMOS.svg",
  },
  {
    currency: "RATOM",
    symbol: "RATOM",
    name: "Rho ATOM",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/rATOM.svg",
  },
  {
    currency: "STRD",
    symbol: "STRD",
    name: "Stride",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/STRD.svg",
  },
  {
    currency: "EVMOS",
    symbol: "EVMOS",
    name: "Evmos",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/EVMOS.svg",
  },
  {
    currency: "IBCX",
    symbol: "IBCX",
    name: "IBC Index",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/IBCX.svg",
  },
  {
    currency: "IRIS",
    symbol: "IRIS",
    name: "IRIS Network",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/IRIS.svg",
  },
  {
    currency: "ampLUNA",
    symbol: "ampLUNA",
    name: "Amplified LUNA",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ampLUNA.svg",
  },
  {
    currency: "KUJI",
    symbol: "KUJI",
    name: "Kujira",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/KUJI.svg",
  },
  {
    currency: "STOSMO",
    symbol: "STOSMO",
    name: "Stride OSMO",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stOSMO.svg",
  },
  {
    currency: "axlUSDC",
    symbol: "axlUSDC",
    name: "Axelar USDC",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/axlUSDC.svg",
  },
  {
    currency: "STATOM",
    symbol: "STATOM",
    name: "Stride ATOM",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stATOM.svg",
  },
  {
    currency: "rSWTH",
    symbol: "rSWTH",
    name: "Rho SWTH",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/rSWTH.svg",
  },
  {
    currency: "STLUNA",
    symbol: "STLUNA",
    name: "Stride LUNA",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stLUNA.svg",
  },
  {
    currency: "LSI",
    symbol: "LSI",
    name: "Liquid Staking Index",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/LSI.svg",
  },
  {
    currency: "OKT",
    symbol: "OKT",
    name: "OKX Token",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OKT.svg",
  },
  {
    currency: "USC",
    symbol: "USC",
    name: "USD Coin (USC)",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USC.svg",
  },
  {
    currency: "wstETH",
    symbol: "wstETH",
    name: "Wrapped Staked Ethereum",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/wstETH.svg",
  },
  {
    currency: "YieldUSD",
    symbol: "YieldUSD",
    name: "Yield USD",
    logoURI:
      "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/YieldUSD.svg",
  },
];

// Cache for token prices
let priceCache: Record<string, TokenPrice> = {};
let lastFetch: number = 0;
const CACHE_DURATION = 30000; // 30 seconds

export const fetchTokenPrices = async (): Promise<
  Record<string, TokenPrice>
> => {
  const now = Date.now();

  // Return cached data if still fresh
  if (now - lastFetch < CACHE_DURATION && Object.keys(priceCache).length > 0) {
    return priceCache;
  }

  try {
    const response = await axios.get<TokenPrice[]>(
      "https://interview.switcheo.com/prices.json"
    );
    const prices: Record<string, TokenPrice> = {};

    response.data.forEach((price) => {
      prices[price.currency] = price;
    });

    priceCache = prices;
    lastFetch = now;
    return prices;
  } catch (error) {
    console.error("Failed to fetch token prices:", error);
    return priceCache; // Return cached data on error
  }
};

export const getTokensWithPrices = async (): Promise<Token[]> => {
  const prices = await fetchTokenPrices();

  return AVAILABLE_TOKENS.map((token) => ({
    ...token,
    price: prices[token.currency]?.price,
  })).filter((token) => token.price !== undefined); // Only return tokens with price data
};

export const calculateSwapRate = (fromToken: Token, toToken: Token): number => {
  if (!fromToken.price || !toToken.price) return 0;
  return fromToken.price / toToken.price;
};

export const canCalculateRate = (
  fromToken: Token | null,
  toToken: Token | null
): boolean => {
  return !!(fromToken?.price && toToken?.price);
};

export const formatNumber = (value: number, decimals: number = 6): string => {
  if (value === 0) return "0";
  if (value < 0.000001) return "< 0.000001";
  return value.toFixed(decimals).replace(/\.?0+$/, "");
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(value);
};
