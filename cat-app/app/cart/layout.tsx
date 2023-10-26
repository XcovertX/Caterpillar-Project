import Logout from "@/app/components/Logout"
import current from "../actions/CurrentUser"
import Header from "../components/Header"
import CartButton from "../components/CartButton"
import HomeButton from "../components/HomeButton"
import ShopButton from "../components/ShopButton"

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
                <div className='flex px-2'>
                {currentUser?.user_type === 'customer'?
                        <>
                            <div className='flex pr-2'>
                                <HomeButton disabled={false} />
                            </div>
                            <div className='flex px-2'>
                                <ShopButton disabled={false}/>
                            </div>
                            <div className='flex px-2'>
                                <CartButton disabled={true}/>
                            </div>
                        </> :
                        <></>
                    }
                    <div className='flex pl-2'>
                        <Logout />
                    </div>
                </div>
                
            </nav>
            <div className="p-5 pt-20">
                {children}
            </div>
        </section>
    )
}