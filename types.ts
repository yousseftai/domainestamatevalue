
export enum ValuationConfidence {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum RecommendationAction {
  HOLD = 'HOLD',
  SELL = 'SELL',
  PRICE_HIGH = 'PRICE_HIGH',
  PRICE_FAST = 'PRICE_FAST',
  DROP = 'DROP'
}

export interface ValuationResult {
  domain: string;
  lowValue: number;
  fairValue: number;
  premiumValue: number;
  wholesalePrice: number;
  retailPrice: number;
  confidenceScore: number;
  liquidityScore: number;
  appealScore: number;
  logic: string[];
  comparableSales: {
    domain: string;
    price: number;
    date: string;
  }[];
  recommendation: RecommendationAction;
  recommendationReason: string;
  analysis: {
    tldStrength: number;
    commercialIntent: number;
    brandability: number;
    lengthScore: number;
  };
}

export interface PortfolioSummary {
  totalAssets: number;
  totalEstimatedValue: number;
  averageValue: number;
  topAssets: ValuationResult[];
  dropCandidates: ValuationResult[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}
