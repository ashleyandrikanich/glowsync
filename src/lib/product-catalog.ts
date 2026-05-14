/**
 * Autocomplete catalog: representative key actives & bases (not label-perfect INCI).
 * Many entries are curated from SKUs commonly sold at Ulta and/or Sephora in the US;
 * stock and formulas change — always read your own packaging.
 */

export type CatalogProduct = {
  id: string;
  name: string;
  brand: string;
  aliases: string[];
  keyActives: string[];
  mainIngredients: string[];
  /** Typical US retail presence for discovery search (not a live inventory guarantee). */
  retailers?: ("ulta" | "sephora")[];
};

export const PRODUCT_CATALOG: CatalogProduct[] = [
  {
    id: "cerave-moisturizing-cream",
    name: "Moisturizing Cream",
    brand: "CeraVe",
    aliases: ["cerave cream", "tub", "ceramide cream"],
    keyActives: ["Ceramides NP, AP, EOP", "Hyaluronic acid"],
    mainIngredients: [
      "Petrolatum",
      "Dimethicone",
      "Glycerin",
      "Cetearyl alcohol",
      "Caprylic/capric triglyceride",
    ],
  },
  {
    id: "cerave-pm",
    name: "PM Facial Moisturizing Lotion",
    brand: "CeraVe",
    aliases: ["cerave pm", "pm lotion"],
    keyActives: ["Niacinamide", "Ceramides", "Hyaluronic acid"],
    mainIngredients: [
      "Caprylic/capric triglyceride",
      "Glycerin",
      "Niacinamide",
      "Cetearyl alcohol",
    ],
  },
  {
    id: "to-niacinamide",
    name: "Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    aliases: ["ordinary niacinamide", "to niacinamide", "niacinamide zinc"],
    keyActives: ["Niacinamide (10%)", "Zinc PCA (1%)"],
    mainIngredients: ["Pentylene glycol", "Dimethyl isosorbide", "Tamarind seed gum"],
  },
  {
    id: "to-retinol-squalane",
    name: "Retinol 0.5% in Squalane",
    brand: "The Ordinary",
    aliases: ["ordinary retinol", "to retinol", "retinol squalane"],
    keyActives: ["Retinol (0.5%)"],
    mainIngredients: ["Squalane", "Caprylic/capric triglyceride", "Bisabolol"],
  },
  {
    id: "to-vitamin-c-suspension",
    name: "Vitamin C Suspension 23% + HA Spheres 2%",
    brand: "The Ordinary",
    aliases: ["ordinary vitamin c", "ascorbic acid suspension", "to vit c"],
    keyActives: ["L-Ascorbic acid (23%)", "Sodium hyaluronate"],
    mainIngredients: ["Squalane", "Coconut alkanes", "Glycerin"],
  },
  {
    id: "to-glycolic-toner",
    name: "Glycolic Acid 7% Toning Solution",
    brand: "The Ordinary",
    aliases: ["ordinary glycolic", "glycolic toner", "7% toner"],
    keyActives: ["Glycolic acid (7%)"],
    mainIngredients: ["Aloe leaf water", "Ginseng root", "Tasmanian pepperberry"],
  },
  {
    id: "paula-bha",
    name: "Skin Perfecting 2% BHA Liquid Exfoliant",
    brand: "Paula's Choice",
    aliases: ["bha liquid", "paulas bha", "2% bha", "salicylic paula"],
    keyActives: ["Salicylic acid (2%)"],
    mainIngredients: ["Green tea extract", "Methylpropanediol", "Butylene glycol"],
  },
  {
    id: "paula-omega",
    name: "Omega+ Complex Moisturizer",
    brand: "Paula's Choice",
    aliases: ["omega complex", "paulas omega"],
    keyActives: ["Ceramides", "Cholesterol", "Omega fatty acids"],
    mainIngredients: ["Shea butter", "Glycerin", "Caprylic/capric triglyceride"],
  },
  {
    id: "la-roche-toleriane",
    name: "Toleriane Double Repair Face Moisturizer",
    brand: "La Roche-Posay",
    aliases: ["lrp toleriane", "double repair", "laroche toleriane"],
    keyActives: ["Niacinamide", "Ceramide-3"],
    mainIngredients: ["Glycerin", "Dimethicone", "Prebiotic thermal water"],
  },
  {
    id: "la-roche-anthelios",
    name: "Anthelios Melt-In Milk Sunscreen SPF 60",
    brand: "La Roche-Posay",
    aliases: ["anthelios", "lrp spf", "melt in milk"],
    keyActives: ["Avobenzone", "Homosalate", "Octisalate", "Octocrylene", "Oxybenzone"],
    mainIngredients: ["Silica", "Vitamin E", "Glycerin", "Dimethicone"],
  },
  {
    id: "skinceuticals-ce-ferulic",
    name: "C E Ferulic",
    brand: "SkinCeuticals",
    aliases: ["ce ferulic", "skinceuticals vitamin c", "c e ferulic"],
    keyActives: ["L-Ascorbic acid (15%)", "Vitamin E (1%)", "Ferulic acid (0.5%)"],
    mainIngredients: ["Water", "Ethoxydiglycol", "Propylene glycol"],
  },
  {
    id: "tretinoin-generic",
    name: "Tretinoin cream (prescription)",
    brand: "Various",
    aliases: ["tretinoin", "retin-a", "stieva", "atralin"],
    keyActives: ["Tretinoin (strength varies)"],
    mainIngredients: ["Stearyl alcohol", "Isopropyl myristate", "Benzyl alcohol (often)"],
  },
  {
    id: "vanicream-gentle",
    name: "Daily Facial Moisturizer",
    brand: "Vanicream",
    aliases: ["vanicream facial", "vanicream moisturizer"],
    keyActives: ["Ceramides (barrier support; no strong actives)"],
    mainIngredients: ["Petrolatum", "Sorbitol", "Cetearyl alcohol", "Glycerin"],
  },
  {
    id: "cosrx-snail",
    name: "Advanced Snail 96 Mucin Power Essence",
    brand: "COSRX",
    aliases: ["snail mucin", "cosrx snail", "96 essence"],
    keyActives: ["Snail secretion filtrate (96%)"],
    mainIngredients: ["Panthenol", "Arginine", "Butylene glycol", "1,2-hexanediol"],
  },
  {
    id: "good-molecules-niacinamide",
    name: "Niacinamide Brightening Toner",
    brand: "Good Molecules",
    aliases: ["good molecules niacinamide", "gm niacinamide toner"],
    keyActives: ["Niacinamide", "Arbutin (often in line)"],
    mainIngredients: ["Glycerin", "Betaine", "Licorice root extract"],
  },
  {
    id: "differin-gel",
    name: "Adapalene Gel 0.1%",
    brand: "Differin",
    aliases: ["adapalene", "differin"],
    keyActives: ["Adapalene (0.1%)"],
    mainIngredients: ["Carbomer", "Edetate disodium", "Methylparaben", "Water"],
  },
  {
    id: "neutrogena-hydro-boost",
    name: "Hydro Boost Water Gel",
    brand: "Neutrogena",
    aliases: ["hydro boost", "neutrogena gel"],
    keyActives: ["Hyaluronic acid (sodium hyaluronate)"],
    mainIngredients: ["Dimethicone", "Glycerin", "Dimethiconol", "Chlorphenesin"],
  },
  {
    id: "eltamd-uv-clear",
    name: "UV Clear Broad-Spectrum SPF 46",
    brand: "EltaMD",
    aliases: ["eltamd", "uv clear", "elta md"],
    keyActives: ["Zinc oxide", "Octinoxate (in US formula)"],
    mainIngredients: ["Niacinamide", "Hyaluronic acid", "Lactic acid (low %)"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "de-protini",
    name: "Protini Polypeptide Cream",
    brand: "Drunk Elephant",
    aliases: ["drunk elephant", "protini", "de protini", "polypeptide cream"],
    keyActives: ["Signal peptides", "Pygmy waterlily extract", "Amino acids"],
    mainIngredients: ["Water", "Dicaprylyl carbonate", "Glycerin", "Sclerocarya birrea seed oil"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "de-cfirma",
    name: "C-Firma Fresh Day Serum",
    brand: "Drunk Elephant",
    aliases: ["c firma", "cfirma", "drunk elephant vitamin c", "c firma fresh"],
    keyActives: ["L-Ascorbic acid (15%)", "Ferulic acid", "Vitamin E"],
    mainIngredients: ["Pumpkin ferment extract", "Chronocyclin", "Hyaluronic acid"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "de-framboos",
    name: "T.L.C. Framboos Glycolic Night Serum",
    brand: "Drunk Elephant",
    aliases: ["framboos", "tlc framboos", "drunk elephant glycolic"],
    keyActives: ["Glycolic", "Tartaric", "Citric", "Salicylic acids (blend)"],
    mainIngredients: ["Raspberry extract", "Horse chestnut", "Galactoarabinan"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "de-beste",
    name: "Beste No. 9 Jelly Cleanser",
    brand: "Drunk Elephant",
    aliases: ["beste", "drunk elephant cleanser", "jelly cleanser"],
    keyActives: ["Mild surfactants (non-stripping cleanse)"],
    mainIngredients: ["Virgin marula oil", "Cantaloupe fruit extract", "Glycerin"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "tatcha-dewy",
    name: "The Dewy Skin Cream",
    brand: "Tatcha",
    aliases: ["tatcha dewy", "dewy skin cream"],
    keyActives: ["Japanese purple rice", "Okinawa algae blend", "Hyaluronic acid"],
    mainIngredients: ["Squalane", "Glycerin", "Dimethicone", "Camellia seed oil"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "tatcha-rice-wash",
    name: "The Rice Wash Soft Cream Cleanser",
    brand: "Tatcha",
    aliases: ["rice wash", "tatcha cleanser", "rice cleanser"],
    keyActives: ["Japanese rice powder (physical + enzyme polish, mild)"],
    mainIngredients: ["Hyaluronic acid", "Okinawa algae", "Glycerin"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "fenty-fat-water",
    name: "Fat Water Pore-Refining Toner Serum",
    brand: "Fenty Skin",
    aliases: ["fenty skin", "fat water", "fenty toner"],
    keyActives: ["Niacinamide", "Barbados cherry (vitamin C)"],
    mainIngredients: ["Glycerin", "Green tea", "Fig extract", "Sodium hyaluronate"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "fenty-hydra-vizor",
    name: "Hydra Vizor Invisible Moisturizer Broad Spectrum SPF 30",
    brand: "Fenty Skin",
    aliases: ["hydra vizor", "fenty spf", "fenty sunscreen"],
    keyActives: ["Avobenzone", "Homosalate", "Octisalate", "Octocrylene"],
    mainIngredients: ["Kalahari melon oil", "Niacinamide", "Hyaluronic acid"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "laneige-cream-skin",
    name: "Cream Skin Toner & Moisturizer",
    brand: "Laneige",
    aliases: ["laneige", "cream skin", "laneige toner"],
    keyActives: ["White leaf tea water", "Amino acid-rich formula"],
    mainIngredients: ["Glycerin", "Meadowfoam seed oil", "Butylene glycol"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "laneige-water-mask",
    name: "Water Sleeping Mask",
    brand: "Laneige",
    aliases: ["water sleeping mask", "laneige sleeping"],
    keyActives: ["Squalane", "Pro-biotics complex", "Hyaluronic acid"],
    mainIngredients: ["Evening primrose root extract", "Apricot kernel extract", "Trehalose"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "laneige-lip-sleeping",
    name: "Lip Sleeping Mask",
    brand: "Laneige",
    aliases: ["lip sleeping mask", "laneige lip"],
    keyActives: ["Vitamin C derivative (line-dependent)", "Antioxidants"],
    mainIngredients: ["Shea butter", "Murumuru seed butter", "Wax esters"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "farmacy-green-clean",
    name: "Green Clean Makeup Removing Cleansing Balm",
    brand: "Farmacy",
    aliases: ["farmacy", "green clean", "cleansing balm"],
    keyActives: ["Sunflower + ginger root oils (cleansing)"],
    mainIngredients: ["Papaya extract", "Moringa seed oil", "Polyethylene"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "farmacy-honey-halo",
    name: "Honey Halo Ultra-Hydrating Ceramide Moisturizer",
    brand: "Farmacy",
    aliases: ["honey halo", "farmacy ceramide"],
    keyActives: ["Ceramides", "Honey blend", "Shea butter"],
    mainIngredients: ["Buckwheat honey", "Fig fruit extract", "Vitamin E"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "ole-banana-bright",
    name: "Banana Bright 15% Vitamin C Dark Spot Serum",
    brand: "OLEHENRIKSEN",
    aliases: ["ole henriksen", "banana bright", "ole vitamin c"],
    keyActives: ["15% vitamin C complex", "PHAs (polyhydroxy acids)"],
    mainIngredients: ["Banana powder-inspired pigments", "Hyaluronic acid", "Glycerin"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "ole-truth-juice",
    name: "Truth Juice Daily Cleanser",
    brand: "OLEHENRIKSEN",
    aliases: ["truth juice", "ole cleanser"],
    keyActives: ["Orange fruit water", "PHAs (gentle exfoliation)"],
    mainIngredients: ["Glycerin", "Lauric acid", "Sodium cocoyl glutamate"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "sunday-good-genes",
    name: "Good Genes All-In-One Lactic Acid Treatment",
    brand: "Sunday Riley",
    aliases: ["good genes", "sunday riley lactic", "lactic acid treatment"],
    keyActives: ["Lactic acid (purified grade)"],
    mainIngredients: ["Licorice", "Lemongrass extract", "Potassium hydroxide (pH adjust)"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "sunday-luna",
    name: "Luna Sleeping Night Oil",
    brand: "Sunday Riley",
    aliases: ["luna oil", "sunday riley retinol", "luna sleeping"],
    keyActives: ["Trans-retinol ester", "Blue tansy", "German chamomile"],
    mainIngredients: ["Avocado seed oil", "Chia seed oil", "Grape seed oil"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "ptr-water-drench",
    name: "Water Drench Hyaluronic Cloud Cream Hydrating Moisturizer",
    brand: "Peter Thomas Roth",
    aliases: ["ptr", "peter thomas roth", "water drench", "cloud cream"],
    keyActives: ["Hyaluronic acid complex (30% hyaluronic acid statement, line)"],
    mainIngredients: ["Silk proteins", "Pentylene glycol", "Dimethicone"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "ptr-cucumber",
    name: "Cucumber Gel Mask Extreme De-Tox Hydrator",
    brand: "Peter Thomas Roth",
    aliases: ["cucumber mask", "ptr cucumber"],
    keyActives: ["Cucumber extract", "Papaya extract (enzymatic, mild)"],
    mainIngredients: ["Aloe", "Chamomile", "Algae extract"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "fresh-soy",
    name: "Soy Face Cleanser",
    brand: "Fresh",
    aliases: ["fresh soy", "soy cleanser", "fresh cleanser"],
    keyActives: ["Soy proteins", "Rose water", "Borage seed oil"],
    mainIngredients: ["Cucumber extract", "Sunflower seed oil", "Glycerin"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "fresh-rose-cream",
    name: "Rose Deep Hydration Face Cream",
    brand: "Fresh",
    aliases: ["fresh rose", "rose deep hydration"],
    keyActives: ["Damask rose extract", "Hyaluronic acid", "Evening primrose oil"],
    mainIngredients: ["Squalane", "Dimethicone", "Vitamin E"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "glow-dew-drops",
    name: "Watermelon Glow Niacinamide Dew Drops",
    brand: "Glow Recipe",
    aliases: ["glow recipe", "dew drops", "watermelon niacinamide"],
    keyActives: ["Niacinamide", "Watermelon extract", "Moringa seed oil"],
    mainIngredients: ["Hyaluronic acid", "Glycerin", "Mica (radiance)"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "glow-pha-bha-toner",
    name: "Watermelon Glow PHA + BHA Pore-Tight Toner",
    brand: "Glow Recipe",
    aliases: ["watermelon toner", "pha bha toner", "glow recipe toner"],
    keyActives: ["PHA (gluconolactone)", "Willow bark (BHA-like)", "Watermelon enzymes"],
    mainIngredients: ["Cactus water", "Tea tree", "Glycerin"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "kate-exfolikate",
    name: "ExfoliKate Intensive Exfoliating Treatment",
    brand: "Kate Somerville",
    aliases: ["exfolikate", "kate somerville", "kate exfoliating"],
    keyActives: ["Lactic acid", "Salicylic acid", "Silica (physical polish)"],
    mainIngredients: ["Pumpkin ferment", "Papaya", "Pineapple enzymes"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "kiehls-ultra-facial",
    name: "Ultra Facial Cream with Squalane",
    brand: "Kiehl's",
    aliases: ["kiehls", "kiehl's", "ultra facial cream"],
    keyActives: ["Squalane", "Glacial glycoprotein"],
    mainIngredients: ["Glycerin", "Dimethicone", "Ceramides (variant-dependent)"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "kiehls-midnight",
    name: "Midnight Recovery Concentrate",
    brand: "Kiehl's",
    aliases: ["midnight recovery", "kiehl night oil"],
    keyActives: ["Evening primrose oil", "Lavender essential oil", "Squalane"],
    mainIngredients: ["Jojoba oil", "Rosa canina fruit oil", "Coriander seed oil"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "clinique-moisture-surge",
    name: "Moisture Surge 100H Auto-Replenishing Hydrator",
    brand: "Clinique",
    aliases: ["clinique", "moisture surge", "100h"],
    keyActives: ["Aloe bioferment", "Hyaluronic acid", "Auto-replenishing lipid-sphere tech"],
    mainIngredients: ["Dimethicone", "Glycerin", "Trehalose"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "clinique-take-day-off",
    name: "Take The Day Off Cleansing Balm",
    brand: "Clinique",
    aliases: ["take the day off", "clinique balm"],
    keyActives: ["Safflower seed oil (dissolves makeup)"],
    mainIngredients: ["Ethylhexyl palmitate", "Synthetic wax", "Polyethylene"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "philosophy-purity",
    name: "Purity Made Simple One-Step Facial Cleanser",
    brand: "Philosophy",
    aliases: ["philosophy", "purity", "purity cleanser"],
    keyActives: ["Meadowfoam seed oil", "Rosewood oil (light)"],
    mainIngredients: ["Sodium lauroamphoacetate", "Glycerin", "Sage leaf extract"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "caudalie-vinoperfect",
    name: "Vinoperfect Radiance Dark Spot Serum",
    brand: "Caudalie",
    aliases: ["caudalie", "vinoperfect", "caudalie vitamin c"],
    keyActives: ["Viniferine (grapevine sap extract)", "Olive squalane"],
    mainIngredients: ["Niacinamide", "Bisabolol", "Hyaluronic acid"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "drjart-ceramidin",
    name: "Ceramidin Skin Barrier Moisturizing Cream",
    brand: "Dr. Jart+",
    aliases: ["dr jart", "ceramidin", "dr jart ceramide"],
    keyActives: ["Ceramide NP", "Panthenol", "Bifida ferment lysate"],
    mainIngredients: ["Shea butter", "Glycerin", "Beeswax"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "drjart-cicapair",
    name: "Cicapair Tiger Grass Color Correcting Treatment SPF 30",
    brand: "Dr. Jart+",
    aliases: ["cicapair", "tiger grass", "dr jart cica"],
    keyActives: ["Centella asiatica (tiger grass)", "Mineral SPF"],
    mainIngredients: ["Zinc oxide", "Titanium dioxide", "Niacinamide"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "supergoop-unseen",
    name: "Unseen Sunscreen SPF 40",
    brand: "Supergoop",
    aliases: ["supergoop", "unseen sunscreen"],
    keyActives: ["Avobenzone", "Homosalate", "Octisalate", "Octocrylene"],
    mainIngredients: ["Dimethicone", "Meadowfoam seed oil", "Shea butter"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "supergoop-glowscreen",
    name: "Glowscreen SPF 40",
    brand: "Supergoop",
    aliases: ["glowscreen", "supergoop glow"],
    keyActives: ["Chemical UV filters (US formula)", "Niacinamide", "Hyaluronic acid"],
    mainIngredients: ["Mica", "Cocoa seed extract", "Sea lavender"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "fab-ultra-repair",
    name: "Ultra Repair Cream Intense Hydration",
    brand: "First Aid Beauty",
    aliases: ["first aid beauty", "fab", "ultra repair cream"],
    keyActives: ["Colloidal oatmeal", "Allantoin", "Shea butter"],
    mainIngredients: ["Eucalyptus oil (sensory; patch test)", "Glycerin", "Dimethicone"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "murad-retinol-serum",
    name: "Retinol Youth Renewal Serum",
    brand: "Murad",
    aliases: ["murad retinol", "youth renewal"],
    keyActives: ["Retinol", "Swertia flower extract (line)"],
    mainIngredients: ["Glycerin", "Caprylic/capric triglyceride", "Hyaluronic acid"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "murad-aha-bha-cleanser",
    name: "AHA/BHA Exfoliating Cleanser",
    brand: "Murad",
    aliases: ["murad cleanser", "murad aha bha"],
    keyActives: ["Salicylic acid", "Glycolic acid", "Jojoba beads (physical)"],
    mainIngredients: ["Sodium PCA", "Licorice extract", "Glycerin"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "itc-confidence-cream",
    name: "Confidence in a Cream Anti-Aging Hydrating Moisturizer",
    brand: "IT Cosmetics",
    aliases: ["it cosmetics", "confidence in a cream", "itc cream"],
    keyActives: ["Collagen", "Peptides", "Niacinamide"],
    mainIngredients: ["Shea butter", "Squalane", "Ceramides"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "origins-ginzing-serum",
    name: "GinZing Into the Glow Brightening Serum",
    brand: "Origins",
    aliases: ["origins", "ginzing", "ginzing serum"],
    keyActives: ["Vitamin C (line variant)", "Niacinamide", "Ginseng"],
    mainIngredients: ["Caffeine", "Hyaluronic acid", "Glycerin"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "origins-mega-mushroom",
    name: "Dr. Andrew Weil for Origins Mega-Mushroom Relief & Resilience Treatment Lotion",
    brand: "Origins",
    aliases: ["mega mushroom", "origins mushroom", "treatment lotion"],
    keyActives: ["Reishi mushroom", "Fermented chaga", "Lactobacillus ferment"],
    mainIngredients: ["Sodium hyaluronate", "Glycerin", "Squalane"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "shiseido-ultimune",
    name: "Ultimune Power Infusing Concentrate",
    brand: "Shiseido",
    aliases: ["shiseido", "ultimune"],
    keyActives: ["Reishi mushroom", "Iris root extract", "Ginkgo biloba"],
    mainIngredients: ["Glycerin", "Dimethicone", "Alcohol denat. (vehicle)"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "el-anr",
    name: "Advanced Night Repair Synchronized Multi-Recovery Complex Serum",
    brand: "Estée Lauder",
    aliases: ["estee lauder", "advanced night repair", "anr"],
    keyActives: ["Bifida ferment lysate", "Peptides", "Hyaluronic acid"],
    mainIngredients: ["Sodium hyaluronate", "Yeast extract", "Lactobacillus ferment"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "biossance-vitamin-c-rose",
    name: "Squalane + Vitamin C Rose Oil",
    brand: "Biossance",
    aliases: ["biossance", "vitamin c rose oil", "squalane vitamin c"],
    keyActives: ["THD ascorbate (oil-soluble vitamin C)", "Squalane", "Rose oil"],
    mainIngredients: ["Chia seed oil", "Pomegranate sterols", "Tocopherol"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "summer-fridays-jet-lag",
    name: "Jet Lag Mask",
    brand: "Summer Fridays",
    aliases: ["summer fridays", "jet lag mask"],
    keyActives: ["Niacinamide", "Ceramides", "Antioxidant extracts"],
    mainIngredients: ["Chestnut extract", "Vitamin E", "Glycerin"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "tower28-sos",
    name: "SOS Daily Rescue Facial Spray",
    brand: "Tower 28",
    aliases: ["tower 28", "sos spray", "tower28"],
    keyActives: ["Hypochlorous acid (skin-soothing, line)"],
    mainIngredients: ["Water", "Sodium chloride", "Electrolytes"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "ct-magic-cream",
    name: "Charlotte's Magic Cream Moisturizer",
    brand: "Charlotte Tilbury",
    aliases: ["charlotte tilbury", "magic cream", "ct magic"],
    keyActives: ["Peptide complex", "Vitamin C", "Hyaluronic acid"],
    mainIngredients: ["Shea butter", "Aloe", "Rosehip oil"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "rare-beauty-mist",
    name: "Always an Optimist 4-in-1 Mist",
    brand: "Rare Beauty",
    aliases: ["rare beauty", "optimist mist", "rare beauty mist"],
    keyActives: ["Niacinamide (light)", "Botanical extracts"],
    mainIngredients: ["Glycerin", "Panthenol", "Lotus extract"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "yttp-superfood-cleanser",
    name: "Superfood Antioxidant Cleanser",
    brand: "Youth To The People",
    aliases: ["yttp", "youth to the people", "superfood cleanser", "kale cleanser"],
    keyActives: ["Kale", "Spinach", "Green tea (cold-pressed extracts)"],
    mainIngredients: ["Glycerin", "Cocamidopropyl hydroxysultaine", "Vitamin E"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "kosas-plump-juicy",
    name: "Plump + Juicy Vegan Collagen Spray-On Serum",
    brand: "Kosas",
    aliases: ["kosas", "plump juicy", "vegan collagen spray"],
    keyActives: ["Peptides", "Probiotics", "Hyaluronic acid"],
    mainIngredients: ["Aloe leaf juice", "Glycerin", "Niacinamide"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "herbivore-lapis",
    name: "Lapis Blue Tansy Face Oil",
    brand: "Herbivore",
    aliases: ["herbivore", "lapis oil", "blue tansy"],
    keyActives: ["Blue tansy oil (azulene)", "Squalane"],
    mainIngredients: ["Jojoba seed oil", "Fractionated coconut oil", "Vitamin E"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "boscia-cleanser",
    name: "Purifying Cleansing Gel",
    brand: "boscia",
    aliases: ["boscia", "purifying cleansing gel", "boscia cleanser"],
    keyActives: ["Activated charcoal (line)", "Willow bark extract"],
    mainIngredients: ["Hydrated silica", "Glycerin", "Tea tree oil"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "glamglow-supermud",
    name: "Supermud Clearing Treatment",
    brand: "GLAMGLOW",
    aliases: ["glamglow", "supermud", "glam glow"],
    keyActives: ["Charcoal", "AHA/BHA acid blend", "Kaolin clay"],
    mainIngredients: ["Eucalyptus leaf", "Licorice root", "Glycerin"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "algenist-genius",
    name: "GENIUS Ultimate Anti-Aging Cream",
    brand: "Algenist",
    aliases: ["algenist", "genius cream"],
    keyActives: ["Alguronic acid (brand algae)", "Peptides", "Vitamin C"],
    mainIngredients: ["Shea butter", "Squalane", "Apple stem cell extract"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "dermalogica-pre cleanse",
    name: "PreCleanse Cleansing Oil",
    brand: "Dermalogica",
    aliases: ["dermalogica", "precleanse", "pre cleanse"],
    keyActives: ["Vitamin E", "Borage seed oil", "Apricot kernel oil"],
    mainIngredients: ["Caprylic/capric triglyceride", "Lauric acid", "Glycerin"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "dermalogica-daily-microfoliant",
    name: "Daily Microfoliant Exfoliator",
    brand: "Dermalogica",
    aliases: ["daily microfoliant", "dermalogica microfoliant"],
    keyActives: ["Rice enzymes (papain, salicylic acid micro-exfoliation)"],
    mainIngredients: ["Rice starch", "Colloidal oatmeal", "Salicylic acid"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "tula-cleanser",
    name: "The Cult Classic Purifying Face Cleanser",
    brand: "TULA Skincare",
    aliases: ["tula", "cult classic cleanser", "tula cleanser"],
    keyActives: ["Probiotic extracts", "Chicory root", "Turmeric"],
    mainIngredients: ["Glycerin", "Lactic acid (low %)", "Licorice"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "nars-aqua-glow",
    name: "Light Reflecting Moisturizer",
    brand: "NARS",
    aliases: ["nars moisturizer", "light reflecting moisturizer"],
    keyActives: ["Niacinamide", "Peptides", "Hyaluronic acid"],
    mainIngredients: ["Japanese botanical blend", "Squalane", "Glycerin"],
    retailers: ["ulta", "sephora"],
  },
  {
    id: "milk-vegan-milk-moisturizer",
    name: "Vegan Milk Moisturizer",
    brand: "Milk Makeup",
    aliases: ["milk makeup", "vegan milk moisturizer", "milk moisturizer"],
    keyActives: ["Desert milk blend (fig, argan, oat, camelina, shea)"],
    mainIngredients: ["Squalane", "Glycerin", "Grape seed oil", "Vitamin E"],
    retailers: ["ulta", "sephora"],
  },
];

function normalize(s: string): string {
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}

function haystack(p: CatalogProduct): string {
  const retail = (p.retailers ?? []).join(" ");
  return normalize([p.brand, p.name, ...p.aliases, retail].join(" "));
}

export function searchCatalog(query: string, limit = 8): CatalogProduct[] {
  const q = normalize(query);
  if (q.length < 1) return [];

  const scored: { product: CatalogProduct; score: number }[] = [];

  for (const p of PRODUCT_CATALOG) {
    const h = haystack(p);
    if (!h.includes(q)) continue;

    let score = 0;
    const display = normalize(`${p.brand} ${p.name}`);
    const nameL = p.name.toLowerCase();
    const brandL = p.brand.toLowerCase();

    if (display.startsWith(q)) score += 12;
    else if (h.startsWith(q)) score += 9;

    if (nameL.startsWith(q)) score += 6;
    else if (nameL.includes(q)) score += 3;

    if (brandL.startsWith(q)) score += 5;
    else if (brandL.includes(q)) score += 2;

    for (const a of p.aliases) {
      const al = a.toLowerCase();
      if (al.startsWith(q)) score += 4;
      else if (al.includes(q)) score += 1;
    }

    scored.push({ product: p, score });
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return `${a.product.brand} ${a.product.name}`.localeCompare(
      `${b.product.brand} ${b.product.name}`
    );
  });

  return scored.slice(0, limit).map((s) => s.product);
}

export function getCatalogProductById(
  id: string
): CatalogProduct | undefined {
  return PRODUCT_CATALOG.find((p) => p.id === id);
}

export function formatProductNotes(p: CatalogProduct): string {
  const actives = p.keyActives.join(", ");
  const mains = p.mainIngredients.join(", ");
  let text = `Key actives: ${actives}\nMain ingredients (representative): ${mains}`;
  if (p.retailers?.length) {
    const labels = p.retailers.map((r) => (r === "ulta" ? "Ulta" : "Sephora"));
    text += `\nOften sold at: ${labels.join(" · ")}`;
  }
  return text;
}
