export const CARDS = [
  {
    "card_id": "SG01",
    "round": 1,
    "title": "Cool Smarter",
    "category": "ENERGY",
    "action_type": "PERSONAL",
    "nominal_reduction": 100,
    "transition_points": 1,
    "acceptance": 4,
    "difficulty": 1,
    "budgets": [
      {
        "id": "POWER_HOME",
        "weight": 1
      }
    ],
    "family": "HOUSEHOLD_ELECTRICITY",
    "dependencies": [],
    "conflicts": [
      "SG02"
    ],
    "synergies": [],
    "transformation": null,
    "supersedes": [],
    "year_available": 2026,
    "source": [
      "EMA_GEF_2024",
      "NEA_HOME_ENERGY",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG02",
    "round": 1,
    "title": "Use Less Electricity",
    "category": "ENERGY",
    "action_type": "PERSONAL",
    "nominal_reduction": 70,
    "transition_points": 1,
    "acceptance": 5,
    "difficulty": 1,
    "budgets": [
      {
        "id": "POWER_HOME",
        "weight": 1
      }
    ],
    "family": "HOUSEHOLD_ELECTRICITY",
    "dependencies": [],
    "conflicts": [
      "SG01"
    ],
    "synergies": [],
    "transformation": null,
    "supersedes": [],
    "year_available": 2026,
    "source": [
      "EMA_GEF_2024",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG03",
    "round": 1,
    "title": "Public Transport First",
    "category": "TRANSPORT",
    "action_type": "PERSONAL",
    "nominal_reduction": 300,
    "transition_points": 2,
    "acceptance": 4,
    "difficulty": 2,
    "budgets": [
      {
        "id": "LAND_TRANSPORT",
        "weight": 1
      }
    ],
    "family": "MODE_SHIFT",
    "dependencies": [],
    "conflicts": [
      "SG04"
    ],
    "synergies": [
      {
        "card_id": "SG04",
        "bonus": 50
      }
    ],
    "transformation": null,
    "supersedes": [],
    "year_available": 2026,
    "source": [
      "LTA_TRANSPORT",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG04",
    "round": 1,
    "title": "Walk & Cycle More",
    "category": "TRANSPORT",
    "action_type": "PERSONAL",
    "nominal_reduction": 80,
    "transition_points": 1,
    "acceptance": 4,
    "difficulty": 2,
    "budgets": [
      {
        "id": "LAND_TRANSPORT",
        "weight": 1
      }
    ],
    "family": "MODE_SHIFT",
    "dependencies": [],
    "conflicts": [
      "SG03"
    ],
    "synergies": [
      {
        "card_id": "SG03",
        "bonus": 50
      }
    ],
    "transformation": null,
    "supersedes": [],
    "year_available": 2026,
    "source": [
      "SG_GREEN_PLAN",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG05",
    "round": 1,
    "title": "Eat Less Red Meat",
    "category": "FOOD",
    "action_type": "PERSONAL",
    "nominal_reduction": 300,
    "transition_points": 2,
    "acceptance": 3,
    "difficulty": 2,
    "budgets": [
      {
        "id": "FOOD",
        "weight": 1
      }
    ],
    "family": "FOOD_DEMAND",
    "dependencies": [],
    "conflicts": [],
    "synergies": [
      {
        "card_id": "SG06",
        "bonus": 50
      }
    ],
    "transformation": null,
    "supersedes": [],
    "year_available": 2026,
    "source": [
      "FOOD_LCA",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG06",
    "round": 1,
    "title": "Stop Food Waste",
    "category": "FOOD",
    "action_type": "PERSONAL",
    "nominal_reduction": 70,
    "transition_points": 1,
    "acceptance": 5,
    "difficulty": 1,
    "budgets": [
      {
        "id": "FOOD",
        "weight": 1
      }
    ],
    "family": "FOOD_WASTE",
    "dependencies": [],
    "conflicts": [],
    "synergies": [
      {
        "card_id": "SG05",
        "bonus": 50
      }
    ],
    "transformation": null,
    "supersedes": [],
    "year_available": 2026,
    "source": [
      "NEA_FOOD_WASTE",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG07",
    "round": 1,
    "title": "Buy Less, Use Longer",
    "category": "CONSUMPTION",
    "action_type": "PERSONAL",
    "nominal_reduction": 250,
    "transition_points": 2,
    "acceptance": 3,
    "difficulty": 2,
    "budgets": [
      {
        "id": "GOODS",
        "weight": 1
      }
    ],
    "family": "MATERIAL_DEMAND",
    "dependencies": [],
    "conflicts": [],
    "synergies": [
      {
        "card_id": "SG15",
        "bonus": 100
      }
    ],
    "transformation": null,
    "supersedes": [],
    "year_available": 2026,
    "source": [
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG08",
    "round": 1,
    "title": "Fly Less",
    "category": "AVIATION",
    "action_type": "PERSONAL",
    "nominal_reduction": 800,
    "transition_points": 3,
    "acceptance": 2,
    "difficulty": 3,
    "budgets": [
      {
        "id": "AVIATION",
        "weight": 1
      }
    ],
    "family": "AVIATION_DEMAND",
    "dependencies": [],
    "conflicts": [],
    "synergies": [],
    "transformation": null,
    "supersedes": [],
    "year_available": 2026,
    "source": [
      "ICAO_AVIATION",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG09",
    "round": 2,
    "title": "Maximise Solar",
    "category": "ENERGY",
    "action_type": "SYSTEM",
    "nominal_reduction": 120,
    "transition_points": 2,
    "acceptance": 5,
    "difficulty": 2,
    "budgets": [
      {
        "id": "POWER_HOME",
        "weight": 0.7
      },
      {
        "id": "SHARED_SYSTEMS",
        "weight": 0.3
      }
    ],
    "family": "CLEAN_POWER",
    "dependencies": [],
    "conflicts": [],
    "synergies": [],
    "transformation": "SG19",
    "supersedes": [],
    "year_available": 2030,
    "source": [
      "SG_GREEN_PLAN",
      "EMA_GEF_2024",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG10",
    "round": 2,
    "title": "Import Clean Electricity",
    "category": "ENERGY",
    "action_type": "SYSTEM",
    "nominal_reduction": 700,
    "transition_points": 4,
    "acceptance": 4,
    "difficulty": 4,
    "budgets": [
      {
        "id": "POWER_HOME",
        "weight": 0.65
      },
      {
        "id": "SHARED_SYSTEMS",
        "weight": 0.35
      }
    ],
    "family": "CLEAN_POWER",
    "dependencies": [],
    "conflicts": [],
    "synergies": [
      {
        "card_id": "SG11",
        "bonus": 100
      },
      {
        "card_id": "SG13",
        "bonus": 100
      },
      {
        "card_id": "SG14",
        "bonus": 200
      }
    ],
    "transformation": "SG19",
    "supersedes": [],
    "year_available": 2035,
    "source": [
      "MTI_IMPORT_2035",
      "EMA_GEF_2024",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG11",
    "round": 2,
    "title": "Super-Efficient Buildings",
    "category": "BUILDINGS",
    "action_type": "SYSTEM",
    "nominal_reduction": 450,
    "transition_points": 3,
    "acceptance": 5,
    "difficulty": 3,
    "budgets": [
      {
        "id": "POWER_HOME",
        "weight": 0.7
      },
      {
        "id": "SHARED_SYSTEMS",
        "weight": 0.3
      }
    ],
    "family": "BUILDING_EFFICIENCY",
    "dependencies": [],
    "conflicts": [],
    "synergies": [
      {
        "card_id": "SG10",
        "bonus": 100
      }
    ],
    "transformation": null,
    "supersedes": [],
    "year_available": 2030,
    "source": [
      "BCA_GREEN_BUILDINGS",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG12",
    "round": 2,
    "title": "Public Transport & Active Mobility",
    "category": "TRANSPORT",
    "action_type": "SYSTEM",
    "nominal_reduction": 250,
    "transition_points": 2,
    "acceptance": 5,
    "difficulty": 3,
    "budgets": [
      {
        "id": "LAND_TRANSPORT",
        "weight": 1
      }
    ],
    "family": "TRANSPORT_SYSTEM",
    "dependencies": [],
    "conflicts": [
      "SG13"
    ],
    "synergies": [],
    "transformation": null,
    "supersedes": [],
    "year_available": 2030,
    "source": [
      "SG_GREEN_PLAN",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG13",
    "round": 2,
    "title": "Electrify Vehicles",
    "category": "TRANSPORT",
    "action_type": "SYSTEM",
    "nominal_reduction": 200,
    "transition_points": 2,
    "acceptance": 4,
    "difficulty": 3,
    "budgets": [
      {
        "id": "LAND_TRANSPORT",
        "weight": 0.9
      },
      {
        "id": "POWER_HOME",
        "weight": 0.1
      }
    ],
    "family": "VEHICLE_ELECTRIFICATION",
    "dependencies": [],
    "conflicts": [
      "SG12"
    ],
    "synergies": [
      {
        "card_id": "SG10",
        "bonus": 100
      }
    ],
    "transformation": null,
    "supersedes": [],
    "year_available": 2030,
    "source": [
      "SG_GREEN_PLAN",
      "EMA_GEF_2024",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG14",
    "round": 2,
    "title": "Cleaner Industry",
    "category": "INDUSTRY",
    "action_type": "SYSTEM",
    "nominal_reduction": 650,
    "transition_points": 4,
    "acceptance": 3,
    "difficulty": 4,
    "budgets": [
      {
        "id": "SHARED_SYSTEMS",
        "weight": 0.8
      },
      {
        "id": "GOODS",
        "weight": 0.2
      }
    ],
    "family": "INDUSTRY",
    "dependencies": [],
    "conflicts": [],
    "synergies": [
      {
        "card_id": "SG10",
        "bonus": 200
      }
    ],
    "transformation": "SG20",
    "supersedes": [],
    "year_available": 2035,
    "source": [
      "NCCS_INDUSTRY",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG15",
    "round": 2,
    "title": "Circular Economy",
    "category": "MATERIALS",
    "action_type": "SYSTEM",
    "nominal_reduction": 250,
    "transition_points": 2,
    "acceptance": 4,
    "difficulty": 3,
    "budgets": [
      {
        "id": "GOODS",
        "weight": 0.8
      },
      {
        "id": "SHARED_SYSTEMS",
        "weight": 0.2
      }
    ],
    "family": "CIRCULARITY",
    "dependencies": [],
    "conflicts": [],
    "synergies": [
      {
        "card_id": "SG07",
        "bonus": 100
      }
    ],
    "transformation": "SG23",
    "supersedes": [],
    "year_available": 2030,
    "source": [
      "SG_GREEN_PLAN",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG16",
    "round": 2,
    "title": "Lower-Carbon Food System",
    "category": "FOOD",
    "action_type": "SYSTEM",
    "nominal_reduction": 200,
    "transition_points": 2,
    "acceptance": 3,
    "difficulty": 3,
    "budgets": [
      {
        "id": "FOOD",
        "weight": 0.85
      },
      {
        "id": "SHARED_SYSTEMS",
        "weight": 0.15
      }
    ],
    "family": "FOOD_SYSTEM",
    "dependencies": [],
    "conflicts": [],
    "synergies": [],
    "transformation": "SG22",
    "supersedes": [],
    "year_available": 2030,
    "source": [
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG17",
    "round": 2,
    "title": "Zero Waste Push",
    "category": "WASTE",
    "action_type": "SYSTEM",
    "nominal_reduction": 100,
    "transition_points": 1,
    "acceptance": 5,
    "difficulty": 2,
    "budgets": [
      {
        "id": "GOODS",
        "weight": 0.7
      },
      {
        "id": "SHARED_SYSTEMS",
        "weight": 0.3
      }
    ],
    "family": "WASTE",
    "dependencies": [],
    "conflicts": [
      "SG15"
    ],
    "synergies": [],
    "transformation": null,
    "supersedes": [],
    "year_available": 2030,
    "source": [
      "SG_GREEN_PLAN",
      "NEA_WASTE",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG18",
    "round": 2,
    "title": "Green & Cool Singapore",
    "category": "NATURE",
    "action_type": "SYSTEM",
    "nominal_reduction": 50,
    "transition_points": 1,
    "acceptance": 5,
    "difficulty": 2,
    "budgets": [
      {
        "id": "POWER_HOME",
        "weight": 0.6
      },
      {
        "id": "SHARED_SYSTEMS",
        "weight": 0.4
      }
    ],
    "family": "URBAN_GREENING",
    "dependencies": [],
    "conflicts": [],
    "synergies": [],
    "transformation": null,
    "supersedes": [],
    "year_available": 2030,
    "source": [
      "SG_GREEN_PLAN",
      "MODEL_V1"
    ]
  },
  {
    "card_id": "SG19",
    "round": 3,
    "title": "ASEAN Clean Energy Grid",
    "category": "ENERGY",
    "action_type": "TRANSFORMATION",
    "nominal_reduction": 1600,
    "transition_points": 4,
    "acceptance": 4,
    "difficulty": 4,
    "budgets": [
      {
        "id": "POWER_HOME",
        "weight": 0.5
      },
      {
        "id": "LAND_TRANSPORT",
        "weight": 0.2
      },
      {
        "id": "SHARED_SYSTEMS",
        "weight": 0.3
      }
    ],
    "family": "CLEAN_POWER",
    "dependencies": [],
    "conflicts": [],
    "synergies": [],
    "transformation": null,
    "supersedes": [
      "SG09",
      "SG10"
    ],
    "year_available": 2040,
    "source": [
      "EMA_REGIONAL_GRID",
      "MODEL_V1"
    ],
    "readiness": {
      "base": 0.6,
      "bonuses": {
        "SG09": 0.1,
        "SG10": 0.2,
        "SG13": 0.1
      }
    },
    "target_state": {
      "POWER_HOME": 150,
      "LAND_TRANSPORT": 220,
      "SHARED_SYSTEMS": 780
    },
    "model_note": "v4 calibrated target-state transformation with an explicit maximum actual reduction to prevent a single card dominating the game.",
    "max_actual_reduction": 3000
  },
  {
    "card_id": "SG20",
    "round": 3,
    "title": "Net-Zero Industry",
    "category": "INDUSTRY",
    "action_type": "TRANSFORMATION",
    "nominal_reduction": 2200,
    "transition_points": 5,
    "acceptance": 3,
    "difficulty": 5,
    "budgets": [
      {
        "id": "SHARED_SYSTEMS",
        "weight": 0.65
      },
      {
        "id": "GOODS",
        "weight": 0.25
      },
      {
        "id": "POWER_HOME",
        "weight": 0.1
      }
    ],
    "family": "INDUSTRY",
    "dependencies": [],
    "conflicts": [],
    "synergies": [],
    "transformation": null,
    "supersedes": [
      "SG14"
    ],
    "year_available": 2040,
    "source": [
      "NCCS_INDUSTRY",
      "MODEL_V1"
    ],
    "readiness": {
      "base": 0.6,
      "bonuses": {
        "SG10": 0.15,
        "SG11": 0.1,
        "SG14": 0.15
      }
    },
    "target_state": {
      "SHARED_SYSTEMS": 610,
      "GOODS": 620,
      "POWER_HOME": 160
    },
    "model_note": "v4 calibrated target-state transformation with an explicit maximum actual reduction to prevent a single card dominating the game.",
    "max_actual_reduction": 3200
  },
  {
    "card_id": "SG21",
    "round": 3,
    "title": "Clean Aviation & Mobility",
    "category": "AVIATION",
    "action_type": "TRANSFORMATION",
    "nominal_reduction": 1100,
    "transition_points": 4,
    "acceptance": 4,
    "difficulty": 5,
    "budgets": [
      {
        "id": "AVIATION",
        "weight": 0.8
      },
      {
        "id": "LAND_TRANSPORT",
        "weight": 0.2
      }
    ],
    "family": "AVIATION_TECH",
    "dependencies": [],
    "conflicts": [],
    "synergies": [],
    "transformation": null,
    "supersedes": [],
    "year_available": 2040,
    "source": [
      "CAAS_SAHB",
      "MODEL_V1"
    ],
    "readiness": {
      "base": 0.6,
      "bonuses": {
        "SG08": 0.2,
        "SG10": 0.1,
        "SG13": 0.1
      }
    },
    "target_state": {
      "AVIATION": 205,
      "LAND_TRANSPORT": 160
    },
    "model_note": "v4 calibrated target-state transformation with an explicit maximum actual reduction to prevent a single card dominating the game.",
    "max_actual_reduction": 1700
  },
  {
    "card_id": "SG22",
    "round": 3,
    "title": "Low-Carbon Food Singapore",
    "category": "FOOD",
    "action_type": "TRANSFORMATION",
    "nominal_reduction": 1400,
    "transition_points": 3,
    "acceptance": 3,
    "difficulty": 4,
    "budgets": [
      {
        "id": "FOOD",
        "weight": 0.7
      },
      {
        "id": "GOODS",
        "weight": 0.2
      },
      {
        "id": "SHARED_SYSTEMS",
        "weight": 0.1
      }
    ],
    "family": "FOOD_SYSTEM",
    "dependencies": [],
    "conflicts": [],
    "synergies": [],
    "transformation": null,
    "supersedes": [
      "SG16"
    ],
    "year_available": 2040,
    "source": [
      "MODEL_V1"
    ],
    "readiness": {
      "base": 0.6,
      "bonuses": {
        "SG05": 0.15,
        "SG06": 0.1,
        "SG16": 0.15
      }
    },
    "target_state": {
      "FOOD": 510,
      "GOODS": 900,
      "SHARED_SYSTEMS": 1080
    },
    "model_note": "v4 calibrated target-state transformation with an explicit maximum actual reduction to prevent a single card dominating the game.",
    "max_actual_reduction": 3000
  },
  {
    "card_id": "SG23",
    "round": 3,
    "title": "Circular Singapore",
    "category": "MATERIALS",
    "action_type": "TRANSFORMATION",
    "nominal_reduction": 1800,
    "transition_points": 4,
    "acceptance": 3,
    "difficulty": 4,
    "budgets": [
      {
        "id": "GOODS",
        "weight": 0.65
      },
      {
        "id": "SHARED_SYSTEMS",
        "weight": 0.25
      },
      {
        "id": "FOOD",
        "weight": 0.1
      }
    ],
    "family": "CIRCULARITY",
    "dependencies": [],
    "conflicts": [],
    "synergies": [],
    "transformation": null,
    "supersedes": [
      "SG15"
    ],
    "year_available": 2040,
    "source": [
      "SG_GREEN_PLAN",
      "MODEL_V1"
    ],
    "readiness": {
      "base": 0.6,
      "bonuses": {
        "SG07": 0.15,
        "SG15": 0.15,
        "SG17": 0.1
      }
    },
    "target_state": {
      "GOODS": 620,
      "SHARED_SYSTEMS": 900,
      "FOOD": 900
    },
    "model_note": "v4 calibrated target-state transformation with an explicit maximum actual reduction to prevent a single card dominating the game.",
    "max_actual_reduction": 3400
  }
];
