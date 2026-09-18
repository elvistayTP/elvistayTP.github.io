export const BASELINE = {
  version: "2.0",
  country: "Singapore",
  country_code: "SG",
  baseline_year: 2026,
  methodology: "consumption_footprint",
  unit: "kgCO2e/person/year",
  total: 12000,
  target2050: 2000,
  budgets: {
    POWER_HOME: { name: "Home & Power", baseline: 1350, floor2050: 150 },
    LAND_TRANSPORT: { name: "Land Transport", baseline: 1250, floor2050: 100 },
    AVIATION: { name: "Aviation & Travel", baseline: 1450, floor2050: 200 },
    FOOD: { name: "Food", baseline: 2050, floor2050: 500 },
    GOODS: { name: "Goods & Materials", baseline: 2650, floor2050: 450 },
    SHARED_SYSTEMS: { name: "Shared Systems", baseline: 3250, floor2050: 600 }
  }
};
