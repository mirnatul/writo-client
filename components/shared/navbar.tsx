"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    CircleUser,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
]

const userMenuItems = [
    { label: "Profile", href: "/profile", icon: User },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Settings", href: "/settings", icon: Settings },
]

type IUserResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        profile: {
            id: string;
            name: string;
            email: string;
            activeStatus: "ACTIVE" | "INACTIVE" | "BLOCKED";
            role: "ADMIN" | "USER";
            createdAt: string;
            updatedAt: string;
            profile: {
                id: string;
                profilePhoto: string;
                bio: string;
                userId: string;
                createdAt: string;
                updatedAt: string;
            };
        };
    };
};

type NavbarProps = {
    user: IUserResponse
}


export function Navbar({ user }: NavbarProps) {
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <LayoutDashboard className="size-4" />
                    </span>
                    <span className="text-lg font-semibold tracking-tight">
                        NextJS Press
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href

                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                        isActive
                                            ? "text-foreground"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                {/* Right Side */}
                <div className="flex items-center gap-2">
                    {/* Mobile Navigation */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="size-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuGroup>
                                {navLinks.map((link) => (
                                    <DropdownMenuItem key={link.href} asChild>
                                        <Link href={link.href}>{link.label}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                            >
                                <Avatar className="size-8">
                                    <AvatarImage
                                        src="/diverse-avatars.png"
                                        alt="User avatar"
                                    />
                                    <AvatarFallback>
                                        <CircleUser className="size-5" />
                                    </AvatarFallback>
                                </Avatar>
                                <span className="sr-only">Open user menu</span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-medium">{user.data?.profile.name || "name"}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {user.data?.profile.email || "email"}
                                    </span>
                                </div>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                {userMenuItems.map((item) => {
                                    const Icon = item.icon

                                    return (
                                        <DropdownMenuItem key={item.href} asChild>
                                            <Link
                                                href={item.href}
                                                className="flex items-center gap-2"
                                            >
                                                <Icon className="size-4" />
                                                {item.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    )
                                })}
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => console.log("Sign out clicked")}
                            >
                                <LogOut className="size-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </header>
    )
}