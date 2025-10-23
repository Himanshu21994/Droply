import { Button } from "@heroui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import {
  CloudUpload,
  Shield,
  Folder,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e27]">
      {/* Use the unified Navbar component */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section with gradient background */}
        <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-dark relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-glow"></div>
          </div>

          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div>
                  <h1 className="hero-title text-white font-bold mb-4 leading-tight">
                    Store your <span className="text-gradient">images</span> with
                    <br />
                    ease
                  </h1>
                  <p className="text-lg md:text-xl text-[#b0b5c1]">
                    Simple. Secure. Fast.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                  <SignedOut>
                    <Link href="/sign-up">
                      <Button size="lg" variant="solid" color="primary">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button size="lg" variant="flat" color="primary">
                        Sign In
                      </Button>
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        variant="solid"
                        color="primary"
                        endContent={<ArrowRight className="h-4 w-4" />}
                      >
                        Go to Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                </div>
              </div>

              <div className="flex justify-center order-first lg:order-last">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 rounded-full blur-3xl animate-pulse icon-gradient-bg"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-24 md:h-32 w-24 md:w-32 text-cyan-400 animate-float" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-[#0a0e27] relative">
          <div className="container mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                What You Get
              </h2>
              <p className="text-[#b0b5c1] text-lg">Everything you need for seamless file management</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <div className="card-professional card-hover">
                <div className="p-8 text-center">
                  <div className="inline-block p-3 bg-gradient-primary rounded-lg mb-4 shadow-glow">
                    <CloudUpload className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    Quick Uploads
                  </h3>
                  <p className="text-[#b0b5c1]">Drag, drop, done. Lightning fast uploads.</p>
                </div>
              </div>

              <div className="card-professional card-hover">
                <div className="p-8 text-center">
                  <div className="inline-block p-3 bg-gradient-primary rounded-lg mb-4 shadow-glow">
                    <Folder className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    Smart Organization
                  </h3>
                  <p className="text-[#b0b5c1]">Keep it tidy, find it fast.</p>
                </div>
              </div>

              <div className="card-professional card-hover sm:col-span-2 md:col-span-1">
                <div className="p-8 text-center">
                  <div className="inline-block p-3 bg-gradient-primary rounded-lg mb-4 shadow-glow">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    Locked Down
                  </h3>
                  <p className="text-[#b0b5c1]">Your images, your eyes only.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-primary relative overflow-hidden">
          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to secure your files?
            </h2>
            <p className="text-white/90 text-lg mb-8">Join thousands of users who trust Droply</p>
            
            <SignedOut>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="bg-white text-[#0066ff] hover:bg-white/90 font-semibold"
                    endContent={<ArrowRight className="h-4 w-4" />}
                  >
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-[#0066ff] hover:bg-white/90 font-semibold"
                  endContent={<ArrowRight className="h-4 w-4" />}
                >
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </section>
      </main>

      {/* Professional footer */}
      <footer className="bg-[#05070f] border-t border-[#252d4a] py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CloudUpload className="h-6 w-6 text-[#0066ff]" />
                <h2 className="text-xl font-bold text-white">Droply</h2>
              </div>
              <p className="text-[#7a7f8f]">Secure file storage made simple.</p>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-[#b0b5c1]">
                <li><a href="#" className="hover:text-[#00d4ff] transition">Features</a></li>
                <li><a href="#" className="hover:text-[#00d4ff] transition">Pricing</a></li>
                <li><a href="#" className="hover:text-[#00d4ff] transition">Security</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-[#b0b5c1]">
                <li><a href="#" className="hover:text-[#00d4ff] transition">Help Center</a></li>
                <li><a href="#" className="hover:text-[#00d4ff] transition">Contact</a></li>
                <li><a href="#" className="hover:text-[#00d4ff] transition">Status</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-[#b0b5c1]">
                <li><a href="#" className="hover:text-[#00d4ff] transition">Privacy</a></li>
                <li><a href="#" className="hover:text-[#00d4ff] transition">Terms</a></li>
                <li><a href="#" className="hover:text-[#00d4ff] transition">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#252d4a] pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-[#7a7f8f] text-sm">
                &copy; {new Date().getFullYear()} Droply. All rights reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0 text-[#7a7f8f]">
                <a href="#" className="hover:text-[#00d4ff] transition">Twitter</a>
                <a href="#" className="hover:text-[#00d4ff] transition">GitHub</a>
                <a href="#" className="hover:text-[#00d4ff] transition">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}