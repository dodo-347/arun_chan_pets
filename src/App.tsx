import React, { useState } from 'react';
import { Twitter, Bookmark, Download, Lock, ExternalLink } from 'lucide-react';

interface BookmarkType {
  id: string;
  text: string;
  author: string;
  date: string;
  likes: number;
}

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);

  const handleConnect = () => {
    setIsLoading(true);
    // Simulate API connection
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
      // Mock data
      setBookmarks([
        {
          id: '1',
          text: "Just deployed my first full-stack application! #coding #webdev",
          author: "TechEnthusiast",
          date: "2024-03-15",
          likes: 142
        },
        {
          id: '2',
          text: "The future of AI is not about replacing humans, but augmenting human capabilities.",
          author: "AIResearcher",
          date: "2024-03-14",
          likes: 2891
        }
      ]);
    }, 1500);
  };

  const exportBookmarks = () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Twitter Bookmarks Export</title>
          <style>
            body { font-family: system-ui; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
            .bookmark { border: 1px solid #e1e1e1; padding: 1rem; margin: 1rem 0; border-radius: 8px; }
            .meta { color: #666; font-size: 0.9rem; }
          </style>
        </head>
        <body>
          <h1>Twitter Bookmarks</h1>
          ${bookmarks.map(b => `
            <div class="bookmark">
              <p>${b.text}</p>
              <div class="meta">
                By @${b.author} • ${b.date} • ${b.likes} likes
              </div>
            </div>
          `).join('')}
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'twitter-bookmarks.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-12 pt-8">
          <div className="inline-block p-3 bg-blue-500 text-white rounded-full mb-4">
            <Twitter size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Twitter Bookmarks Exporter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect your Twitter account to export all your bookmarks as a beautifully formatted HTML file
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Lock className="text-gray-400" />
              <span className="text-gray-600">Secure Authentication</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <ExternalLink size={16} />
              <span>Uses Twitter OAuth 2.0</span>
            </div>
          </div>

          {!isConnected ? (
            <button
              onClick={handleConnect}
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-xl text-white font-medium flex items-center justify-center space-x-3 ${
                isLoading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
              } transition-colors duration-200`}
            >
              <Twitter size={20} />
              <span>{isLoading ? 'Connecting...' : 'Connect Twitter Account'}</span>
            </button>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">Connected to Twitter</span>
                </div>
                <button 
                  onClick={() => setIsConnected(false)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Disconnect
                </button>
              </div>

              <div className="border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Bookmark className="text-blue-500" />
                    <h3 className="text-lg font-semibold">Your Bookmarks</h3>
                  </div>
                  <span className="text-sm text-gray-500">{bookmarks.length} items</span>
                </div>

                <div className="space-y-4 mb-6">
                  {bookmarks.map(bookmark => (
                    <div key={bookmark.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <p className="text-gray-800 mb-2">{bookmark.text}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>@{bookmark.author}</span>
                        <span className="mx-2">•</span>
                        <span>{bookmark.date}</span>
                        <span className="mx-2">•</span>
                        <span>{bookmark.likes} likes</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={exportBookmarks}
                  className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
                >
                  <Download size={18} />
                  <span>Export as HTML</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Your data is exported locally and no information is stored on our servers.</p>
        </div>
      </div>
    </div>
  );
}

export default App;