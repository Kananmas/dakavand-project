const buttonStyles = "bg-amber-800 text-amber-50 p-3 rounded-[12px] hover:bg-blue-400 disabled:bg-gray-400"

export function Button({label , ...props}:{label:string} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button {...props} className={buttonStyles}>{label}</button>
}