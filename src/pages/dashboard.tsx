import { useSession } from "next-auth/react"

export default function Dashboard() {
    const { data: session, status } = useSession();
    if (!session) return (<div>Not yet authenticated</div>)
    return (
        <div>You are in dashboard . Welcome session?.user.email </div>
    )
}