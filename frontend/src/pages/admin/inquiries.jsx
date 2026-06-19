import { useState, useEffect, useCallback } from "react";
import { Search, Mail, Phone, Calendar, Trash2, ChevronDown, Loader2, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllInquiries, deleteInquiry } from "../../services/enquiry.service";

const STATUS_COLORS = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-amber-100 text-amber-700 border-amber-200",
  converted: "bg-emerald-100 text-emerald-700 border-emerald-200",
  closed: "bg-gray-100 text-gray-700 border-gray-200",
};

const ITEMS_PER_PAGE = 15;

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Loader for deleting inline action
  const [deletingId, setDeletingId] = useState(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllInquiries({
        page,
        limit: ITEMS_PER_PAGE,
        ...(statusFilter ? { status: statusFilter } : {})
      });
      setInquiries(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      setError("Failed to load inquiries.");
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Reset to page 1 on filter change
  useEffect(() => { setPage(1); }, [statusFilter]);

  // ─── Handlers ───
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead?")) return;
    
    setDeletingId(id);
    try {
      await deleteInquiry(id);
      // Optimistic UI Update: Instantly remove the lead from the screen without refetching!
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
      setTotal((prev) => prev - 1);
    } catch (err) {
      alert(err.response?.data?.message ?? "Failed to delete inquiry.");
    } finally {
      setDeletingId(null);
    }
  };

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Customer Inquiries</h1>
            <p className="text-xs text-gray-500 mt-0.5">Manage and track your incoming leads.</p>
          </div>
          
          {/* <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-4 pr-9 py-2 text-xs font-semibold border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] appearance-none cursor-pointer shadow-sm transition-all text-gray-700"
              >
                <option value="">All Statuses</option>
                <option value="new">New Leads</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div> */}
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-xs font-medium text-red-600 flex items-center gap-2 shadow-sm">
            {error}
          </div>
        )}

        {/* List Container */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1.5fr_2fr_1fr_0.5fr] px-5 py-4 border-b border-gray-100 bg-gray-50/50">
            {["Date", "Client Info", "Interest & Notes", "Status", "Actions"].map((col, idx) => (
              <span key={col} className={`text-[10px] font-bold text-gray-500 tracking-wider uppercase ${idx === 4 ? 'text-right' : ''}`}>
                {col}
              </span>
            ))}
          </div>

          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin text-[#c9a84c]" />
                <span className="text-sm font-medium">Loading leads...</span>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">No inquiries found</h3>
                <p className="text-xs text-gray-500 mt-1">You have no leads matching this filter.</p>
              </div>
            ) : (
              inquiries.map((inq) => (
                <div key={inq._id} className="grid grid-cols-[1fr_1.5fr_2fr_1fr_0.5fr] items-start px-5 py-4 hover:bg-gray-50/80 transition-colors group">
                  
                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-gray-500 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">
                      {new Date(inq.createdAt).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>

                  {/* Client Info */}
                  <div className="pr-4">
                    <p className="text-[13px] font-bold text-gray-900 mb-1.5">{inq.fullName}</p>
                    <div className="space-y-1">
                      <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 hover:text-[#c9a84c] transition-colors">
                        <Phone className="w-3 h-3" /> {inq.phone}
                      </a>
                      {inq.email && (
                        <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 hover:text-[#c9a84c] transition-colors">
                          <Mail className="w-3 h-3" /> {inq.email}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Interest & Message */}
                  <div className="pr-4">
                    <p className="text-[12px] font-bold text-gray-800 mb-0.5 line-clamp-1">
                      {inq.packageTitle || inq.journeyType}
                    </p>
                    <span className="inline-block bg-gray-100 text-gray-600 text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase mb-2">
                      {inq.travelers}
                    </span>
                    {inq.message && (
                      <div className="bg-gray-50 border border-gray-100 rounded p-2 text-[11px] text-gray-600 italic line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                        "{inq.message}"
                      </div>
                    )}
                  </div>

                  {/* Status Badge (Read-only) */}
                  <div className="relative w-fit mt-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border shadow-sm ${STATUS_COLORS[inq.status] || STATUS_COLORS.new}`}>
                      {inq.status || "New"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="text-right">
                    <button
                      onClick={() => handleDelete(inq._id)}
                      disabled={deletingId === inq._id}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete Lead"
                    >
                      {deletingId === inq._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50/50">
            <span className="text-xs font-medium text-gray-500">
              Showing {inquiries.length} of {total} leads
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:border-gray-300 hover:text-gray-900 disabled:opacity-40 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2} />
              </button>

              {Array.from({ length: Math.min(totalPages || 1, 5) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all shadow-sm ${
                    page === p
                      ? "bg-[#c9a84c] text-white border border-[#c9a84c]"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages || totalPages === 0}
                className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:border-gray-300 hover:text-gray-900 disabled:opacity-40 transition-colors shadow-sm"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}