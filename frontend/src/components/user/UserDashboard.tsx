import React from "react";
import Header from "../common/Header";
import { useAuth } from "../../context/AuthContext";
import { User, Calendar, Clock, Shield } from "lucide-react";

const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  const InfoCard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="User Dashboard" />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="card p-8 mb-8 animate-fade-in">
            <div className="text-center">
              <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.firstName}!
              </h2>
              <p className="text-gray-600">
                You're logged in as a {user?.role} user. Here's your account
                overview.
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InfoCard
              title="Account Type"
              value={
                user?.role
                  ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  : "User"
              }
              icon={<Shield className="h-6 w-6 text-blue-600" />}
              color="bg-blue-100"
            />
            <InfoCard
              title="Member Since"
              value={
                user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"
              }
              icon={<Calendar className="h-6 w-6 text-green-600" />}
              color="bg-green-100"
            />
            <InfoCard
              title="Last Login"
              value={
                user?.lastLogin
                  ? new Date(user.lastLogin).toLocaleDateString()
                  : "N/A"
              }
              icon={<Clock className="h-6 w-6 text-purple-600" />}
              color="bg-purple-100"
            />
          </div>

          {/* Profile Details */}
          <div className="card p-8 animate-slide-up">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Profile Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="input-field bg-gray-50">{user?.firstName}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="input-field bg-gray-50">{user?.lastName}</div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="input-field bg-gray-50">{user?.email}</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="btn-primary">Edit Profile</button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="card p-6 text-center animate-fade-in">
              <User className="h-8 w-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Update Profile
              </h3>
              <p className="text-gray-600 mb-4">
                Change your personal information and preferences
              </p>
              <button className="btn-secondary">Edit Profile</button>
            </div>

            <div className="card p-6 text-center animate-fade-in">
              <Shield className="h-8 w-8 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Change Password
              </h3>
              <p className="text-gray-600 mb-4">
                Update your password for better security
              </p>
              <button className="btn-secondary">Change Password</button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-8 mt-8 animate-slide-up">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium text-gray-900">
                    Logged in successfully
                  </p>
                  <p className="text-sm text-gray-500">
                    {user?.lastLogin
                      ? new Date(user.lastLogin).toLocaleString()
                      : "Today"}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="h-2 w-2 bg-blue-500 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium text-gray-900">Account created</p>
                  <p className="text-sm text-gray-500">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleString()
                      : "Recently"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
