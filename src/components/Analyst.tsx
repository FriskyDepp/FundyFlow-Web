import { DollarSign, AlertTriangle, TrendingUp, Target, LineChart, Shield, Sparkles, ChevronRight } from "lucide-react";
import React from 'react'
import Footer from "./Footer";
import { Progress } from "./Progress";
import { useNavigate } from "react-router-dom";

const Analyst = () => {
  const nav = useNavigate();
  const navigateSim = () => nav("/Sim");

    const analysisCards = [
    {
      title: "Bond unit pricing",
      icon: DollarSign,
      lastAnalyzed: "Latest analyzed",
      result: "100,000$",
      subtitle: "for 3%",
      gradient: "from-blue-500/20 to-blue-500/5",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-500",
      trend: "+12% vs last month",
    },
    {
      title: "Comprehensive risk analysis",
      icon: Shield,
      lastAnalyzed: "Latest analyzed",
      result: "20%",
      subtitle: "Low Risk",
      subtitleColor: "text-blue-300",
      gradient: "from-blue-300/20 to-blue-300/5",
      iconBg: "bg-blue-300/20",
      iconColor: "text-blue-300",
      progressValue: 20,
      link: "/RiskAnalysis",
    },
    {
      title: "Fundraising success prediction",
      icon: Target,
      lastAnalyzed: "Latest analyzed",
      result: "82%",
      subtitle: "success",
      gradient: "from-green-500/20 to-green-500/5",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
      progressValue: 82,
      link: "/SuccessRate",
    },
  ];

  return (
    <div className="pt-2 px-6  min-h-full min-w-screen bg-[#040E18]">
      {/* <Navigation /> */}
      
      <main className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header with Stats */}
          <div className="mb-12 animate-fade-in">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  Personal Analyst
                </h1>
                <p className="text-lg text-muted-foreground">
                  AI-powered insights for smarter decisions
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-blue-500/10 text-blue-500 flex flex-row justify-center items-center font-bold border border-blue-500/20 rounded-3xl px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  3 Active Analyses
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {analysisCards.map((card, index) => (
              <div 
                key={index} 
                className={`border-border bg-gradient-to-br ${card.gradient} rounded-2xl hover:scale-[1.02] transition-all duration-300 group animate-fade-in-up overflow-hidden relative`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-card/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="p-6 flex flex-col relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-lg font-semibold text-foreground leading-tight flex-1">
                      {card.title}
                    </h3>
                    <div className={`${card.iconBg} rounded-xl p-2.5 group-hover:scale-110 transition-transform`}>
                      <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                  </div>
                  
                  {/* Icon Display */}
                  <div className="flex items-center justify-center mb-6">
                    <div className={`w-24 h-24 ${card.iconBg} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300`}>
                      <card.icon className={`w-12 h-12 ${card.iconColor}`} />
                    </div>
                  </div>
                  
                  {/* Last Analyzed */}
                  <p className="text-xs text-muted-foreground mb-2 text-center">
                    {card.lastAnalyzed}
                  </p>
                  
                  {/* Result */}
                  <div className="mb-4 text-center">
                    <p className="text-3xl font-bold text-foreground">
                      {card.result}
                      {card.subtitle && (
                        <span className={`text-lg ml-2 ${card.subtitleColor || 'text-muted-foreground'}`}>
                          {card.subtitle}
                        </span>
                      )}
                    </p>
                  </div>
                  
                  {/* Progress Bar or Trend */}
                  {card.progressValue !== undefined ? (
                    <div className="mb-6">
                      <Progress value={card.progressValue} className="h-2" />
                    </div>
                  ) : card.trend ? (
                    <div className="mb-6 flex items-center justify-center text-center">
                      <div className="bg-blue-500/10 text-blue-500 rounded-xl border-blue-500/10 border w-50 font-bold">
                        {card.trend}
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6" />
                  )}
                  
                  {/* Button */}
                  <button onClick={() => nav(card.link)}
                    className="w-full h-10 flex items-center justify-center bg-blue-500 text-primary-foreground hover:bg-blue-500/20 rounded-xl font-medium group/btn"
                  >
                    see detail
                    <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Negotiation Simulation Card */}
          <div className="border border-[#252732] bg-gradient-to-br from-card via-card to-blue-500/5 rounded-2xl animate-fade-in-up group hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden relative">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <LineChart className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="bg-blue-300/10 text-blue-400 border-blue-400/20 border w-30 rounded-2xl flex items-center justify-center font-bold">
                    Live Practice
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Real-world negotiation simulation
                </h3>
                <p className="text-base text-muted-foreground">
                  Refine your pitch through investor role-play simulations
                </p>
              </div>
              
              <button onClick={navigateSim}
                className="bg-blue-500 text-primary-foreground hover:bg-blue-500/20 rounded-xl px-12 font-semibold min-w-[200px] h-14 text-base group/btn shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              >
                practice
                <ChevronRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>

  )
}

export default Analyst;