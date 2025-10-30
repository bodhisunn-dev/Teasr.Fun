import { Link, useLocation } from "wouter";
import { Home, Search, Upload, Wallet, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavigationProps {
  currentUser?: {
    id: string;
    username: string;
    avatarUrl?: string | null;
    walletAddress?: string | null;
  } | null;
  onConnectWallet?: () => void;
}

export default function Navigation({ currentUser, onConnectWallet }: NavigationProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/explore", label: "Explore", icon: Search },
    { path: "/upload", label: "Upload", icon: Upload },
    { path: "/wallet", label: "Wallet", icon: Wallet },
    { path: `/profile/${currentUser?.username}`, label: "Profile", icon: User },
  ];

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2" data-testid="link-home">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold">TEASR.FUN</span>
              </a>
            </Link>

            {/* Center Nav Items */}
            <div className="flex items-center gap-2">
              {navItems.slice(0, 3).map((item) => (
                <Link key={item.path} href={item.path}>
                  <a data-testid={`link-${item.label.toLowerCase()}`}>
                    <Button
                      variant={location === item.path ? "secondary" : "ghost"}
                      className="gap-2"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="hidden lg:inline">{item.label}</span>
                    </Button>
                  </a>
                </Link>
              ))}
            </div>

            {/* Right Side - Wallet & Profile */}
            <div className="flex items-center gap-3">
              {currentUser?.walletAddress ? (
                <div className="flex items-center gap-2 bg-secondary rounded-md px-4 py-2">
                  <Wallet className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm" data-testid="text-wallet-address">
                    {truncateAddress(currentUser.walletAddress)}
                  </span>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={onConnectWallet}
                  className="gap-2"
                  data-testid="button-connect-wallet"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </Button>
              )}

              {currentUser && (
                <Link href={`/profile/${currentUser.username}`}>
                  <a data-testid="link-profile">
                    <Avatar className="w-9 h-9 hover-elevate active-elevate-2 ring-2 ring-offset-2 ring-primary/20">
                      <AvatarImage src={currentUser.avatarUrl || undefined} />
                      <AvatarFallback>{currentUser.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t safe-area-inset-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a data-testid={`link-mobile-${item.label.toLowerCase()}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={location === item.path ? "bg-secondary" : ""}
                >
                  <item.icon className={`w-6 h-6 ${location === item.path ? "text-primary" : ""}`} />
                </Button>
              </a>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="flex items-center justify-between h-14 px-4">
          <Link href="/">
            <a className="flex items-center gap-2" data-testid="link-mobile-home">
              <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold">T</span>
              </div>
              <span className="text-lg font-bold">TEASR.FUN</span>
            </a>
          </Link>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {!currentUser?.walletAddress && (
                  <Button
                    onClick={onConnectWallet}
                    className="w-full gap-2"
                    data-testid="button-mobile-connect-wallet"
                  >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </Button>
                )}
                {currentUser?.walletAddress && (
                  <div className="flex items-center gap-2 bg-secondary rounded-md px-4 py-3">
                    <Wallet className="w-4 h-4 text-primary" />
                    <span className="font-mono text-sm">
                      {truncateAddress(currentUser.walletAddress)}
                    </span>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
