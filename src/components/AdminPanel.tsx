import React, { useEffect, useState } from "react";
import { Lead } from "../types";
import { getApiUrl } from "../utils/api";
import { 
  KeyRound, Search, FileText, CheckCircle2, XCircle, Clock, ExternalLink, MessageSquare, ToggleLeft, ToggleRight, Trash2, ArrowLeftRight, ChevronLeft, ChevronRight, Lock, LogOut,
  Sparkles, CheckCircle, Database, AlertCircle, ArrowRight, Settings, FileSpreadsheet, RefreshCw, Copy, Plus, HelpCircle
} from "lucide-react";

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Clipboard text copy state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Google Forms & Sheets Synchronization States
  const [activeTab, setActiveTab] = useState<"leads" | "google_forms">("leads");
  const [formUrl, setFormUrl] = useState("");
  const [formIsEnabled, setFormIsEnabled] = useState(false);
  const [mapping, setMapping] = useState<Record<string, string>>({
    business_name: "",
    category: "",
    owner_name: "",
    city: "",
    address: "",
    phone: "",
    whatsapp: "",
    tagline: "",
    demo_url: ""
  });
  const [discoveredFields, setDiscoveredFields] = useState<{ id: string; label: string }[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);
  const [testSubmitting, setTestSubmitting] = useState(false);
  const [confirmBulk, setConfirmBulk] = useState(false);
  const [confirmTimeoutId, setConfirmTimeoutId] = useState<any | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "">("");

  const entriesPerPage = 25;

  // Retrieve auth from sessionStorage on mount
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("admin_password");
    if (savedPassword) {
      setPassword(savedPassword);
      fetchLeads(savedPassword);
    }
  }, []);

  // Load Formspree config when authorized
  useEffect(() => {
    if (isAuthorized && password) {
      fetchFormConfig();
    }
  }, [isAuthorized]);

  const fetchFormConfig = async () => {
    try {
      const response = await fetch(getApiUrl(`/api/forms/config?password=${encodeURIComponent(password)}`), {
        headers: { "x-admin-password": password }
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setFormUrl(data.formUrl || "");
          setFormIsEnabled(data.isEnabled !== false);
          if (data.mapping) {
            setMapping(prev => ({
              ...prev,
              ...data.mapping
            }));
          }
          if (data.formUrl) {
            // Trigger automatic parsing to help populate fields list on load
            parseFormStructure(data.formUrl, false);
          }
        }
      }
    } catch (err) {
      console.warn("Failed to load Google Forms config:", err);
    }
  };

  const parseFormStructure = async (urlToParse: string, showFeedback = true) => {
    if (!urlToParse) {
      if (showFeedback) {
        setFeedbackMessage("Please enter a Google Form URL first.");
        setFeedbackType("error");
      }
      return;
    }
    setIsParsing(true);
    if (showFeedback) {
      setFeedbackMessage("Analyzing Google Form structure to find entry.xxxxxx inputs...");
      setFeedbackType("success");
    }
    try {
      const response = await fetch(getApiUrl(`/api/forms/parse?password=${encodeURIComponent(password)}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password
        },
        body: JSON.stringify({ url: urlToParse })
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.fields) {
          setDiscoveredFields(data.fields);
          if (showFeedback) {
            setFeedbackMessage(`Success! Discovered ${data.fields.length} dynamic mapped target fields.`);
            setFeedbackType("success");
          }
        }
      } else {
        throw new Error("Unable to parse form container.");
      }
    } catch (err: any) {
      if (showFeedback) {
        setFeedbackMessage(`Failed to parse: ${err.message}. You can still manually enter entry IDs.`);
        setFeedbackType("error");
      }
    } finally {
      setIsParsing(false);
    }
  };

  const handleSaveFormConfig = async () => {
    setSavingConfig(true);
    setFeedbackMessage("Saving active synchronization configurations...");
    setFeedbackType("success");
    try {
      const response = await fetch(getApiUrl(`/api/forms/config?password=${encodeURIComponent(password)}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password
        },
        body: JSON.stringify({
          formUrl,
          isEnabled: formIsEnabled,
          mapping
        })
      });
      if (response.ok) {
        setFeedbackMessage("Google Sheets / Google Form connection config saved successfully!");
        setFeedbackType("success");
      } else {
        throw new Error("Failed to save configuration");
      }
    } catch (err: any) {
      setFeedbackMessage(`Error saving settings: ${err.message}`);
      setFeedbackType("error");
    } finally {
      setSavingConfig(false);
    }
  };

  const handleTestSubmit = async () => {
    if (!formUrl) {
      setFeedbackMessage("Please enter a Google Form URL first.");
      setFeedbackType("error");
      return;
    }
    setTestSubmitting(true);
    setFeedbackMessage("Dispatching urlencoded test submission package to Google Sheets index...");
    setFeedbackType("success");
    try {
      const devUrl = window.location.origin;
      const testPayload = {
        business_name: "InstaDemoX Test Enterprise",
        category: "Technology/Software",
        owner_name: "Administrator Test Setup",
        city: "San Francisco",
        address: "1600 Amphitheatre Pkwy, Mountain View, CA",
        phone: "+15550199",
        whatsapp: "+15550199",
        tagline: "Unleashing lightning-fast high-converting lead generation pipelines.",
        demo_url: `${devUrl}/test-demo-preview`
      };

      const response = await fetch(getApiUrl(`/api/forms/test-submit?password=${encodeURIComponent(password)}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password
        },
        body: JSON.stringify({ formUrl, mapping, payload: testPayload })
      });

      if (response.ok) {
        const data = await response.json();
        setFeedbackMessage(`Test submission complete! Google response status: ${data.status}`);
        setFeedbackType("success");
      } else {
        const err = await response.json();
        throw new Error(err.error || "Submission failed");
      }
    } catch (err: any) {
      setFeedbackMessage(`Test submission failed: ${err.message}`);
      setFeedbackType("error");
    } finally {
      setTestSubmitting(false);
    }
  };

  const handleBulkSyncAll = async () => {
    if (!formUrl) {
      setFeedbackMessage("Please configure a Google Form URL first.");
      setFeedbackType("error");
      return;
    }
    if (!confirmBulk) {
      setConfirmBulk(true);
      setFeedbackMessage("Action Pending: Please click the confirmation button again to safely initiate bulk dispatch of historical leads.");
      setFeedbackType("success");
      const tId = setTimeout(() => {
        setConfirmBulk(false);
        setFeedbackMessage("");
      }, 6000);
      setConfirmTimeoutId(tId);
      return;
    }

    if (confirmTimeoutId) {
      clearTimeout(confirmTimeoutId);
      setConfirmTimeoutId(null);
    }
    setConfirmBulk(false);

    setTestSubmitting(true);
    setFeedbackMessage(`Processing historical migration of ${leads.length} leads to Google Sheets...`);
    setFeedbackType("success");
    try {
      let countSuccess = 0;
      const devUrl = window.location.origin;

      for (const lead of leads) {
        const payload = {
          business_name: lead.business_name,
          category: lead.category,
          owner_name: lead.owner_name,
          city: lead.city,
          address: lead.address,
          phone: lead.phone,
          whatsapp: lead.whatsapp,
          tagline: lead.tagline || "",
          demo_url: `${devUrl}/${lead.slug}`
        };

        const response = await fetch(getApiUrl(`/api/forms/test-submit?password=${encodeURIComponent(password)}`), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": password
          },
          body: JSON.stringify({ formUrl, mapping, payload })
        });
        if (response.ok) {
          countSuccess++;
        }
      }
      setFeedbackMessage(`Bulk migration completed successfully! Pushed ${countSuccess} out of ${leads.length} leads.`);
      setFeedbackType("success");
    } catch (err: any) {
      setFeedbackMessage(`Migration interrupted: ${err.message}`);
      setFeedbackType("error");
    } finally {
      setTestSubmitting(false);
    }
  };

  const fetchLeads = async (pw: string) => {
    setLoading(true);
    try {
      const response = await fetch(getApiUrl(`/api/leads?password=${encodeURIComponent(pw)}`));
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
        setIsAuthorized(true);
        sessionStorage.setItem("admin_password", pw);
        setLoginError("");
      } else {
        const errData = await response.json();
        setLoginError(errData.error || "Authentication failed");
        setIsAuthorized(false);
        sessionStorage.removeItem("admin_password");
      }
    } catch (err) {
      setLoginError("Failed to connect to admin server");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setLoginError("Password is required");
      return;
    }
    fetchLeads(password);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_password");
    setIsAuthorized(false);
    setLeads([]);
    setPassword("");
  };

  const handleToggleConverted = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(getApiUrl(`/api/leads/${id}?password=${encodeURIComponent(password)}`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password
        },
        body: JSON.stringify({ converted: !currentStatus }),
      });

      if (response.ok) {
        // Update state locally
        const updatedLead = await response.json();
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, converted: updatedLead.converted, converted_at: updatedLead.converted_at } : l)));
      } else {
        alert("Failed to update conversion status");
      }
    } catch (err) {
      alert("Network error updating lead");
    }
  };

  // Format time tracker duration from seconds to human readable: "2m 34s"
  const formatTimeOnPage = (secs: number) => {
    if (!secs || secs <= 0) return "–";
    if (secs < 60) return `${secs}s`;
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins}m ${remSecs}s`;
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoStr;
    }
  };

  // Format phone / WhatsApp for wa.me links
  const getWhatsappLink = (number: string, bizName: string, city: string) => {
    let cleanNum = number.replace(/\D/g, "");
    if (cleanNum.startsWith("0")) {
      cleanNum = cleanNum.substring(1);
    }
    if (cleanNum.startsWith("91") && cleanNum.length > 10) {
      // Already has country code
    } else if (cleanNum.length === 10) {
      cleanNum = "91" + cleanNum;
    }
    const txtMessage = `Hi, I'm following up on the InstaDemoX website we generated for *${bizName}* in ${city}. Did you like the demo design?`;
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(txtMessage)}`;
  };

  // Client-side search filters by business name or city
  const filteredLeads = leads.filter((lead) => {
    const term = searchQuery.toLowerCase();
    return (
      lead.business_name.toLowerCase().includes(term) ||
      lead.city.toLowerCase().includes(term) ||
      lead.category.toLowerCase().includes(term) ||
      lead.owner_name.toLowerCase().includes(term)
    );
  });

  // Export visible items to CSV
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) return;

    // CSV headers
    const headers = [
      "ID",
      "Slug",
      "Business Name",
      "Category",
      "Owner Name",
      "City",
      "Address",
      "Phone",
      "WhatsApp",
      "Date Created",
      "Viewed",
      "Viewed At",
      "Time on Page (sec)",
      "Converted",
      "Converted At",
    ];

    const rows = filteredLeads.map((lead) => [
      lead.id,
      lead.slug,
      `"${lead.business_name.replace(/"/g, '""')}"`,
      lead.category,
      `"${lead.owner_name.replace(/"/g, '""')}"`,
      lead.city,
      `"${lead.address.replace(/"/g, '""')}"`,
      lead.phone,
      lead.whatsapp,
      lead.created_at,
      lead.viewed ? "TRUE" : "FALSE",
      lead.viewed_at || "",
      lead.time_on_page,
      lead.converted ? "TRUE" : "FALSE",
      lead.converted_at || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `instademox_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination logic
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredLeads.length / entriesPerPage);

  const goToPrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));  // Render Login Gate
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#060606] flex flex-col items-center justify-center p-6 text-white font-inter">
        <div className="w-full max-w-md bg-[#0D0D0D] border border-neutral-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-amber-500/10 text-amber-500 rounded-full mb-4 border border-amber-500/20 shadow-lg animate-pulse">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold font-sora tracking-tight text-white">InstaDemoX Admin</h1>
            <p className="text-neutral-500 text-xs mt-1 text-center font-light uppercase tracking-wider">ProgVision Internal Lead Core</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2.5">
                Dashboard Security Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-[#050505] border ${loginError ? "border-rose-500/50 focus:border-rose-500" : "border-neutral-800 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20"} rounded-xl pl-4 pr-10 py-3.5 text-white placeholder-neutral-700 text-sm focus:outline-none transition-all`}
                />
                <KeyRound className="w-4 h-4 text-neutral-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {loginError && <p className="text-rose-500 text-xs mt-2 font-medium">{loginError}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold py-3.5 rounded-xl transition-all duration-300 cursor-pointer shadow-lg active:scale-98 flex items-center justify-center gap-1.5"
            >
              {loading ? "Authenticating..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Secured Admin Dashboard Layout
  return (
    <div className="min-h-screen bg-[#060606] text-white font-inter">
      {/* Admin Nav */}
      <nav className="border-b border-neutral-800 bg-[#0D0D0D] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-float">⚡</span>
            <div>
              <span className="text-lg sm:text-xl font-bold font-sora text-white">
                InstaDemoX Leads Core
              </span>
              <span className="hidden sm:inline-block ml-3 text-[10px] bg-neutral-900 text-amber-500 font-bold px-2.5 py-1 rounded-full border border-neutral-800 uppercase tracking-widest">
                ProgVision Agency
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white px-3.5 py-2 border border-neutral-800 hover:border-neutral-600 rounded-lg transition-colors cursor-pointer select-none"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </nav>

      {/* Tab Switcher */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex border-b border-neutral-800">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-6 py-3 text-sm font-bold tracking-tight border-b-2 transition-all cursor-pointer ${
              activeTab === "leads"
                ? "border-amber-500 text-amber-500"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            📋 Generated Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab("google_forms")}
            className={`px-6 py-3 text-sm font-bold tracking-tight border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "google_forms"
                ? "border-amber-500 text-amber-500"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" /> Google Sheets Sync
            {formIsEnabled && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {activeTab === "leads" ? (
          <>
            {/* Grid summaries */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0D0D0D] border border-neutral-800/80 p-5 rounded-2xl relative">
                <div className="absolute top-0 left-6 w-12 h-px bg-amber-500/30"></div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Total Leads</p>
                <p className="text-3xl font-black text-white font-sora">{leads.length}</p>
              </div>
              <div className="bg-[#0D0D0D] border border-neutral-800/80 p-5 rounded-2xl relative">
                <div className="absolute top-0 left-6 w-12 h-px bg-amber-500/50"></div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Demo Viewed</p>
                <p className="text-3xl font-black text-[#F5A623] font-sora">
                  {leads.filter((l) => l.viewed).length}
                </p>
              </div>
              <div className="bg-[#0D0D0D] border border-neutral-800/80 p-5 rounded-2xl relative">
                <div className="absolute top-0 left-6 w-12 h-px bg-emerald-500/50"></div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Converted</p>
                <p className="text-3xl font-black text-emerald-500 font-sora">
                  {leads.filter((l) => l.converted).length}
                </p>
              </div>
              <div className="bg-[#0D0D0D] border border-neutral-800/80 p-5 rounded-2xl relative">
                <div className="absolute top-0 left-6 w-12 h-px bg-blue-500/50"></div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Conversion %</p>
                <p className="text-3xl font-black text-blue-400 font-sora">
                  {leads.length > 0 ? `${Math.round((leads.filter((l) => l.converted).length / leads.length) * 100)}%` : "0%"}
                </p>
              </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-[#0D0D0D] border border-neutral-800/80 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg">
              <div className="relative w-full md:max-w-md">
                <input
                  type="text"
                  placeholder="Search by business name, city, owner, category..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-[#050505] border border-neutral-800 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-neutral-700 text-sm focus:outline-none transition-all"
                />
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button
                  onClick={handleExportCSV}
                  disabled={filteredLeads.length === 0}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 disabled:opacity-40 text-black font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" /> Export CSV
                </button>
              </div>
            </div>

            {/* Table representation */}
            <div className="bg-[#0D0D0D] border border-neutral-800/80 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-850 bg-[#080808] text-neutral-400 text-[11px] font-bold uppercase tracking-widest">
                      <th className="py-4.5 px-5">Business Profile & Category</th>
                      <th className="py-4.5 px-5">City & Address</th>
                      <th className="py-4.5 px-5">Owner & Contact Details</th>
                      <th className="py-4.5 px-5 text-center">Lead Engagement Score</th>
                      <th className="py-4.5 px-5 text-center">Time on Page</th>
                      <th className="py-4.5 px-5 text-center">Lifecycle Status</th>
                      <th className="py-4.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-xs sm:text-sm">
                    {currentLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-neutral-600 font-light italic">
                          {leads.length === 0 ? "No generated website leads found." : "No leads match the active filters."}
                        </td>
                      </tr>
                    ) : (
                      currentLeads.map((lead) => {
                        // Compute Lead Score & Checklist dynamically
                        const generated = lead.generated_demo !== false;
                        const viewed = !!(lead.viewed_demo || lead.viewed);
                        const clickedWhatsApp = !!(lead.clicked_whatsapp || lead.converted);
                        const viewedPricing = !!lead.viewed_pricing;
                        
                        let score = 25; // Base 25 points for generating
                        if (viewed) score += 25;
                        if (viewedPricing) score += 20;
                        if (clickedWhatsApp) score += 30;

                        const isHot = score >= 70;

                        return (
                          <tr key={lead.id} className="hover:bg-neutral-900/40 transition-colors">
                            <td className="py-4 px-5">
                              <div className="font-bold text-white text-base leading-tight">{lead.business_name}</div>
                              <div className="text-amber-500 font-bold text-[10px] uppercase mt-1 tracking-widest flex items-center gap-1.5">
                                <span>🏷️ {lead.category}</span>
                                <span className="text-neutral-600">•</span>
                                <span className="text-neutral-400 text-[9px] font-light lowercase font-mono">{lead.slug}</span>
                              </div>
                              <div className="text-[10px] text-neutral-500 font-light mt-1.5">{formatDate(lead.created_at)}</div>
                            </td>
                            <td className="py-4 px-5">
                              <div className="font-semibold text-neutral-300">{lead.city}</div>
                              <div className="text-neutral-550 text-xs font-light mt-0.5 truncate max-w-[200px]" title={lead.address}>
                                {lead.address}
                              </div>
                            </td>
                            <td className="py-4 px-5 leading-relaxed text-xs">
                              <div className="text-neutral-350 font-medium">Owner: {lead.owner_name}</div>
                              <div className="text-neutral-550 font-mono mt-0.5">📞 {lead.phone}</div>
                              <div className="text-neutral-550 font-mono">💬 {lead.whatsapp}</div>
                            </td>
                            <td className="py-4 px-5">
                              <div className="flex flex-col items-center justify-center p-3.5 bg-[#080808] border border-neutral-850 rounded-2xl max-w-[220px] mx-auto text-center">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="text-xs font-bold text-neutral-400">Score:</span>
                                  <span className={`text-sm font-black font-mono ${isHot ? "text-amber-400" : "text-neutral-300"}`}>
                                    {score}%
                                  </span>
                                  {isHot && (
                                    <span className="inline-block text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold px-1.5 py-0.5 rounded animate-glow">
                                      HOT 🔥
                                    </span>
                                  )}
                                </div>
                                
                                {/* Actions Checklist */}
                                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[9px] text-neutral-500 text-left font-mono border-t border-neutral-900 pt-1.5 w-full">
                                  <div className="flex items-center gap-1">
                                    <span>{generated ? "✅" : "❌"}</span>
                                    <span className={generated ? "text-neutral-300 font-medium" : ""}>Generated</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span>{viewed ? "✅" : "❌"}</span>
                                    <span className={viewed ? "text-neutral-300 font-medium" : ""}>Viewed</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span>{viewedPricing ? "✅" : "❌"}</span>
                                    <span className={viewedPricing ? "text-neutral-300 font-medium" : ""}>Pricing</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span>{clickedWhatsApp ? "✅" : "❌"}</span>
                                    <span className={clickedWhatsApp ? "text-emerald-400 font-bold" : ""}>WhatsApp</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-5 text-center font-mono font-medium text-amber-500">
                              {formatTimeOnPage(lead.time_on_page)}
                            </td>
                            <td className="py-4 px-5 text-center">
                              <button
                                onClick={() => handleToggleConverted(lead.id, lead.converted)}
                                className="focus:outline-none cursor-pointer"
                                title="Toggle conversion status"
                              >
                                {lead.converted ? (
                                  <div className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-emerald-500/20 transition-all">
                                    ✓ Converted
                                  </div>
                                ) : (
                                  <div className="inline-flex items-center gap-1 text-neutral-400 bg-[#050505] border border-neutral-800 px-3 py-1.5 rounded-full text-xs hover:border-neutral-500 hover:text-white transition-all">
                                    Pending
                                  </div>
                                )}
                              </button>
                            </td>
                            <td className="py-4 px-5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2.5">
                                {/* Demo Link */}
                                <a
                                  href={`/${lead.slug}`}
                                  className="p-2 bg-[#050505] border border-neutral-850 hover:border-neutral-700 text-amber-500 rounded-lg transition-all inline-block"
                                  title="Open live demonstration website"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                                {/* WhatsApp Follow-up Chat Link */}
                                <a
                                  href={getWhatsappLink(lead.whatsapp, lead.business_name, lead.city)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-[#050505] border border-neutral-850 hover:border-emerald-800/40 text-emerald-400 rounded-lg transition-all inline-block"
                                  title="Engage customer on WhatsApp"
                                >
                                  <MessageSquare className="w-4.5 h-4.5 fill-current text-emerald-500" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="border-t border-neutral-900 bg-[#080808] px-5 py-3.5 flex items-center justify-between">
                  <span className="text-xs text-neutral-550">
                    Showing entries {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredLeads.length)} of {filteredLeads.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-850 hover:border-neutral-700 disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="text-xs font-bold px-3 font-mono text-amber-500">
                      {currentPage} of {totalPages}
                    </div>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-850 hover:border-neutral-700 disabled:opacity-40"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            {/* Google Sheets / Google Forms Sync Tab Content */}
            <div className="bg-[#0D0D0D] border border-neutral-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-12 w-32 h-px bg-gradient-to-r from-amber-500 to-yellow-600"></div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-900 pb-6">
                <div>
                  <h2 className="text-2xl font-black font-sora text-white flex items-center gap-2.5">
                    <span className="text-amber-500">📊</span> Google Sheets / Forms Sync Engine
                  </h2>
                  <p className="text-neutral-400 text-xs mt-1.5 font-light leading-relaxed max-w-3xl">
                    Connect any public Google Form (connected to your Google Sheets spreadsheet responses) to automatically feed generated leads in real time.
                    No premium plans or external subscription costs required! This works perfectly on the 100% free Google Spark / Starter tier.
                  </p>
                </div>

                {/* Activation Switch */}
                <div className="flex items-center gap-3 bg-[#050505] border border-neutral-850 px-4 py-3 rounded-2xl">
                  <span className="text-xs font-bold text-neutral-400 tracking-wider font-mono">SYNC STATUS</span>
                  <button
                    onClick={() => setFormIsEnabled(!formIsEnabled)}
                    className="focus:outline-none cursor-pointer transition-transform duration-200 hover:scale-105"
                    title={formIsEnabled ? "Deactivate Sync" : "Activate Sync"}
                  >
                    {formIsEnabled ? (
                      <div className="flex items-center text-emerald-400 font-bold text-xs gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        ENABLED
                        <ToggleRight className="w-8 h-8 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="flex items-center text-neutral-500 font-bold text-xs gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
                        DISABLED
                        <ToggleLeft className="w-8 h-8 text-neutral-700" />
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Notification Banner */}
              {feedbackMessage && (
                <div className={`mt-6 p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed transition-all duration-300 ${
                  feedbackType === "success" 
                    ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" 
                    : "bg-rose-500/5 border-rose-500/20 text-rose-400"
                }`}>
                  {feedbackType === "success" ? (
                    <CheckCircle className="w-4.5 h-4.5 shrink-0 mt-0.5 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5 text-rose-400" />
                  )}
                  <div>
                    <span className="font-bold tracking-tight uppercase mr-1">System Report:</span>
                    {feedbackMessage}
                  </div>
                </div>
              )}

              {/* URL & Scraper Input */}
              <div className="mt-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
                    Public Google Form URL
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input
                        type="url"
                        placeholder="e.g. https://docs.google.com/forms/d/e/1FAIpQLSfD_.../viewform"
                        value={formUrl}
                        onChange={(e) => setFormUrl(e.target.value)}
                        className="w-full bg-[#050505] border border-neutral-800 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 rounded-xl pl-4 pr-4 py-3.5 text-white placeholder-neutral-700 text-sm focus:outline-none transition-all font-mono"
                      />
                    </div>
                    <button
                      onClick={() => parseFormStructure(formUrl)}
                      disabled={isParsing || !formUrl}
                      className="bg-[#111111] hover:bg-neutral-800 text-amber-500 border border-amber-500/20 disabled:opacity-40 hover:border-amber-500/50 rounded-xl px-5 py-3.5 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isParsing ? "animate-spin" : ""}`} />
                      {isParsing ? "Scanning HTML..." : "Decode Form Fields"}
                    </button>
                  </div>
                  <p className="text-neutral-500 text-[11px] mt-2 font-light">
                    Enter the URL of your Google Form. Clicking "Decode" will parse the fields automatically!
                  </p>
                </div>

                {/* Parameter Mapping Fields */}
                <div className="border-t border-neutral-900 pt-6">
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest">
                      Visual Variable Field Mapper
                    </label>
                    <p className="text-neutral-500 text-[11px] mt-1 font-light leading-relaxed">
                      Map each active system landing page attribute to its respective <code className="text-neutral-400 font-mono">entry.xxxxxx</code> input parameter.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      { key: "business_name", label: "🏢 Business Name", desc: "The company or business profile title" },
                      { key: "category", label: "🏷️ Category", desc: "Industry template (Salon, Hotel, Gym, Clinic etc)" },
                      { key: "owner_name", label: "👤 Owner Name", desc: "The primary point-of-contact name" },
                      { key: "city", label: "📍 City Location", desc: "The branch target location city" },
                      { key: "address", label: "📬 Physical Address", desc: "Complete location address descriptor" },
                      { key: "phone", label: "📞 Phone Number", desc: "Customer service contact number" },
                      { key: "whatsapp", label: "💚 WhatsApp Number", desc: "Interactive WhatsApp contact link" },
                      { key: "tagline", label: "✍️ Brand Tagline", desc: "Generated campaign tagline" },
                      { key: "demo_url", label: "⚡ Generated Demo URL", desc: "Live website portfolio demo link" }
                    ].map((item) => (
                      <div key={item.key} className="bg-[#050505] border border-neutral-850 p-4 rounded-xl flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-bold text-white mb-0.5">{item.label}</div>
                          <p className="text-[10px] text-neutral-500 font-light mb-3 leading-tight">{item.desc}</p>
                        </div>
                        <div className="space-y-1.5">
                          {discoveredFields.length > 0 && (
                            <select
                              value={mapping[item.key] || ""}
                              onChange={(e) => setMapping({ ...mapping, [item.key]: e.target.value })}
                              className="bg-[#050505] border border-neutral-800 focus:border-amber-500/60 text-white rounded-lg p-2.5 text-xs w-full focus:outline-none cursor-pointer"
                            >
                              <option value="">-- Choose Decoded Field --</option>
                              {discoveredFields.map((df) => (
                                <option key={df.id} value={df.id}>
                                  {df.label} ({df.id})
                                </option>
                              ))}
                            </select>
                          )}
                          <input
                            type="text"
                            placeholder="Manually enter e.g. entry.1234567"
                            value={mapping[item.key] || ""}
                            onChange={(e) => setMapping({ ...mapping, [item.key]: e.target.value })}
                            className="bg-[#0D0D0D]/40 border border-neutral-800 focus:border-amber-500/60 text-neutral-300 rounded-lg p-2.5 text-xs w-full focus:outline-none placeholder-neutral-700 font-mono text-center tracking-wide"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trigger Admin Actions Panel */}
                <div className="border-t border-neutral-900 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <button
                      onClick={handleSaveFormConfig}
                      disabled={savingConfig}
                      className="flex-1 sm:flex-initial bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 disabled:opacity-50 text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-300 shadow active:scale-98 cursor-pointer"
                    >
                      {savingConfig ? "Saving Config..." : "Save Connection Settings"}
                    </button>

                    <button
                      onClick={handleTestSubmit}
                      disabled={testSubmitting}
                      className="flex-1 sm:flex-initial bg-[#111111] hover:bg-neutral-800 text-neutral-300 border border-neutral-850 hover:border-neutral-700 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer"
                    >
                      {testSubmitting ? "Dispatching..." : "Send Test Submission"}
                    </button>
                  </div>

                  <div className="w-full md:w-auto">
                    <button
                      onClick={handleBulkSyncAll}
                      disabled={leads.length === 0 || testSubmitting}
                      className={`w-full md:w-auto font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                        confirmBulk 
                          ? "bg-amber-600 hover:bg-amber-500 text-white border-amber-400 animate-pulse" 
                          : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/20"
                      }`}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${testSubmitting ? "animate-spin" : ""}`} /> 
                      {confirmBulk 
                        ? `⚠️ Click to Confirm pushing ${leads.length} leads!` 
                        : `Push All ${leads.length} Historical Leads Now`
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Guide Section */}
            <div className="bg-[#0D0D0D] border border-neutral-800/80 rounded-3xl p-8 relative overflow-hidden">
              <h3 className="text-lg font-black text-white font-sora flex items-center gap-2 mb-4">
                💡 Perfect Google Sheets Sync Blueprint
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-400 font-light leading-relaxed">
                <div className="space-y-2 bg-[#050505] p-5 rounded-2xl border border-neutral-900">
                  <div className="font-extrabold text-amber-500 font-mono text-base">01. Create Form & sheet</div>
                  <div className="font-bold text-white uppercase text-[10px] tracking-wider font-sans">Zero Subscriptions</div>
                  <p className="font-sans font-light text-neutral-400">
                    Go to Google Forms, choose a blank form, create 9 short-answer text questions matching your variables list, then click the **Responses** tab to link a new Google Sheet.
                  </p>
                </div>
                <div className="space-y-2 bg-[#050505] p-5 rounded-2xl border border-neutral-900">
                  <div className="font-extrabold text-amber-500 font-mono text-base">02. Auto-Decode</div>
                  <div className="font-bold text-white uppercase text-[10px] tracking-wider font-sans">Visual Field Mapper</div>
                  <p className="font-sans font-light text-neutral-400">
                    Paste the public Form URL above and click **Decode Form Fields**. The sync engine decodes input fields automatically. Map your variables in the dropdowns.
                  </p>
                </div>
                <div className="space-y-2 bg-[#050505] p-5 rounded-2xl border border-neutral-900">
                  <div className="font-extrabold text-emerald-500 font-mono text-base">03. Unlimited Submissions</div>
                  <div className="font-bold text-white uppercase text-[10px] tracking-wider font-sans">Free Spark Tier Compliant</div>
                  <p className="font-sans font-light text-neutral-400">
                    Click **Save Connection Settings**. Leads generated on your landing pages will now trigger immediate back-end submits, feeding directly into your Google Sheets for free!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
