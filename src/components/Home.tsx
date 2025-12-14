import React from 'react'
import { TrendingUp, BarChart3, Wallet, FolderOpen, Mail, Plus, Briefcase,Bell, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';


const Home = () => {
      const quickActions = [
    {
      title: "Investment Tracking",
      description: "Monitor your portfolio performance in real-time",
      icon: Wallet,
    },
    {
      title: "Analytics Dashboard",
      description: "Deep insights into market trends and opportunities",
      icon: BarChart3,
    },
    {
      title: "Portfolio Management",
      description: "Manage and optimize your investment portfolio",
      icon: FolderOpen,
    },
  ];

    const investors = [
    {
      name: "Jenifer Braman",
      role: "Tech Investor",
      matchScore: 95,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "Martin Decoy",
      role: "Venture Capitalist",
      matchScore: 92,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "David Depp",
      role: "Angel Investor",
      matchScore: 88,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      name: "Daisy Hong",
      role: "Fund Manager",
      matchScore: 90,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
  ];

    const feedItems = [
    {
      topic: "Topic",
      title: "Space: the next investment frontier?",
      source: "BBC",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
    },
    {
      topic: "Topic",
      title: "Crypto bills set to advance this week take industry closer to mainstream",
      source: "Reuters",
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=600&fit=crop",
    },
    {
      topic: "Topic",
      title: "Dual Listings in ASEAN: Key Trends and Driving Factors",
      source: "ThailandBusinessNews",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
    },
  ];

  return (
    <div className='w-full h-auto'>
    <section className="py-20 px-6  min-h-full min-w-screen bg-[#040E18]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in mt-7">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-sm font-medium text-blue-500">Your Investment Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-blue-500">FundyFlow</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track, analyze, and grow your investments with powerful tools and insights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <div 
              key={index}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border rounded-xl border-[#41566C] bg-blue-500/5 backdrop-blur"
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <action.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{action.title}</h3>
                <p className="text-muted-foreground">{action.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 px-6  min-h-full min-w-screen bg-[#040E18]">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Investors</h2>
          <p className="text-xl text-muted-foreground">Here's your perfect match</p>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {investors.map((investor, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center min-w-[200px] group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-4 mt-4">
                <div className="w-36 h-36 border-4 border-blue-500/20 rounded-full group-hover:border-blue-500/50 transition-all duration-300 group-hover:scale-105">
                  <img className=" rounded-full" src={investor.image} alt={investor.name} />
                  {/* <div>{investor.name.charAt(0)}</div> */}
                </div>
                <div className="absolute -top-2 -right-2 bg-blue-500 hover:bg-blue-500/90 flex items-center gap-1 h-8 w-15 justify-center rounded-2xl">
                  <TrendingUp className="w-3 h-3" />
                  {investor.matchScore}%
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1 text-center">{investor.name}</h3>
              <div className="flex items-center gap-1 text-muted-foreground mb-3">
                <Briefcase className="w-3 h-3" />
                <p className="text-sm">{investor.role}</p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-500/90 w-full rounded-xl flex items-center justify-center w-20 h-10">
                <Mail className="w-4 h-4 mr-2" />
                Message
              </button>
            </div>
          ))}
          
          <div className="flex flex-col items-center min-w-[200px] justify-center group">
            <div className="w-36 h-36 mb-4 rounded-full bg-secondary/50 border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-secondary/80 hover:border-primary/50 transition-all duration-300 group-hover:scale-105">
              <Plus className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-sm text-muted-foreground text-center px-4">
              Seek for your new partners
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className='py-20 px-6  min-h-full min-w-screen bg-[#040E18]'>
        <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Feed</h2>
            <p className="text-muted-foreground">Stay updated with the latest insights</p>
          </div>
          <Bell className="w-6 h-6 text-foreground" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {feedItems.map((item, index) => (
            <div key={index} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-[#252732] rounded-xl ">
              <div className="relative h-48">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-2">{item.topic}</p>
                <h3 className="font-semibold mb-3 line-clamp-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground">
                  Information source: <span className="underline">{item.source}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="bg-blue-500 hover:bg-blue-500/90 flex items-center justify-center w-50 h-12 rounded-xl">
          explore more
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>

    </section>
    <Footer />


    </div>
    
  )
}

export default Home