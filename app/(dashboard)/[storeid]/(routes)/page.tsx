import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    params: { storeid: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeid,
        }
    })
    return ( 
        <div>
            <h1>Dashboard page</h1>
            <p>Loja activa: {store?.name}</p>
        </div>
     );
}
 
export default DashboardPage;