import Layout from "@/components/layout";
import Link from "next/link";

export default function Page () {
    return (
        <Layout>
            <section className="pt-20 h-screen">
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="font-semibold text-3xl">Page not found!</h1>
                    <p className="w-3/4 text-center">Oops! You&apos;ve seem to stumble on a page that doesn&apos;t exist.</p>
                    <Link className="m-5 h-[50px] text-lg bg-[#2E2729] text-white w-[200px] rounded-sm flex items-center justify-center" href={'/'}>
                        Go home
                    </Link>
                </div>
            </section>
        </Layout>
    )
}