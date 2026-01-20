const stockData = [
  {
    "run_metadata": {
      "run_id": "20260119_trump_greenland",
      "run_date": "2026-01-19",
      "article_title": "Trump’s Arctic ambitions torch the most important US asset",
      "article_source": "Financial Times",
      "article_theme": "Geopolitics"
    },
    "model_output": {
      "top_pick_index": 0,
      "ideas": [
        {
          "official_stock_name": "Newmont Corporation",
          "direction": "Up",
          "category": "Materials",
          "why": "The implied catalyst is declining trust in US assets driving safe-haven demand. Newmont is highly leveraged to gold prices, which investors are rotating into as Treasuries and the dollar weaken. This assumes geopolitical stress sustains risk-off flows.",
          "confidence": "High"
        },
        {
          "official_stock_name": "Deutsche Bank AG",
          "direction": "Up",
          "category": "Financials",
          "why": "The catalyst is capital diversification away from US assets toward Europe. Deutsche Bank benefits from increased European bond and equity flows as investors rebalance regionally. This assumes sustained portfolio reallocation rather than a brief market wobble.",
          "confidence": "Med"
        },
        {
          "official_stock_name": "BlackRock, Inc.",
          "direction": "Down",
          "category": "Financials",
          "why": "The catalyst is reduced global appetite for US Treasuries and dollar assets. BlackRock is highly exposed to US asset inflows, so sentiment-driven diversification could pressure near-term flows. This assumes investors act on allocation shifts quickly.",
          "confidence": "Med"
        },
        {
          "official_stock_name": "JPMorgan Chase & Co.",
          "direction": "Down",
          "category": "Financials",
          "why": "The implied catalyst is higher US borrowing costs from weaker Treasury demand. JPMorgan is exposed to US capital markets activity and rate volatility. This assumes bond market stress persists and affects financial conditions.",
          "confidence": "Low"
        }
      ],
      "key_assumptions": [
        "Geopolitical tensions translate into sustained asset allocation shifts",
        "Gold remains the primary non-US safe-haven asset",
        "European markets absorb incremental global capital flows"
      ]
    }
  },
  {
    "run_metadata": {
      "run_id": "833f4324",
      "run_date": "2026-01-19",
      "article_title": "The dangerous triumph of neo-mercantilism",
      "article_source": "Financial Times",
      "article_theme": "Geopolitics/Trade"
    },
    "model_output": {
      "top_pick_index": 0,
      "ideas": [
        {
          "official_stock_name": "United States Steel Corporation",
          "direction": "Up",
          "category": "Materials",
          "why": "Rising US tariffs signal stronger protection for domestic manufacturing. US Steel benefits directly from higher import barriers that reduce foreign steel competition, assuming tariffs persist and are enforced.",
          "confidence": "High"
        },
        {
          "official_stock_name": "Nucor Corporation",
          "direction": "Up",
          "category": "Materials",
          "why": "Neo-mercantilist trade policy favors domestic steel producers through tariffs and procurement bias. Nucor is highly exposed to US steel demand if import competition is curtailed.",
          "confidence": "Med"
        },
        {
          "official_stock_name": "Walmart Inc.",
          "direction": "Down",
          "category": "Consumer",
          "why": "Higher tariffs on imported goods raise input costs for large import-heavy retailers. Walmart faces margin pressure if price increases cannot be fully passed on to consumers.",
          "confidence": "Med"
        },
        {
          "official_stock_name": "Nike, Inc.",
          "direction": "Down",
          "category": "Consumer",
          "why": "Escalating trade frictions and tariffs increase costs and disrupt supply chains for globally sourced apparel, leaving Nike exposed if trade barriers persist.",
          "confidence": "Low"
        }
      ],
      "key_assumptions": [
        "US tariff levels remain elevated over the next several months",
        "China continues exporting excess industrial capacity abroad",
        "No rapid multilateral trade détentes reverses current policies"
      ]
    }
  },
  {
    "run_metadata": {
      "run_id": "oil_head_fake_58bbf55b",
      "run_date": "2026-01-19",
      "article_title": "The great oil head fake",
      "article_source": "Financial Times",
      "article_theme": "Energy/Geopolitics"
    },
    "model_output": {
      "top_pick_index": 0,
      "ideas": [
        {
          "official_stock_name": "Exxon Mobil Corporation",
          "direction": "Up",
          "category": "Energy/Commodities",
          "why": "Catalyst is a rebound in oil prices from underpriced geopolitical risk and supply decline. Exxon is highly leveraged to higher crude prices via upstream earnings. Assumes oil supply disruptions or stockpiling tighten balances soon.",
          "confidence": "High"
        },
        {
          "official_stock_name": "Chevron Corporation",
          "direction": "Up",
          "category": "Energy/Commodities",
          "why": "Rising crude prices would lift cash flow and margins. Chevron has large upstream exposure and benefits directly if current oversupply reverses. Assumes demand holds and no rapid new supply comes online.",
          "confidence": "Med"
        },
        {
          "official_stock_name": "SLB",
          "direction": "Up",
          "category": "Energy/Commodities",
          "why": "Higher oil prices typically trigger renewed upstream investment. SLB benefits from increased drilling and field services as producers respond to tighter supply. Assumes capex responds within months, not years.",
          "confidence": "Med"
        },
        {
          "official_stock_name": "BP p.l.c.",
          "direction": "Up",
          "category": "Energy/Commodities",
          "why": "Oil price upside could offset recent weakness from energy transition writedowns. BP’s earnings remain sensitive to crude prices. Assumes oil rally outweighs investor concerns on strategy.",
          "confidence": "Low"
        },
        {
          "official_stock_name": "Tesla, Inc.",
          "direction": "Down",
          "category": "Consumer",
          "why": "Higher oil prices may accelerate EV adoption sentiment but also raise input and logistics costs. Near-term market rotation into energy could pressure high-multiple EV stocks. Assumes oil rally dominates equity sentiment.",
          "confidence": "Low"
        }
      ],
      "key_assumptions": [
        "Oil supply from mature fields declines faster than new investment replaces it",
        "Geopolitical risk materializes or is repriced by markets",
        "Chinese crude stockpiling continues near term",
        "Global oil demand does not materially weaken"
      ]
    }
  }
];
