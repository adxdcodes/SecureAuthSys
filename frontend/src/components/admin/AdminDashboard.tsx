import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import { Users, UserCheck, Shield, Calendar } from "lucide-react";

interface DashboardStats {
  total: number;
  active: number;
  inactive: number;
  admins: number;
  regularUsers: number;
}

interface RecentUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          "http://localhost:5000/api/admin/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStats(data.data.stats);
          setRecentUsers(data.data.recentUsers);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Admin Dashboard" />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Admin Dashboard" />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Users"
              value={stats?.total || 0}
              icon={<Users className="h-6 w-6 text-blue-600" />}
              color="bg-blue-100"
            />
            <StatCard
              title="Active Users"
              value={stats?.active || 0}
              icon={<UserCheck className="h-6 w-6 text-green-600" />}
              color="bg-green-100"
            />
            <StatCard
              title="Admins"
              value={stats?.admins || 0}
              icon={<Shield className="h-6 w-6 text-purple-600" />}
              color="bg-purple-100"
            />
            <StatCard
              title="Regular Users"
              value={stats?.regularUsers || 0}
              icon={<Users className="h-6 w-6 text-orange-600" />}
              color="bg-orange-100"
            />
          </div>

          {/* Recent Users */}
          <div className="card p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Users
              </h2>
              <a
                href="/admin/users"
                className="text-primary-600 hover:text-primary-500 text-sm font-medium"
              >
                View all users
              </a>
            </div>

            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-medium text-sm">
                              {user.firstName[0]}
                              {user.lastName[0]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="card p-6 text-center animate-fade-in">
              <Users className="h-8 w-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Manage Users
              </h3>
              <p className="text-gray-600 mb-4">
                View, edit, and manage user accounts
              </p>
              <a
                href="/admin/users"
                className="btn-primary inline-flex items-center"
              >
                Go to Users
              </a>
            </div>

            <div className="card p-6 text-center animate-fade-in">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Security
              </h3>
              <p className="text-gray-600 mb-4">
                Monitor system security and logs
              </p>
              <button className="btn-secondary inline-flex items-center">
                View Security
              </button>
            </div>

            <div className="card p-6 text-center animate-fade-in">
              <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Reports
              </h3>
              <p className="text-gray-600 mb-4">
                Generate and view system reports
              </p>
              <button className="btn-secondary inline-flex items-center">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
