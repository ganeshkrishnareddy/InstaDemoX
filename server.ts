import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dns from "dns";
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where 
} from "firebase/firestore";

// Ensure DNS works perfectly inside containers
dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = 3000;
const DB_PATH = path.join(process.cwd(), "leads_db.json");

// Helper to resolve short Google Forms URLs and format to /formResponse
async function resolveGoogleFormUrl(url: string): Promise<string> {
  let finalUrl = url;
  if (url.includes("forms.gle/")) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      finalUrl = response.url;
      console.log(`Resolved short forms.gle URL: ${url} -> ${finalUrl}`);
    } catch (e: any) {
      console.error("Error resolving forms.gle URL:", e.message);
    }
  }

  if (finalUrl.includes("/viewform")) {
    finalUrl = finalUrl.replace("/viewform", "/formResponse");
  } else if (!finalUrl.endsWith("/formResponse")) {
    finalUrl = finalUrl.split("?")[0].replace(/\/$/, "");
    if (!finalUrl.endsWith("/formResponse")) {
      finalUrl = finalUrl + "/formResponse";
    }
  }
  return finalUrl;
}

// Map various customizable business domains into standard dropdown selections for Google Forms
function normalizeCategoryForGoogleForms(category: string): string {
  if (!category) return "Other";
  const cat = category.toLowerCase().trim();
  if (cat.includes("restaurant") || cat.includes("food") || cat.includes("beverage") || cat.includes("cafe") || cat.includes("hotel")) {
    return "Food & Beverage (Restaurant, Cafe)";
  }
  if (cat.includes("salon") || cat.includes("clinic") || cat.includes("gym") || cat.includes("fitness") || cat.includes("wellness") || cat.includes("health") || cat.includes("spa")) {
    return "Health & Wellness (Fitness, Clinics)";
  }
  if (cat.includes("school") || cat.includes("education") || cat.includes("training") || cat.includes("college") || cat.includes("univer")) {
    return "Education/Training";
  }
  if (cat.includes("real estate") || cat.includes("property") || cat.includes("realtor") || cat.includes("villa") || cat.includes("apartment")) {
    return "Real Estate/Property";
  }
  if (cat.includes("tech") || cat.includes("software") || cat.includes("app") || cat.includes("it") || cat.includes("cod") || cat.includes("developer")) {
    return "Technology/Software";
  }
  if (cat.includes("professional") || cat.includes("consulting") || cat.includes("legal") || cat.includes("accounting") || cat.includes("service")) {
    return "Professional Services (Consulting, Legal, Accounting)";
  }
  if (cat.includes("art") || cat.includes("entertainment") || cat.includes("cinema") || cat.includes("music") || cat.includes("show")) {
    return "Arts & Entertainment";
  }
  if (cat.includes("commerce") || cat.includes("retail") || cat.includes("store") || cat.includes("shop")) {
    return "E-commerce/Retail";
  }
  return "Other";
}

app.use(express.json());

// CORS Middleware to allow cross-origin requests from Firebase Hosting
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-admin-password");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
});

const SEED_LEADS = [
  {
    id: "seed-restaurant",
    slug: "sri-balaji-restaurant",
    business_name: "Sri Balaji Restaurant",
    category: "Restaurant",
    owner_name: "Subramanyam K.",
    address: "Gandhi Road, Near Station, Tirupati, Andhra Pradesh, India",
    phone: "+918360824267",
    whatsapp: "+918360824267",
    city: "Tirupati",
    tagline: "Authentic, high-rated South Indian culinary delight and pure veg specialties.",
    created_at: new Date().toISOString(),
    viewed: false,
    time_on_page: 0,
    converted: false,
    generated_demo: true,
  },
  {
    id: "seed-salon",
    slug: "royal-spa-salon",
    business_name: "Royal Spa & Premium Salon",
    category: "Salon",
    owner_name: "Ayesha Malik",
    address: "Road No. 12, Banjara Hills, Hyderabad, Telangana, India",
    phone: "+918360824267",
    whatsapp: "+918360824267",
    city: "Hyderabad",
    tagline: "Ultra premium relaxing body massage, aesthetic haircut and face styling.",
    created_at: new Date().toISOString(),
    viewed: false,
    time_on_page: 0,
    converted: false,
    generated_demo: true,
  },
  {
    id: "seed-hotel",
    slug: "sai-luxury-hotel",
    business_name: "Sai Luxury Hotel",
    category: "Hotel",
    owner_name: "Kumar Swamy",
    address: "G.N. Chetty Road, T. Nagar, Chennai, Tamil Nadu, India",
    phone: "+918360824267",
    whatsapp: "+918360824267",
    city: "Chennai",
    tagline: "Sophisticated luxury, modern comforts, high speed internet and premium suites.",
    created_at: new Date().toISOString(),
    viewed: false,
    time_on_page: 0,
    converted: false,
    generated_demo: true,
  },
  {
    id: "seed-clinic",
    slug: "apollo-dental-clinic",
    business_name: "Apollo Dental Clinic",
    category: "Clinic",
    owner_name: "Dr. Sandeep Prasad",
    address: "Poonamallee High Road, Kilpauk, Chennai, Tamil Nadu, India",
    phone: "+918360824267",
    whatsapp: "+918360824267",
    city: "Chennai",
    tagline: "Comprehensive specialized dental care, advanced root canal treatments, and teeth whitening specialists.",
    created_at: new Date().toISOString(),
    viewed: false,
    time_on_page: 0,
    converted: false,
    generated_demo: true,
  },
  {
    id: "seed-real-estate",
    slug: "vanguard-realtors",
    business_name: "Vanguard Realtors",
    category: "Real Estate",
    owner_name: "Vikram Sen",
    address: "100 Feet Road, Indiranagar, Bangalore, Karnataka, India",
    phone: "+918360824267",
    whatsapp: "+918360824267",
    city: "Bangalore",
    tagline: "Premium residential apartments, prime commercial sites, and customized villa layouts in East Bangalore.",
    created_at: new Date().toISOString(),
    viewed: false,
    time_on_page: 0,
    converted: false,
    generated_demo: true,
  },
  {
    id: "seed-gym",
    slug: "fitness-one-gym",
    business_name: "Fitness One Gym & CrossFit",
    category: "Gym",
    owner_name: "Rohan Khanna",
    address: "M.G. Road, Near Central Mall, Pune, Maharashtra, India",
    phone: "+918360824267",
    whatsapp: "+918360824267",
    city: "Pune",
    tagline: "State-of-the-art heavy lifting gear, certified professional trainers, and personalized fat loss diets.",
    created_at: new Date().toISOString(),
    viewed: false,
    time_on_page: 0,
    converted: false,
    generated_demo: true,
  },
  {
    id: "seed-school",
    slug: "st-marys-school",
    business_name: "St. Mary's School & Junior College",
    category: "School",
    owner_name: "Brother Thomas",
    address: "St. Mark's Road, Shivaji Nagar, Bangalore, Karnataka, India",
    phone: "+918360824267",
    whatsapp: "+918360824267",
    city: "Bangalore",
    tagline: "Fostering academic excellence, holistic science labs, extra-curricular play, and future-ready minds.",
    created_at: new Date().toISOString(),
    viewed: false,
    time_on_page: 0,
    converted: false,
    generated_demo: true,
  },
];

// Initialize database file if not exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify(SEED_LEADS, null, 2), "utf8");
} else {
  try {
    const data = fs.readFileSync(DB_PATH, "utf8");
    const existing = JSON.parse(data);
    if (!existing || existing.length === 0) {
      fs.writeFileSync(DB_PATH, JSON.stringify(SEED_LEADS, null, 2), "utf8");
    } else {
      // Ensure seed leads are present in list if missing
      let changed = false;
      for (const seed of SEED_LEADS) {
        if (!existing.some((l: any) => l.slug === seed.slug)) {
          existing.push(seed);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(DB_PATH, JSON.stringify(existing, null, 2), "utf8");
      }
    }
  } catch (err) {
    fs.writeFileSync(DB_PATH, JSON.stringify(SEED_LEADS, null, 2), "utf8");
  }
}

function readLeads() {
  try {
    const data = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database:", err);
    return [];
  }
}

function writeLeads(leads: any[]) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing database:", err);
  }
}

// Initialize Firebase Firestore with configuration
let firestoreDb: any = null;

try {
  const configPath = path.join(process.cwd(), "firebase-applet-config.json");
  if (fs.existsSync(configPath)) {
    const configRaw = fs.readFileSync(configPath, "utf8");
    const firebaseConfig = JSON.parse(configRaw);
    const firebaseApp = initializeApp(firebaseConfig);
    if (firebaseConfig.firestoreDatabaseId) {
      firestoreDb = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
    } else {
      firestoreDb = getFirestore(firebaseApp);
    }
    console.log("Firebase Firestore initialized successfully.");
  } else {
    console.warn("firebase-applet-config.json not found during server initialization. Firestore starts in local-only fallback mode.");
  }
} catch (error: any) {
  console.error("Firestore initialization error:", error.message);
}

// Seeding Firestore if empty
async function seedFirestoreIfEmpty() {
  if (!firestoreDb) return;
  try {
    const querySnapshot = await getDocs(collection(firestoreDb, "leads"));
    if (querySnapshot.empty) {
      console.log("Firestore 'leads' collection is empty. Seeding templates...");
      for (const lead of SEED_LEADS) {
        await setDoc(doc(firestoreDb, "leads", lead.id), lead);
      }
      console.log("Firestore templates seeded successfully.");
    }
  } catch (err: any) {
    console.warn("Failed to seed Firestore automatically:", err.message);
  }
}

// Trigger firestore seeding asynchronously
seedFirestoreIfEmpty();

async function getAllLeadsFromFirestore(): Promise<any[]> {
  if (!firestoreDb) return readLeads();
  try {
    const querySnapshot = await getDocs(collection(firestoreDb, "leads"));
    const result: any[] = [];
    querySnapshot.forEach((docSnap) => {
      result.push(docSnap.data());
    });
    return result;
  } catch (err: any) {
    console.error("Firestore read failure - returning local backup:", err.message);
    return readLeads();
  }
}

async function getLeadFromFirestore(id: string): Promise<any | null> {
  if (!firestoreDb) {
    const local = readLeads();
    return local.find((l: any) => l.id === id) || null;
  }
  try {
    const docRef = doc(firestoreDb, "leads", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (err: any) {
    console.error(`Firestore fetch lead error for ${id}:`, err.message);
    const local = readLeads();
    return local.find((l: any) => l.id === id) || null;
  }
}

async function getLeadBySlugFromFirestore(slug: string): Promise<any | null> {
  if (!firestoreDb) {
    const local = readLeads();
    return local.find((l: any) => l.slug === slug) || null;
  }
  try {
    const q = query(collection(firestoreDb, "leads"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    return null;
  } catch (err: any) {
    console.error(`Firestore fetch lead by slug error for ${slug}:`, err.message);
    const local = readLeads();
    return local.find((l: any) => l.slug === slug) || null;
  }
}

async function saveLeadToFirestore(lead: any): Promise<void> {
  // Sync to local json as secondary fallback
  const local = readLeads();
  const idx = local.findIndex((l: any) => l.id === lead.id);
  if (idx !== -1) {
    local[idx] = lead;
  } else {
    local.push(lead);
  }
  writeLeads(local);

  if (!firestoreDb) return;
  try {
    const docRef = doc(firestoreDb, "leads", lead.id);
    await setDoc(docRef, lead);
    console.log(`Successfully persisted lead "${lead.business_name}" to Firestore.`);
  } catch (err: any) {
    console.error(`Firestore save error for lead ${lead.id}:`, err.message);
  }
}

// Slugify function: e.g., "Sri Balaji Restaurant" + "Nellore" -> "sri-balaji-restaurant-nellore"
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

// API: Check admin authorization header or query password
function verifyAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const password = req.headers["x-admin-password"] || req.query.password;
  const expectedPassword = process.env.ADMIN_PASSWORD || "progvision2024";

  if (password === expectedPassword) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized: Incorrect password" });
  }
}

// API: POST /api/generate
app.post("/api/generate", async (req, res) => {
  try {
    const {
      businessName,
      category,
      ownerName,
      address,
      phone,
      whatsapp,
      city,
      tagline,
    } = req.body;

    if (!businessName || !category || !ownerName || !address || !phone || !whatsapp || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1. Generate core slug from businessName + city
    let baseSlug = slugify(`${businessName} ${city}`);
    if (!baseSlug) {
      baseSlug = "business-demo";
    }

    // 2. Collision checking
    const leads = await getAllLeadsFromFirestore();
    let finalSlug = baseSlug;
    let attempts = 0;
    while (leads.some((l: any) => l.slug === finalSlug)) {
      attempts++;
      const randomCode = Math.floor(1000 + Math.random() * 9000); // 4 random digits
      finalSlug = `${baseSlug}-${randomCode}`;
      if (attempts > 10) break; // prevent infinite loop
    }

    // Create lead record
    const newLead = {
      id: Math.random().toString(36).substring(2, 11) + Date.now().toString(36),
      slug: finalSlug,
      business_name: businessName,
      category: category,
      owner_name: ownerName,
      address: address,
      phone: phone,
      whatsapp: whatsapp,
      city: city,
      tagline: tagline || "",
      created_at: new Date().toISOString(),
      viewed: false,
      viewed_at: null,
      time_on_page: 0,
      converted: false,
      converted_at: null,
      whatsapp_pinged: false,
      generated_demo: true,
      viewed_demo: false,
      clicked_whatsapp: false,
      viewed_pricing: false,
    };

    await saveLeadToFirestore(newLead);

    // Auto-submission to Google Forms/Sheets if enabled
    const configPath = path.join(process.cwd(), "google_forms_config.json");
    let isFormEnabled = false;
    let formUrl = "";
    let mapping: Record<string, string> = {};

    if (fs.existsSync(configPath)) {
      try {
        const configRaw = fs.readFileSync(configPath, "utf8");
        const config = JSON.parse(configRaw);
        if (config) {
          isFormEnabled = config.isEnabled !== false;
          formUrl = config.formUrl || "";
          mapping = config.mapping || {};
        }
      } catch (err: any) {
        console.error("Error reading Google Forms config:", err.message);
      }
    }

    if (isFormEnabled && formUrl && Object.keys(mapping).length > 0) {
      try {
        const submitUrl = await resolveGoogleFormUrl(formUrl);

        const devUrl = process.env.APP_URL || `https://${req.get('host')}`;
        const leadUrl = `${devUrl}/${finalSlug}`;

        const sysValues: Record<string, string> = {
          business_name: businessName,
          category: normalizeCategoryForGoogleForms(category),
          owner_name: ownerName,
          city: city,
          address: address,
          phone: phone,
          whatsapp: whatsapp,
          tagline: tagline || "",
          demo_url: leadUrl,
        };

        const formData = new URLSearchParams();
        for (const [sysKey, entryId] of Object.entries(mapping)) {
          if (entryId && sysValues[sysKey]) {
            formData.append(entryId, sysValues[sysKey]);
          }
        }

        console.log(`Auto-submitting lead ${businessName} to Google Forms: ${submitUrl}`);
        fetch(submitUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formData.toString()
        })
        .then(resHttp => console.log(`Google Form response status: ${resHttp.status}`))
        .catch(err => console.error("Error auto-submitting to Google Form:", err.message));
      } catch (err: any) {
        console.error("Error handling Google Forms auto-submit:", err.message);
      }
    }

    // 3. Send WhatsApp notification to agency owner if config exists
    const agencyWhatsapp = process.env.AGENCY_WHATSAPP;
    const callMeBotKey = process.env.CALLMEBOT_APIKEY;

    if (agencyWhatsapp && callMeBotKey) {
      const appUrl = process.env.APP_URL || "http://localhost:3000";
      const leadUrl = `${appUrl}/${finalSlug}`;
      const notificationText = `New lead created: *${businessName}* (${category}) in ${city}.\nOwner: ${ownerName}\nDemo: ${leadUrl}`;
      const encodedText = encodeURIComponent(notificationText);
      const callmebotUrl = `https://api.callmebot.com/whatsapp.php?phone=${agencyWhatsapp}&text=${encodedText}&apikey=${callMeBotKey}`;

      console.log(`Firing CallMeBot webhook notification URL: ${callmebotUrl}`);
      // Fire non-blocking fetch
      fetch(callmebotUrl)
        .then((response) => {
          if (response.ok) {
            newLead.whatsapp_pinged = true;
            saveLeadToFirestore(newLead);
            console.log("CallMeBot notification sent successfully!");
          } else {
            console.warn("CallMeBot notification failed with response:", response.status);
          }
        })
        .catch((err) => {
          console.warn("CallMeBot background notification error:", err.message);
        });
    }

    res.json({ slug: finalSlug });
  } catch (error: any) {
    console.error("Error in /api/generate:", error);
    res.status(500).json({ error: error.message });
  }
});

// API: GET /api/leads/by-slug/:slug
app.get("/api/leads/by-slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const lead = await getLeadBySlugFromFirestore(slug);

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    // If first view, update database
    if (!lead.viewed || !lead.viewed_demo) {
      lead.viewed = true;
      lead.viewed_demo = true;
      lead.viewed_at = new Date().toISOString();
      await saveLeadToFirestore(lead);
      console.log(`Lead "${lead.business_name}" marked as viewed and viewed_demo set at ${lead.viewed_at}`);
    }

    res.json(lead);
  } catch (error: any) {
    console.error("Error fetching lead by slug:", error);
    res.status(500).json({ error: error.message });
  }
});

// API: POST /api/track
app.post("/api/track", async (req, res) => {
  try {
    const { slug, seconds } = req.body;
    if (!slug || typeof seconds !== "number") {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const lead = await getLeadBySlugFromFirestore(slug);

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    
    // Auto flag viewed_demo when they have spent time on page
    if (!lead.viewed_demo) {
      lead.viewed_demo = true;
    }

    // Only update if new value is higher - prevents overwriting with keepalive resets
    if (seconds > lead.time_on_page) {
      lead.time_on_page = seconds;
      await saveLeadToFirestore(lead);
    }

    res.json({ success: true, tracking: lead.time_on_page });
  } catch (error: any) {
    console.error("Error in /api/track:", error);
    res.status(500).json({ error: error.message });
  }
});

// API: POST /api/track-event
app.post("/api/track-event", async (req, res) => {
  try {
    const { slug, event } = req.body;
    if (!slug || !event) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const lead = await getLeadBySlugFromFirestore(slug);

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    if (event === "view_demo") {
      lead.viewed_demo = true;
    } else if (event === "click_whatsapp") {
      lead.clicked_whatsapp = true;
      lead.converted = true; // Clicked agency CTA counts as active interest/conversion
      lead.converted_at = new Date().toISOString();
    } else if (event === "view_pricing") {
      lead.viewed_pricing = true;
    } else if (event === "generate_demo") {
      lead.generated_demo = true;
    }

    await saveLeadToFirestore(lead);
    res.json({ success: true, lead });
  } catch (error: any) {
    console.error("Error in /api/track-event:", error);
    res.status(500).json({ error: error.message });
  }
});

// API: GET /api/leads (Admin only)
app.get("/api/leads", verifyAdmin, async (req, res) => {
  try {
    const leads = await getAllLeadsFromFirestore();
    // Sort by created_at descending
    leads.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    res.json(leads);
  } catch (error: any) {
    console.error("Error getting leads:", error);
    res.status(500).json({ error: error.message });
  }
});

// API: PATCH /api/leads/:id (Admin only)
app.patch("/api/leads/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { converted } = req.body;

    const lead = await getLeadFromFirestore(id);

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    lead.converted = !!converted;
    lead.converted_at = converted ? new Date().toISOString() : null;

    await saveLeadToFirestore(lead);
    res.json(lead);
  } catch (error: any) {
    console.error("Error updating lead conversion:", error);
    res.status(500).json({ error: error.message });
  }
});

// API: GET /api/forms/config (Admin only)
app.get("/api/forms/config", verifyAdmin, (req, res) => {
  try {
    const configPath = path.join(process.cwd(), "google_forms_config.json");
    if (fs.existsSync(configPath)) {
      const configRaw = fs.readFileSync(configPath, "utf8");
      res.json(JSON.parse(configRaw));
    } else {
      res.json({
        formUrl: "",
        isEnabled: false,
        mapping: {
          business_name: "",
          category: "",
          owner_name: "",
          city: "",
          address: "",
          phone: "",
          whatsapp: "",
          tagline: "",
          demo_url: ""
        }
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// API: POST /api/forms/config (Admin only)
app.post("/api/forms/config", verifyAdmin, (req, res) => {
  try {
    const configPath = path.join(process.cwd(), "google_forms_config.json");
    fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2), "utf8");
    res.json({ success: true, config: req.body });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// API: POST /api/forms/parse (Admin only)
app.post("/api/forms/parse", verifyAdmin, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Google Form URL is required." });
    }

    console.log(`Scraping Google Form HTML to decode input entries: ${url}`);
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to retrieve form (status ${response.status})`);
    }

    const html = await response.text();
    const fields: any[] = [];

    // Parse strategy 1: FB_PUBLIC_APP_DATA search
    const match = html.match(/FB_PUBLIC_APP_DATA\s*=\s*(.+?);\s*<\/script>/s);
    if (match) {
      try {
        const dataStr = match[1].trim();
        const data = JSON.parse(dataStr);
        // Navigate fields list usually residing in index [1][1]
        const formFields = data[1]?.[1] || [];
        for (const f of formFields) {
          const id = f[0];
          const label = f[1];
          const type = f[3];
          const entryParent = f[4]?.[0];
          if (entryParent) {
            const entryId = entryParent[0];
            fields.push({
              id: `entry.${entryId}`,
              label: label || `Field ${id}`,
              type: type
            });
          }
        }
      } catch (e: any) {
        console.warn("FB_PUBLIC_APP_DATA extraction unsuccessful, running fallback regex pattern:", e.message);
      }
    }

    // Parse strategy 1.5: FB_PUBLIC_LOAD_DATA_ search (standard modern Google Forms)
    if (fields.length === 0) {
      const matchLoad = html.match(/FB_PUBLIC_LOAD_DATA_\s*=\s*(.+?);\s*<\/script>/s);
      if (matchLoad) {
        try {
          const dataStr = matchLoad[1].trim();
          const data = JSON.parse(dataStr);
          // Standard structure: data[1][1] holds fields array
          const formFields = data[1]?.[1] || [];
          for (const f of formFields) {
            const id = f[0];
            const label = f[1];
            const type = f[3];
            const entryParent = f[4]?.[0];
            if (entryParent) {
              const entryId = entryParent[0];
              fields.push({
                id: `entry.${entryId}`,
                label: label || `Field ${id}`,
                type: type
              });
            }
          }
        } catch (e: any) {
          console.warn("FB_PUBLIC_LOAD_DATA_ extraction unsuccessful:", e.message);
        }
      }
    }

    // Parse strategy 2: Regex fallback search for active inputs (entry.XXXXXXXX)
    if (fields.length === 0) {
      const regex = /entry\.(\d+)/g;
      let m;
      const entryIds = new Set<string>();
      while ((m = regex.exec(html)) !== null) {
        entryIds.add(`entry.${m[1]}`);
      }
      entryIds.forEach(id => {
        fields.push({ id, label: `Discovered Field Input (${id})` });
      });
    }

    res.json({ success: true, fields });
  } catch (error: any) {
    console.error("Error decoding Google Form metadata:", error);
    res.status(500).json({ error: error.message });
  }
});

// API: POST /api/forms/test-submit (Admin only)
app.post("/api/forms/test-submit", verifyAdmin, async (req, res) => {
  try {
    const { formUrl, mapping, payload } = req.body;
    if (!formUrl || !payload || !mapping) {
      return res.status(400).json({ error: "Google Form URL, payload, and mapping dictionary are required." });
    }

    const submitUrl = await resolveGoogleFormUrl(formUrl);

    const formData = new URLSearchParams();
    for (const [sysKey, entryId] of Object.entries(mapping)) {
      let val = payload[sysKey];
      if (sysKey === "category" && typeof val === "string") {
        val = normalizeCategoryForGoogleForms(val);
      }
      if (entryId && val !== undefined) {
        formData.append(entryId as string, String(val));
      }
    }

    console.log(`Executing manual Urledencoded test submission to Google Forms: ${submitUrl}`);
    const response = await fetch(submitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    });

    res.json({ success: true, status: response.status, statusText: response.statusText });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Setup Vite middleware in Development mode, serve static assets in Production
async function main() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

main().catch((err) => {
  console.error("Server starting error:", err);
});
