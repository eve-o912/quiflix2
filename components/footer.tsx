import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { AnimatedLogo } from "@/components/animated-logo"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-transparent to-black text-gray-400 py-12 border-t border-maroon-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <AnimatedLogo />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-maroon-300 font-medium mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-maroon-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-maroon-400 transition-colors">
                  Films
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-maroon-400 transition-colors">
                  New & Popular
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-maroon-400 transition-colors">
                  My List
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-maroon-300 font-medium mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-maroon-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-maroon-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-maroon-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-maroon-400 transition-colors">
                  Devices
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-maroon-300 font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-maroon-400 transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-maroon-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-maroon-400 transition-colors">
                  Cookie Preferences
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-maroon-400 transition-colors">
                  Corporate Information
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-maroon-300 font-medium mb-4">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-maroon-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-maroon-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-maroon-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-maroon-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs">Quiflix is a blockchain-based streaming platform for premium content.</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-maroon-900 text-xs text-center">
          <p>&copy; {new Date().getFullYear()} Quiflix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
