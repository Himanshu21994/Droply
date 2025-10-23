"use client";

import React from "react";
import { useClerk, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { CloudUpload, ChevronDown, User, Menu, X } from "lucide-react";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { useState, useEffect, useRef } from "react";
import { Card, CardBody } from "@heroui/card";

interface SerializedUser {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  username?: string | null;
  emailAddress?: string | null;
}

interface NavbarProps {
  user?: SerializedUser | null;
}

export default function Navbar({ user }: NavbarProps) {
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check if we're on the dashboard page
  const isOnDashboard =
    pathname === "/dashboard" || pathname?.startsWith("/dashboard/");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle clicks outside the mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        // Check if the click is not on the menu button (which has its own handler)
        const target = event.target as HTMLElement;
        if (!target.closest('[data-menu-button="true"]')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = () => {
    signOut(() => {
      router.push("/");
    });
  };

  // Process user data with defaults if not provided
  const userDetails = {
    fullName: user
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : "",
    initials: user
      ? `${user.firstName || ""} ${user.lastName || ""}`
          .trim()
          .split(" ")
          .map((name) => name?.[0] || "")
          .join("")
          .toUpperCase() || "U"
      : "U",
    displayName: user
      ? user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName || user.username || user.emailAddress || "User"
      : "User",
    email: user?.emailAddress || "",
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`bg-gradient-dark border-b border-[#252d4a] sticky top-0 z-50 transition-shadow ${isScrolled ? "shadow-glow" : ""}`}
    >
      <div className="container mx-auto py-3 md:py-4 px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-10 hover:opacity-80 transition-opacity">
            <CloudUpload className="h-6 w-6 text-[#0066ff]" />
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">Droply</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 items-center">
            {/* Show these buttons when user is signed out */}
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="flat" color="primary" className="text-white hover:bg-[#252d4a]">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="solid" color="primary" className="bg-gradient-primary hover:shadow-glow">
                  Sign Up
                </Button>
              </Link>
            </SignedOut>

            {/* Show these when user is signed in */}
            <SignedIn>
              <div className="flex items-center gap-4">
                {!isOnDashboard && (
                  <Link href="/dashboard">
                    <Button variant="flat" color="primary" className="text-white hover:bg-[#252d4a]">
                      Dashboard
                    </Button>
                  </Link>
                )}
                <div className="relative group">
                  <Button
                    variant="flat"
                    className="p-0 bg-transparent min-w-0 hover:bg-[#252d4a]"
                    endContent={<ChevronDown className="h-4 w-4 ml-2 text-[#b0b5c1]" />}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar
                        name={userDetails.initials}
                        size="sm"
                        src={user?.imageUrl || undefined}
                        className="h-8 w-8 shrink-0"
                        fallback={<User className="h-4 w-4" />}
                      />
                      <span className="text-default-600 hidden sm:inline">
                        {userDetails.displayName}
                      </span>
                    </div>
                  </Button>
                  {/* Custom dropdown menu */}
                  <div className="absolute right-0 mt-0 w-48 bg-[#1a1f3a] rounded-lg shadow-lg border border-[#252d4a] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <button
                      onClick={() => router.push("/dashboard?tab=profile")}
                      className="w-full text-left px-4 py-3 hover:bg-[#252d4a] first:rounded-t-lg first-child:rounded-t-lg transition-colors"
                    >
                      <div className="font-medium text-white">Profile</div>
                      <div className="text-sm text-[#b0b5c1]">{userDetails.email || "View your profile"}</div>
                    </button>
                    <button
                      onClick={() => router.push("/dashboard")}
                      className="w-full text-left px-4 py-3 hover:bg-[#252d4a] transition-colors border-t border-[#252d4a]"
                    >
                      <div className="font-medium text-white">My Files</div>
                      <div className="text-sm text-[#b0b5c1]">Manage your files</div>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 hover:bg-red-500/10 last:rounded-b-lg transition-colors border-t border-[#252d4a] text-red-400"
                    >
                      <div className="font-medium">Sign Out</div>
                      <div className="text-sm text-red-400/70">Sign out of your account</div>
                    </button>
                  </div>
                </div>
              </div>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <SignedIn>
              <Avatar
                name={userDetails.initials}
                size="sm"
                src={user?.imageUrl || undefined}
                className="h-8 w-8 shrink-0"
                fallback={<User className="h-4 w-4" />}
              />
            </SignedIn>
            <button
              className="z-50 p-2"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              data-menu-button="true"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-default-700" />
              ) : (
                <Menu className="h-6 w-6 text-default-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#0a0e27] z-40 flex flex-col pt-20 px-6 shadow-xl transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:hidden border-l border-[#252d4a]`}
          >
            <SignedOut>
              <div className="flex flex-col gap-4 items-center">
                <Link
                  href="/sign-in"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="flat" color="primary" className="w-full text-white hover:bg-[#252d4a]">
                    Sign In
                  </Button>
                </Link>
                <Link
                  href="/sign-up"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="solid" color="primary" className="w-full bg-gradient-primary hover:shadow-glow">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col gap-6">
                {/* User info */}
                <div className="flex items-center gap-3 py-4 border-b border-[#252d4a]">
                  <Avatar
                    name={userDetails.initials}
                    size="md"
                    src={user?.imageUrl || undefined}
                    className="h-10 w-10 shrink-0"
                    fallback={<User className="h-5 w-5" />}
                  />
                  <div>
                    <p className="font-medium text-white">{userDetails.displayName}</p>
                    <p className="text-sm text-[#b0b5c1]">
                      {userDetails.email}
                    </p>
                  </div>
                </div>

                {/* Navigation links */}
                <div className="flex flex-col gap-4">
                  {!isOnDashboard && (
                    <Link
                      href="/dashboard"
                      className="py-2 px-3 hover:bg-[#252d4a] rounded-md transition-colors text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="/dashboard?tab=profile"
                    className="py-2 px-3 hover:bg-[#252d4a] rounded-md transition-colors text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="py-2 px-3 text-left text-red-400 hover:bg-red-500/10 rounded-md transition-colors mt-4"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}