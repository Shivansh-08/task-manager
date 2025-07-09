import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './components/Auth';
import Tasks from './components/Tasks';
import Categories from './components/Categories';
import Notifications from './components/Notifications';
import { CheckSquare, FolderOpen, Bell, LogOut, User } from 'lucide-react';
import './App.css';

function AppContent() {
  const { user, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('notifications');
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <Tasks />;
      case 'categories':
        return <Categories />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Tasks />;
    }
  };

  const tabConfig = [
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'categories', label: 'Categories', icon: FolderOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {user ? (
        <div className="w-full h-full">
          <header className="bg-white shadow-lg border-b border-gray-200">
            <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <CheckSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">TaskFlow</h1>
                    <p className="text-sm text-gray-600">Organize your productivity</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <User className="w-4 h-4" />
                    <span className="font-medium">Welcome, {user.name || 'User'}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <div className="mt-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {tabConfig.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${
                          activeTab === tab.id 
                            ? 'border-indigo-500 text-indigo-600 bg-indigo-50/50' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-all duration-200 rounded-t-lg flex items-center gap-2`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </header>
          
          <main className="flex-1">
            <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
              <div className="transition-all duration-300 ease-in-out">
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100">
          <Auth />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;