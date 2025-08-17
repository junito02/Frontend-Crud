import React from "react";
import Users from "./Components/Users";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPost from "./Components/UserPost";
import UserEdit from "./Components/UserEdit";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto rounded-xl shadow-lg p-8">
        <Router>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/create" element={<UserPost />} />
            <Route path="/edit/:id" element={<UserEdit />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
