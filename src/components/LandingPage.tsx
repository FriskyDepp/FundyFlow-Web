import React from 'react'
import { TrendingUp,ArrowRight,UserPlus, Search, Handshake, Rocket, Users, Shield, Zap, Target, BarChart,Star,Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react'
import heroPic from '../assets/heroPic.png'
import logo from '../assets/nav-logo.png'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'


const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up and tell us about your startup or investment interests in minutes.",
  },
  {
    icon: Search,
    title: "Get Matched",
    description: "Our AI analyzes thousands of data points to find your perfect match.",
  },
  {
    icon: Handshake,
    title: "Connect & Discuss",
    description: "Engage with potential partners through our secure messaging platform.",
  },
  {
    icon: Rocket,
    title: "Grow Together",
    description: "Close deals and track your growth with our comprehensive tools.",
  },
];

const features = [
  {
    icon: Target,
    title: "AI-Powered Matching",
    description: "Our intelligent algorithm connects startups with the perfect investors based on industry, stage, and goals.",
  },
  {
    icon: BarChart,
    title: "Real-Time Analytics",
    description: "Access comprehensive dashboards with market insights, funding trends, and performance metrics.",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Bank-level encryption and compliance ensure your data and deals remain protected.",
  },
  {
    icon: Users,
    title: "Expert Network",
    description: "Connect with mentors, advisors, and industry experts to accelerate your growth.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Streamlined workflows get you from pitch to funding in record time.",
  },
  {
    icon: TrendingUp,
    title: "Growth Tracking",
    description: "Monitor your progress with detailed reports and milestone tracking tools.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, TechVision AI",
    content: "FundyFlow connected us with the perfect investors in just 3 weeks. The AI matching is incredibly accurate!",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Partner, Venture Capital Group",
    content: "As an investor, this platform has streamlined our deal flow tremendously. Quality matches every time.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Founder, GreenTech Solutions",
    content: "The analytics and insights provided are invaluable. We secured Series A funding faster than expected.",
    rating: 5,
  },
];


const LandingPage = () => {
  const nav = useNavigate();
  const navigateSignin = () => nav("/Signin");
  return (
    <div className='w-full h-auto'>
        <section className="min-h-full min-w-screen overflow-hidden bg-[#040E18]">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-blue-800/20 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-blue-500">Trusted by 500+ Startups</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight">
              YOUR TRUSTED <span className="text-blue-500">PARTNER</span> FOR GROWTH
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed text-[#D4D4D4]">
              A trusted funding platform that connects high-potential startups with investors, 
              enabling smart, seamless capital growth through AI-powered matching and analytics.
            </p>
            
            <div className="flex flex-wrap gap-4">
                <button onClick={navigateSignin}
                className="flex flex-row h-12 w-50 items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-500/25 font-bold">Get Started
                <ArrowRight className="ml-2 w-5 h-5 hover:translate-x-1 transition-transform" />
                </button>
                <button className='w-40 h-12 bg-transparent border-blue-500 border rounded-lg font-bold text-blue-500 hover:bg-blue-500/10 hover:text-white'>Learn More
                </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-500 mb-1">$2.5B+</div>
                <div className="text-sm text-muted-foreground">Funded</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500 mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Startups</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500 mb-1">200+</div>
                <div className="text-sm text-muted-foreground">Investors</div>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl rounded-full" />
            <img 
              src={heroPic} 
              alt="Growth Analytics" 
              className="relative w-full h-auto drop-shadow-2xl mt-30"
            />
          </div>
        </div>
      </div>
    </section>
        
    <section className='py-20 px-6 min-h-full min-w-screen bg-[#040E18]'>
        <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose FundyFlow?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to connect, grow, and succeed in one powerful platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-[#41566C] rounded-xl bg-blue-500/8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className='py-20 px-6 bg-[#040E18] min-h-full min-w-screen'>
        <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform your funding journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-accent rounded-full flex items-center justify-center shadow-lg">
                    <step.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-500 to-accent z-0" />
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
    <section className='py-20 px-6  min-h-full min-w-screen bg-[#040E18]'>
        <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our community says about their experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="border rounded-xl bg-blue-500/10 border-[#41566C] hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-blue-500 text-blue-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
    <section className='py-20 px-6  min-h-full min-w-screen bg-gradient-to-r from-blue-500/90 to-[#040E18]/90'>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of successful startups and investors who are already growing with FundyFlow
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className='flex items-center justify-center bg-black w-60 h-12 rounded-xl text-blue-500 hover:bg-black/50 font-bold'>Start your journey
                <ArrowRight className="ml-2 w-5 h-5 hover:translate-x-1 transition-transform" />
            </button>
            <button className=' w-50 h-12 rounded-xl bg-black border border-white hover:bg-black/50 font-bold'>Schedule a Demo</button>
          </div>

          <p className="mt-8 text-sm text-primary-foreground/80">
            No credit card required • Free 30-day trial • Cancel anytime
          </p>
        </div>
      </div>

    </section>
    <Footer />


    </div>
  )
}

export default LandingPage