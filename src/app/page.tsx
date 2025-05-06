import { ModeToggle } from "@/components/mode-toggle";
import StringGenerator from "@/components/string-generator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center gap-6 p-6">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
        connect-db
      </h1>
      <Card className="w-full grow md:w-1/2 dark:bg-transparent">
        <CardHeader>
          <CardTitle>String generator</CardTitle>
          <CardDescription>
            Select your database to generate the connection string.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <StringGenerator />
        </CardContent>
        <CardFooter>
          <ModeToggle />
        </CardFooter>
      </Card>
    </div>
  );
}
