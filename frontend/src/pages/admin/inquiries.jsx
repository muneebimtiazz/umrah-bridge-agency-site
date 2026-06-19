import { useState, useEffect, useCallback } from "react";
import { Search, Mail, Phone, Calendar, Trash2, ChevronDown, Loader2, MessageSquare } from "lucide-react";
import { getAllInquiries, updateInquiryStatus, deleteInquiry } from "../../services/enquiry.service";

const STATUS_COLORS = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-emerald-100 text-emerald-700",
  closed: "bg-gray-100 text-gray-700",
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllInquiries({
        page,
        limit: 15,
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

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateInquiryStatus(id, { status: newStatus });
      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq))
      );
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteInquiry(id);
      fetchInquiries();
    } catch (err) {
      alert("Failed to delete inquiry.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Customer Inquiries</h1>
            <p className="text-xs text-gray-500 mt-0.5">Manage and track your incoming leads.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="w-full sm:w-40 text-xs pl-3 pr-8 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-[#c9a84c] appearance-none cursor-pointer shadow-sm"
              >
                <option value="">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-5 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Client Info</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Interest</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-16 text-center">
                      <Loader2 className="w-6 h-6 animate-spin text-[#c9a84c] mx-auto mb-2" />
                      <span className="text-sm text-gray-400">Loading leads...</span>
                    </td>
                  </tr>
                ) : inquiries.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-16 text-center">
                      <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <span className="text-sm text-gray-500">No inquiries found.</span>
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inq) => (
                    <tr key={inq._id} className="hover:bg-gray-50/50 transition-colors group">
                      
                      {/* Date */}
                      <td className="px-5 py-4 align-top">
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">
                            {new Date(inq.createdAt).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        </div>
                      </td>

                      {/* Client Info */}
                      <td className="px-5 py-4 align-top">
                        <p className="text-sm font-bold text-gray-900 mb-1">{inq.fullName}</p>
                        <div className="space-y-1">
                          <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#c9a84c]">
                            <Phone className="w-3 h-3" /> {inq.phone}
                          </a>
                          {inq.email && (
                            <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#c9a84c]">
                              <Mail className="w-3 h-3" /> {inq.email}
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Interest & Message */}
                      <td className="px-5 py-4 align-top max-w-[250px]">
                        <p className="text-xs font-bold text-gray-800 mb-0.5">
                          {inq.packageTitle || inq.journeyType}
                        </p>
                        <p className="text-[11px] text-[#c9a84c] font-semibold mb-2">{inq.travelers}</p>
                        {inq.message && (
                          <div className="bg-gray-50 border border-gray-100 rounded p-2 text-[11px] text-gray-600 line-clamp-2 group-hover:line-clamp-none transition-all">
                            "{inq.message}"
                          </div>
                        )}
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-5 py-4 align-top">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded cursor-pointer border-none outline-none appearance-none ${STATUS_COLORS[inq.status]}`}
                        >
                          <option value="new">New Lead</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 align-top text-right">
                        <button
                          onClick={() => handleDelete(inq._id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}