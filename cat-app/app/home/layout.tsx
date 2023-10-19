import Logout from "../components/Logout"

export default function Layout({
    children,
} : {
    children: React.ReactNode
}) {
    return (
        <section>
            <nav className="flex flex-row justify-end bg-red-300 p-2">
                <Logout />
            </nav>
            <div className="p-5">
                {children}
            </div>
        </section>
    )
}