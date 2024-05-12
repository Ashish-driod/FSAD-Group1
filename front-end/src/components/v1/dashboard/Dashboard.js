/**
 * v0 by Vercel.
 * @see https://v0.dev/t/p0fgWlILTvY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Badge } from "react-daisyui"
import { Avatar } from "react-daisyui"
import { Button } from "react-daisyui"

export default function Component() {
    return (
        <div key="1" className="flex h-screen">
            <div className="w-64 h-full bg-[#4f46e5] p-6">
                <WavesIcon className="h-8 w-8 text-white mb-6" />
                <nav className="space-y-1">
                    <a className="flex items-center space-x-3 text-white p-2 rounded-md bg-[#4338ca]" href="#">
                        <HomeIcon className="h-5 w-5" />
                        <span>Dashboard</span>
                        <Badge className="ml-auto" variant="secondary">
                            5
                        </Badge>
                    </a>
                    <a className="flex items-center space-x-3 text-white p-2 rounded-md" href="#">
                        <UsersIcon className="h-5 w-5" />
                        <span>Team</span>
                    </a>
                    <a className="flex items-center space-x-3 text-white p-2 rounded-md" href="#">
                        <BriefcaseIcon className="h-5 w-5" />
                        <span>Projects</span>
                        <Badge className="ml-auto" variant="secondary">
                            12
                        </Badge>
                    </a>
                    <a className="flex items-center space-x-3 text-white p-2 rounded-md" href="#">
                        <CalendarIcon className="h-5 w-5" />
                        <span>Calendar</span>
                        <Badge className="ml-auto" variant="secondary">
                            20+
                        </Badge>
                    </a>
                    <a className="flex items-center space-x-3 text-white p-2 rounded-md" href="#">
                        <TextIcon className="h-5 w-5" />
                        <span>Documents</span>
                    </a>
                    <a className="flex items-center space-x-3 text-white p-2 rounded-md" href="#">
                        <ClipboardListIcon className="h-5 w-5" />
                        <span>Reports</span>
                    </a>
                </nav>
                <div className="mt-6">
                    <h3 className="text-sm font-semibold text-white">Your teams</h3>
                    <div className="mt-2 space-y-1">
                        <a className="flex items-center text-white p-2 rounded-md" href="#">
                            <Badge className="bg-white text-[#4338ca]" variant="default">
                                H
                            </Badge>
                            <span className="ml-3">Heroicons</span>
                        </a>
                        <a className="flex items-center text-white p-2 rounded-md" href="#">
                            <Badge className="bg-white text-[#4338ca]" variant="default">
                                T
                            </Badge>
                            <span className="ml-3">Tailwind Labs</span>
                        </a>
                        <a className="flex items-center text-white p-2 rounded-md" href="#">
                            <Badge className="bg-white text-[#4338ca]" variant="default">
                                W
                            </Badge>
                            <span className="ml-3">Workcation</span>
                        </a>
                    </div>
                </div>
                <div className="bottom-6 inset-x-0">
                    <div className="flex items-center space-x-3 text-white bg-[#4338ca] p-2 rounded-md">
                        <Avatar> TC
                            {/*<AvatarImage>TC</AvatarImage>*/}
                            {/*<AvatarFallback className="text-[#4f46e5]">TC</AvatarFallback>*/}
                        </Avatar>
                        <span>Tom Cook</span>
                        <Button className="ml-auto text-red-500" size="icon" variant="ghost">
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex-grow bg-white" />
        </div>
    )
}

function BriefcaseIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
    )
}


function CalendarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
        </svg>
    )
}


function ClipboardListIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M12 11h4" />
            <path d="M12 16h4" />
            <path d="M8 11h.01" />
            <path d="M8 16h.01" />
        </svg>
    )
}


function HomeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}


function TextIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 6.1H3" />
            <path d="M21 12.1H3" />
            <path d="M15.1 18H3" />
        </svg>
    )
}


function UsersIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}


function WavesIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        </svg>
    )
}