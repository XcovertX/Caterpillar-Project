
type Props = {
    color: string;
    label: string;
}

const Seperator = ({ color, label }: Props) => {
    return (
        <div className="w-full flex flex-row justify-start items-center">
            <hr className={`${color} w-1/12 text-md`} />
            <h1 className="text-md mx-2 text-neutral-500/[.7] w-fit whitespace-nowrap text-center ">
                {label}
            </h1>
            <hr className={`${color} text-md w-full`} />
        </div>
        
    )
};

export default Seperator