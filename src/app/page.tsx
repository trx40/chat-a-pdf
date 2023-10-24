import { Button } from "@/components/ui/Button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div className="w-screen min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100 via-fuchsia-100 to-teal-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
              <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
              <UserButton afterSignOutUrl="/" />
            </div>

            <div className="flex mt-2">
              <Button>Go to Chats</Button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
