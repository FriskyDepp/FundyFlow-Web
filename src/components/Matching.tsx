import React, { useState } from "react";
import { X, Check, Heart, Users } from "lucide-react";
import Footer from "./Footer";
import MatchingPic from "../assets/matchingMock.png";
import ins1 from "../assets/ins1.png";
import ins2 from "../assets/ins2.png";
import ins3 from "../assets/ins3.png";
import ins4 from "../assets/ins4.png";
import ins5 from "../assets/ins5.png";
import ins6 from "../assets/ins6.png";
import ins7 from "../assets/ins7.png";
import ins8 from "../assets/ins8.png";
import ins9 from "../assets/ins9.png";
import ins10 from "../assets/ins10.png";


const mockProfiles = [
  { id: "1", name: "Joseph Matina", role: "Angel Investor", location: "San Francisco, CA", experience: "15+ years", seeking: ["Fintech", "Healthcare"], vision: "Empowering humanity with meaningful technology.", matchScore: 95, insPic: ins1, },
  { id: "2", name: "Sarah Johnson", role: "Startup Founder", location: "New York, NY", experience: "8+ years", seeking: ["AI", "Blockchain"], vision: "Innovating the future with AI solutions.", matchScore: 88,insPic: ins2, },
  { id: "3", name: "Michael Lee", role: "Angel Investor", location: "Los Angeles, CA", experience: "12+ years", seeking: ["Healthcare", "Biotech"], vision: "Supporting startups that improve lives.", matchScore: 92,insPic: ins3, },
  { id: "4", name: "Emily Davis", role: "Startup Founder", location: "Boston, MA", experience: "5+ years", seeking: ["Fintech", "EdTech"], vision: "Making education accessible worldwide.", matchScore: 80,insPic: ins4,},
  { id: "5", name: "David Kim", role: "Angel Investor", location: "Seattle, WA", experience: "10+ years", seeking: ["SaaS", "IoT"], vision: "Investing in scalable tech innovations.", matchScore: 85 ,insPic: ins5, },
  { id: "6", name: "Anna Brown", role: "Startup Founder", location: "Austin, TX", experience: "6+ years", seeking: ["Fintech", "AI"], vision: "Building tech that simplifies lives.", matchScore: 90 ,insPic: ins6, },
  { id: "7", name: "James Wilson", role: "Angel Investor", location: "Chicago, IL", experience: "18+ years", seeking: ["Healthcare", "SaaS"], vision: "Backing visionary entrepreneurs.", matchScore: 87 ,insPic: ins7,},
  { id: "8", name: "Olivia Martinez", role: "Startup Founder", location: "Miami, FL", experience: "7+ years", seeking: ["Blockchain", "Fintech"], vision: "Revolutionizing digital transactions.", matchScore: 82 ,insPic: ins8,},
  { id: "9", name: "William Chen", role: "Angel Investor", location: "Denver, CO", experience: "14+ years", seeking: ["AI", "Healthcare"], vision: "Empowering innovation in AI healthcare.", matchScore: 89 ,insPic: ins9,},
  { id: "10", name: "Sophia Taylor", role: "Startup Founder", location: "San Diego, CA", experience: "4+ years", seeking: ["SaaS", "IoT"], vision: "Simplifying complex business processes.", matchScore: 84 ,insPic: ins10,},
];

const Matching = () => {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentUser = { id: "0", name: "You" }; // Mock current user

  const handleSwipe = (targetId, liked) => {
    const targetProfile = profiles.find((p) => p.id === targetId);

    console.log(`User ${currentUser.name} ${liked ? "liked" : "passed"} ${targetProfile.name}`);

    // Simulate match logic
    if (liked) {
      const reverseSwipe = Math.random() > 0.5; // Randomly simulate reverse swipe
      if (reverseSwipe) {
        alert(`🎉 It's a Match with ${targetProfile.name}!`);
      }
    }

    setCurrentIndex((prev) => prev + 1);
  };

  if (currentIndex >= profiles.length) return <p className="text-center mt-20 text-white">No more profiles 💨</p>;

  const profile = profiles[currentIndex];

  return (
    <div className="pt-12 px-6 min-h-full min-w-screen bg-[#040E18]">
      <main className="pt-16 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 animate-fade-in gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Matching</h1>
              <p className="text-lg text-muted-foreground">Connect with your ideal partner!</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              <div className="border border-[#252732] rounded-xl bg-[#0a1623] backdrop-blur animate-fade-in-up">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Users className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Matched by</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">View profiles who matched with you</p>
                  <button className="w-full h-10 rounded-lg border border-[#252732] bg-blue-500 hover:bg-amber-500/10">View All</button>
                </div>
              </div>

              <div className="border border-[#252732] rounded-xl bg-[#0a1623] animate-fade-in-up">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-red-500/10 rounded-lg">
                      <Heart className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Your Match</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">Mutual matches ready to connect</p>
                  <button className="w-full h-10 rounded-lg border border-[#252732] bg-red-500 hover:bg-red-500/10">View All</button>
                </div>
              </div>
            </div>

            {/* Center Card - Profile */}
            <div className="lg:col-span-6">
              <div className="border-border bg-gradient-to-br from-card via-card to-card/80 shadow-2xl animate-scale-in relative overflow-hidden">
                {/* Match Score Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                    {profile.matchScore}% Match
                  </div>
                </div>

                <div className="p-12 bg-[#0a1623]">
                  <div className="flex flex-col items-center text-center mb-8">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 rounded-full blur-2xl bg-blue-500" />
                      <img  src={profile.insPic}
            alt={profile.name} className="w-56 h-56 relative z-10" />
                    </div>
                    <h2 className="text-5xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">{profile.name}</h2>
                    <p className="text-xl text-muted-grey mb-6 text-gray-400">{profile.role}</p>

                    <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
                      <div className="flex items-center gap-2 bg-blue-700/10 rounded-lg p-3">
                        {profile.location}
                      </div>
                      <div className="flex items-center gap-2 bg-blue-700/10 rounded-lg p-3">
                        {profile.experience}
                      </div>
                    </div>

                    <div className="mb-8 w-full">
                      <h3 className="text-lg font-semibold text-muted-foreground mb-3 text-gray-400">Seeking for</h3>
                      <div className="flex gap-3 flex-wrap justify-center">
                        {profile.seeking.map((industry, index) => (
                          <div key={index} className="bg-gradient-to-r from-blue-500 to-blue-600 text-primary-foreground text-base px-5 py-2 border-0 shadow-md rounded-3xl font-bold">
                            {industry}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-700/10 rounded-xl p-6 w-full max-w-lg">
                      <h3 className="text-lg font-semibold text-muted-foreground mb-3">Vision</h3>
                      <p className="text-xl text-foreground italic leading-relaxed">"{profile.vision}"</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-6 mt-10 max-w-xl mx-auto">
                    <button onClick={() => handleSwipe(profile.id, false)} className="flex-1 h-16 flex items-center justify-center bg-red-700/10 border border-2 rounded-xl border-red-700/30 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all group text-lg font-semibold">
                      <X className="w-5 h-5 mr-2 group-hover:scale-110 group-hover:rotate-90 transition-all" /> Pass
                    </button>
                    <button onClick={() => handleSwipe(profile.id, true)} className="flex-1 h-16 flex items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl text-lg font-semibold">
                      <Check className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" /> Match
                    </button>
                    <button className="h-16 px-6 border border-gray-700 rounded-xl hover:bg-blue-500 hover:text-primary-foreground transition-all group">
                      <Heart className="w-6 h-6 group-hover:fill-current transition-all" />
                    </button>
                  </div>

                  <button className="w-full mt-6 text-blue-500 hover:text-blue-500/80">View Full Profile →</button>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Stats */}
            <div className="lg:col-span-3 space-y-6">
              <div className="border-border rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 animate-fade-in-up">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">24</h3>
                  <p className="text-muted-foreground">Potential Matches</p>
                </div>
              </div>

              <div className="border-border rounded-2xl bg-gradient-to-br from-blue-300/10 to-blue-300/5 animate-fade-in-up">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">12</h3>
                  <p className="text-muted-foreground">Active Connections</p>
                </div>
              </div>

              <div className="border-border rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 animate-fade-in-up">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">8</h3>
                  <p className="text-muted-foreground">Mutual Matches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Matching;
