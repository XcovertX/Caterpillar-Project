import Logout from "@/app/components/Logout"
import current from "../actions/CurrentUser"
import Header from "../components/Header"

export default async function Layout({
    children,
} : {
    children: React.ReactNode
}) {
    const currentUser = await current()
    return (
        <section>
            <nav className="flex flex-row justify-between p-2 bg-black text-white items-center fixed inset-x-0">
                <div className="flex flex-row" >
                    <div className="flex flex-col pr-2" >
                        <h1>{`${currentUser? 'Signed in:' : ''}`}</h1>
                        <h1>{`${currentUser? 'User Type:' : ''}`}</h1>
                    </div>
                    <div className="flex flex-col" >
                        <h1>{`${currentUser?.first_name} ${currentUser?.last_name}`}</h1>
                        <h1>{`${currentUser?.user_type}`}</h1>
                    </div>
                </div>
                <div className='flex'>
                    <Logout />
                </div>
                
            </nav>
            <div className="p-5 pt-20">
                {children}
            </div>
        </section>
    )
}