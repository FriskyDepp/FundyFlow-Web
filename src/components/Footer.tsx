import React from 'react'
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";
import logo from '../assets/nav-logo.png'

const Footer = () => {
  return (
     <section className='py-20 px-6  h-fit min-w-screen bg-[#040E18]'>
            <footer className="bg-card border-t border-[#252732] py-12 px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img src={logo} alt="FundyFlow" className="h-8 w-8" />
                  <span className="text-lg font-bold text-foreground">FundyFlow</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Empowering startups and investors to grow together through intelligent matching and seamless collaboration.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
    
              <div>
                <h3 className="font-semibold mb-4">Platform</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">For Startups</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">For Investors</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
                </ul>
              </div>
    
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Press Kit</a></li>
                </ul>
              </div>
    
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>fundyflow@gmail.com</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>+66 91 455 4165</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Bangkok, TH</span>
                  </li>
                </ul>
              </div>
            </div>
    
            <div className="pt-8 border-t border-[#252732]">
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                <p>© 2025 FundyFlow. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        </section>
  )
}

export default Footer