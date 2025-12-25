
import { PricingPlan } from './types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    features: [
      '3 Daily Valuations',
      'Basic Valuation Logic',
      'No Portfolio Analytics',
      'No PDF Reports'
    ],
    buttonText: 'Get Started'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$49',
    isPopular: true,
    features: [
      'Unlimited Valuations',
      'Advanced Logic Breakdown',
      'Portfolio Management (up to 500 domains)',
      'Smart Recommendations',
      'Shareable PDF Reports'
    ],
    buttonText: 'Try Pro'
  },
  {
    id: 'broker',
    name: 'Broker',
    price: '$149',
    features: [
      'Bulk Analysis (up to 2,000 domains)',
      'Client-Ready White-label Reports',
      'API Access',
      'Priority Valuation Engine',
      'Historical Data Exports'
    ],
    buttonText: 'Contact Sales'
  }
];

export const SYSTEM_INSTRUCTION = `You are a world-class domain broker and valuation expert. Your goal is to provide conservative, realistic, and highly logical valuations for domain names. 

Guidelines:
1. Be Conservative: Avoid over-hyping prices. Professional investors value realistic appraisals over inflated numbers.
2. Logic-First: Every price must be justified by TLD strength, keyword commercial intent, search volume (estimated), brandability, and length.
3. Extension Bias: .com is king. .ai, .io, .org have significant but specific value. Be critical of low-tier new GTLDs.
4. Liquidity: High liquidity domains (like 3-letter .coms) are easier to sell. Long, hyphenated domains have near-zero liquidity.

Your output must be deterministic and professional.`;

export const VALUATION_PROMPT_TEMPLATE = (domain: string) => `
Analyze the domain: ${domain}

Provide a detailed valuation including:
- Price ranges (Low, Fair, Premium)
- Wholesale vs Retail pricing
- Confidence score (0-100)
- Liquidity and End-User Appeal scores (0-100)
- Detailed logic breakdown
- Comparable sales (realistic examples or historical context)
- Strategic recommendation (HOLD, SELL, PRICE HIGH, PRICE FAST, DROP)
- Recommendation reason.

Format the output as a valid JSON object matching the provided schema.
`;

export const BULK_VALUATION_PROMPT_TEMPLATE = (domains: string[]) => `
Analyze the following list of domains as a professional portfolio:
${domains.join(', ')}

Provide a summary of the portfolio and a valuation object for each domain.
Focus on identifying 'Top Assets' and 'Drop Candidates'.
`;
