export interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

export interface Token {
  currency: string;
  price?: number;
  name?: string;
  symbol: string;
  logoURI?: string;
}

export interface SwapFormData {
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  toAmount: string;
  slippage: number;
}

export interface SwapTransaction {
  id: string;
  fromToken: Token;
  toToken: Token;
  fromAmount: number;
  toAmount: number;
  rate: number;
  timestamp: Date;
  status: "pending" | "success" | "failed";
}
