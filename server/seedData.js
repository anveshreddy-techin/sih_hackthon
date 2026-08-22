// Seed data for KisanSetu - Smart Farmer Procurement Schedule & Status Information System

export const MSP_CATALOG = [
  {
    id: "paddy-common",
    name: "Paddy (Common)",
    name_te: "వరి (సాధారణ రకం)",
    name_hi: "धान (सामान्य)",
    msp: 2300,
    marketAvg: 2180,
    unit: "Quintal",
    category: "Cereals",
    maxMoisture: 17,
    season: "Kharif 2026",
    priceTrend: "+5.4% YoY",
    icon: "🌾"
  },
  {
    id: "paddy-grade-a",
    name: "Paddy (Grade A / Sona Masoori)",
    name_te: "వరి (గ్రేడ్-ఎ / సోనా మసూరి)",
    name_hi: "धान (ग्रेड-ए / सोना मसूरी)",
    msp: 2320,
    marketAvg: 2450,
    unit: "Quintal",
    category: "Cereals",
    maxMoisture: 17,
    season: "Kharif 2026",
    priceTrend: "+5.8% YoY",
    icon: "🌾"
  },
  {
    id: "cotton-long",
    name: "Cotton (Long Staple)",
    name_te: "పత్తి (పొడుగు పింజ)",
    name_hi: "कपास (लंबा रेशा)",
    msp: 7521,
    marketAvg: 7350,
    unit: "Quintal",
    category: "Fiber",
    maxMoisture: 12,
    season: "Kharif 2026",
    priceTrend: "+7.2% YoY",
    icon: "☁️"
  },
  {
    id: "maize",
    name: "Maize (Corn)",
    name_te: "మొక్కజొన్న",
    name_hi: "मक्का",
    msp: 2225,
    marketAvg: 2100,
    unit: "Quintal",
    category: "Cereals",
    maxMoisture: 14,
    season: "Kharif 2026",
    priceTrend: "+6.1% YoY",
    icon: "🌽"
  },
  {
    id: "soyabean",
    name: "Soyabean (Yellow)",
    name_te: "సోయాబీన్ (పసుపు)",
    name_hi: "सोयाबीन (पीला)",
    msp: 4892,
    marketAvg: 4650,
    unit: "Quintal",
    category: "Oilseeds",
    maxMoisture: 12,
    season: "Kharif 2026",
    priceTrend: "+4.9% YoY",
    icon: "🌱"
  },
  {
    id: "chilli",
    name: "Red Chilli (Teja / Guntur)",
    name_te: "ఎండు మిర్చి (తేజ / గుంటూరు)",
    name_hi: "लाल मिर्च (तेजा / गुंटूर)",
    msp: 18500,
    marketAvg: 19800,
    unit: "Quintal",
    category: "Spices",
    maxMoisture: 10,
    season: "Rabi 2026",
    priceTrend: "+12.4% YoY",
    icon: "🌶️"
  },
  {
    id: "turmeric",
    name: "Turmeric (Nizamabad Finger)",
    name_te: "పసుపు (నిజామాబాద్ కొమ్ములు)",
    name_hi: "हल्दी (निजामाबाद)",
    msp: 13500,
    marketAvg: 14200,
    unit: "Quintal",
    category: "Spices",
    maxMoisture: 11,
    season: "Rabi 2026",
    priceTrend: "+8.5% YoY",
    icon: "🟡"
  },
  {
    id: "groundnut",
    name: "Groundnut (Pod)",
    name_te: "వేరుశెనగ (కాయలు)",
    name_hi: "मूंगफली (फली)",
    msp: 6783,
    marketAvg: 6950,
    unit: "Quintal",
    category: "Oilseeds",
    maxMoisture: 9,
    season: "Kharif 2026",
    priceTrend: "+5.1% YoY",
    icon: "🥜"
  },
  {
    id: "wheat",
    name: "Wheat (Sharbati / HD-2967)",
    name_te: "గోధుమలు",
    name_hi: "गेहूं (शरबती)",
    msp: 2425,
    marketAvg: 2380,
    unit: "Quintal",
    category: "Cereals",
    maxMoisture: 12,
    season: "Rabi 2026",
    priceTrend: "+6.8% YoY",
    icon: "🌾"
  },
  {
    id: "bengal-gram",
    name: "Bengal Gram (Chana / Chickpea)",
    name_te: "శనగలు (దేశవాళీ)",
    name_hi: "चना (देसी)",
    msp: 5650,
    marketAvg: 5800,
    unit: "Quintal",
    category: "Pulses",
    maxMoisture: 12,
    season: "Rabi 2026",
    priceTrend: "+7.0% YoY",
    icon: "🫘"
  }
];

export const INITIAL_CENTRES = [
  {
    id: "PPC-TS-01",
    name: "Enumamula Agricultural Market Yard (PPC-01)",
    name_te: "ఏనుమాముల వ్యవసాయ మార్కెట్ యార్డ్ (PPC-01)",
    name_hi: "एनुमामुला कृषि मंडी (PPC-01)",
    type: "Agricultural Market Committee (AMC) / PPC",
    type_te: "వ్యవసాయ మార్కెట్ కమిటీ (AMC) / సేకరణ కేంద్రం",
    district: "Warangal",
    mandal: "Warangal Urban",
    state: "Telangana",
    address: "Enumamula Market Yard, Narsampet Road, Warangal - 506006",
    lat: 17.9784,
    lng: 79.6241,
    status: "open", // open, closed, break, quota_full
    statusReason: "Normal operations active. 4 weighbridges operational.",
    statusReason_te: "సాధారణ సేకరణ జరుగుతోంది. 4 వేబ్రిడ్జిలు పని చేస్తున్నాయి.",
    timings: {
      open: "08:00 AM",
      close: "05:30 PM",
      lunchBreak: "01:00 PM - 02:00 PM",
      workingDays: "Monday - Saturday (Sunday Closed)"
    },
    acceptedCrops: [
      {
        cropId: "paddy-grade-a",
        name: "Paddy (Grade A / Sona Masoori)",
        name_te: "వరి (గ్రేడ్-ఎ)",
        msp: 2320,
        bonus: 500, // Government incentive bonus
        dailyQuotaQuintals: 2500,
        procuredTodayQuintals: 1420,
        maxMoisture: 17,
        status: "accepting" // accepting, full, paused
      },
      {
        cropId: "cotton-long",
        name: "Cotton (Long Staple)",
        name_te: "పత్తి (లాంగ్ స్టేపుల్)",
        msp: 7521,
        bonus: 0,
        dailyQuotaQuintals: 1800,
        procuredTodayQuintals: 850,
        maxMoisture: 12,
        status: "accepting"
      },
      {
        cropId: "chilli",
        name: "Red Chilli (Teja)",
        name_te: "ఎండు మిర్చి (తేజ)",
        msp: 18500,
        bonus: 0,
        dailyQuotaQuintals: 1200,
        procuredTodayQuintals: 620,
        maxMoisture: 10,
        status: "accepting"
      },
      {
        cropId: "maize",
        name: "Maize (Corn)",
        name_te: "మొక్కజొన్న",
        msp: 2225,
        bonus: 0,
        dailyQuotaQuintals: 1500,
        procuredTodayQuintals: 1350,
        maxMoisture: 14,
        status: "accepting"
      }
    ],
    queue: {
      totalTokensIssuedToday: 68,
      currentlyServingToken: "KST-042",
      activeQueueCount: 14,
      avgMinutesPerToken: 8,
      estimatedWaitTimeMinutes: 45
    },
    facilities: {
      coveredYard: true,
      electronicWeighbridge: true,
      moistureTestingLab: true,
      drinkingWater: true,
      canteen: true,
      restingShed: true,
      gunnyBagsStock: 14500,
      storageCapacityQuintals: 30000,
      occupiedCapacityQuintals: 16800
    },
    contact: {
      officerName: "K. Rajagopal (Special Officer)",
      phone: "+91 94401 23456",
      helpdesk: "1800-425-0033"
    },
    rating: 4.8,
    reviewsCount: 312
  },
  {
    id: "PPC-TS-02",
    name: "Suryapet PACS Paddy Procurement Centre",
    name_te: "సూర్యాపేట పి.ఎ.సి.ఎస్ వరి సేకరణ కేంద్రం",
    name_hi: "सूर्यापेट पैक्स धान खरीद केंद्र",
    type: "Primary Agricultural Credit Society (PACS)",
    type_te: "ప్రాథమిక వ్యవసాయ పరపతి సంఘం (PACS)",
    district: "Suryapet",
    mandal: "Suryapet Rural",
    state: "Telangana",
    address: "PACS Godown Complex, Near NH-65, Suryapet - 508213",
    lat: 17.1425,
    lng: 79.6234,
    status: "open",
    statusReason: "High moisture testing underway. Please ensure paddy moisture < 17%.",
    statusReason_te: "తేమ శాతం తనిఖీ జరుగుతోంది. వడ్లలో తేమ 17% కంటే తక్కువ ఉండేలా చూసుకోండి.",
    timings: {
      open: "08:30 AM",
      close: "05:00 PM",
      lunchBreak: "01:00 PM - 01:45 PM",
      workingDays: "Monday - Saturday"
    },
    acceptedCrops: [
      {
        cropId: "paddy-common",
        name: "Paddy (Common)",
        name_te: "వరి (సాధారణ రకం)",
        msp: 2300,
        bonus: 500,
        dailyQuotaQuintals: 2000,
        procuredTodayQuintals: 1680,
        maxMoisture: 17,
        status: "accepting"
      },
      {
        cropId: "paddy-grade-a",
        name: "Paddy (Grade A)",
        name_te: "వరి (గ్రేడ్-ఎ)",
        msp: 2320,
        bonus: 500,
        dailyQuotaQuintals: 1500,
        procuredTodayQuintals: 920,
        maxMoisture: 17,
        status: "accepting"
      }
    ],
    queue: {
      totalTokensIssuedToday: 52,
      currentlyServingToken: "KST-036",
      activeQueueCount: 9,
      avgMinutesPerToken: 10,
      estimatedWaitTimeMinutes: 30
    },
    facilities: {
      coveredYard: true,
      electronicWeighbridge: true,
      moistureTestingLab: true,
      drinkingWater: true,
      canteen: false,
      restingShed: true,
      gunnyBagsStock: 8200,
      storageCapacityQuintals: 15000,
      occupiedCapacityQuintals: 11200
    },
    contact: {
      officerName: "M. Venkateshwarlu (PACS Secretary)",
      phone: "+91 98480 87654",
      helpdesk: "08684-220111"
    },
    rating: 4.6,
    reviewsCount: 184
  },
  {
    id: "PPC-TS-03",
    name: "Nizamabad Agricultural Market Yard (Turmeric & Soyabean)",
    name_te: "నిజామాబాద్ వ్యవసాయ మార్కెట్ యార్డ్ (పసుపు & సోయాబీన్)",
    name_hi: "निजामाबाद कृषि उपज मंडी (हल्दी एवं सोयाबीन)",
    type: "Specialized Commodity Market",
    type_te: "ప్రత్యేక వ్యవసాయ మార్కెట్ యార్డ్",
    district: "Nizamabad",
    mandal: "Nizamabad North",
    state: "Telangana",
    address: "AMC Yard, Dichpally Road, Nizamabad - 503001",
    lat: 18.6725,
    lng: 78.0941,
    status: "open",
    statusReason: "Electronic e-NAM auction & Direct MSP procurement active.",
    statusReason_te: "ఈ-నామ్ వేలం మరియు డైరెక్ట్ ఎంఎస్‌పీ సేకరణ నడుస్తోంది.",
    timings: {
      open: "08:00 AM",
      close: "06:00 PM",
      lunchBreak: "01:00 PM - 02:00 PM",
      workingDays: "Monday - Friday (Sat/Sun Maintenance)"
    },
    acceptedCrops: [
      {
        cropId: "turmeric",
        name: "Turmeric (Finger/Gatta)",
        name_te: "పసుపు కొమ్ములు",
        msp: 13500,
        bonus: 0,
        dailyQuotaQuintals: 3000,
        procuredTodayQuintals: 1890,
        maxMoisture: 11,
        status: "accepting"
      },
      {
        cropId: "soyabean",
        name: "Soyabean (Yellow)",
        name_te: "సోయాబీన్",
        msp: 4892,
        bonus: 0,
        dailyQuotaQuintals: 2200,
        procuredTodayQuintals: 1540,
        maxMoisture: 12,
        status: "accepting"
      },
      {
        cropId: "maize",
        name: "Maize",
        name_te: "మొక్కజొన్న",
        msp: 2225,
        bonus: 0,
        dailyQuotaQuintals: 1600,
        procuredTodayQuintals: 880,
        maxMoisture: 14,
        status: "accepting"
      }
    ],
    queue: {
      totalTokensIssuedToday: 84,
      currentlyServingToken: "KST-058",
      activeQueueCount: 18,
      avgMinutesPerToken: 7,
      estimatedWaitTimeMinutes: 50
    },
    facilities: {
      coveredYard: true,
      electronicWeighbridge: true,
      moistureTestingLab: true,
      drinkingWater: true,
      canteen: true,
      restingShed: true,
      gunnyBagsStock: 22000,
      storageCapacityQuintals: 45000,
      occupiedCapacityQuintals: 28400
    },
    contact: {
      officerName: "P. Ravinder Reddy (AMC Secretary)",
      phone: "+91 94901 54321",
      helpdesk: "08462-234567"
    },
    rating: 4.9,
    reviewsCount: 420
  },
  {
    id: "PPC-TS-04",
    name: "Khammam Cotton & Grain Procurement Centre (CCI)",
    name_te: "ఖమ్మం కాటన్ కార్పొరేషన్ & గ్రెయిన్ సేకరణ కేంద్రం (CCI)",
    name_hi: "खम्मम कपास एवं अनाज खरीद केंद्र (CCI)",
    type: "Cotton Corporation of India (CCI) Center",
    type_te: "భారత పత్తి సంస్థ (CCI) కొనుగోలు కేంద్రం",
    district: "Khammam",
    mandal: "Khammam Urban",
    state: "Telangana",
    address: "Industrial Area, Bypass Road, Khammam - 507002",
    lat: 17.2473,
    lng: 80.1514,
    status: "break",
    statusReason: "Lunch break in progress. Weighbridge resumes at 02:00 PM.",
    statusReason_te: "భోజన విరామం. మధ్యాహ్నం 2:00 గంటలకు తూకం తిరిగి ప్రారంభమవుతుంది.",
    timings: {
      open: "09:00 AM",
      close: "05:00 PM",
      lunchBreak: "01:00 PM - 02:00 PM",
      workingDays: "Monday - Saturday"
    },
    acceptedCrops: [
      {
        cropId: "cotton-long",
        name: "Cotton (Long Staple)",
        name_te: "పత్తి",
        msp: 7521,
        bonus: 0,
        dailyQuotaQuintals: 3500,
        procuredTodayQuintals: 2100,
        maxMoisture: 12,
        status: "accepting"
      },
      {
        cropId: "paddy-common",
        name: "Paddy (Common)",
        name_te: "వరి",
        msp: 2300,
        bonus: 500,
        dailyQuotaQuintals: 1500,
        procuredTodayQuintals: 950,
        maxMoisture: 17,
        status: "accepting"
      }
    ],
    queue: {
      totalTokensIssuedToday: 45,
      currentlyServingToken: "KST-030",
      activeQueueCount: 11,
      avgMinutesPerToken: 9,
      estimatedWaitTimeMinutes: 65
    },
    facilities: {
      coveredYard: true,
      electronicWeighbridge: true,
      moistureTestingLab: true,
      drinkingWater: true,
      canteen: true,
      restingShed: true,
      gunnyBagsStock: 11000,
      storageCapacityQuintals: 25000,
      occupiedCapacityQuintals: 18200
    },
    contact: {
      officerName: "T. Srinivas (CCI Incharge)",
      phone: "+91 93910 99887",
      helpdesk: "1800-120-2277"
    },
    rating: 4.5,
    reviewsCount: 160
  },
  {
    id: "PPC-AP-05",
    name: "Guntur Mirchi Yard & Rythu Bharosa Kendra (RBK-14)",
    name_te: "గుంటూరు మిర్చి యార్డ్ & రైతు భరోసా కేంద్రం (RBK-14)",
    name_hi: "गुंटूर मिर्च यार्ड एवं रायथू भरोसा केंद्र",
    type: "Rythu Bharosa Kendra (RBK) & Asia's Largest Chilli Yard",
    type_te: "రైతు భరోసా కేంద్రం (RBK) & మిర్చి యార్డ్",
    district: "Guntur",
    mandal: "Guntur Rural",
    state: "Andhra Pradesh",
    address: "Grand Trunk Road, Ankireddypalem, Guntur - 522005",
    lat: 16.3067,
    lng: 80.4365,
    status: "open",
    statusReason: "Cold storage allotment and spot testing open for all red chilli grades.",
    statusReason_te: "మిర్చి నాణ్యతా పరీక్షలు మరియు కోల్డ్ స్టోరేజ్ అలాట్‌మెంట్ సాగుతోంది.",
    timings: {
      open: "07:30 AM",
      close: "06:30 PM",
      lunchBreak: "01:00 PM - 02:00 PM",
      workingDays: "Monday - Saturday"
    },
    acceptedCrops: [
      {
        cropId: "chilli",
        name: "Red Chilli (Teja / 334 / Byadgi)",
        name_te: "ఎండు మిర్చి",
        msp: 18500,
        bonus: 1000,
        dailyQuotaQuintals: 5000,
        procuredTodayQuintals: 3400,
        maxMoisture: 10,
        status: "accepting"
      },
      {
        cropId: "cotton-long",
        name: "Cotton",
        name_te: "పత్తి",
        msp: 7521,
        bonus: 0,
        dailyQuotaQuintals: 2000,
        procuredTodayQuintals: 1100,
        maxMoisture: 12,
        status: "accepting"
      },
      {
        cropId: "bengal-gram",
        name: "Bengal Gram (Chana)",
        name_te: "శనగలు",
        msp: 5650,
        bonus: 0,
        dailyQuotaQuintals: 1500,
        procuredTodayQuintals: 720,
        maxMoisture: 12,
        status: "accepting"
      }
    ],
    queue: {
      totalTokensIssuedToday: 112,
      currentlyServingToken: "KST-089",
      activeQueueCount: 16,
      avgMinutesPerToken: 6,
      estimatedWaitTimeMinutes: 35
    },
    facilities: {
      coveredYard: true,
      electronicWeighbridge: true,
      moistureTestingLab: true,
      drinkingWater: true,
      canteen: true,
      restingShed: true,
      gunnyBagsStock: 35000,
      storageCapacityQuintals: 80000,
      occupiedCapacityQuintals: 52000
    },
    contact: {
      officerName: "B. Sambasiva Rao (RBK Nodal Officer)",
      phone: "+91 94412 88990",
      helpdesk: "1902"
    },
    rating: 4.9,
    reviewsCount: 580
  },
  {
    id: "PPC-TS-06",
    name: "Karimnagar District Markfed Godown PPC",
    name_te: "కరీంనగర్ మార్క్‌ఫెడ్ గోడౌన్ సేకరణ కేంద్రం",
    name_hi: "करीमनगर मार्कफेड गोदाम खरीद केंद्र",
    type: "Markfed Procurement Centre",
    type_te: "మార్క్‌ఫెడ్ కొనుగోలు కేంద్రం",
    district: "Karimnagar",
    mandal: "Karimnagar Rural",
    state: "Telangana",
    address: "Markfed Complex, Collectorate Road, Karimnagar - 505001",
    lat: 18.4386,
    lng: 79.1288,
    status: "quota_full",
    statusReason: "Daily procurement quota filled for today (3000 Quintals reached). Reopens tomorrow 8 AM.",
    statusReason_te: "ఈ రోజు సేకరణ కోటా పూర్తయింది. రేపు ఉదయం 8:00 గంటలకు తిరిగి ప్రారంభం.",
    timings: {
      open: "08:00 AM",
      close: "05:00 PM",
      lunchBreak: "01:00 PM - 01:45 PM",
      workingDays: "Monday - Saturday"
    },
    acceptedCrops: [
      {
        cropId: "paddy-grade-a",
        name: "Paddy (Grade A)",
        name_te: "వరి (గ్రేడ్-ఎ)",
        msp: 2320,
        bonus: 500,
        dailyQuotaQuintals: 3000,
        procuredTodayQuintals: 3000,
        maxMoisture: 17,
        status: "full"
      },
      {
        cropId: "maize",
        name: "Maize",
        name_te: "మొక్కజొన్న",
        msp: 2225,
        bonus: 0,
        dailyQuotaQuintals: 1500,
        procuredTodayQuintals: 1500,
        maxMoisture: 14,
        status: "full"
      }
    ],
    queue: {
      totalTokensIssuedToday: 95,
      currentlyServingToken: "KST-095",
      activeQueueCount: 0,
      avgMinutesPerToken: 8,
      estimatedWaitTimeMinutes: 0
    },
    facilities: {
      coveredYard: true,
      electronicWeighbridge: true,
      moistureTestingLab: true,
      drinkingWater: true,
      canteen: true,
      restingShed: true,
      gunnyBagsStock: 18000,
      storageCapacityQuintals: 40000,
      occupiedCapacityQuintals: 39500
    },
    contact: {
      officerName: "Ch. Ramesh (Markfed DM)",
      phone: "+91 94906 11223",
      helpdesk: "0878-224455"
    },
    rating: 4.7,
    reviewsCount: 245
  },
  {
    id: "PPC-TS-07",
    name: "Jangaon IKP Women SHG Paddy Procurement Centre",
    name_te: "జనగామ ఐకేపీ మహిళా సమాఖ్య వరి కొనుగోలు కేంద్రం",
    name_hi: "जनगांव आईकेपी महिला समूह धान खरीद केंद्र",
    type: "IKP Women Self-Help Group (SHG) Centre",
    type_te: "ఐకేపీ మహిళా సమాఖ్య కేంద్రం",
    district: "Jangaon",
    mandal: "Jangaon",
    state: "Telangana",
    address: "Near Railway Gate, Station Road, Jangaon - 506167",
    lat: 17.7215,
    lng: 79.1553,
    status: "open",
    statusReason: "Spot payment advice generation and immediate lorry loading.",
    statusReason_te: "స్పాట్ పేమెంట్ రసీదు మరియు వెంటనే లారీ లోడింగ్ జరుగుతోంది.",
    timings: {
      open: "08:30 AM",
      close: "05:30 PM",
      lunchBreak: "01:00 PM - 02:00 PM",
      workingDays: "Monday - Saturday"
    },
    acceptedCrops: [
      {
        cropId: "paddy-common",
        name: "Paddy (Common)",
        name_te: "వరి (సాధారణ)",
        msp: 2300,
        bonus: 500,
        dailyQuotaQuintals: 1800,
        procuredTodayQuintals: 1100,
        maxMoisture: 17,
        status: "accepting"
      },
      {
        cropId: "paddy-grade-a",
        name: "Paddy (Grade A)",
        name_te: "వరి (గ్రేడ్-ఎ)",
        msp: 2320,
        bonus: 500,
        dailyQuotaQuintals: 1200,
        procuredTodayQuintals: 740,
        maxMoisture: 17,
        status: "accepting"
      }
    ],
    queue: {
      totalTokensIssuedToday: 38,
      currentlyServingToken: "KST-027",
      activeQueueCount: 7,
      avgMinutesPerToken: 8,
      estimatedWaitTimeMinutes: 25
    },
    facilities: {
      coveredYard: false,
      electronicWeighbridge: true,
      moistureTestingLab: true,
      drinkingWater: true,
      canteen: false,
      restingShed: true,
      gunnyBagsStock: 9500,
      storageCapacityQuintals: 12000,
      occupiedCapacityQuintals: 7800
    },
    contact: {
      officerName: "Smt. K. Saritha (IKP Coordinator)",
      phone: "+91 97012 33445",
      helpdesk: "1800-425-1111"
    },
    rating: 4.7,
    reviewsCount: 140
  }
];

export const INITIAL_TOKENS = [
  {
    tokenNumber: "KST-041",
    centreId: "PPC-TS-01",
    centreName: "Enumamula Agricultural Market Yard (PPC-01)",
    farmerName: "B. Mallesh Yadav",
    farmerName_te: "బి. మల్లేష్ యాదవ్",
    phone: "9848011223",
    aadhaarLast4: "4589",
    passbookNo: "TS-WGL-2024-9912",
    cropId: "paddy-grade-a",
    cropName: "Paddy (Grade A / Sona Masoori)",
    quantityQuintals: 45,
    vehicleType: "Tractor-Trolley (ట్రాక్టర్)",
    vehicleNumber: "TS 03 TA 4421",
    slotDate: "2026-08-22",
    slotTime: "10:30 AM - 11:30 AM",
    status: "COMPLETED", // BOOKED, CHECKED_IN, TESTING, WEIGHING, PAID, COMPLETED, CANCELLED
    moistureMeasured: 15.8,
    gradeAssigned: "Grade-A Super",
    totalWeightQuintals: 45.2,
    netPayableAmount: 127464, // (45.2 * (2320 + 500))
    issuedAt: "2026-08-22T08:15:00.000Z",
    completedAt: "2026-08-22T10:45:00.000Z"
  },
  {
    tokenNumber: "KST-042",
    centreId: "PPC-TS-01",
    centreName: "Enumamula Agricultural Market Yard (PPC-01)",
    farmerName: "G. Ramachandra Reddy",
    farmerName_te: "జి. రామచంద్రారెడ్డి",
    phone: "9440199882",
    aadhaarLast4: "7123",
    passbookNo: "TS-WGL-2023-8821",
    cropId: "paddy-grade-a",
    cropName: "Paddy (Grade A / Sona Masoori)",
    quantityQuintals: 60,
    vehicleType: "Mini-Truck (డీసీఎం / బొలేరో)",
    vehicleNumber: "TS 03 UB 1092",
    slotDate: "2026-08-22",
    slotTime: "11:00 AM - 12:00 PM",
    status: "WEIGHING",
    moistureMeasured: 16.2,
    gradeAssigned: "Grade-A Standard",
    totalWeightQuintals: null,
    netPayableAmount: null,
    issuedAt: "2026-08-22T08:30:00.000Z"
  },
  {
    tokenNumber: "KST-043",
    centreId: "PPC-TS-01",
    centreName: "Enumamula Agricultural Market Yard (PPC-01)",
    farmerName: "K. Srinivas Rao",
    farmerName_te: "కె. శ్రీనివాసరావు",
    phone: "9121233445",
    aadhaarLast4: "9012",
    passbookNo: "TS-WGL-2025-1102",
    cropId: "cotton-long",
    cropName: "Cotton (Long Staple)",
    quantityQuintals: 30,
    vehicleType: "Tractor-Trolley (ట్రాక్టర్)",
    vehicleNumber: "TS 03 TC 8831",
    slotDate: "2026-08-22",
    slotTime: "11:30 AM - 12:30 PM",
    status: "TESTING",
    moistureMeasured: 11.5,
    gradeAssigned: null,
    totalWeightQuintals: null,
    netPayableAmount: null,
    issuedAt: "2026-08-22T09:00:00.000Z"
  },
  {
    tokenNumber: "KST-044",
    centreId: "PPC-TS-01",
    centreName: "Enumamula Agricultural Market Yard (PPC-01)",
    farmerName: "Anvesh Kumar (You)",
    farmerName_te: "అన్వేష్ కుమార్",
    phone: "9876543210",
    aadhaarLast4: "2345",
    passbookNo: "TS-WGL-2026-0044",
    cropId: "paddy-grade-a",
    cropName: "Paddy (Grade A / Sona Masoori)",
    quantityQuintals: 50,
    vehicleType: "Tractor-Trolley (ట్రాక్టర్)",
    vehicleNumber: "TS 03 AA 5555",
    slotDate: "2026-08-22",
    slotTime: "12:00 PM - 01:00 PM",
    status: "CHECKED_IN",
    moistureMeasured: null,
    gradeAssigned: null,
    totalWeightQuintals: null,
    netPayableAmount: null,
    issuedAt: "2026-08-22T09:15:00.000Z"
  },
  {
    tokenNumber: "KST-045",
    centreId: "PPC-TS-01",
    centreName: "Enumamula Agricultural Market Yard (PPC-01)",
    farmerName: "P. Lakshmi Bai",
    farmerName_te: "పి. లక్ష్మీబాయి",
    phone: "9988776655",
    aadhaarLast4: "6678",
    passbookNo: "TS-WGL-2024-5541",
    cropId: "chilli",
    cropName: "Red Chilli (Teja)",
    quantityQuintals: 20,
    vehicleType: "Auto Trolley (ఆటో ట్రాలీ)",
    vehicleNumber: "TS 03 TR 7712",
    slotDate: "2026-08-22",
    slotTime: "02:00 PM - 03:00 PM",
    status: "BOOKED",
    moistureMeasured: null,
    gradeAssigned: null,
    totalWeightQuintals: null,
    netPayableAmount: null,
    issuedAt: "2026-08-22T09:45:00.000Z"
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ANN-001",
    centreId: "ALL",
    centreName: "All Procurement Centres (రాష్ట్ర వ్యాప్తంగా)",
    title: "Government Bonus: ₹500/Quintal on Fine Grade Paddy",
    title_te: "ప్రభుత్వ బోనస్: సన్న వడ్లకు క్వింటాకు ₹500 అదనపు బోనస్ జమ",
    title_hi: "सरकारी बोनस: बारीक धान पर ₹500 प्रति क्विंटल अतिरिक्त प्रोत्साहन राशि",
    message: "Telangana state government has confirmed immediate ₹500 per quintal incentive directly into farmer bank accounts within 48 hours of weighment.",
    message_te: "రైతులు కొనుగోలు కేంద్రాల్లో ధాన్యం విక్రయించిన 48 గంటల్లోగా క్వింటాకు ₹500 బోనస్ నేరుగా వారి బ్యాంక్ ఖాతాల్లో జమ చేయబడుతుంది.",
    severity: "success", // success, warning, info, alert
    timestamp: "2026-08-22T08:00:00.000Z",
    isActive: true
  },
  {
    id: "ANN-002",
    centreId: "PPC-TS-01",
    centreName: "Enumamula Agricultural Market Yard",
    title: "Weather Alert: Evening Rain Forecast - Covered Shed Priority",
    title_te: "వాతావరణ హెచ్చరిక: సాయంత్రం వర్షం సూచన - షెడ్ల కేటాయింపు",
    title_hi: "मौसम चेतावनी: शाम को बारिश की संभावना - शेड आवंटन प्राथमिकता",
    message: "Farmers bringing open trolleys are advised to reach before 3:00 PM. Covered Shed-A and Shed-B have been allocated for tarpaulin-free unloading.",
    message_te: "సాయంత్రం చిరుజల్లులు కురిసే అవకాశం ఉన్నందున రైతులు మధ్యాహ్నం 3 గంటలలోపు కేంద్రానికి చేరుకోవాల్సిందిగా విజ్ఞప్తి. షెడ్లు సిద్ధంగా ఉన్నాయి.",
    severity: "warning",
    timestamp: "2026-08-22T09:30:00.000Z",
    isActive: true
  },
  {
    id: "ANN-003",
    centreId: "PPC-TS-02",
    centreName: "Suryapet PACS Paddy PPC",
    title: "Gunny Bags Stock Arrived (10,000 Bags Added)",
    title_te: "గన్నీ సంచుల నిల్వలు వచ్చాయి (10,000 అదనపు సంచులు)",
    title_hi: "बारदाना (बोरी) नया स्टॉक उपलब्ध",
    message: "Sufficient gunny bags are now available at Suryapet PACS. No bag shortage delay.",
    message_te: "సూర్యాపేట కేంద్రంలో కొత్తగా 10,000 గన్నీ సంచులు అందుబాటులోకి వచ్చాయి. ఎటువంటి కొరత లేదు.",
    severity: "info",
    timestamp: "2026-08-22T10:00:00.000Z",
    isActive: true
  }
];
